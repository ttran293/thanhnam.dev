import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function AdjacencyListsPage() {
  return (
    <>
      <Head>
        <title>{`Adjacency Lists — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2020.12.16 / School Project / CMSC341 / C++
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Adjacency Lists
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
              Understand graphs and the adjacency list representation of a graph,
              then implement that representation in C++. The project also covered
              dynamically resized arrays.
            </p>
            <p className="leading-relaxed text-base">Result: 100/100.</p>
          </section>

          <ItemActions
            primary={{
              href: "https://github.com/ttran293/Adjacency-Lists",
              label: "GitHub",
            }}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
