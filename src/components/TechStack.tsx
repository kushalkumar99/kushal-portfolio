import { useRef } from "react";
import type { CSSProperties } from "react";
import { BrandIcon, type BrandIconId } from "./icons";
import { useInViewReplay } from "../hooks/useInViewReplay";
import "../styles/tech-stack.css";

const technologies: ReadonlyArray<{
  name: string;
  icon: BrandIconId;
  className: string;
}> = [
  { name: "Python", icon: "python", className: "python" },
  { name: "JavaScript", icon: "javascript", className: "javascript" },
  { name: "TypeScript", icon: "typescript", className: "typescript" },
  { name: "React", icon: "react", className: "react" },
  { name: "Next.js", icon: "nextjs", className: "nextjs" },
  { name: "Flutter", icon: "flutter", className: "flutter" },
  { name: "Node.js", icon: "node", className: "node" },
  { name: "Supabase", icon: "supabase", className: "supabase" },
  { name: "PostgreSQL", icon: "postgresql", className: "postgresql" },
  { name: "MySQL", icon: "mysql", className: "mysql" },
  { name: "TensorFlow", icon: "tensorflow", className: "tensorflow" },
  { name: "PyTorch", icon: "pytorch", className: "pytorch" },
  { name: "Docker", icon: "docker", className: "docker" },
  { name: "AWS", icon: "aws", className: "aws" },
  { name: "Git", icon: "git", className: "git" },
];

/* Enough copies that one group-width of travel never exposes a gap,
   even on very wide screens. The track moves exactly one group per
   cycle (25% of its width with 4 copies), so the loop is seamless. */
const COPIES = 4;
const TECH_STACK_TITLE = "TECH STACK";

function TechStackTitle() {
  return (
    <h2 className="tech-stack-typewriter" aria-label={TECH_STACK_TITLE}>
      <span aria-hidden="true">
        {Array.from(TECH_STACK_TITLE).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="tech-stack-typewriter-char"
            style={{ "--i": index } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </h2>
  );
}

function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  useInViewReplay(sectionRef);

  return (
    <section ref={sectionRef} className="tech-stack-section" id="skills">
      <div className="tech-stack-label">
        <TechStackTitle />
      </div>

      <div className="tech-stack-tools">
        
      </div>

      <div className="tech-stack-marquee">
        <div className="tech-stack-track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul
              className="tech-stack-group"
              key={copy}
              aria-label={copy === 0 ? "Technologies" : undefined}
              aria-hidden={copy === 0 ? undefined : true}
            >
              {technologies.map((technology) => (
                <li
                  className="tech-item"
                  key={technology.name}
                  title={technology.name}
                >
                  <div
                    className={`tech-icon ${technology.className}`}
                    aria-hidden="true"
                  >
                    <BrandIcon id={technology.icon} size={16} />
                  </div>

                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
