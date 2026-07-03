import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ItemPageLayout from "../../components/ItemPageLayout";
import { itemTitleClassName } from "../../data/showcaseItems";

type YosemiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const landscapeImages: YosemiteImage[] = [
  {
    src: "morning.jpg",
    alt: "Yosemite Valley in the morning",
    width: 4000,
    height: 1848,
  },
  {
    src: "20241003_100016.jpg",
    alt: "Meadow beneath granite cliffs",
    width: 4000,
    height: 1848,
  },
  {
    src: "20241003_113122.jpg",
    alt: "Yosemite peaks against blue sky",
    width: 4000,
    height: 1848,
  },
  {
    src: "sunset.jpg",
    alt: "Half Dome at sunset, Yosemite Valley",
    width: 4000,
    height: 1848,
  },
];

const portraitImages: YosemiteImage[] = [
  {
    src: "valley.jpg",
    alt: "Forest trail in Yosemite Valley",
    width: 1848,
    height: 4000,
  },
  {
    src: "20241003_154237.jpg",
    alt: "Giant sequoia looking upward",
    width: 1848,
    height: 4000,
  },
];

function imageSrc(image: YosemiteImage) {
  return `/images/hiking/yst/${image.src}`;
}

function YosemiteImageDialog({
  image,
  onClose,
}: {
  image: YosemiteImage | null;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [image?.src]);

  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 cursor-pointer p-5 backdrop-blur-sm sm:p-10"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--page-bg) 88%, transparent)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-current/15 bg-(--page-bg)/90 font-mono text-2xl leading-none backdrop-blur-sm"
          >
            ×
          </button>

          <div className="flex h-full w-full items-center justify-center">
            <motion.div
              className="relative inline-flex max-h-full max-w-full cursor-default"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-wide transition-opacity duration-200 ${
                  loaded ? "opacity-0" : "opacity-60"
                }`}
              >
                Loading image...
              </div>
              <Image
                src={imageSrc(image)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                unoptimized
                priority
                sizes="100vw"
                className={`block max-h-[calc(100vh-6rem)] max-w-[calc(100vw-2.5rem)] object-contain transition-opacity duration-300 sm:max-h-[calc(100vh-8rem)] sm:max-w-[calc(100vw-5rem)] ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryCell({
  image,
  priority = false,
  sizes,
  isActive,
  onOpen,
}: {
  image: YosemiteImage;
  priority?: boolean;
  sizes: string;
  isActive: boolean;
  onOpen: () => void;
}) {
  const aspect = image.width / image.height;

  return (
    <button
      type="button"
      aria-label={`View ${image.alt}`}
      aria-pressed={isActive}
      className="group h-full min-h-0 w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left"
      onClick={onOpen}
    >
      <figure className="h-full min-h-0">
        <div
          className="relative h-full max-h-full w-full transition duration-200 group-hover:opacity-90"
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={imageSrc(image)}
            alt={image.alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </figure>
    </button>
  );
}

export default function YosemitePage() {
  const [activeImage, setActiveImage] = useState<YosemiteImage | null>(null);

  const closeDialog = useCallback(() => {
    setActiveImage(null);
  }, []);

  const openImage = useCallback((image: YosemiteImage) => {
    setActiveImage(image);
  }, []);

  const renderCell = (
    image: YosemiteImage,
    options: { priority?: boolean; sizes: string }
  ) => (
    <GalleryCell
      image={image}
      priority={options.priority}
      sizes={options.sizes}
      isActive={activeImage?.src === image.src}
      onOpen={() => openImage(image)}
    />
  );

  return (
    <>
      <Head>
        <title>{`Yosemite - Thanh Nam`}</title>
      </Head>
      <ItemPageLayout
        contentClassName="relative z-10 mx-auto flex min-h-0 w-full max-w-none flex-1 flex-col"
        pageClassName="flex h-screen min-h-0 flex-col overflow-hidden !py-4 sm:!py-5 [&>div>div:first-child]:mb-3"
      >
        <article className="flex min-h-0 flex-1 flex-col">
          <header className="mb-2 flex shrink-0 flex-wrap items-end justify-between gap-x-4 gap-y-1 sm:mb-3">
            <div>
              <h1
                className={`${itemTitleClassName} item-title mb-0! text-[clamp(1.75rem,6vw,2.75rem)]!`}
              >
                Yosemite
              </h1>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-wide opacity-60 sm:text-xs">
                2024.10.03 · Hiking · National park · California
              </p>
            </div>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr_1.35fr] gap-1 sm:gap-1.5">
            <div className="min-h-0">
              {renderCell(portraitImages[0], { priority: true, sizes: "22vw" })}
            </div>
            <div className="min-h-0">
              {renderCell(portraitImages[1], { sizes: "22vw" })}
            </div>
            <div className="grid min-h-0 grid-rows-4 gap-1 sm:gap-1.5">
              {landscapeImages.map((image) => (
                <div key={image.src} className="min-h-0">
                  {renderCell(image, { sizes: "40vw" })}
                </div>
              ))}
            </div>
          </div>
        </article>

        <YosemiteImageDialog image={activeImage} onClose={closeDialog} />
      </ItemPageLayout>
    </>
  );
}
