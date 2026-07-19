import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function DearlyPage() {
  return (
    <>
      <Head>
        <title>{`dearly — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout contentClassName="relative z-10 mx-auto w-full max-w-[min(100%,1600px)]">
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.07.19 / Web App / Community mailboxes
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>dearly</h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A place to create a mailbox for someone you care about, then share
            its link so friends, family, and community members can leave
            messages for them.
          </p>

          <p className="leading-relaxed text-base max-w-prose mb-8">
            Visitors can look up a mailbox by name, discover a random public
            mailbox, or create and manage one of their own.
          </p>

          <div className="module-box mb-8 overflow-hidden">
            <iframe
              src="https://dearly.blog/"
              title="dearly live website preview"
              className="h-[100vh] min-h-[840px] w-full border border-current"
              loading="lazy"
            />
          </div>

          <ItemActions
            primary={{
              href: "https://dearly.blog/",
              label: "Visit site",
            }}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
