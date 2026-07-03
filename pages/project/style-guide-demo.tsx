import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function StyleGuideDemoPage() {
  return (
    <>
      <Head>
        <title>{`A Company UX/UI Style Guide Template — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.05.27 / Web App / Design system / Vite
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              A Company UX/UI Style Guide Template
            </h1>
          </div>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">What this project is</h2>
            <p className="leading-relaxed text-base">
              The Company Style Guide is built as plain HTML and CSS, not as
              screenshots or design files. Every swatch, button, and layout
              example you see here is rendered from the same styles that define
              the system. That makes this site the visual source of truth for
              designers and developers.
            </p>
            <ul className="text-base leading-relaxed space-y-2">
              <li>
                Foundations — color, typography, spacing, shape, elevation, and
                related basics.
              </li>
              <li>
                Interactive controls — buttons, forms, inputs, and feedback
                patterns.
              </li>
              <li>
                Layout, navigation &amp; overlays — panels, lists, navbar,
                dialogs.
              </li>
              <li>
                UX principles &amp; standards — laws of UX, responsive design,
                accessibility.
              </li>
            </ul>
          </section>

          <ItemActions
            primary={{
              href: "https://style-guide-demo.vercel.app/",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/style-guide-demo",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
