import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "./icons";
import { useInViewReplay } from "../hooks/useInViewReplay";
import "../styles/experience.css";

const STEPS = [
  {
    when: "2021 \u2013 2025",
    title: ["Computer Science", "& Engineering"],
    place: "Cambridge Institute of Technology North Campus",
    note: "Bengaluru, India",
  },
  {
    when: "Aug 2026 \u2013 Present",
    title: ["Associate Software Engineer"],
    place: "Technomold IT Solutions Pvt. Ltd.",
    note: "Bengaluru, India",
  },
  {
    when: "Projects",
    title: ["Production Systems"],
    place: "HRMS \u00b7 AeroMed",
    note: "Full-stack systems \u00b7 workflow engineering",
  },
  {
    when: "AI / ML",
    title: ["Applied Machine Learning"],
    place: "NLP \u00b7 Computer Vision \u00b7 Deep Learning",
    note: "Applied AI/ML projects",
  },
] as const;

/* The role you are in today is highlighted first. */
const INITIAL_STEP = 1;
const EXPERIENCE_TITLE = "PROFESSIONAL JOURNEY";

function ExperienceTitle() {
  return (
    <h2 className="experience-typewriter" aria-label={EXPERIENCE_TITLE}>
      <span aria-hidden="true">
        {Array.from(EXPERIENCE_TITLE).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="experience-typewriter-char"
            style={{ "--i": index } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </h2>
  );
}

function Experience() {
  const [active, setActive] = useState<number>(INITIAL_STEP);
  const sectionRef = useRef<HTMLElement>(null);

  /* Replayable entrance: adds .is-armed / toggles .is-in on the section. */
  useInViewReplay(sectionRef);

  const go = (index: number) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, index));
    setActive(next);
    // On narrow screens the timeline is a stacked list: keep the step in view.
    document
      .getElementById(`experience-step-${next}`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="experience-section" id="experience">
      <div
        className="experience-header reveal-item"
        style={{ "--d": "0ms" } as CSSProperties}
      >
        <div className="experience-label">
          <ExperienceTitle />
        </div>

        <div className="experience-controls">
          <button
            type="button"
            aria-label="Previous step"
            disabled={active === 0}
            onClick={() => go(active - 1)}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next step"
            disabled={active === STEPS.length - 1}
            onClick={() => go(active + 1)}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <ol className="experience-timeline">
        {STEPS.map((step, index) => (
          <li
            key={step.when}
            id={`experience-step-${index}`}
            className={`experience-item reveal-item${index === active ? " current" : ""}`}
            style={{ "--d": `${80 + index * 80}ms` } as CSSProperties}
            aria-current={index === active ? "step" : undefined}
          >
            <span className="experience-marker" aria-hidden="true" />
            <div className="experience-year">{step.when}</div>
            <div className="experience-content">
              <h3>
                {step.title.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p>{step.place}</p>
              <small>{step.note}</small>
            </div>
          </li>
        ))}
      </ol>

      <div
        className="experience-footer reveal-item"
        style={{ "--d": `${80 + STEPS.length * 80}ms` } as CSSProperties}
      >
        <p>
          FROM FOUNDATIONS
          <br />
          TO PRODUCTION SYSTEMS.
        </p>

        <span>
          Building software across application development, production
          workflows and applied machine learning.
        </span>
      </div>
    </section>
  );
}

export default Experience;
