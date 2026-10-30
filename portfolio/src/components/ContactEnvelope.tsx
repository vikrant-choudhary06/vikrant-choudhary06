"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./ContactEnvelope.module.css";

/** Scrolling into Contact slides a letter into the envelope and folds the flap shut. */
export function ContactEnvelope() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Contact is the last section, so the page may not scroll much past it. Finish
  // as soon as the envelope is fully on screen, which is always reachable.
  const { scrollYProgress } = useScroll({ target: host, offset: ["start end", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const progress = useTransform(smooth, (value) => (reduced ? 1 : value));
  // First the letter drops in, then the flap closes, then the seal appears.
  const letterY = useTransform(progress, [0, .55], [-118, 6]);
  const flapAngle = useTransform(progress, [.5, .9], [180, 0]);
  // While open the flap sits behind the letter; once past upright it closes over it.
  const flapLayer = useTransform(flapAngle, (angle) => (angle < 90 ? 4 : 0));
  const sealScale = useTransform(progress, [.88, 1], [0, 1]);

  return (
    <div ref={host} className={styles.host} aria-hidden="true">
     <div className={styles.envelope}>
      <div className={styles.back} />
      <motion.div className={styles.letter} style={{ y: letterY }}>
        <span /><span /><span />
      </motion.div>
      <svg className={styles.pocket} viewBox="0 0 240 150" preserveAspectRatio="none">
        <path d="M1 45 L120 104 L239 45 V149 H1 Z" />
      </svg>
      <motion.svg className={styles.flap} viewBox="0 0 240 86" style={{ rotateX: flapAngle, zIndex: flapLayer }}>
        <path d="M1 1 H239 L120 85 Z" />
      </motion.svg>
      <motion.span className={styles.seal} style={{ scale: sealScale }} />
     </div>
    </div>
  );
}
