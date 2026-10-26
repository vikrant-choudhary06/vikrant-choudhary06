"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./StackConnections.module.css";

export function StackConnections() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: host, offset: ["start 85%", "end 30%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const first = useTransform(progress, [0, .35], [.25, 1]);
  const second = useTransform(progress, [.2, .6], [.25, 1]);
  const third = useTransform(progress, [.45, .85], [.25, 1]);
  const last = useTransform(progress, [.7, 1], [.25, 1]);
  return <div ref={host} className={styles.connections} aria-hidden="true">
    <svg viewBox="0 0 1000 110" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.path d="M85 55H915" strokeDasharray="4 10" opacity=".16" />
      <motion.path d="M85 55H915" style={{ pathLength: reduced ? 1 : progress }} />
      {[{ x: 85, label: "INTERFACE", opacity: first }, { x: 365, label: "API", opacity: second }, { x: 635, label: "DATABASE", opacity: third }, { x: 915, label: "INFRA", opacity: last }].map((node) => <motion.g key={node.label} style={{ opacity: reduced ? 1 : node.opacity }}>
        <circle cx={node.x} cy="55" r="23" className={styles.node} />
        <circle cx={node.x} cy="55" r="5" fill="currentColor" stroke="none" />
        <text x={node.x} y="105" textAnchor="middle" stroke="none" fill="currentColor">{node.label}</text>
      </motion.g>)}
    </svg>
  </div>;
}
