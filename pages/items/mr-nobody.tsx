import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function MrNobodyPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{`Mr. Nobody — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2024.04.12 / School Project / Interactive fiction / AI
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>Mr. Nobody</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A browser-based interactive fiction game where your choices shape
            the story — built for CS691 (Interactive Fiction and Text
            Generation) at UMBC.
          </p>
          <p className="leading-relaxed text-base max-w-prose mb-4">
            The project was voted the best project in the class.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              I wanted to explore what happens when classic choose-your-own-adventure
              structure meets modern LLMs. The hook is simple: you&apos;re Mr.
              Nobody, and every decision nudges the narrative in a different
              direction — sometimes predictable, sometimes not.
            </p>
            <p className="leading-relaxed text-base">
              The project was a chance to learn how to prompt, constrain, and
              present generated text in a game loop that still feels intentional.
            </p>
          </section>

          <div className="mb-8 w-full max-w-lg module-box p-0 overflow-hidden">
            <Image
              src="/images/projects/mr-nobody-game.png"
              alt="Mr. Nobody"
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
              href: "https://mr-nobody-game.vercel.app",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/mr-nobody-game",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
