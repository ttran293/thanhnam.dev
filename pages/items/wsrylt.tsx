import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function WsryltPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{`What's song are you listening to? — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2025.05.20 / Web App / Music sharing / MERN
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              What&apos;s song are you listening to?
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A small social music blog to share what songs you&apos;re listening
            to. The idea started from a simple question people ask each other
            all the time.
          </p>

          <div className="mb-8 w-full max-w-lg module-box p-0 overflow-hidden">
            <Image
              src="/images/projects/music-blog-homepage.png"
              alt="What's song are you listening to?"
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
              href: "https://wsrylt.herokuapp.com/",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/music-blog",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
