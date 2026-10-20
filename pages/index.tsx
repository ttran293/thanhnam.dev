import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SelectedWork from "../components/SelectedWork";
import { SiteControls } from "../components/SiteHeader";
import {
  type Filter,
  filterLabels,
  getItemHref,
  getSortedShowcaseItems,
  showcaseItems,
} from "../data/showcaseItems";
import { useSoundDesign } from "../hooks/useSoundDesign";
import { useTheme } from "../hooks/useTheme";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "../styles/Home.module.css";

const filters: { id: Filter | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-app", label: filterLabels["web-app"] },
  { id: "art", label: filterLabels.art },
  { id: "rock-climb", label: filterLabels["rock-climb"] },
  { id: "school", label: filterLabels.school },
  { id: "research", label: filterLabels.research },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter | "all">("all");
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled, toggleSound } = useSoundDesign();
  const reduceMotion = useReducedMotion();
  const visibleItems = getSortedShowcaseItems(activeFilter);
  const revealRef = useScrollReveal(activeFilter);

  const selectFilter = (filter: Filter | "all") => {
    const next = filter === activeFilter ? "all" : filter;
    playSound(next === "all" ? "clear" : next);
    setActiveFilter(next);
  };

  return (
    <>
      <Head>
        <title>Thanh Nam</title>
        <meta
          name="description"
          content="Thanh Nam — software developer at Media Cybernetics and graduate student at UMBC. Web apps, research, sketches, hiking, and climbing."
        />
      </Head>
      <div id="top" className={styles.page}>
        <a href="#projects" className={styles.skipLink}>Skip to projects</a>
        <main ref={revealRef} className={styles.shell}>
          <header className={styles.intro}>
            <div className={styles.identity}>
              <h1 className={styles.heading} title="/tʰajŋ nam/" onMouseEnter={() => playSound("name")}>
                Thanh Nam
              </h1>
              <p className={styles.introLine}>I like to build things that connect people.</p>
            </div>
            <div className={styles.bio}>
              <p>
                Currently at{" "}
                <a href="https://mediacy.com/" target="_blank" rel="noopener noreferrer">Media Cybernetics</a>.
                {" "}Graduate student and{" "}
                <a href="https://umbc.edu/global/ask-a-student/" target="_blank" rel="noopener noreferrer">Global Ambassador</a>{" "}
                at <a href="https://www.umbc.edu/" target="_blank" rel="noopener noreferrer">UMBC</a>.
              </p>
            </div>
            <div className={styles.introActions}>
              <nav className={styles.contact} aria-label="Contact and profiles">
                <a href="mailto:ttran19@umbc.edu">Email <span aria-hidden="true">↗</span></a>
                <a href="https://github.com/ttran293" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                <a href="https://linkedin.com/in/thanh-nam-tran-9bbb921b3/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                <a href="https://github.com/ttran293/ttran293/blob/main/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
              </nav>
              <div className={styles.utilities}>
                <SiteControls
                  theme={theme}
                  onToggleTheme={() => { playSound("theme"); toggleTheme(); }}
                  soundEnabled={soundEnabled}
                  onToggleSound={toggleSound}
                />
              </div>
            </div>
          </header>

          <SelectedWork onInteract={() => playSound("navigate")} />

          <section id="projects" className={styles.projects} aria-labelledby="projects-heading">
            <div className={styles.sectionHeading} data-reveal>
              <h2 id="projects-heading">The full index</h2>
              <span className={styles.count} role="status" aria-live="polite">
                {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className={styles.filterDock}>
              <div className={styles.filters} role="group" aria-label="Filter projects">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={activeFilter === filter.id}
                    className={`${styles.filter} ${activeFilter === filter.id ? styles.selected : ""}`}
                    onClick={() => selectFilter(filter.id)}
                  >
                    {filter.label}
                    <span className={styles.filterCount} aria-hidden="true">{filter.id === "all" ? showcaseItems.length : showcaseItems.filter((item) => item.filter === filter.id).length}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.ul
              key={activeFilter}
              className={styles.list}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {visibleItems.map((item, index) => {
                const content = (
                  <span className={styles.itemBody}>
                    <span className={styles.titleLine}>
                      <span className={styles.itemTitle}>{item.name}</span>
                      <span className={styles.arrow} aria-hidden="true">{item.externalUrl ? "↗" : "→"}</span>
                      {item.archived && <span className={styles.archived}>Archived</span>}
                    </span>
                    <span className={styles.description}>{item.meta}<span className={styles.metaDivider}> · </span><span className={styles.tag}>{item.tag}</span></span>
                  </span>
                );

                return (
                  <li key={item.id} data-reveal data-reveal-delay={(index % 3) * 35}>
                    {item.externalUrl ? (
                      <a className={styles.row} href={item.externalUrl} target="_blank" rel="noopener noreferrer" onClick={() => playSound("external")}>
                        {content}
                      </a>
                    ) : (
                      <Link className={styles.row} href={getItemHref(item.id)} onClick={() => playSound("navigate")}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </section>

          <footer className={styles.footer} data-reveal>
            <span>Updated October 20, 2026</span>
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </footer>
        </main>
      </div>
    </>
  );
}
