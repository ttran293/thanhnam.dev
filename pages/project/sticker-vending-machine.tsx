import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function StickerVendingMachinePage() {
  return (
    <>
      <Head>
        <title>{`Sticker Vending Machine - Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.06.14 / Web App / Sticker shop / Next.js
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Sticker Vending Machine
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A playful web project for browsing and collecting sticker designs,
            shaped around the feeling of walking up to a little vending machine
            and seeing what it has waiting inside.
          </p>

          <div className="module-box mb-8 mt-8 overflow-hidden">
            <iframe
              src="https://mystickervendingmachine.com/"
              title="Sticker Vending Machine live website preview"
              className="h-[100vh] min-h-[840px] w-full border border-current"
              loading="lazy"
            />
          </div>

          <ItemActions
            primary={{
              href: "https://mystickervendingmachine.com/",
              label: "Visit site",
            }}
            secondary={[
              {
                href: "https://github.com/ttran293/sticker-vending-machine",
                label: "GitHub",
              },
            ]}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
