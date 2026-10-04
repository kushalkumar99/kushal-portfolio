import { useLayoutEffect, type RefObject } from "react";

/**
 * Replayable scroll reveal.
 *
 *   enter viewport  -> .is-in added     (CSS animates to the final state)
 *   leave viewport  -> .is-in removed   (CSS snaps back to the reveal start)
 *   enter again     -> .is-in added     (CSS animates again)
 *
 * The hook decides WHEN; CSS decides HOW. State lives in two classes on the
 * observed element, written directly to the DOM so a scroll never triggers a
 * React render:
 *
 *   .is-armed  JS is running, motion is allowed: hidden start state applies.
 *   .is-in     the element is on screen: final state applies.
 *
 * Because the classes are written imperatively, the observed element's
 * `className` must be a constant string in JSX (React would otherwise
 * overwrite them when the prop changes).
 *
 * Progressive enhancement: without IntersectionObserver, or when the visitor
 * prefers reduced motion, the element is never armed, so nothing is hidden
 * and no entrance motion runs.
 *
 * Anti-flicker: the reveal starts once `threshold` of the element is visible
 * and resets only after the element has left the (shrunken) viewport
 * completely. Scroll jitter around the edge therefore cannot toggle it.
 */

type Options = {
  /** Fraction of the element that must be visible to reveal. */
  threshold?: number;
  /** Shrinks the viewport so reveals fire a little before the very edge. */
  rootMargin?: string;
};

const REVEAL_EPSILON = 0.005;

export function useInViewReplay<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = "0px 0px -8% 0px" }: Options = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Before first paint, so content never flashes visible then hides.
    el.classList.add("is-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        // Only the most recent state matters if several are batched.
        const entry = entries[entries.length - 1];
        if (!entry) return;

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= threshold - REVEAL_EPSILON
        ) {
          el.classList.add("is-in");
        } else if (!entry.isIntersecting) {
          el.classList.remove("is-in");
        }
      },
      // 0 reports the full exit; `threshold` reports the reveal point.
      { threshold: [0, threshold], rootMargin },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      el.classList.remove("is-armed", "is-in");
    };
  }, [ref, threshold, rootMargin]);
}
