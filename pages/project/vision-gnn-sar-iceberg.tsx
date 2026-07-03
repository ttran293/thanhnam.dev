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
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.05.15 / Research Projects / CS675 / Group project / Computer
              vision
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Adapting Vision GNN SAR Iceberg Imagery Classification
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A group project for CS675 — we explored Vision Graph Neural Networks
            (ViG) for patch-level classification on Antarctic SAR imagery.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">Abstract</h2>
            <p className="leading-relaxed text-base">
              Increasing our understanding of iceberg and glacier processes —
              calving, drifting, fragmentation, and melting — is essential to
              climate science, improved climate modeling, and iceberg dynamics.
              These processes provide indicators of global temperature shifts,
              sea level rise, and ecosystem changes.
            </p>
            <p className="leading-relaxed text-base">
              Synthetic Aperture Radar (SAR) has become a widely used tool for
              monitoring these phenomena due to its ability to capture
              high-resolution images regardless of weather or lighting
              conditions. Recent advances in deep learning have enabled
              automated analysis of SAR imagery, with Convolutional Neural
              Networks (CNNs) commonly used for detection and classification.
              However, CNNs are inherently limited by their grid-based
              structure, which may not fully capture the irregular spatial
              relationships present in SAR imagery.
            </p>
            <p className="leading-relaxed text-base">
              Vision Graph Neural Networks (ViG) provide an alternative by
              representing images as graphs of interconnected patches, allowing
              more flexible modeling of spatial dependencies. In this work, we
              investigate whether ViG can effectively perform patch-level
              classification on Antarctic SAR imagery and create a foundation
              for future work in understanding iceberg dynamics.
            </p>
            <p className="leading-relaxed text-base">
              <a
                href="https://github.com/olipat/SARViG"
                target="_blank"
                rel="noopener noreferrer"
              >
                SARViG repository ↗︎
              </a>
            </p>
          </section>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">Training strategies</h2>
            <p className="leading-relaxed text-base">
              We compared two ways to adapt the same ImageNet-pretrained ViG
              model for dense patch-level classification — same architecture,
              same grid of per-cell class predictions, only the training
              pipeline differed. The Baseline fine-tunes directly on labeled SAR
              patches with cross-entropy loss, learning SAR-specific features
              from supervision alone. The Deluxe strategy adds a self-supervised
              pretraining stage on unlabeled SAR data first, using a pixel
              reconstruction objective (MSE) to nudge the model toward SAR
              texture and intensity patterns, then runs the same supervised
              fine-tuning step. The idea is to separate representation learning
              from class discrimination — though reconstruction can favor pixel
              fidelity over semantic separation, which may hurt when classes
              like ice and ocean look visually similar.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-medium mb-3">Report</h2>
            <div className="w-full max-w-3xl module-box p-0 overflow-hidden">
              <iframe
                src="/images/paper/CS675-report.pdf"
                title="CS675 report — Adapting Vision GNN SAR Iceberg Imagery Classification"
                className="w-full h-[70vh] min-h-[480px] bg-white"
              />
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-base font-medium mb-3">Slides</h2>
            <div className="w-full max-w-3xl module-box p-0 overflow-hidden">
              <iframe
                src="/images/paper/CS675-slide.pdf"
                title="CS675 slides — Adapting Vision GNN SAR Iceberg Imagery Classification"
                className="w-full h-[70vh] min-h-[480px] bg-white"
              />
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
