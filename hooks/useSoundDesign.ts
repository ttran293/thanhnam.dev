import { useCallback, useEffect, useRef, useState } from "react";
import type { Filter } from "../data/showcaseItems";

type SoundCue =
  | Filter
  | "back"
  | "clear"
  | "external"
  | "hover"
  | "mystery"
  | "name"
  | "navigate"
  | "page-enter"
  | "theme";

const SOUND_STORAGE_KEY = "sound-design";

type WindowWithAudioContext = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function createEnvelope(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  duration: number,
  volume: number
) {
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  gain.connect(destination);

  return gain;
}

function playTone(
  context: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
  delay = 0,
  type: OscillatorType = "triangle"
) {
  const startTime = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const envelope = createEnvelope(
    context,
    context.destination,
    startTime,
    duration,
    volume
  );

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.connect(envelope);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playSweep(
  context: AudioContext,
  startFrequency: number,
  endFrequency: number,
  duration: number,
  volume: number,
  delay = 0
) {
  const startTime = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const envelope = createEnvelope(
    context,
    context.destination,
    startTime,
    duration,
    volume
  );

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(startFrequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    endFrequency,
    startTime + duration
  );
  oscillator.connect(envelope);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playNoise(
  context: AudioContext,
  duration: number,
  volume: number,
  filterFrequency: number,
  delay = 0
) {
  const startTime = context.currentTime + delay;
  const sampleCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let index = 0; index < sampleCount; index += 1) {
    channelData[index] = (Math.random() * 2 - 1) * (1 - index / sampleCount);
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const envelope = createEnvelope(
    context,
    context.destination,
    startTime,
    duration,
    volume
  );

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(filterFrequency, startTime);
  filter.Q.setValueAtTime(3, startTime);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(envelope);
  source.start(startTime);
  source.stop(startTime + duration + 0.02);
}

function playCue(context: AudioContext, cue: SoundCue) {
  if (context.state === "suspended") {
    void context.resume();
  }

  switch (cue) {
    case "hover":
      playTone(context, 760, 0.035, 0.018, 0, "sine");
      break;
    case "navigate":
      playTone(context, 280, 0.045, 0.026);
      playTone(context, 560, 0.055, 0.018, 0.035);
      break;
    case "external":
      playTone(context, 920, 0.028, 0.021, 0, "square");
      playTone(context, 1380, 0.035, 0.013, 0.024, "sine");
      break;
    case "mystery":
      playSweep(context, 120, 86, 0.13, 0.024);
      playTone(context, 620, 0.035, 0.009, 0.075, "sine");
      break;
    case "name":
      playSweep(context, 520, 780, 0.07, 0.018);
      playSweep(context, 780, 620, 0.06, 0.014, 0.052);
      break;
    case "page-enter":
      playNoise(context, 0.12, 0.018, 760);
      playSweep(context, 360, 520, 0.1, 0.011, 0.035);
      break;
    case "back":
      playNoise(context, 0.1, 0.017, 640);
      playSweep(context, 520, 300, 0.09, 0.011, 0.02);
      break;
    case "theme":
      playSweep(context, 320, 520, 0.09, 0.025);
      playTone(context, 780, 0.035, 0.012, 0.045, "sine");
      break;
    case "web-app":
      playTone(context, 520, 0.04, 0.023, 0, "square");
      playTone(context, 780, 0.04, 0.014, 0.038, "square");
      break;
    case "art":
      playNoise(context, 0.065, 0.024, 1800);
      playTone(context, 640, 0.045, 0.014, 0.035, "triangle");
      break;
    case "school":
      playNoise(context, 0.085, 0.025, 950);
      playSweep(context, 420, 300, 0.08, 0.012, 0.02);
      break;
    case "rock-climb":
      playNoise(context, 0.04, 0.022, 2600);
      playTone(context, 1180, 0.025, 0.018, 0.018, "sine");
      playTone(context, 880, 0.035, 0.015, 0.052, "triangle");
      break;
    case "clear":
      playSweep(context, 460, 260, 0.08, 0.019);
      break;
  }
}

export function useSoundDesign() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const lastHoverTimeRef = useRef(0);

  const getContext = useCallback(() => {
    if (contextRef.current) {
      return contextRef.current;
    }

    const AudioContextConstructor =
      window.AudioContext ||
      (window as WindowWithAudioContext).webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    contextRef.current = new AudioContextConstructor();

    return contextRef.current;
  }, []);

  const playSound = useCallback(
    (cue: SoundCue) => {
      if (!soundEnabled) return;

      if (cue === "hover") {
        const now = Date.now();

        if (now - lastHoverTimeRef.current < 90) {
          return;
        }

        lastHoverTimeRef.current = now;
      }

      const context = getContext();
      if (!context) return;

      playCue(context, cue);
    },
    [getContext, soundEnabled]
  );

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.localStorage.setItem(SOUND_STORAGE_KEY, next ? "on" : "off");

    if (next) {
      const context = getContext();
      if (context) {
        playCue(context, "theme");
      }
    }
  }, [getContext, soundEnabled]);

  useEffect(() => {
    setSoundEnabled(window.localStorage.getItem(SOUND_STORAGE_KEY) === "on");
  }, []);

  return { playSound, soundEnabled, toggleSound };
}
