import { ReactNode, useEffect } from "react";
import SiteHeader from "./SiteHeader";
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
  contentClassName = "relative z-10 mx-auto w-full max-w-[780px]",
  enableSoundEffects = true,
  pageClassName = "",
}: ItemPageLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { playSound, soundEnabled, toggleSound } = useSoundDesign();

  useEffect(() => {
    if (enableSoundEffects && soundEnabled) {
      playSound("page-enter");
    }
  }, [enableSoundEffects, playSound, soundEnabled]);

  return (
    <div
      className={`item-page page-texture min-h-screen ${pageClassName}`}
    >
      <SiteHeader
        theme={theme}
        onBack={() => { if (enableSoundEffects) playSound("back"); }}
        onToggleTheme={() => { if (enableSoundEffects) playSound("theme"); toggleTheme(); }}
        soundEnabled={soundEnabled}
        onToggleSound={enableSoundEffects ? toggleSound : undefined}
      />
      <div className="item-content-region px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <main className={contentClassName}>{children}</main>
      </div>
    </div>
  );
}
