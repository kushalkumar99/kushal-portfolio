import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { ArrowUpRight } from "./icons";
import { InteractiveProjectCard } from "./ui/3d-card";
import { useInViewReplay } from "../hooks/useInViewReplay";
import "../styles/work.css";

type CategoryId = "professional" | "aiMl";

type Project = {
  id: string;
  name: string;
  type: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

type Category = {
  id: CategoryId;
  label: string;
  projects: Project[];
};

const GITHUB_URL = "https://github.com/kushalkumar99";

/* Featured Project data stays local to this section. */
const categories: Category[] = [
  {
    id: "professional",
    label: "PROFESSIONAL",
    projects: [
      {
        id: "ambulance-first",
        name: "AMBULANCE FIRST",
        type: "MEDICAL TRANSPORTATION PLATFORM",
        href: "https://github.com/kushalkumar99/AmbulanceFirst_app",
        imageUrl: "/images/Ambulance_first.png",
        imageAlt: "Ambulance First application interface",
      },
      {
        id: "hrms",
        name: "HRMS",
        type: "ENTERPRISE HR MANAGEMENT SYSTEM",
        href: "https://github.com/codeacc384-coder/hr_hrms",
        imageUrl: "/images/Modern HRMS SaaS Dashboard Experience.png",
        imageAlt: "HRMS SaaS dashboard interface",
      },
    ],
  },
  {
    id: "aiMl",
    label: "AI / ML",
    projects: [
      {
        id: "sleep-schedule-optimizer",
        name: "AI-POWERED SLEEP SCHEDULE OPTIMIZER",
        type: "AI / MACHINE LEARNING",
        href: GITHUB_URL,
        imageUrl: "/images/AI-Powered Sleep Dashboard.png",
        imageAlt: "AI-powered sleep schedule optimizer dashboard",
      },
      {
        id: "driver-drowsiness-detection",
        name: "DRIVER DROWSINESS DETECTION",
        type: "COMPUTER VISION",
        href: GITHUB_URL,
        imageUrl: "/images/8cfaa5bb-5496-451f-8cec-28740a1aa51b.png",
        imageAlt: "Driver drowsiness detection project interface",
      },
      {
        id: "fake-job-detection",
        name: "FAKE JOB DETECTION",
        type: "NLP / MACHINE LEARNING",
        href: GITHUB_URL,
        imageUrl: "/images/JobGuard AI Fake Job Detection Dashboard.png",
        imageAlt: "JobGuard AI fake job detection dashboard",
      },
    ],
  },
];

const EXIT_MS = 200;
const FEATURED_TITLE = "FEATURED PROJECT";

function FeaturedTitle() {
  return (
    <h2 className="featured-typewriter" aria-label={FEATURED_TITLE}>
      <span aria-hidden="true">
        {Array.from(FEATURED_TITLE).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="featured-typewriter-char"
            style={{ "--i": index } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </h2>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  /* Cards that only point at the GitHub profile say so, instead of implying a
     project repository exists. */
  const linksToProfile = project.href === GITHUB_URL;

  return (
    <article
      className="featured-project"
      style={{ ["--i" as string]: index }}
    >
      <InteractiveProjectCard
        className="reveal-item"
        title={project.name}
        imageUrl={project.imageUrl}
        imageAlt={project.imageAlt}
        href={project.href}
        actionLabel={linksToProfile ? "View on GitHub" : "View project"}
      />

      {/* Name and type as real text: readable without hover, searchable, and
          announced by screen readers. Styles come from work.css. */}
      <div className="featured-project-info reveal-item">
        <div className="project-text">
          <h3>{project.name}</h3>
          <p className="project-type">{project.type}</p>
        </div>
      </div>
    </article>
  );
}

function Work() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("professional");
  const [shownCategory, setShownCategory] =
    useState<CategoryId>("professional");
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll entrance only. Independent of the category-switch animation,
     which runs on the cards themselves (project-in / project-out). */
  useInViewReplay(sectionRef);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const select = (id: CategoryId) => {
    if (id === activeCategory) return;

    window.clearTimeout(timer.current);
    setActiveCategory(id);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShownCategory(id);
      setLeaving(false);
      return;
    }

    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setShownCategory(id);
      setLeaving(false);
    }, EXIT_MS);
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const i = categories.findIndex((c) => c.id === activeCategory);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % categories.length;
    if (e.key === "ArrowLeft") next = (i - 1 + categories.length) % categories.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = categories.length - 1;

    select(categories[next].id);
    document.getElementById(`work-tab-${categories[next].id}`)?.focus();
  };

  const current = categories.find((c) => c.id === shownCategory)!;

  return (
    <section ref={sectionRef} className="work-section" id="work">
      <div
        className="featured-header reveal-item"
        style={{ "--d": "0ms" } as CSSProperties}
      >
        <div className="featured-title">
          <FeaturedTitle />
        </div>

        <a
          href={GITHUB_URL}
          className="featured-arrow"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="More projects on GitHub (opens in a new tab)"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div
        className="work-filters reveal-item"
        style={{ "--d": "70ms" } as CSSProperties}
        role="tablist"
        aria-label="Project category"
      >
        {categories.map((c) => {
          const active = c.id === activeCategory;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`work-tab-${c.id}`}
              aria-selected={active}
              aria-controls="work-panel"
              tabIndex={active ? 0 : -1}
              className={`work-filter${active ? " active" : ""}`}
              onClick={() => select(c.id)}
              onKeyDown={onTabKeyDown}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        className={`featured-projects${leaving ? " is-leaving" : ""}`}
        id="work-panel"
        role="tabpanel"
        aria-labelledby={`work-tab-${activeCategory}`}
        data-count={current.projects.length}
      >
        {current.projects.map((p, i) => (
          <ProjectCard key={`${shownCategory}-${p.id}`} project={p} index={i} />
        ))}
      </div>

      <div
        className="work-bottom reveal-item"
        style={{ "--d": "320ms" } as CSSProperties}
      >
        <p>
          REAL SYSTEMS.
          <br />
          APPLIED ENGINEERING.
        </p>

        <span>
          Explore projects across production software,
          full-stack systems and applied machine learning.
        </span>
      </div>
    </section>
  );
}

export default Work;
