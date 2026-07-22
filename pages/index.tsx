import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  type Filter,
  filterLabels,
  formatShowcaseDate,
  getItemHref,
  getSortedShowcaseItems,
} from "../data/showcaseItems";
import { useSoundDesign } from "../hooks/useSoundDesign";
import { useTheme } from "../hooks/useTheme";

const filters: { id: Filter | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-app", label: filterLabels["web-app"] },
  { id: "art", label: filterLabels.art },
  { id: "rock-climb", label: filterLabels["rock-climb"] },
  { id: "school", label: filterLabels.school },
  { id: "research", label: filterLabels.research },
];

const categoryFilters = filters.filter(
  (filter): filter is { id: Filter; label: string } => filter.id !== "all"
);

const showcaseTitleArrow = (external: boolean) => (
  <span className="ml-2 inline-block shrink-0 translate-x-[-0.15em] whitespace-nowrap opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
    {external ? "↗︎" : "→"}
  </span>
);

function ShowcaseItemTitle({
  name,
  external = false,
}: {
  name: string;
  external?: boolean;
}) {
  const arrow = showcaseTitleArrow(external);
  const lastSpace = name.lastIndexOf(" ");

  if (lastSpace === -1) {
    return (
      <span className="whitespace-nowrap">
        {name}
        {arrow}
      </span>
    );
  }

  return (
    <>
      {name.slice(0, lastSpace + 1)}
      <span className="whitespace-nowrap">
        {name.slice(lastSpace + 1)}
        {arrow}
      </span>
    </>
  );
}

const easeOut = [0.22, 1, 0.36, 1] as const;

function useHomeMotion(reduceMotion: boolean | null) {
  const enabled = reduceMotion !== true;

  const fadeUp = {
    hidden: enabled ? { opacity: 0, y: 14 } : {},
    visible: enabled
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: easeOut },
        }
      : {},
  };

  const fadeIn = {
    hidden: enabled ? { opacity: 0 } : {},
    visible: enabled
      ? {
          opacity: 1,
          transition: { duration: 0.35, ease: easeOut },
        }
      : {},
  };

  const slideInRight = {
    hidden: enabled ? { opacity: 0, x: 16 } : {},
    visible: enabled
      ? {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: easeOut },
        }
      : {},
  };

  const stagger = {
    hidden: {},
    visible: enabled
      ? {
          transition: { staggerChildren: 0.07, delayChildren: 0.08 },
        }
      : {},
  };

  const staggerFast = {
    hidden: {},
    visible: enabled
      ? {
          transition: { staggerChildren: 0.04, delayChildren: 0.02 },
        }
      : {},
  };

  return { enabled, fadeUp, fadeIn, slideInRight, stagger, staggerFast };
}

const Home: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState<Filter | "all">("all");
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled, toggleSound } = useSoundDesign();
  const reduceMotion = useReducedMotion();
  const { enabled, fadeUp, fadeIn, slideInRight, stagger, staggerFast } =
    useHomeMotion(reduceMotion);
  const allItems = getSortedShowcaseItems("all");
  const visibleItems = getSortedShowcaseItems(activeFilter);
  const activeFilterLabel =
    filters.find((filter) => filter.id === activeFilter)?.label ?? "All";
  const hasActiveFilters = activeFilter !== "all";

  const toggleFilter = (filter: Filter) => {
    playSound(activeFilter === filter ? "clear" : filter);
    setActiveFilter((current) => (current === filter ? "all" : filter));
  };

  const clearFilter = () => {
    if (hasActiveFilters) {
      playSound("clear");
    }

    setActiveFilter("all");
  };

  const filterButtonClass = (filter: Filter) =>
    `interactive-link bg-transparent border-0 p-0 cursor-pointer text-left ${
      activeFilter === filter ? "filter-active" : ""
    }`;

  const themeToggle = (
    <button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      onClick={() => {
        playSound("theme");
        toggleTheme();
      }}
      className="interactive-link bg-transparent border-0 p-0 cursor-pointer leading-snug"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );

  const soundToggle = (
    <button
      type="button"
      aria-label={`${soundEnabled ? "Disable" : "Enable"} interface sounds`}
      aria-pressed={soundEnabled}
      onClick={toggleSound}
      className="interactive-link bg-transparent border-0 p-0 cursor-pointer leading-snug"
    >
      Sound {soundEnabled ? "On" : "Off"}
    </button>
  );

  const topControls = (
    <motion.div
      className="flex items-center gap-4"
      initial={enabled ? { opacity: 0, y: -6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOut, delay: enabled ? 0.05 : 0 }}
    >
      {soundToggle}
      {themeToggle}
    </motion.div>
  );

  const itemCount = (
    <motion.span
      key={visibleItems.length}
      initial={enabled ? { opacity: 0, y: 4 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: easeOut }}
    >
      {visibleItems.length} items
    </motion.span>
  );

  const renderAnimatedFilterCrumb = () => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={activeFilter}
        initial={enabled ? { opacity: 0, y: 6 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={enabled ? { opacity: 0, y: -4 } : undefined}
        transition={{ duration: 0.2, ease: easeOut }}
        className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1"
      >
        <span>#</span>
        {!hasActiveFilters ? (
          <span>All</span>
        ) : (
          <>
            <button
              type="button"
              onClick={clearFilter}
              className="interactive-link bg-transparent border-0 p-0 cursor-pointer leading-snug"
            >
              All
            </button>
            <span>/</span>
            <span>{activeFilterLabel}</span>
            <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
              <span>·</span>
              <button
                type="button"
                onClick={clearFilter}
                className="interactive-link bg-transparent border-0 p-0 cursor-pointer leading-snug opacity-60"
              >
                Clear
              </button>
            </span>
          </>
        )}
      </motion.p>
    </AnimatePresence>
  );

  const filterBar = (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-2">
      {renderAnimatedFilterCrumb()}
      {itemCount}
    </div>
  );

  return (
    <div className="home-page page-texture min-h-screen px-6 py-8 sm:px-10 sm:py-10 md:px-14 lg:px-20 lg:py-5 xl:px-28 2xl:px-36">
      <div className="relative z-10 mx-auto w-full max-w-[1700px] lg:min-h-[calc(100vh-2.5rem)]">
        <div className="theme-blue-muted text-sm sm:text-base font-medium leading-snug lg:hidden">
          <div className="flex justify-end pt-4">{topControls}</div>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0 lg:items-start">
          <div className="hidden lg:flex lg:col-start-1 lg:justify-end lg:items-center lg:pr-12 xl:pr-16 2xl:pr-20 theme-blue-muted text-sm font-medium leading-snug pt-4">
            {topControls}
          </div>
          <div className="hidden lg:flex lg:col-start-2 lg:items-center lg:pl-0 lg:pr-4 xl:pr-6 theme-blue-muted text-sm font-medium leading-snug pt-4 w-full">
            <motion.div
              className="w-full"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              {filterBar}
            </motion.div>
          </div>

          {/* Left panel */}
          <div className="lg:sticky lg:top-5 lg:col-start-1 lg:row-start-2 lg:self-start lg:pr-12 xl:pr-16 2xl:pr-20 pt-8 lg:pt-6">
            <motion.div
              className="max-w-2xl lg:max-w-none lg:pr-6 xl:pr-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.section className="section-module mb-4" variants={fadeUp}>
                <motion.h1
                  className="poster-blue text-[clamp(2.75rem,12vw,4.5rem)] lg:text-[clamp(3.25rem,5.5vw,4.25rem)] font-semibold tracking-tight leading-[1.05] mb-5 lg:mb-4 max-w-[12ch] cursor-help"
                  title="/tʰajŋ nam/"
                  onMouseEnter={() => playSound("name")}
                  variants={fadeUp}
                  whileHover={
                    enabled ? { scale: 1.01, transition: { duration: 0.2 } } : undefined
                  }
                >
                  Thanh Nam
                </motion.h1>
                <h2 className="home-section-title mb-3">
                  About
                </h2>
                <p className="leading-relaxed mb-4 text-base lg:text-[1.0625rem]">
                  I&apos;m a Software Developer at{" "}
                  <a
                    href="https://mediacy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("external")}
                  >
                    Media Cybernetics Inc. ↗︎
                  </a>{" "}
                  and a Graduate Student and{" "}
                  <a
                    href="https://umbc.edu/global/ask-a-student/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("external")}
                  >
                    Global Ambassador ↗︎
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.umbc.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("external")}
                  >
                    UMBC ↗︎
                  </a>
                  .
                </p>
                <p className="leading-relaxed text-base lg:text-[1.0625rem]">
                  I like to build things that answer questions and connect people.
                </p>
              </motion.section>

              <motion.section className="section-module mb-4" variants={fadeUp}>
                <h2 className="home-section-title mb-4">
                  What I&apos;ve been working on
                </h2>
                <motion.ul
                  className="text-base lg:text-[1.0625rem] grid grid-cols-2 gap-x-8 gap-y-1"
                  variants={staggerFast}
                >
                  {categoryFilters.map(({ id, label }) => (
                    <motion.li key={id} variants={fadeIn}>
                      <button
                        type="button"
                        aria-pressed={activeFilter === id}
                        onClick={() => toggleFilter(id)}
                        onMouseEnter={() => playSound("hover")}
                        className={filterButtonClass(id)}
                      >
                        {label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>

              <motion.section className="section-module mb-4" variants={fadeUp}>
                <h2 className="home-section-title mb-4">
                  Contact me
                </h2>
                <motion.ul
                  className="text-base lg:text-[1.0625rem] grid grid-cols-2 gap-x-8 gap-y-1"
                  variants={staggerFast}
                >
                  <motion.li variants={fadeIn}>
                    <a
                      href="mailto:ttran19@umbc.edu"
                      onClick={() => playSound("external")}
                    >
                      Email me ↗︎
                    </a>
                  </motion.li>
                  <motion.li variants={fadeIn}>
                    <a
                      href="https://github.com/ttran293"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      GitHub ↗︎
                    </a>
                  </motion.li>
                  <motion.li variants={fadeIn}>
                    <a
                      href="https://linkedin.com/in/thanh-nam-tran-9bbb921b3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      LinkedIn ↗︎
                    </a>
                  </motion.li>
                  <motion.li variants={fadeIn}>
                    <a
                      href="https://github.com/ttran293/ttran293/blob/main/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      Resume ↗︎
                    </a>
                  </motion.li>
                </motion.ul>
              </motion.section>

              <motion.p className="text-xs opacity-50 lg:mb-0" variants={fadeIn}>
                Updated July 19, 2026
              </motion.p>
            </motion.div>
          </div>

          {/* Right panel */}
          <motion.div
            className="mt-8 lg:mt-0 lg:col-start-2 lg:row-start-2 lg:flex lg:flex-col lg:pl-0 min-h-[40vh]"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={enabled ? { delay: 0.12 } : undefined}
          >
            <div className="relative flex-1 min-h-[40vh] py-0 lg:pt-6 lg:pr-4 xl:pr-6">
              <div className="theme-blue-muted text-sm sm:text-base font-medium leading-snug mb-8 sm:mb-10 lg:hidden">
                <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-6">
                  {renderAnimatedFilterCrumb()}
                  {itemCount}
                </div>
              </div>
              <nav>
                <motion.div
                    className="module-box mb-6 lg:mb-8 cursor-help"
                    title="What should I work on next?"
                    onMouseEnter={() => playSound("mystery")}
                    initial={enabled ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: easeOut, delay: 0.2 }}
                    whileHover={
                      enabled
                        ? { x: 4, transition: { type: "spring", stiffness: 320, damping: 24 } }
                        : undefined
                    }
                  >
                    <div className="showcase-row grid grid-cols-[2.75rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,1fr)] gap-3 sm:gap-4 lg:gap-5 items-start">
                      <span className="showcase-row-index theme-blue-meta text-base sm:text-lg lg:text-xl font-semibold opacity-70">
                        ??
                      </span>
                      <span className="showcase-row-title theme-blue-soft text-[clamp(1.5rem,5.5vw,2.25rem)] sm:text-[clamp(1.625rem,4.5vw,2.5rem)] lg:text-[clamp(1.75rem,3vw,2.75rem)] font-medium tracking-tight wrap-break-word">
                        ??????
                      </span>
                    </div>
                  </motion.div>

                <div className="space-y-0">
                  {visibleItems.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={enabled ? { opacity: 0, y: 8 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="text-sm sm:text-base opacity-60 max-w-prose py-4"
                    >
                      No items match this filter yet.{" "}
                      <button
                        type="button"
                        onClick={clearFilter}
                        onMouseEnter={() => playSound("hover")}
                        className="interactive-link bg-transparent border-0 p-0 cursor-pointer"
                      >
                        View all
                      </button>
                    </motion.p>
                  ) : (
                    <AnimatePresence initial={enabled} mode="popLayout">
                      {visibleItems.map((item, index) => {
                        const formattedDate = formatShowcaseDate(item.createdAt);
                        const itemIndex = allItems.findIndex(
                          (entry) => entry.id === item.id
                        );
                        const itemNumber = String(
                          allItems.length - itemIndex
                        ).padStart(2, "0");
                        const isLast = index === visibleItems.length - 1;
                        const rowColorClass = item.archived
                          ? "showcase-row-archived"
                          : "";

                        return (
                          <motion.div
                            key={item.id}
                            layout={enabled}
                            initial={enabled ? { opacity: 0, y: 16 } : false}
                            animate={{ opacity: 1, y: 0 }}
                            exit={enabled ? { opacity: 0, y: -10 } : undefined}
                            transition={{
                              duration: enabled ? 0.28 : 0,
                              ease: easeOut,
                              delay: enabled ? index * 0.035 : 0,
                            }}
                            whileHover={
                              enabled
                                ? {
                                    x: 6,
                                    transition: {
                                      type: "spring",
                                      stiffness: 380,
                                      damping: 28,
                                    },
                                  }
                                : undefined
                            }
                            className={isLast ? "py-1" : "showcase-divider py-1"}
                          >
                            {(() => {
                              const rowClassName = `showcase-row ${rowColorClass} group grid grid-cols-[2.75rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,1fr)] gap-3 sm:gap-4 lg:gap-5 items-start no-underline`;
                              const rowContent = (
                                <>
                                  <span className="showcase-row-index flex items-start gap-1">
                                    <span className="theme-blue-meta text-base sm:text-lg lg:text-xl font-semibold opacity-70 group-hover:opacity-100">
                                      {itemNumber}
                                    </span>
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex flex-wrap items-start gap-x-3 gap-y-2">
                                      <span className="showcase-row-title theme-blue-soft text-[clamp(1.5rem,5.5vw,2.25rem)] sm:text-[clamp(1.625rem,4.5vw,2.5rem)] lg:text-[clamp(1.75rem,3vw,2.75rem)] font-medium tracking-tight wrap-break-word">
                                        <ShowcaseItemTitle
                                          name={item.name}
                                          external={Boolean(item.externalUrl)}
                                        />
                                      </span>
                                      {item.archived && (
                                        <span className="showcase-badge">
                                          Archived
                                        </span>
                                      )}
                                    </span>
                                    <span className="home-meta theme-blue-meta mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm opacity-55 group-hover:opacity-75">
                                      <span>{formattedDate}</span>
                                      <span>/</span>
                                      <span>{item.tag}</span>
                                      <span>/</span>
                                      <span>{item.meta}</span>
                                    </span>
                                  </span>
                                </>
                              );

                              if (item.externalUrl) {
                                return (
                                  <a
                                    href={item.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => playSound("external")}
                                    onMouseEnter={() => playSound("hover")}
                                    className={rowClassName}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {rowContent}
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  href={getItemHref(item.id)}
                                  onClick={() => playSound("navigate")}
                                  onMouseEnter={() => playSound("hover")}
                                  className={rowClassName}
                                  style={{ textDecoration: "none" }}
                                >
                                  {rowContent}
                                </Link>
                              );
                            })()}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
