import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled fully above the viewport (and the screen is at least
 * `minWidthPx` wide). Used to collapse a side column that would otherwise stay empty.
 * Different thresholds for leaving and returning avoid flicker when the layout re-flows.
 */
export function useScrolledPast<T extends HTMLElement>(minWidthPx: number) {
  const ref = useRef<T>(null);
  const [away, setAway] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    let isAway = false;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      let next = isAway;
      if (!wide.matches) next = false;
      else if (!isAway && bottom < -16) next = true;
      else if (isAway && bottom > 24) next = false;
      if (next !== isAway) {
        isAway = next;
        setAway(next);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [minWidthPx]);

  return [ref, away] as const;
}
