import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { useSoundDesign } from "../hooks/useSoundDesign";
import { useTheme } from "../hooks/useTheme";

type ItemPageLayoutProps = {
  children: ReactNode;
};

export default function ItemPageLayout({ children }: ItemPageLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled } = useSoundDesign();

  useEffect(() => {
    if (soundEnabled) {
      playSound("page-enter");
    }
  }, [playSound, soundEnabled]);

  return (
    <div className="page-texture min-h-screen px-6 py-8 sm:px-10 sm:py-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
      <div className="relative z-10 mx-auto w-full max-w-[900px]">
        <div className="flex justify-between items-center font-mono text-xs sm:text-sm uppercase leading-none mb-8">
          <Link
            href="/"
            onClick={() => playSound("back")}
            className="interactive-link no-underline uppercase"
            style={{ textDecoration: "none" }}
          >
            ← Home
          </Link>
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
        </div>

        {children}
      </div>
    </div>
  );
}
