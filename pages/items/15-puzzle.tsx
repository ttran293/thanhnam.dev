import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function FifteenPuzzlePage() {
  const [loaded, setLoaded] = useState(false);
  const [inspirationLoaded, setInspirationLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{`15 Puzzle — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2025.12.31 / Web App / Sliding puzzle / React
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>15 Puzzle</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A browser-based sliding puzzle — sixteen squares, one empty slot, and
            a scrambled image you have to reassemble one move at a time. Instead
            of clip art, each board pulls from the National Gallery of Art&apos;s
            open collection, so every solve feels a little like putting a
            painting back together.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              The inspiration came from the classic 15 puzzle game toy that I
              played when I was a child.
            </p>
            
            <div className="w-full max-w-lg module-box p-0 overflow-hidden">
              <Image
                src="/images/projects/game-xep-hinh-1.jpg"
                alt="Classic sliding puzzle toy from childhood"
                width={600}
                height={800}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${
                  inspirationLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setInspirationLoaded(true)}
              />
            </div>
          </section>
          
          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              The goal is to recreate the experience of playing it. Not only
              just the look and feel, but also the sounds.
            </p>
          </section>
          <div className="mb-8 w-full max-w-lg module-box p-0 overflow-hidden">
            <Image
              src="/images/projects/15-puzzle.png"
              alt="15 Puzzle"
              width={600}
              height={400}
              className={`w-full h-auto object-cover transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </div>

          <ItemActions
            primary={{
              href: "https://15-puzzle-henna.vercel.app/",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/15-puzzle",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
