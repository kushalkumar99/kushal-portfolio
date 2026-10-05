import { forwardRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "../icons";
import "../../styles/3d-card.css";

export interface InteractiveProjectCardProps {
  title: string;
  type?: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  actionLabel?: string;
  className?: string;
}

/** A keyboard-accessible project card with a subtle, pointer-driven 3D tilt. */
export const InteractiveProjectCard = forwardRef<
  HTMLDivElement,
  InteractiveProjectCardProps
>(function InteractiveProjectCard(
  { title, type, imageUrl, imageAlt, href, actionLabel = "View project", className = "" },
  ref,
) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 18, stiffness: 180 };
  const rotateX = useTransform(useSpring(mouseY, spring), [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(useSpring(mouseX, spring), [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - left) / width - 0.5);
    mouseY.set((event.clientY - top) / height - 0.5);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`interactive-project-card-wrap ${className}`.trim()}>
      <motion.div
        ref={ref}
        className="interactive-project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <img
          className="interactive-project-card-image"
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
        />
        <div className="interactive-project-card-overlay" aria-hidden="true" />
        <div className="interactive-project-card-content">
          <div className="interactive-project-card-copy">
            {type && <span className="interactive-project-card-type">{type}</span>}
            <h3 className="interactive-project-card-title">{title}</h3>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="interactive-project-card-action"
            aria-label={`View ${title} on GitHub (opens in a new tab)`}
          >
            <span>{actionLabel}</span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </motion.div>
    </div>
  );
});
