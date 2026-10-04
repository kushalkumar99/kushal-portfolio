import { Fragment, useRef } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "./icons";
import { useInViewReplay } from "../hooks/useInViewReplay";
import "../styles/about.css";

/* Typewriter: the heading types in, one character at a time. */
const TITLE = "About";

/* Word-by-word shift: each word slides up into its line in sequence. */
const STATEMENT = [
  ["Engineering"],
  ["Real", "ideas"],
  ["Into", "impact"],
] as const;

const FACTS = [
  {
    mark: "2026",
    title: "Associate Software Engineer",
    meta: "Technomold IT Solutions Pvt. Ltd.",
  },
  {
    mark: "02",
    title: "Production Systems",
    meta: "HRMS · AeroMed",
  },
  {
    mark: "03",
    title: "AI / ML Projects",
    meta: "NLP · Computer Vision · Deep Learning",
  },
  {
    mark: "∞",
    title: "Always Learning",
    meta: "Building larger systems",
  },
] as const;

function About() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Replayable entrance: adds .is-armed / toggles .is-in on the section. */
  useInViewReplay(sectionRef);

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-grid">
        <header className="about-head">
          {/* Letters are split for the typewriter; the label keeps the
              heading readable as one word for assistive tech. */}
          <h2 className="about-title" id="about-title" aria-label={TITLE}>
            <span aria-hidden="true">
              {TITLE.split("").map((char, index) => (
                <span
                  key={index}
                  className={`about-char${char.toLowerCase() === "u" ? " about-char--accent" : ""}`}
                  style={{ "--i": index } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>

          <a
            href="#about-content"
            className="about-arrow"
            data-reveal=""
            style={{ "--d": "600ms" } as CSSProperties}
            aria-label="Read about K Kushal Kumar"
          >
            <ArrowUpRight size={18} />
          </a>
        </header>

        <p
          className="about-intro"
          data-reveal=""
          style={{ "--d": "420ms" } as CSSProperties}
        >
          A software engineer focused on building <em>real-world</em>{" "}
          applications and systems, with a strong foundation in machine
          learning.
        </p>

        {/* Left column: the statement, then the supporting copy beneath it. */}
        <div className="about-main">
          <div className="about-statement" id="about-content">
            <h3 className="about-statement-title">
              {STATEMENT.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  className={`about-line${lineIndex === 1 ? " about-line--soft" : ""}`}
                >
                  {line.map((word, position) => {
                    const index = wordIndex++;
                    const isLast =
                      lineIndex === STATEMENT.length - 1 &&
                      position === line.length - 1;

                    return (
                      <Fragment key={word}>
                        {position > 0 ? " " : null}
                        <span
                          className="about-word"
                          style={{ "--w": index } as CSSProperties}
                        >
                          <span
                            className={`about-word-text${lineIndex === 1 ? " about-word-text--editorial" : ""}${isLast ? " about-word-text--impact" : ""}`}
                          >
                            {word}
                          </span>
                        </span>
                      </Fragment>
                    );
                  })}
                </span>
              ))}
            </h3>
          </div>

          <div className="about-copy">
            <p
              className="about-lead"
              data-reveal=""
              style={{ "--d": "800ms" } as CSSProperties}
            >
              I&rsquo;m <strong>K Kushal Kumar</strong>, an Associate Software
              Engineer at Technomold IT Solutions Pvt. Ltd., based in
              Bengaluru, India.
            </p>

            <p
              data-reveal=""
              style={{ "--d": "880ms" } as CSSProperties}
            >
              I build real-world applications and systems, with a strong
              foundation in machine learning, deep learning, and NLP.
            </p>

            <p
              data-reveal=""
              style={{ "--d": "940ms" } as CSSProperties}
            >
              My work spans production software, full-stack development, and
              applied AI/ML projects.
            </p>
          </div>
        </div>

        {/* Right column: profile index, then the call to action. */}
        <div className="about-side">
          <ol className="about-facts" aria-label="Profile index">
            {FACTS.map((fact, index) => (
              <li
                key={fact.mark}
                className="about-fact"
                data-reveal=""
                style={{ "--d": `${700 + index * 90}ms` } as CSSProperties}
              >
                <span className="about-fact-mark">{fact.mark}</span>
                <span className="about-fact-body">
                  <span className="about-fact-title">{fact.title}</span>
                  <span className="about-fact-meta">{fact.meta}</span>
                </span>
              </li>
            ))}
          </ol>

          <div
            className="about-cta"
            data-reveal=""
            style={{ "--d": "1040ms" } as CSSProperties}
          >
            <a href="#experience" className="about-more">
              <span className="about-more-arrow" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
              <span className="about-more-label">More about me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
