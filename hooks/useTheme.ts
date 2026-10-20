import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const themeEvent = "portfolio-theme-change";

function getTheme(): Theme {
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", onChange);
  window.addEventListener(themeEvent, onChange);
  preference.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(themeEvent, onChange);
    preference.removeEventListener("change", onChange);
  };
}

const getServerTheme = (): Theme | null => null;

function setTheme(theme: Theme) {
  window.localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(themeEvent));
}

export function useTheme() {
  // Keep hydration consistent while subscribing to browser preferences.
  const currentTheme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const theme = currentTheme ?? "light";

  useEffect(() => {
    if (currentTheme) document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");
  return { theme, setTheme, toggleTheme, themeReady: currentTheme !== null };
}
