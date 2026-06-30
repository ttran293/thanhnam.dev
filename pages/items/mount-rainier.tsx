import Head from "next/head";
import Image from "next/image";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

const mountRainierImages = [
  {
    src: "alltrails-loop.png",
    alt: "Mount Rainier AllTrails loop map",
  },
  { src: "1.JPG", alt: "Mount Rainier hiking photo 1" },
  { src: "2.JPG", alt: "Mount Rainier hiking photo 2" },
  { src: "3.JPG", alt: "Mount Rainier hiking photo 3" },
  { src: "7.JPG", alt: "Mount Rainier hiking photo 4" },
  { src: "8.JPG", alt: "Mount Rainier hiking photo 5" },
  { src: "9.jpg", alt: "Mount Rainier hiking photo 6" },
  { src: "10.JPG", alt: "Mount Rainier hiking photo 7" },
];

export default function MountRainierPage() {
  return (
    <>
      <Head>
        <title>{`Mount Rainier - Thanh Nam`}</title>
      </Head>
      <ItemPageLayout contentClassName="relative z-10 mx-auto w-full max-w-none">
        <article>
          <div className="item-header-box max-w-[900px]">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wide opacity-60 mb-3">
              2026.06.29 / Hiking / National park / Washington
            </p>
            <h1 className={`${itemTitleClassName} item-title`}>
              Mount Rainier
            </h1>
          </div>

          <p className="leading-relaxed text-base max-w-prose mb-8">
            A hiking photo set from Mount Rainier.
          </p>

          <p className="leading-relaxed text-base max-w-prose mb-8">
            I&apos;ve always wanted to visit Seattle, especially to hike Mount
            Rainier. This year, I finally got the chance. The 5h 30m hike felt
            easy because I stopped every few minutes just to take in the
            view.
          </p>

          <div className="-mx-6 grid gap-2 sm:grid-cols-2 lg:-mx-14 lg:grid-cols-4 xl:-mx-24 2xl:-mx-32">
            {mountRainierImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[3/4] w-full overflow-hidden"
              >
                <Image
                  src={`/images/hiking/mtr/${image.src}`}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </article>
      </ItemPageLayout>
    </>
  );
}
