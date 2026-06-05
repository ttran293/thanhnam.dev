import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ItemPageLayout from "../../components/ItemPageLayout";
import SketchImageModal, {
  type SketchDrawing,
} from "../../components/SketchImageModal";
import { itemTitleClassName } from "../../data/showcaseItems";
import { useSoundDesign } from "../../hooks/useSoundDesign";

const SketchPageCanvas = dynamic(
  () => import("../../components/SketchPageCanvas"),
  { ssr: false }
);

const drawings: SketchDrawing[] = [
  { id: "1", src: "/images/drawings/1.jpg", alt: "Drawing 1" },
  { id: "3", src: "/images/drawings/3.jpg", alt: "Drawing 3" },
  { id: "4", src: "/images/drawings/4.jpg", alt: "Drawing 4" },
  { id: "5", src: "/images/drawings/5.jpg", alt: "Drawing 5" },
  { id: "7", src: "/images/drawings/7.JPG", alt: "Drawing 7" },
  { id: "8", src: "/images/drawings/8.JPG", alt: "Drawing 8" },
  { id: "10", src: "/images/drawings/10.JPG", alt: "Drawing 10" },
  { id: "11", src: "/images/drawings/11.JPG", alt: "Drawing 11" },
  { id: "12", src: "/images/drawings/12.JPG", alt: "Drawing 12" },
  { id: "13", src: "/images/drawings/13.PNG", alt: "Drawing 13" },
  { id: "14", src: "/images/drawings/14.JPG", alt: "Drawing 14" },
  { id: "15", src: "/images/drawings/15.JPG", alt: "Drawing 15" },
  { id: "16", src: "/images/drawings/16.JPG", alt: "Drawing 16" },
  { id: "17", src: "/images/drawings/17.JPG", alt: "Drawing 17" },
  { id: "18", src: "/images/drawings/18.JPG", alt: "Drawing 18" },
  { id: "19", src: "/images/drawings/19.JPG", alt: "Drawing 19" },
  { id: "20", src: "/images/drawings/20.JPG", alt: "Drawing 20" },
  { id: "21", src: "/images/drawings/21.JPG", alt: "Drawing 21" },
  { id: "22", src: "/images/drawings/22.jpg", alt: "Drawing 22" },
  { id: "23", src: "/images/drawings/23.jpg", alt: "Drawing 23" },
  { id: "24", src: "/images/drawings/24.jpg", alt: "Drawing 24" },
];

function DrawingImage({
  drawing,
  onOpen,
}: {
  drawing: SketchDrawing;
  onOpen: (drawing: SketchDrawing) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <button
      type="button"
      onClick={() => onOpen(drawing)}
      className="group relative block w-full overflow-hidden border-0 bg-transparent p-0 text-left"
      aria-label={`Open ${drawing.alt}`}
    >
      <Image
        src={drawing.src}
        alt={drawing.alt}
        width={400}
        height={500}
        className={`h-auto w-full transition duration-300 group-hover:scale-[1.015] group-hover:opacity-90 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center min-h-48">
          <span className="opacity-40 text-xs uppercase font-mono">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
}

export default function SketchesPage() {
  const [selectedDrawing, setSelectedDrawing] = useState<SketchDrawing | null>(
    null
  );
  const [isSoundtrackPlaying, setIsSoundtrackPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const pageAudioRef = useRef<HTMLAudioElement | null>(null);
  const { playSound } = useSoundDesign();

  const openDrawing = useCallback((drawing: SketchDrawing) => {
    playSound("paper-open");
    setSelectedDrawing(drawing);
  }, [playSound]);

  const closeDrawing = useCallback(() => {
    setSelectedDrawing(null);
  }, []);

  const startPageAudio = useCallback(() => {
    const audio = pageAudioRef.current;
    if (!audio) return;

    void audio.play().then(() => setIsSoundtrackPlaying(true));
  }, []);

  const stopPageAudio = useCallback(() => {
    const audio = pageAudioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsSoundtrackPlaying(false);
  }, []);

  const updateVolume = useCallback((nextVolume: number) => {
    const audio = pageAudioRef.current;

    setVolume(nextVolume);

    if (audio) {
      audio.volume = nextVolume;
    }
  }, []);

  useEffect(() => {
    const audio = new Audio("/sounds/up-we-go_7543367.mp3");
    audio.volume = 0.35;
    audio.preload = "auto";
    pageAudioRef.current = audio;

    void audio
      .play()
      .then(() => setIsSoundtrackPlaying(true))
      .catch(() => setIsSoundtrackPlaying(false));

    return () => {
      audio.pause();
      audio.currentTime = 0;
      pageAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selectedDrawing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawing();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDrawing, selectedDrawing]);

  return (
    <>
      <Head>
        <title>{`Sketches — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout
        contentClassName="relative z-10 mx-auto w-full max-w-none"
        enableSoundEffects={false}
      >
        <div>
          <article>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,1fr)] lg:items-start">
              <div>
                <div className="item-header-box">
                  <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
                    2024.03.11 / Art / Pencil / pen
                  </p>
                  <h1 className={`${itemTitleClassName} item-title`}>Sketches</h1>
                </div>

                <p className="leading-relaxed text-base max-w-prose mb-4">
                  Mostly sketches done when I need a break from the screen. Wanna join me? Draw something!
                </p>
              </div>

              <div className="space-y-5 lg:pt-6">
                <SketchPageCanvas disabled={Boolean(selectedDrawing)} />

                <div className="max-w-md bg-(--page-bg)/80 px-0 py-2 font-mono text-xs uppercase leading-none backdrop-blur-sm lg:ml-auto lg:text-right">
                  <p className="mb-2 opacity-70">Now Playing</p>
                  <p className="mb-3 text-sm sm:text-base">
                    Carry On <span className="opacity-50">by</span> eeryskies
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={startPageAudio}
                      className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none ${
                        isSoundtrackPlaying ? "opacity-50" : ""
                      }`}
                    >
                      Play
                    </button>
                    <span className="opacity-40">/</span>
                    <button
                      type="button"
                      onClick={stopPageAudio}
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
                        onChange={(event) =>
                          updateVolume(Number(event.target.value))
                        }
                        className="w-24 accent-(--color-poster-blue)"
                        aria-label="Soundtrack volume"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="columns-2 gap-3 mt-10 md:columns-3 xl:columns-4 2xl:columns-5">
              {drawings.map((item) => (
                <div key={item.id} className="mb-3 break-inside-avoid">
                  <DrawingImage drawing={item} onOpen={openDrawing} />
                </div>
              ))}
            </div>
          </article>

          <SketchImageModal drawing={selectedDrawing} onClose={closeDrawing} />
        </div>
      </ItemPageLayout>
    </>
  );
}
