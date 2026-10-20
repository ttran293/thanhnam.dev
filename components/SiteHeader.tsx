import Link from "next/link";
import type { Theme } from "../hooks/useTheme";
import styles from "../styles/SiteHeader.module.css";

type SiteHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound?: () => void;
  onBack?: () => void;
};

export default function SiteHeader({ theme, onToggleTheme, soundEnabled, onToggleSound, onBack }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.inner} aria-label="Site navigation">
        <Link href="/" className={styles.back} onClick={onBack}>
          <span aria-hidden="true">←</span> Home
        </Link>
        <SiteControls theme={theme} onToggleTheme={onToggleTheme} soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
      </nav>
    </header>
  );
}

export function SiteControls({ theme, onToggleTheme, soundEnabled, onToggleSound }: Pick<SiteHeaderProps, "theme" | "onToggleTheme" | "soundEnabled" | "onToggleSound">) {
  return (
    <div className={styles.controls} role="group" aria-label="Display and sound">
      {onToggleSound && <>
        <button type="button" onClick={onToggleSound} aria-label={`${soundEnabled ? "Disable" : "Enable"} interface sounds`} aria-pressed={soundEnabled}>
          Sound {soundEnabled ? "on" : "off"}
        </button>
        <span className={styles.divider} aria-hidden="true" />
      </>}
      <button type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "dark"}>
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </div>
  );
}
