import Lenis from "lenis";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";

type UseSmoothScrollOptions = {
  enabled: boolean;
};

export function useSmoothScroll({ enabled }: UseSmoothScrollOptions) {
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();

  const scrollToTop = useCallback((immediate = true) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate });
      return;
    }

    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 1,
      anchors: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onRouteChange = () => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    };

    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [enabled, router.events]);

  return { scrollToTop };
}
