import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function PronunciationAppPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{`Did I pronounce that right? — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2025.05.15 / School Project / CS673 — Natural Language Processing
              / Automatic Speech Recognition
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Did I pronounce that right?
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A pronunciation practice app — Help ESL learners improve
            pronunciation by repeating reference audio and receiving instant
            feedback on sounds, IPA, and stress duration.
          </p>
          <p className="leading-relaxed text-base max-w-prose mb-4">
            The project was voted the second best project in the class.
          </p>

          <div className="mb-8 w-full max-w-3xl module-box p-0 overflow-hidden">
            <Image
              src="/images/projects/cs673-pronunciation-poster.png"
              alt="CS673 project poster — Did I pronounce that right?"
              width={3400}
              height={2200}
              className={`w-full h-auto object-cover transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </div>

          <ItemActions
            primary={{
              href: "https://practice-english-pronunciation-app.vercel.app",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/practice-english-pronunciation-app",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
