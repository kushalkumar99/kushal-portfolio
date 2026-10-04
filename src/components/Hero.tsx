import { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { useInViewReplay } from "../hooks/useInViewReplay";
import HeroTechnicalBackground from "./HeroTechnicalBackground";

/*
 * Poster hero.
 *
 * The big lettering is set as SVG <text> with a fixed baseline and
 * `textLength`. That pins every line to the exact position and width of the
 * approved composition no matter which font loads (or fails to), so the
 * lettering can never collide with the portrait during font swap. Live text
 * stays selectable; screen readers get the <h1> below instead.
 *
 * Coordinates are in the units of the original 1896 x 616 comp.
 */

type PosterLine = {
  /** Text before, the accented letter, and text after. */
  parts: readonly [string, string, string];
  x: number;
  /** Baseline (y) inside the group's viewBox. */
  y: number;
  size: number;
  /** Rendered advance width of the whole line. */
  length: number;
  /** The entrance treatment for this specific headline line. */
  animation: "ascend" | "typewriter" | "fade" | "block";
  /** Uses the editorial serif treatment from the About statement. */
  editorial?: boolean;
};

const LEFT_LINES: readonly PosterLine[] = [
  { parts: ["I'm", "", ""], x: 0, y: 57, size: 75, length: 80, animation: "ascend", editorial: true },
  { parts: ["KUSH", "A", "L"], x: -8, y: 280, size: 237, length: 577, animation: "typewriter" },
  { parts: ["AND I BUILD", "", ""], x: -8, y: 403, size: 109, length: 420, animation: "fade" },
];

const RIGHT_LINES: readonly PosterLine[] = [
  { parts: ["SO", "F", "TWARE"], x: 0, y: 150, size: 197, length: 650, animation: "block" },
  { parts: ["that works", "", ""], x: 234, y: 230, size: 95, length: 416, animation: "fade", editorial: true },
];

type PosterGroupProps = {
  side: "left" | "right";
  viewBox: string;
  lines: readonly PosterLine[];
  /** Stagger offset so the whole composition enters as one sequence. */
  startIndex: number;
};

function PosterGroup({ side, viewBox, lines, startIndex }: PosterGroupProps) {
  return (
    <svg
      className={`hero-type hero-type--${side}`}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
    >
      {lines.map((line, index) => (
        <text
          key={line.parts.join("")}
          className={`hero-line hero-line--${line.animation}${line.editorial ? " hero-line--editorial" : ""}`}
          style={{ "--i": startIndex + index } as React.CSSProperties}
          x={line.x}
          y={line.y}
          fontSize={line.size}
          textLength={line.length}
          lengthAdjust="spacingAndGlyphs"
        >
          {line.parts[0]}
          {line.parts[1] && <tspan className="hero-accent">{line.parts[1]}</tspan>}
          {line.parts[2]}
        </text>
      ))}
    </svg>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  /* Replays the CSS entrance each time the hero returns to view. */
  useInViewReplay(sectionRef);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <HeroTechnicalBackground reducedMotion={prefersReducedMotion} />
        <h1 className="sr-only" id="hero-title">
          I&rsquo;m Kushal and I build software that works
        </h1>

        <p className="hero-meta">
          <span className="hero-meta-role">Associate Software Engineer</span>
          <a
            className="hero-meta-company"
            href="https://moldite.com/"
            target="_blank"
            rel="noreferrer"
          >
            Technomold IT Solutions
          </a>
        </p>

        <PosterGroup
          side="left"
          viewBox="-2 -2 581 407"
          lines={LEFT_LINES}
          startIndex={0}
        />

        <figure className="hero-portrait" aria-hidden="true">
          <video
            className="hero-portrait-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/images/port1.mp4" type="video/mp4" />
          </video>
        </figure>

        <PosterGroup
          side="right"
          viewBox="-2 -2 654 271"
          lines={RIGHT_LINES}
          startIndex={3}
        />
      </div>
    </section>
  );
}


export default Hero;
