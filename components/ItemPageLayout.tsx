import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { useSoundDesign } from "../hooks/useSoundDesign";
import { useTheme } from "../hooks/useTheme";

type ItemPageLayoutProps = {
  children: ReactNode;
  contentClassName?: string;
  enableSoundEffects?: boolean;
  pageClassName?: string;
};

export default function ItemPageLayout({
  children,
  contentClassName = "relative z-10 mx-auto w-full max-w-[900px]",
  enableSoundEffects = true,
  pageClassName = "",
}: ItemPageLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled } = useSoundDesign();

  useEffect(() => {
    if (enableSoundEffects && soundEnabled) {
      playSound("page-enter");
    }
  }, [enableSoundEffects, playSound, soundEnabled]);

  return (
    <div
      className={`item-page page-texture min-h-screen px-6 py-8 sm:px-10 sm:py-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 ${pageClassName}`}
    >
      <div className={contentClassName}>
        <div className="flex justify-between items-center text-xs sm:text-sm font-medium tracking-tight leading-snug mb-8">
          <Link
            href="/"
            onClick={() => {
              if (enableSoundEffects) {
                playSound("back");
              }
            }}
            className="interactive-link no-underline"
            style={{ textDecoration: "none" }}
          >
            ← Home
          </Link>
          <button
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            onClick={() => {
              if (enableSoundEffects) {
                playSound("theme");
              }
              toggleTheme();
            }}
            className="interactive-link bg-transparent border-0 p-0 cursor-pointer leading-snug"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
