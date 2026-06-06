import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function SkewHeapPriorityQueuePage() {
  return (
    <>
      <Head>
        <title>{`Skew Heap Priority Queue — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2020.12.16 / School Project / CMSC341 / C++
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Skew Heap Priority Queue
            </h1>
          </div>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">Objective</h2>
            <p className="leading-relaxed text-base">
              Develop C++ programming abilities using object-oriented design,
              dynamic memory allocation, array manipulation, iterators, and
              exceptions.
            </p>
          </section>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">Concept</h2>
            <p className="leading-relaxed text-base">
              Implement a skew heap, an advanced heap data structure. The
              project was also practice in constructing and using binary trees
              and working with function pointers.
            </p>
            <p className="leading-relaxed text-base">Result: 100/100.</p>
          </section>

          <ItemActions
            primary={{
              href: "https://github.com/ttran293/Skew-Heap-Priority-Queue",
              label: "GitHub",
            }}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
