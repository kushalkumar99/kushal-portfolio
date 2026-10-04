export default function HeroTechnicalBackground({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className="hero-technical-bg" aria-hidden="true">
      <div className="hero-tech-grid" />

      <svg
        className="hero-tech-svg"
        viewBox="0 0 1896 616"
        preserveAspectRatio="none"
      >
        <g className="hero-tech-lines">
          {/* Left system */}
          <path d="M0 132 H210 V88 H410" />
          <path d="M0 475 H170 V425 H430 V385" />
          <path d="M300 35 V88 H410" />
          <path d="M170 425 V525 H330" />

          {/* Upper-right system */}
          <path d="M1270 76 H1435 V112 H1896" />
          <path d="M1480 112 V180 H1640" />
          <path d="M1690 112 V72 H1810" />

          {/* Lower-right system */}
          <path d="M1320 510 H1470 V465 H1690 V420 H1896" />
          <path d="M1470 465 V535 H1580" />

          {/* Small central bridge — kept outside the face */}
          <path d="M610 520 H700 V565 H790" />
          <path d="M1100 540 H1180 V505 H1260" />
        </g>

        <g className="hero-tech-nodes">
          <circle cx="210" cy="132" r="3" />
          <circle cx="410" cy="88" r="3" />
          <circle cx="170" cy="425" r="3" />
          <circle cx="430" cy="385" r="3" />
          <circle cx="330" cy="525" r="3" />

          <circle cx="1270" cy="76" r="3" />
          <circle cx="1435" cy="112" r="3" />
          <circle cx="1640" cy="180" r="3" />
          <circle cx="1810" cy="72" r="3" />

          <circle cx="1470" cy="465" r="3" />
          <circle cx="1690" cy="420" r="3" />
          <circle cx="1580" cy="535" r="3" />

          <circle cx="610" cy="520" r="2.5" />
          <circle cx="790" cy="565" r="2.5" />
          <circle cx="1100" cy="540" r="2.5" />
          <circle cx="1260" cy="505" r="2.5" />
        </g>

        {!reducedMotion && (
          <>
            {/* A moving signal travels along the same engineering paths. */}
            <circle className="hero-tech-pulse hero-tech-pulse-one" r="4">
              <animateMotion dur="7s" repeatCount="indefinite" path="M0 132 H210 V88 H410" />
            </circle>

            <circle className="hero-tech-pulse hero-tech-pulse-two" r="4">
              <animateMotion dur="9s" repeatCount="indefinite" path="M1270 76 H1435 V112 H1896" />
            </circle>

            <circle className="hero-tech-pulse hero-tech-pulse-three" r="3.5">
              <animateMotion dur="11s" repeatCount="indefinite" path="M1320 510 H1470 V465 H1690 V420 H1896" />
            </circle>

            <path className="hero-tech-signal hero-tech-signal-one" d="M0 132 H210 V88 H410" />
            <path className="hero-tech-signal hero-tech-signal-two" d="M1270 76 H1435 V112 H1896" />
            <path className="hero-tech-signal hero-tech-signal-three" d="M0 475 H170 V425 H430 V385" />
            <path className="hero-tech-signal hero-tech-signal-four" d="M1320 510 H1470 V465 H1690 V420 H1896" />
          </>
        )}
      </svg>

      <div className="hero-tech-label hero-tech-label-one">
        SYSTEM / 01
      </div>
      <div className="hero-tech-label hero-tech-label-two">
        DATA FLOW
      </div>
      <div className="hero-tech-label hero-tech-label-three">
        NODE / ACTIVE
      </div>
      <div className="hero-tech-label hero-tech-label-four">
        BUILD / 26.10
      </div>
    </div>
  );
}
