import { useEffect, useRef, useState } from "react";

type RandomLetterSwapProps = {
  label: string;
  className?: string;
  staggerDuration?: number;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

/**
 * Scrambles a label briefly, then resolves it from left to right on hover or
 * keyboard focus. It is a presentational span so it can live inside a link.
 */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
}: RandomLetterSwapProps) {
  const characters = Array.from(label);
  const [displayedLabel, setDisplayedLabel] = useState(label);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const play = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clearTimers();
    setDisplayedLabel(
      characters.map((character) => (character === " " ? character : randomLetter())).join(""),
    );

    characters.forEach((_character, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setDisplayedLabel((current) =>
            Array.from(current)
              .map((currentCharacter, characterIndex) =>
                characterIndex <= index
                  ? characters[characterIndex]
                  : currentCharacter,
              )
              .join(""),
          );
        }, (index + 1) * staggerDuration * 1000),
      );
    });
  };

  return (
    <span
      aria-label={label}
      className={className ? `random-letter-swap ${className}` : "random-letter-swap"}
      onFocus={play}
      onMouseEnter={play}
      role="text"
    >
      <span aria-hidden="true">{displayedLabel}</span>
    </span>
  );
}
