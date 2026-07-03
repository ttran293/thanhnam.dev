import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function WsryltV2Page() {
  return (
    <>
      <Head>
        <title>{`What song are you listening to? — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.05.24 / Web App / Music sharing / Next.js
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              What song are you listening to?
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A rewrite of the original music blog — a small social app for sharing
            what you&apos;re listening to, built with Next.js, MongoDB, and
            NextAuth.
          </p>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            Same idea as before: answer the question people ask each other all
            the time. This version adds typed API routes, session-based auth,
            and embedded YouTube playback via react-player.
          </p>

          <ItemActions
            primary={{
              href: "https://wsrylt.vercel.app/",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/wsrylt",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
