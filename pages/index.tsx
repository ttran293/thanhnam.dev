import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import StarIcon from "../components/StarIcon";
import {
  type Filter,
  type StatusFilter,
  filterLabels,
  formatShowcaseDate,
  getItemHref,
  getSortedShowcaseItems,
  statusFilterLabels,
} from "../data/showcaseItems";
import { useSoundDesign } from "../hooks/useSoundDesign";
import { useTheme } from "../hooks/useTheme";

const filters: { id: Filter | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-app", label: filterLabels["web-app"] },
  { id: "art", label: filterLabels.art },
  { id: "rock-climb", label: filterLabels["rock-climb"] },
  { id: "school", label: filterLabels.school },
];

const categoryFilters = filters.filter(
  (filter): filter is { id: Filter; label: string } => filter.id !== "all"
);

const Home: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState<Filter | "all">("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    StatusFilter | "all"
  >("all");
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled, toggleSound } = useSoundDesign();
  const reduceMotion = useReducedMotion();
  const allItems = getSortedShowcaseItems("all");
  const visibleItems = getSortedShowcaseItems(activeFilter, activeStatusFilter);
  const activeFilterLabel =
    filters.find((filter) => filter.id === activeFilter)?.label ?? "All";
  const activeStatusFilterLabel =
    activeStatusFilter === "all"
      ? null
      : statusFilterLabels[activeStatusFilter];
  const hasActiveFilters =
    activeFilter !== "all" || activeStatusFilter !== "all";

  const toggleFilter = (filter: Filter) => {
    playSound(activeFilter === filter ? "clear" : filter);
    setActiveFilter((current) => (current === filter ? "all" : filter));
  };

  const toggleStatusFilter = (statusFilter: StatusFilter) => {
    playSound(activeStatusFilter === statusFilter ? "clear" : "hover");
    setActiveStatusFilter((current) =>
      current === statusFilter ? "all" : statusFilter
    );
  };

  const clearFilter = () => {
    if (hasActiveFilters) {
      playSound("clear");
    }

    setActiveFilter("all");
    setActiveStatusFilter("all");
  };

  const filterButtonClass = (filter: Filter) =>
    `interactive-link bg-transparent border-0 p-0 cursor-pointer text-left ${
      activeFilter === filter ? "filter-active" : ""
    }`;

  const statusFilterButtonClass = (statusFilter: StatusFilter) =>
    `status-legend-item interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none ${
      activeStatusFilter === statusFilter ? "filter-active" : ""
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
      className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none"
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
      className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none"
    >
      Sound {soundEnabled ? "On" : "Off"}
    </button>
  );

  const topControls = (
    <div className="flex items-center gap-4">
      {soundToggle}
      {themeToggle}
    </div>
  );

  const filterCrumb = (
    <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
      <span>#</span>
      {!hasActiveFilters ? (
        <span>All</span>
      ) : (
        <>
          <button
            type="button"
            onClick={clearFilter}
            className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none"
          >
            All
          </button>
          {activeFilter !== "all" && (
            <>
              <span>/</span>
              <span>{activeFilterLabel}</span>
            </>
          )}
          {activeStatusFilterLabel && (
            <>
              <span>/</span>
              <span>{activeStatusFilterLabel}</span>
            </>
          )}
          <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
            <span>·</span>
            <button
              type="button"
              onClick={clearFilter}
              className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-none opacity-60"
            >
              Clear
            </button>
          </span>
        </>
      )}
    </p>
  );

  const renderStatusSummary = (justifyClassName = "justify-end") => (
    <p
      className={`flex flex-wrap items-center ${justifyClassName} gap-x-4 gap-y-2`}
    >
      <span className="status-legend" aria-label="Filter by project status">
        <button
          type="button"
          aria-pressed={activeStatusFilter === "in-progress"}
          onClick={() => toggleStatusFilter("in-progress")}
          onMouseEnter={() => playSound("hover")}
          className={statusFilterButtonClass("in-progress")}
        >
          <span className="status-square status-square-blue" />
          <span>In-progress</span>
        </button>
        <button
          type="button"
          aria-pressed={activeStatusFilter === "done"}
          onClick={() => toggleStatusFilter("done")}
          onMouseEnter={() => playSound("hover")}
          className={statusFilterButtonClass("done")}
        >
          <span className="status-square status-square-green" />
          <span>Done</span>
        </button>
        <button
          type="button"
          aria-pressed={activeStatusFilter === "starred"}
          onClick={() => toggleStatusFilter("starred")}
          onMouseEnter={() => playSound("hover")}
          className={statusFilterButtonClass("starred")}
        >
          <StarIcon />
          <span>Starred</span>
        </button>
      </span>
      <span>{visibleItems.length} items</span>
    </p>
  );

  const filterBar = (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-2">
      {filterCrumb}
      {renderStatusSummary()}
    </div>
  );

  return (
    <div className="page-texture min-h-screen px-6 py-8 sm:px-10 sm:py-10 md:px-14 lg:px-20 lg:py-5 xl:px-28 2xl:px-36">
      <div className="relative z-10 mx-auto w-full max-w-[1700px] lg:min-h-[calc(100vh-2.5rem)]">
        <div className="theme-blue-muted font-mono text-sm sm:text-base uppercase leading-none lg:hidden">
          <div className="flex justify-end pt-4">{topControls}</div>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0 lg:items-start">
          <div className="hidden lg:flex lg:col-start-1 lg:justify-end lg:items-center lg:pr-12 xl:pr-16 2xl:pr-20 theme-blue-muted font-mono text-sm uppercase leading-none pt-4">
            {topControls}
          </div>
          <div className="hidden lg:flex lg:col-start-2 lg:items-center lg:pl-0 lg:pr-4 xl:pr-6 theme-blue-muted font-mono text-sm uppercase leading-none pt-4 w-full">
            {filterBar}
          </div>

          {/* Left panel */}
          <div className="lg:sticky lg:top-5 lg:col-start-1 lg:row-start-2 lg:self-start lg:pr-12 xl:pr-16 2xl:pr-20 pt-8 lg:pt-6">
            <div className="max-w-2xl lg:max-w-none lg:pr-6 xl:pr-8">
              <section className="section-module mb-4">
                <h1
                  className="display-font poster-blue text-[clamp(4.25rem,18vw,7.5rem)] lg:text-[clamp(5rem,6.25vw,6.5rem)] mb-5 lg:mb-4 max-w-[8ch] cursor-help"
                  title="/tʰajŋ nam/"
                  onMouseEnter={() => playSound("name")}
                >
                  Thanh Nam
                </h1>
                <h2 className="text-xl lg:text-[1.375rem] mb-3 font-medium">
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
              </section>

              <section className="section-module mb-4">
                <h2 className="text-xl lg:text-[1.375rem] mb-4 font-medium poster-blue">
                  What I&apos;ve been working on
                </h2>
                <ul className="text-base lg:text-[1.0625rem] grid grid-cols-2 gap-x-8 gap-y-1">
                  {categoryFilters.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        type="button"
                        aria-pressed={activeFilter === id}
                        onClick={() => toggleFilter(id)}
                        onMouseEnter={() => playSound("hover")}
                        className={filterButtonClass(id)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="section-module mb-4">
                <h2 className="text-xl lg:text-[1.375rem] mb-4 font-medium poster-blue">
                  Contact me
                </h2>
                <ul className="text-base lg:text-[1.0625rem] grid grid-cols-2 gap-x-8 gap-y-1">
                  <li>
                    <a
                      href="mailto:ttran19@umbc.edu"
                      onClick={() => playSound("external")}
                    >
                      Email me ↗︎
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/ttran293"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      GitHub ↗︎
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/thanh-nam-tran-9bbb921b3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      LinkedIn ↗︎
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/ttran293/ttran293/blob/main/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("external")}
                    >
                      Resume ↗︎
                    </a>
                  </li>
                </ul>
              </section>

              <p className="font-mono text-xs uppercase opacity-60 lg:mb-0">
                Updated May 27, 2026
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="mt-8 lg:mt-0 lg:col-start-2 lg:row-start-2 lg:flex lg:flex-col lg:pl-0 min-h-[40vh]">
            <div className="relative flex-1 min-h-[40vh] py-0 lg:pt-6 lg:pr-4 xl:pr-6">
              <div className="theme-blue-muted font-mono text-sm sm:text-base uppercase leading-none mb-8 sm:mb-10 lg:hidden">
                <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-6">
                  {filterCrumb}
                  {renderStatusSummary()}
                </div>
              </div>
              <nav className="font-mono">
                {activeStatusFilter === "all" && (
                  <div
                    className="module-box mb-6 lg:mb-8 cursor-help"
                    title="What should I work on next?"
                    onMouseEnter={() => playSound("mystery")}
                  >
                    <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,1fr)] gap-3 sm:gap-4 lg:gap-5">
                      <span className="theme-blue-meta self-start text-base sm:text-lg lg:text-xl leading-none pt-1">
                        ??
                      </span>
                      <span className="block display-font theme-blue-soft text-[clamp(2rem,8vw,3rem)] sm:text-[clamp(2.25rem,6vw,3.4rem)] lg:text-[clamp(2.5rem,4.25vw,4.2rem)] leading-[0.9] wrap-break-word">
                        ??????
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-0">
                  {visibleItems.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm sm:text-base opacity-60 max-w-prose py-4"
                    >
                      No items match this filter yet.{" "}
                      <button
                        type="button"
                        onClick={clearFilter}
                        onMouseEnter={() => playSound("hover")}
                        className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase"
                      >
                        View all
                      </button>
                    </motion.p>
                  ) : (
                    <AnimatePresence initial={false} mode="popLayout">
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
                          : item.status === "done"
                            ? "showcase-row-green"
                            : "";

                        return (
                          <motion.div
                            key={item.id}
                            layout={!reduceMotion}
                            initial={
                              reduceMotion ? false : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              reduceMotion
                                ? undefined
                                : { opacity: 0, y: -8 }
                            }
                            transition={{
                              duration: reduceMotion ? 0 : 0.22,
                              ease: "easeOut",
                              delay: reduceMotion ? 0 : index * 0.025,
                            }}
                            className={isLast ? "py-1" : "showcase-divider py-1"}
                          >
                            <Link
                              href={getItemHref(item.id)}
                              onClick={() => playSound("navigate")}
                              onMouseEnter={() => playSound("hover")}
                              className={`showcase-row ${rowColorClass} group grid grid-cols-[2.75rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,1fr)] gap-3 sm:gap-4 lg:gap-5 no-underline`}
                              style={{ textDecoration: "none" }}
                            >
                              <span className="flex flex-col items-start gap-1 self-start pt-1">
                                <span className="theme-blue-meta text-base sm:text-lg lg:text-xl leading-none opacity-70 group-hover:opacity-100">
                                  {itemNumber}
                                </span>
                                {item.starred && (
                                  <StarIcon
                                    className="showcase-star-index"
                                    aria-label="Starred"
                                  />
                                )}
                              </span>
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                  <span className="display-font theme-blue-soft text-[clamp(2rem,8vw,3rem)] sm:text-[clamp(2.25rem,6vw,3.4rem)] lg:text-[clamp(2.5rem,4.25vw,4.2rem)] leading-[0.9] wrap-break-word">
                                    {item.name}
                                    <span className="ml-2 inline-block translate-x-[-0.15em] opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                                      →
                                    </span>
                                  </span>
                                  {item.archived && (
                                    <span className="showcase-badge">Archived</span>
                                  )}
                                </span>
                                <span className="theme-blue-meta mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm lg:text-base uppercase tracking-wide opacity-60 group-hover:opacity-80">
                                  <span>{formattedDate}</span>
                                  <span>/</span>
                                  <span>{item.tag}</span>
                                  <span>/</span>
                                  <span>{item.meta}</span>
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
