import { useCallback, useEffect, useRef, useState } from "react";

const tracks = [
  {
    title: "Carry On",
    artist: "eeryskies",
    src: "/sounds/up-we-go_7543367.mp3",
  },
  {
    title: "A World at Peace",
    artist: "ibrahim",
    src: "/sounds/A%20World%20at%20Peace.mp3",
  },
  {
    title: "joji beat vlog 6",
    artist: "joji",
    src: "/sounds/joji%20beat.mp3",
  },
];

export default function SketchSoundtrackControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeTrack = tracks[activeTrackIndex];

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void audio.play().then(() => setIsPlaying(true));
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const updateVolume = useCallback((nextVolume: number) => {
    const audio = audioRef.current;

    setVolume(nextVolume);

    if (audio) {
      audio.volume = nextVolume;
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(activeTrack.src);
    audio.volume = volume;
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    void audio.play().catch(() => setIsPlaying(false));

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [activeTrack.src]);

  return (
    <div className="max-w-md py-2 text-left font-mono text-xs uppercase leading-none lg:ml-auto lg:text-right">
      <p className="mb-2 opacity-70">Now Playing</p>
      <p className="mb-3 text-sm sm:text-base">
        {activeTrack.title} <span className="opacity-50">by</span>{" "}
        {activeTrack.artist}
      </p>
      <div className="mb-3 flex flex-wrap items-center justify-start gap-x-3 gap-y-2 lg:justify-end">
        {tracks.map((track, index) => (
          <button
            key={track.src}
            type="button"
            onClick={() => setActiveTrackIndex(index)}
            className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none ${
              activeTrackIndex === index ? "filter-active" : "opacity-60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 lg:justify-end">
        <button
          type="button"
          onClick={play}
          className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none ${
            isPlaying ? "opacity-50" : ""
          }`}
        >
          Play
        </button>
        <span className="opacity-40">/</span>
        <button
          type="button"
          onClick={stop}
          className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none"
        >
          Stop
        </button>
        <label className="flex items-center gap-2">
          <span className="opacity-70">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => updateVolume(Number(event.target.value))}
            className="w-24 accent-(--color-poster-blue)"
            aria-label="Soundtrack volume"
          />
        </label>
      </div>
    </div>
  );
}
