import { useRef } from "react";
import { ArrowUpRight, BrandIcon, Mail } from "./icons";
import KineticGrid from "./ui/kinetic-grid";
import { useInViewReplay } from "../hooks/useInViewReplay";
import "../styles/contact.css";

const EMAIL = "kushalkumar21k@gmail.com";

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/kushalkumar99",
    icon: <BrandIcon id="github" size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kushalkumar9921?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: <BrandIcon id="linkedin" size={17} />,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: <Mail size={18} />,
  },
];

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Replayable reveal: adds .is-armed / toggles .is-in on the section.
     No scroll listeners, no per-frame work, no React state. */
  useInViewReplay(sectionRef);

  return (
    <footer
      ref={sectionRef}
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <KineticGrid className="contact-grid">
        <div className="contact-orbit" aria-hidden="true" />

        <div className="contact-content">
        {/* Label */}

        <div className="contact-label" data-reveal style={{ ["--d" as string]: "0ms" }}>
          
        </div>

        {/* Main */}

        <div className="contact-main">
          <div className="contact-heading">
            <h2
              id="contact-heading"
              data-reveal
              style={{ ["--d" as string]: "80ms" }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              USEFUL.
            </h2>
          </div>

          <div className="contact-side">
            <p data-reveal style={{ ["--d" as string]: "160ms" }}>
              Open to full-time opportunities in software
              engineering, with a focus on scalable systems
              and machine learning.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="contact-cta"
              data-reveal
              style={{ ["--d" as string]: "240ms" }}
            >
              <span aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
              <strong>GET IN TOUCH</strong>
            </a>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="contact-bottom"
          data-reveal
          style={{ ["--d" as string]: "300ms" }}
        >
          <span className="copyright">© 2026 K KUSHAL KUMAR</span>

          <div className="contact-socials">
            {contactLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  aria-label={
                    external ? `${link.label} (opens in a new tab)` : link.label
                  }
                  className="contact-social"
                >
                  <span aria-hidden="true">{link.icon}</span>
                </a>
              );
            })}
          </div>
        </div>
        </div>
      </KineticGrid>
    </footer>
  );
}

export default Contact;
