import { useSectionSpy } from "../hooks/useSectionSpy";
import { ArrowUpRight } from "./icons";
import { RandomLetterSwap } from "./ui/random-letter-swap";
import "../styles/navbar.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

function Navbar() {
  const activeSection = useSectionSpy();

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="K Kushal Kumar, back to top">
        <span className="brand-mark" aria-hidden="true">K</span>
        <span>K Kushal Kumar</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.id}
              className={isActive ? "nav-link is-active" : "nav-link"}
              href={`#${link.id}`}
              aria-current={isActive ? "location" : undefined}
            >
              <RandomLetterSwap label={link.label} />
            </a>
          );
        })}
      </nav>

      <a className="talk-button" href="#contact">
        <span>Let&rsquo;s talk</span>
        <ArrowUpRight size={12} />
      </a>
    </header>
  );
}

export default Navbar;
