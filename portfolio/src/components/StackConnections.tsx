"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import styles from "./StackConnections.module.css";

// Top to bottom, the way a request travels through what I build.
const LAYERS = [
  { label: "Interface", detail: "React · Next.js" },
  { label: "API", detail: "NestJS · Express" },
  { label: "Database", detail: "PostgreSQL · Redis" },
  { label: "Infra", detail: "Cloudflare · Docker" },
];

function Layer({ index, spread, label, detail }: { index: number; spread: MotionValue<number>; label: string; detail: string }) {
  // The bottom layer stays put; each one above lifts further as the stack opens.
  const level = LAYERS.length - 1 - index;
  const z = useTransform(spread, (value) => level * value);
  return (
    <motion.div className={styles.layer} style={{ z }}>
      <span className={styles.label}>{label}</span>
      <span className={styles.detail}>{detail}</span>
    </motion.div>
  );
}

/** The stack as an exploded view: closed when it enters, opened by scrolling. */
export function StackConnections() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: host, offset: ["start 90%", "center 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const spread = useTransform(progress, (value) => (reduced ? 1 : value) * 64 + 8);
  return (
    <div ref={host} className={styles.connections} aria-hidden="true">
      <div className={styles.scene}>
        {LAYERS.map((layer, index) => <Layer key={layer.label} index={index} spread={spread} {...layer} />)}
      </div>
    </div>
  );
}
