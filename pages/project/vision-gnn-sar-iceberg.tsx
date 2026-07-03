import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function VisionGnnSarIcebergPage() {
  return (
    <>
      <Head>
        <title>{`Adapting Vision GNN SAR Iceberg Imagery Classification — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout contentClassName="relative z-10 mx-auto w-full max-w-[min(100%,1600px)]">
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.05.15 / Research Projects / Group project / Computer vision
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Adapting Vision GNN SAR Iceberg Imagery Classification
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-8">
            A group project for CS675 — we explored Vision Graph Neural Networks
            (ViG) for patch-level classification on Antarctic SAR imagery.
          </p>

          <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="min-w-0">
              <h2 className="text-base font-medium mb-3">Report</h2>
              <div className="w-full module-box p-0 overflow-hidden">
                <iframe
                  src="/images/paper/CS675-report.pdf"
                  title="CS675 report — Adapting Vision GNN SAR Iceberg Imagery Classification"
                  className="w-full h-[70vh] min-h-[400px] bg-white"
                />
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-medium mb-3">Presentation</h2>
              <div className="w-full module-box p-0 overflow-hidden">
                <iframe
                  src="/images/paper/CS675-slide.pdf"
                  title="CS675 slides — Adapting Vision GNN SAR Iceberg Imagery Classification"
                  className="w-full h-[70vh] min-h-[400px] bg-white"
                />
              </div>
            </div>
          </section>

          <ItemActions
            primary={{
              href: "/images/paper/CS675-report.pdf",
              label: "Open report",
            }}
            secondary={[
              {
                href: "/images/paper/CS675-slide.pdf",
                label: "Open slides",
              },
              {
                href: "https://github.com/olipat/SARViG",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
