import Head from "next/head";
import ItemActions from "../../components/ItemActions";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

export default function NeuralNetworksPage() {
  return (
    <>
      <Head>
        <title>{`Neural Networks — Thanh Nam`}</title>
      </Head>
      <ItemPageLayout>
        <article>
          <div className="item-header-box">
            <p className="item-meta">
              2026.07.05 / School Project / Neural networks / Python
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Neural Networks
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-4">
            A hands-on notebook series created from my CMSC 475/675 Neural
            Networks course notes. It follows the development of neural network
            architectures from the perceptron through modern mixture-of-experts
            systems.
          </p>

          <section className="max-w-prose mb-8 space-y-4">
            <p className="leading-relaxed text-base">
              Each topic has its own guide and Jupyter notebook, with examples
              covering MLPs, CNNs, recurrent networks, autoencoders, GANs,
              transformers, diffusion models, and supporting ideas such as
              optimization and regularization.
            </p>
            <p className="leading-relaxed text-base">
              The series is organized as a learning path, making it possible to
              work through the architectures in order or use an individual
              notebook as a focused reference.
            </p>
          </section>

          <ItemActions
            primary={{
              href: "https://github.com/ttran293/neural-networks",
              label: "View notebooks",
            }}
          />
        </article>
      </ItemPageLayout>
    </>
  );
}
