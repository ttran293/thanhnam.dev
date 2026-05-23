import Head from "next/head";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title?: string;
}) {
  return (
    <div className="relative w-full aspect-video module-box p-0 overflow-hidden mb-4">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

export default function V5IndoorPage() {
  return (
    <>
      <Head>
        <title>{`V5 Indoor — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2024.08.01 / Rock Climb / Indoor bouldering / V5
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>V5 Indoor</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A cool V5 that I sent. 
            It started out with a big throw and catch that requires precise foot placement.
            Then, you need to work on a crimp and a pinch followed by a backflag.
            The end wasn't too bad.
          </p>

          <YouTubeEmbed videoId="UHjKLcKvXMQ" title="V5 Indoor send" />
        </article>
      </ItemPageLayout>
    </>
  );
}
