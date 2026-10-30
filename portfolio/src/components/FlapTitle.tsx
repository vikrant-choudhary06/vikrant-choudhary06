"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * A heading whose letters flip down into place like a split-flap board the
 * first time it scrolls into view. Screen readers get the plain text.
 */
export function FlapTitle({ text, id, className }: { text: string; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shown = reduced || inView;
  let index = 0;

  return (
    <h2 ref={ref} id={id} className={className} aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap", perspective: "600px" }}>
          {Array.from(word).map((letter) => {
            const delay = index++ * 0.035;
            return (
              <motion.span
                key={delay}
                style={{ display: "inline-block", transformOrigin: "50% 0%", backfaceVisibility: "hidden" }}
                initial={false}
                animate={shown ? { rotateX: 0, opacity: 1 } : { rotateX: -90, opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < text.split(" ").length - 1 && "\u00a0"}
        </span>
      ))}
    </h2>
  );
}
