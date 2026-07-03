import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function TictactoeNasmPage() {
  return (
    <>
      <Head>
        <title>{`Tic Tac Toe NASM x86-64 — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2020.12.19 / School Project / NASM x86-64 / C
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Tic Tac Toe NASM x86-64
            </h1>
          </div>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">What this project is</h2>
            <p className="leading-relaxed text-base">
              A command-line tic-tac-toe game built with NASM x86-64 assembly,
              with a small C helper for drawing the board.
            </p>
          </section>

          <section className="max-w-prose mb-8 space-y-4">
            <h2 className="text-base font-medium">Concept</h2>
            <p className="leading-relaxed text-base">
              The game uses a 4x4 board where the human player goes first as
              <span> x</span>, and the computer responds as
              <span> o</span>. It includes menu-driven easy
              and hard modes: easy mode picks a random open spot, while hard mode
              scans for a possible human win and blocks it before choosing a move.
            </p>
          </section>

          <ItemActions
            primary={{
              href: "https://github.com/ttran293/tictactoe-nasmx86-64",
              label: "GitHub",
            }}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
