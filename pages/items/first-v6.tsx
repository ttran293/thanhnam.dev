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

export default function FirstV6Page() {
  return (
    <>
      <Head>
        <title>{`First V6 — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2024.10.15 / Rock Climb / Indoor bouldering / V6
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>First V6</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            My first V6 — hardest grade I&apos;ve sent so far.
          </p>
          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              Despite the holds are good, the climb consists of long sequences of powerful 'pull up' moves. 
            </p>
          </section>

          <YouTubeEmbed videoId="351RK0g-jFE" title="First V6 send" />
        </article>
      </ItemPageLayout>
    </>
  );
}
