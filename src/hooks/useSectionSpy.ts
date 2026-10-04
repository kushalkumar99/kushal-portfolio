import { useEffect, useState } from "react";

/**
 * Sections that have a matching entry in the primary navigation.
 * `home` is deliberately excluded: it wraps the whole page, so it would
 * always register as visible and make the indicator meaningless.
 */
export const SPIED_SECTIONS = [
  "work",
  "about",
  "experience",
  "skills",
  "contact",
] as const;

export type SpiedSection = (typeof SPIED_SECTIONS)[number];

/** How far below the sticky bar a section's top counts as "reached". */
const REACHED_OFFSET = 24;

/**
 * Reports the navigable section that currently owns the top of the page, or
 * `null` while the reader is still in the hero.
 *
 * Measured from the bottom edge of the navbar (not the middle of the screen)
 * so that short sections like Skills still win when you jump to them, even
 * though the Contact section is already visible below. At the very end of
 * the page Contact wins, because it is the section occupying the viewport.
 * One passive, rAF-throttled listener; no work per frame while idle.
 */
export function useSectionSpy(): SpiedSection | null {
  const [activeSection, setActiveSection] = useState<SpiedSection | null>(null);

  useEffect(() => {
    const sections = SPIED_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;

      const bar = document.querySelector<HTMLElement>(".navbar");
      const barBottom = Math.max(0, bar?.getBoundingClientRect().bottom ?? 0);
      const line = barBottom + REACHED_OFFSET;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let next: SpiedSection | null = null;

      if (atBottom) {
        // The final section can never reach the navbar's measuring line at
        // the bottom of the document. It still owns the visible page, so do
        // not leave a previously clicked section highlighted.
        next = sections[sections.length - 1].id as SpiedSection;
      } else {
        // The nav order (Work, About) differs from page order (About, Work),
        // so pick the section whose top is nearest above the line.
        let nearest = -Infinity;
        for (const section of sections) {
          const top = section.getBoundingClientRect().top;
          if (top <= line && top > nearest) {
            nearest = top;
            next = section.id as SpiedSection;
          }
        }
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const scheduleMeasure = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("hashchange", scheduleMeasure);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("hashchange", scheduleMeasure);
    };
  }, []);

  return activeSection;
}
