import { useEffect, useRef, useState } from "react";

type Direction = -1 | 1 | "start" | "end";
const GESTURE_IDLE_MS = 180;

function destination(list: HTMLUListElement, direction: Direction) {
  const max = list.scrollWidth - list.clientWidth;
  if (direction === "start") return 0;
  if (direction === "end") return max;
  const width = list.firstElementChild?.getBoundingClientRect().width ?? list.clientWidth;
  const step = width + (parseFloat(getComputedStyle(list).columnGap) || 0);
  const column = direction === 1
    ? Math.floor((list.scrollLeft + 2) / step) + 1
    : Math.ceil((list.scrollLeft - 2) / step) - 1;
  return Math.max(0, Math.min(column * step, max));
}

/** Advance one column per wheel gesture; release fresh gestures at either edge. */
export function useHorizontalIndex(contentKey: string, reduceMotion: boolean | null) {
  const listRef = useRef<HTMLUListElement>(null);
  const resetWheelGesture = useRef<() => void>(() => {});
  const [position, setPosition] = useState({ previous: false, next: false, width: 100, left: 0 });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastWheelTime = -Infinity;
    let lastDirection = 0;
    let gestureConsumed = false;

    const resetGesture = () => {
      lastWheelTime = -Infinity;
      lastDirection = 0;
      gestureConsumed = false;
    };
    resetWheelGesture.current = resetGesture;

    const measure = () => {
      const max = list.scrollWidth - list.clientWidth;
      const left = Math.max(0, Math.min(list.scrollLeft, max));
      setPosition({
        previous: left > 2,
        next: left < max - 2,
        width: list.scrollWidth ? (list.clientWidth / list.scrollWidth) * 100 : 100,
        left: list.scrollWidth ? (left / list.scrollWidth) * 100 : 0,
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const max = list.scrollWidth - list.clientWidth;
      if (!delta || max <= 2) return;
      const direction = delta > 0 ? 1 : -1;
      const now = performance.now();
      if (now - lastWheelTime > GESTURE_IDLE_MS || direction !== lastDirection) {
        gestureConsumed = false;
      }
      lastWheelTime = now;
      lastDirection = direction;

      // Swallow the rest of a consumed gesture, including its momentum at the end.
      // A new gesture at the edge can continue scrolling the surrounding page.
      if (!gestureConsumed && ((direction < 0 && list.scrollLeft <= 2) || (direction > 0 && list.scrollLeft >= max - 2))) return;
      event.preventDefault();
      event.stopPropagation();
      if (gestureConsumed) return;
      gestureConsumed = true;
      list.scrollTo({
        left: destination(list, direction),
        behavior: motionPreference.matches ? "instant" : "smooth",
      });
    };

    const onMotionChange = () => {
      resetGesture();
      if (motionPreference.matches) list.scrollTo({ left: list.scrollLeft, behavior: "instant" });
    };

    list.scrollTo({ left: 0, behavior: "instant" });
    measure();
    const observer = new ResizeObserver(() => { resetGesture(); measure(); });
    observer.observe(list);
    list.addEventListener("scroll", measure, { passive: true });
    list.addEventListener("wheel", onWheel, { passive: false });
    list.addEventListener("pointerdown", resetGesture, { passive: true });
    list.addEventListener("touchstart", resetGesture, { passive: true });
    list.addEventListener("keydown", resetGesture);
    list.addEventListener("focusin", resetGesture);
    motionPreference.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", measure);
      list.removeEventListener("wheel", onWheel);
      list.removeEventListener("pointerdown", resetGesture);
      list.removeEventListener("touchstart", resetGesture);
      list.removeEventListener("keydown", resetGesture);
      list.removeEventListener("focusin", resetGesture);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, [contentKey]);

  const scroll = (direction: Direction) => {
    const list = listRef.current;
    if (!list) return;
    resetWheelGesture.current();
    list.scrollTo({
      left: destination(list, direction),
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return { listRef, position, scroll };
}
