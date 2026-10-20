import Image from "next/image";
import Link from "next/link";
import { getItemHref } from "../data/showcaseItems";
import RecipeStackPreview from "./recipe-stack/RecipeStackPreview";
import StickerPreview from "./StickerPreview";
import styles from "../styles/SelectedWork.module.css";

export default function SelectedWork({ onInteract }: { onInteract: () => void }) {
  return (
    <section id="selected-work" className={styles.selected} aria-labelledby="selected-heading">
      <div className={styles.heading} data-reveal>
        <h2 id="selected-heading">Selected work</h2>
      </div>
      <div className={styles.works}>
        <article data-reveal>
          <a className={styles.stage} href={getItemHref("jelly")} target="_blank" rel="noopener noreferrer" aria-label="Visit Jelly">
            <span className={styles.edition} aria-hidden="true">01 / JELLY</span>
            <span className={styles.jellyWindow} aria-hidden="true">
              <span className={styles.jellyBrand}>
                <Image src="https://raw.githubusercontent.com/ttran293/jelly/main/public/jelly-logo.png" alt="" width={28} height={28} unoptimized />
                Jelly<span>PROTOTYPE</span>
              </span>
              <span className={styles.jellyTitle}>A little wobble.<br />A way forward.</span>
              <span className={styles.jellyPaths}><span><i>01</i> Understand your habit</span><span><i>02</i> Work toward a goal</span><span><i>03</i> Reach out for support</span></span>
              <span className={styles.jellyFooter}>At your own pace.<span>↗</span></span>
            </span>
            <span className={styles.stageHint}>Explore Jelly ↗</span>
          </a>
          <ProjectCaption id="jelly" name="Jelly" description="Gambling-awareness & support prototype" repository="https://github.com/ttran293/jelly" />
        </article>

        <article data-reveal data-reveal-delay="80">
          <a className={styles.stage} href={getItemHref("wsrylt-v2")} target="_blank" rel="noopener noreferrer" aria-label="Visit What song are you listening to?">
            <span className={styles.edition} aria-hidden="true">02 / WSRYLT</span>
            <span className={styles.recordPlayer} aria-hidden="true">
              <span className={styles.record}><span className={styles.recordLabel}>wsrylt<span>♪</span></span></span>
              <span className={styles.recordSleeve}>
                <span className={styles.musicLabel}>SONGS SHARED<br />BY THE COMMUNITY</span>
                <span className={styles.musicTitle}>what song<br />are you<br />listening to?</span>
                <span className={styles.equalizer}>{[12, 23, 16, 31, 20, 27, 13, 22, 17, 29, 14, 24].map((height, index) => <i key={index} style={{ height }} />)}</span>
                <span className={styles.sleeveFooter}>Listen. Share. Discover.</span>
              </span>
            </span>
            <span className={styles.stageHint}>Find your next favorite track ↗</span>
          </a>
          <ProjectCaption id="wsrylt-v2" name="What song are you listening to?" description="Community music sharing & discovery" repository="https://github.com/ttran293/wsrylt" />
        </article>

        <article data-reveal>
          <div className={styles.stage}>
            <RecipeStackPreview onInteract={onInteract} />
            <span className={styles.edition} aria-hidden="true">03 / JELLY&apos;S LAB</span>
            <a className={`${styles.stageHint} ${styles.labHint}`} href={getItemHref("jellys-lab")} target="_blank" rel="noopener noreferrer">Explore the recipes ↗</a>
          </div>
          <ProjectCaption id="jellys-lab" name="Jelly’s Lab" description="Recipes, printable cards & a 3D book-ring stack" repository="https://github.com/ttran293/jelly-coffee-and-tea" />
        </article>

        <article data-reveal data-reveal-delay="80">
          <a className={styles.stage} href={getItemHref("sticker-vending-machine")} target="_blank" rel="noopener noreferrer" aria-label="Visit My Sticker Vending Machine">
            <span className={styles.edition} aria-hidden="true">04 / STICKER VENDING MACHINE</span>
            <StickerPreview />
            <span className={styles.stageHint}>Browse the sticker collection ↗</span>
          </a>
          <ProjectCaption id="sticker-vending-machine" name="My Sticker Vending Machine" description="A shop for stickers with a little character" repository="https://github.com/ttran293/sticker-vending-machine" />
        </article>

        <article data-reveal>
          <Link className={`${styles.stage} ${styles.researchStage}`} href={getItemHref("vision-gnn-sar-iceberg")} aria-label="Read Adapting Vision GNN SAR Iceberg Imagery Classification">
            <span className={styles.edition} aria-hidden="true">05 / COMPUTER VISION</span>
            <span className={styles.researchDocuments}>
              <span className={styles.paperPreview}>
                <Image src="/images/projects/vision-gnn-report.png" alt="First page of the group's Vision GNN research report" width={773} height={1000} sizes="180px" />
              </span>
              <span className={styles.approachSlide}>
                <Image src="/images/projects/vision-gnn-approach.png" alt="Presentation slide: self-supervised adaptation and fine-tuning architecture" width={1100} height={619} sizes="260px" />
              </span>
              <span className={styles.resultsSlide}>
                <Image src="/images/projects/vision-gnn-results.png" alt="Presentation slide: SAR imagery, ground truth and predicted classifications" width={1100} height={619} sizes="280px" />
              </span>
            </span>
            <span className={styles.stageHint}>Read the report & presentation ↗</span>
          </Link>
          <ProjectCaption id="vision-gnn-sar-iceberg" name="Adapting Vision GNN SAR Iceberg Imagery Classification" description="Group research · Graph neural networks & computer vision" repository="https://github.com/olipat/SARViG" internal />
        </article>

        <article data-reveal data-reveal-delay="80">
          <a className={styles.stage} href={getItemHref("dearly")} target="_blank" rel="noopener noreferrer" aria-label="Visit dearly.blog">
            <span className={styles.edition} aria-hidden="true">06 / DEARLY.BLOG</span>
            <span className={styles.correspondence} aria-hidden="true">
              <span className={styles.envelopeBack} />
              <span className={styles.letter}>
                <span className={styles.letterHeading}>dearly<span>♡</span></span>
                <span className={styles.letterMessage}>for someone<br />you care about.</span>
                <span className={styles.letterLines}><i /><i /></span>
              </span>
              <span className={styles.envelopeFront}>
                <span className={styles.envelopeAddress}>a little note,<br />just for you.</span>
                <span className={styles.postmark}>dearly.blog</span>
              </span>
            </span>
            <span className={styles.stageHint}>Leave a little note ↗</span>
          </a>
          <ProjectCaption id="dearly" name="dearly.blog" description="Shared mailboxes for people you care about" />
        </article>
      </div>
    </section>
  );
}

function ProjectCaption({ id, name, description, repository, internal = false }: { id: string; name: string; description: string; repository?: string; internal?: boolean }) {
  const content = <span><strong>{name}</strong><span className={styles.projectDescription}>{description}</span></span>;
  return (
    <div className={styles.caption}>
      {internal ? <Link className={styles.projectLink} href={getItemHref(id)}>{content}</Link> : <a className={styles.projectLink} href={getItemHref(id)} target="_blank" rel="noopener noreferrer">{content}</a>}
      {repository && <a className={styles.sourceLink} href={repository} target="_blank" rel="noopener noreferrer" aria-label={`View ${name} on GitHub`}>Code ↗</a>}
    </div>
  );
}
