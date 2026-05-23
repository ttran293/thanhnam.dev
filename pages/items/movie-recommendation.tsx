import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function MovieRecommendationPage() {
  return (
    <>
      <Head>
        <title>{`MiniBERT4Rec + MF — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2025.05.18 / School Project / CMSC678 / ML
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              MiniBERT4Rec + MF
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A movie recommendation system for CMSC678 — combines a BERT-style
            sequential transformer with Matrix Factorization in a hybrid model,
            trained and evaluated on MovieLens.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              The project implements both MiniBERT4Rec and an MF + BERT hybrid,
              evaluates with Hit@K and NDCG@K, and logs experiments for a course
              paper.
            </p>
          </section>

          <div className="mb-4 w-full max-w-3xl module-box p-0 overflow-hidden">
            <iframe
              src="/images/paper/CS678-paper.pdf"
              title="CMSC678 course paper — MiniBERT4Rec + MF"
              className="w-full h-[70vh] min-h-[480px] bg-white"
            />
          </div>

          <ItemActions
            primary={{
              href: "/images/paper/CS678-paper.pdf",
              label: "Open paper",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/cmsc678-mf-minibert4rec",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
