import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

const drawings = [
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

function DrawingImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full module-box p-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={500}
        className={`w-full h-auto transition-opacity duration-300 ${
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
    </div>
  );
}

export default function SketchesPage() {
  return (
    <>
      <Head>
        <title>{`Sketches — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2024.03.11 / Art / Pencil / pen
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>Sketches</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            Mostly sketches done when I need a break from the screen.
          </p>

          <div className="columns-2 md:columns-3 gap-2 mt-10">
            {drawings.map((item) => (
              <div key={item.id} className="mb-2 break-inside-avoid">
                <DrawingImage src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
        </article>
      </ItemPageLayout>
    </>
  );
}
