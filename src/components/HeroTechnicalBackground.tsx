type HeroTechnicalBackgroundProps = {
  reducedMotion?: boolean;
};

type ArcFragment = {
  path: string;
  direction: "cw" | "ccw";
  duration: number;
  delay: number;
  width?: number;
};

type TechIconName = "code" | "terminal" | "nodes" | "database" | "cube" | "brackets" | "bolt" | "layers";

type TechIcon = {
  name: TechIconName;
  x: number;
  y: number;
  duration: number;
  delay: number;
  direction: "forward" | "reverse";
};

const ARC_FRAGMENTS: readonly ArcFragment[] = [
  { path: "M478 187 A456 221 0 0 1 755 96", direction: "cw", duration: 13.7, delay: -4.2 },
  { path: "M1110 104 A470 228 0 0 1 1328 227", direction: "ccw", duration: 17.3, delay: -11.6, width: 2 },
  { path: "M1270 417 A430 208 0 0 1 1053 507", direction: "cw", duration: 11.9, delay: -7.4 },
  { path: "M686 510 A404 195 0 0 1 493 418", direction: "ccw", duration: 19.1, delay: -2.8 },
  { path: "M566 208 A350 169 0 0 1 722 128", direction: "cw", duration: 9.8, delay: -6.1, width: 1 },
  { path: "M1088 480 A336 162 0 0 1 1203 408", direction: "ccw", duration: 15.4, delay: -9.7 },
  { path: "M899 84 A510 247 0 0 1 1102 111", direction: "cw", duration: 22.7, delay: -13.4, width: 1 },
  { path: "M599 452 A490 237 0 0 1 478 372", direction: "ccw", duration: 12.6, delay: -1.9 },
  { path: "M396 268 A508 246 0 0 1 470 184", direction: "cw", duration: 18.2, delay: -15.2, width: 1 },
  { path: "M1265 177 A484 234 0 0 1 1371 275", direction: "ccw", duration: 14.6, delay: -5.8 },
  { path: "M1164 496 A398 192 0 0 1 1034 526", direction: "cw", duration: 20.3, delay: -8.9 },
  { path: "M518 393 A390 188 0 0 1 575 458", direction: "ccw", duration: 10.7, delay: -3.6, width: 2 },
  { path: "M641 137 A334 161 0 0 1 759 105", direction: "cw", duration: 16.8, delay: -12.1 },
  { path: "M1063 126 A322 155 0 0 1 1188 179", direction: "ccw", duration: 12.2, delay: -6.5, width: 1 },
  { path: "M1234 363 A365 176 0 0 1 1173 448", direction: "cw", duration: 21.6, delay: -17.3 },
  { path: "M625 469 A370 179 0 0 1 546 403", direction: "ccw", duration: 13.1, delay: -9.2 },
  { path: "M778 103 A286 138 0 0 1 870 95", direction: "cw", duration: 8.9, delay: -2.4, width: 1 },
  { path: "M932 520 A292 141 0 0 1 1026 497", direction: "ccw", duration: 18.9, delay: -14.7 },
  { path: "M529 313 A352 170 0 0 1 541 243", direction: "cw", duration: 11.4, delay: -7.8, width: 2 },
  { path: "M1212 288 A347 168 0 0 1 1226 355", direction: "ccw", duration: 15.9, delay: -4.9, width: 1 },
  { path: "M713 492 A270 130 0 0 1 649 455", direction: "cw", duration: 23.4, delay: -19.2 },
  { path: "M1097 153 A266 128 0 0 1 1154 189", direction: "ccw", duration: 10.3, delay: -1.2, width: 2 },
  { path: "M414 344 A476 230 0 0 1 444 414", direction: "cw", duration: 17.7, delay: -10.6, width: 1 },
  { path: "M1323 243 A458 221 0 0 1 1349 326", direction: "ccw", duration: 14.1, delay: -8.3 },
];

const TECH_ICONS: readonly TechIcon[] = [
  { name: "terminal", x: 392, y: 113, duration: 14.8, delay: -6.7, direction: "forward" },
  { name: "nodes", x: 1418, y: 155, duration: 18.4, delay: -11.3, direction: "reverse" },
  { name: "code", x: 306, y: 433, duration: 12.7, delay: -2.6, direction: "forward" },
  { name: "database", x: 1451, y: 438, duration: 20.1, delay: -15.4, direction: "reverse" },
  { name: "cube", x: 695, y: 71, duration: 16.2, delay: -9.9, direction: "forward" },
  { name: "brackets", x: 1091, y: 548, duration: 13.9, delay: -4.1, direction: "reverse" },
  { name: "bolt", x: 517, y: 328, duration: 17.6, delay: -12.8, direction: "forward" },
  { name: "layers", x: 1235, y: 308, duration: 11.6, delay: -7.2, direction: "reverse" },
];

function TechGlyph({ name }: { name: TechIconName }) {
  switch (name) {
    case "terminal":
      return <><rect x="-11" y="-8" width="22" height="16" rx="1" /><path d="M-7 -3 L-3 0 L-7 3 M0 4 H6" /></>;
    case "nodes":
      return <><path d="M-7 -5 L0 0 L7 -5 M0 0 V7" /><circle cx="-7" cy="-5" r="2" /><circle cx="7" cy="-5" r="2" /><circle cy="7" r="2" /></>;
    case "code":
      return <><path d="M-5 -7 L-10 0 L-5 7 M5 -7 L10 0 L5 7 M2 -10 L-2 10" /></>;
    case "database":
      return <><ellipse cy="-6" rx="9" ry="3" /><path d="M-9 -6 V6 C-9 10 9 10 9 6 V-6 M-9 0 C-9 4 9 4 9 0" /></>;
    case "cube":
      return <><path d="M0 -10 L9 -5 V5 L0 10 L-9 5 V-5 Z M-9 -5 L0 0 L9 -5 M0 0 V10" /></>;
    case "brackets":
      return <><path d="M-3 -9 H-9 V9 H-3 M3 -9 H9 V9 H3" /></>;
    case "bolt":
      return <path d="M2 -11 L-7 1 H-1 L-3 11 L8 -3 H2 Z" />;
    case "layers":
      return <><path d="M0 -10 L10 -5 L0 0 L-10 -5 Z M-10 0 L0 5 L10 0 M-10 5 L0 10 L10 5" /></>;
  }
}

/** A quiet blueprint layer that frames the portrait, not the headline. */
export default function HeroTechnicalBackground({
  reducedMotion = false,
}: HeroTechnicalBackgroundProps) {
  return (
    <div className="hero-technical-bg" aria-hidden="true">
      <svg className="hero-tech-svg" viewBox="0 0 1896 616" preserveAspectRatio="none" focusable="false">
        {/* Incomplete rings keep the portrait as the centre of gravity. */}
        <g className="hero-tech-halos">
          <ellipse cx="875" cy="308" rx="520" ry="252" />
          <ellipse cx="875" cy="308" rx="438" ry="212" />
          <path d="M356 309 H505 M1245 309 H1394" />
          <path d="M875 55 V104 M875 512 V561" />
        </g>

        <g className="hero-tech-ticks">
          <path d="M355 294 V324 M380 301 V317 M405 304 V314" />
          <path d="M1345 294 V324 M1320 301 V317 M1295 304 V314" />
          <path d="M860 55 H890 M866 79 H884 M860 561 H890 M866 537 H884" />
          <path d="M515 104 L535 124 M1215 492 L1235 512" />
        </g>

        <g className="hero-tech-crosshairs">
          <path d="M492 151 H526 M509 134 V168" />
          <path d="M1224 448 H1258 M1241 431 V465" />
          <circle cx="509" cy="151" r="4" />
          <circle cx="1241" cy="448" r="4" />
        </g>

        <g className="hero-tech-axes">
          <path d="M155 553 H338 M155 545 V561 M216 549 V557 M277 549 V557 M338 545 V561" />
          <path d="M1558 62 H1741 M1558 54 V70 M1619 58 V66 M1680 58 V66 M1741 54 V70" />
        </g>

        {!reducedMotion && (
          <g className="hero-tech-active">
            {/* Offset arc fragments create an irregular, living blueprint signal. */}
            {ARC_FRAGMENTS.map((arc, index) => (
              <path
                key={`${arc.direction}-${index}`}
                className={`hero-tech-arc hero-tech-arc--${arc.direction}`}
                d={arc.path}
                style={{
                  "--arc-duration": `${arc.duration}s`,
                  "--arc-delay": `${arc.delay}s`,
                  "--arc-width": arc.width ?? 1.5,
                } as React.CSSProperties}
              />
            ))}
            {TECH_ICONS.map((icon, index) => (
              <g key={`${icon.name}-${index}`} transform={`translate(${icon.x} ${icon.y})`}>
                <g
                  className={`hero-tech-icon hero-tech-icon--${icon.direction}`}
                  style={{
                    "--icon-duration": `${icon.duration}s`,
                    "--icon-delay": `${icon.delay}s`,
                  } as React.CSSProperties}
                >
                  <TechGlyph name={icon.name} />
                </g>
              </g>
            ))}
            <path className="hero-tech-scan" d="M478 110 A520 252 0 0 1 1265 117" />
            <circle className="hero-tech-orb hero-tech-orb-one" r="4">
              <animateMotion dur="12s" repeatCount="indefinite" path="M355 308 A520 252 0 0 1 1395 308 A520 252 0 0 1 355 308" />
            </circle>
            <circle className="hero-tech-orb hero-tech-orb-two" r="3">
              <animateMotion dur="16s" repeatCount="indefinite" path="M437 308 A438 212 0 0 0 1313 308 A438 212 0 0 0 437 308" />
            </circle>
          </g>
        )}
      </svg>

      <div className="hero-tech-label hero-tech-label--north">PORTRAIT / 01</div>
      <div className="hero-tech-label hero-tech-label--east">SIGNAL / ACTIVE</div>
      <div className="hero-tech-label hero-tech-label--south">COORD 47.61 / 18.04</div>
      <div className="hero-tech-status"><span /> SYSTEM ONLINE</div>
    </div>
  );
}
