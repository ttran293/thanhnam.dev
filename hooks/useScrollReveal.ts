import { useEffect, useRef } from "react";

/** Animate on entry without hiding content before JavaScript is ready. */
export function useScrollReveal(contentKey: string) {
  const rootRef = useRef<HTMLElement>(null);
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (revealed.current.has(entry.target)) continue;
          revealed.current.add(entry.target);
          if (preference.matches) continue;

          const element = entry.target as HTMLElement;
          if (element.contains(document.activeElement)) continue;
          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 580,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );

    root.querySelectorAll("[data-reveal]").forEach((element) => {
      if (!revealed.current.has(element)) observer.observe(element);
    });

    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onPreferenceChange = () => {
      if (preference.matches) cancelAnimations();
    };
    preference.addEventListener("change", onPreferenceChange);
    root.addEventListener("focusin", cancelAnimations);

    return () => {
      observer.disconnect();
      cancelAnimations();
      preference.removeEventListener("change", onPreferenceChange);
      root.removeEventListener("focusin", cancelAnimations);
    };
  }, [contentKey]);

  return rootRef;
}
