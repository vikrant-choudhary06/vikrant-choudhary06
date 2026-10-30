"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Hero.module.css";

export interface TerminalLine {
  kind: "command" | "output";
  text: string;
}

// Starts typing once the hero intro has settled (see the choreography in Hero.module.css).
const START_AFTER_MS = 2800;
const MS_PER_CHARACTER = 24;

/** A small terminal that types out who I am and what I'm building right now. */
export function HeroTerminal({ lines }: { lines: TerminalLine[] }) {
  const reduced = useReducedMotion();
  const total = lines.reduce((sum, line) => sum + line.text.length, 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let interval = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTyped((count) => {
          if (count >= total) window.clearInterval(interval);
          return Math.min(total, count + 1);
        });
      }, MS_PER_CHARACTER);
    }, START_AFTER_MS);
    return () => { window.clearTimeout(timeout); window.clearInterval(interval); };
  }, [reduced, total]);

  const shown = reduced ? total : typed;
  // Where each line starts in the overall character count.
  const starts = lines.map((_, index) => lines.slice(0, index).reduce((sum, line) => sum + line.text.length, 0));
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar} aria-hidden="true"><span /><span /><span /></div>
      {/* Screen readers get the full text at once; the typing is visual only. */}
      <p className="sr-only">{lines.map((line) => line.text).join(". ")}</p>
      <div aria-hidden="true">
        {lines.map((line, index) => {
          const visible = line.text.slice(0, Math.max(0, shown - starts[index]));
          const typing = visible.length > 0 && visible.length < line.text.length;
          const done = index === lines.length - 1 && shown >= total;
          return (
            <p key={index} className={line.kind === "command" ? styles.command : styles.output}>
              {line.kind === "command" && <span className={styles.prompt}>$ </span>}
              {visible}
              {(typing || done) && <span className={styles.caret} />}
            </p>
          );
        })}
      </div>
    </div>
  );
}
