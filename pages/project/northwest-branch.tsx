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

export default function NorthwestBranchPage() {
  return (
    <>
      <Head>
        <title>{`Northwest Branch — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2024.11.09 / Rock Climb / Outdoor bouldering / Maryland
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Northwest Branch
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            Outdoor bouldering at Northwest Branch — a creek-side spot in
            Montgomery County.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              I climbed here in late 2023 and sent a couple of outdoor boulders.
            </p>
          </section>

          <YouTubeEmbed
            videoId="B0H3y-fP4R0"
            title="Northwest Branch outdoor bouldering"
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
