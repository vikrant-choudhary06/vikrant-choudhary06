"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./NotebookBackground.module.css";
import { ControlRoomScene } from "./ControlRoomScene";

function DatabaseGlyph({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx="0" cy="0" rx="24" ry="9" />
    <path d="M-24 0v52c0 12 48 12 48 0V0M-24 18c0 12 48 12 48 0M-24 35c0 12 48 12 48 0" />
  </g>;
}

export function NotebookBackground() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const scroll = useSpring(scrollY, { stiffness: 90, damping: 28, mass: .6 });
  const diagramY = useTransform(scroll, (value) => reduced ? 0 : -Math.min(value * .025, 140));
  const drawn = useTransform(scrollYProgress, (value) => reduced ? 1 : .12 + value * .88);
  return <div className={styles.background} aria-hidden="true">
    <ControlRoomScene />
    <motion.svg className={styles.blueprint} viewBox="0 0 1440 1100" preserveAspectRatio="xMidYMid slice" style={{ y: diagramY }} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <g className={styles.structure}>
        <DatabaseGlyph x={84} y={310} /><DatabaseGlyph x={1350} y={760} />
        <rect x="1290" y="150" width="94" height="62" rx="5" />
        <path d="M1290 166h94M1300 158h2m7 0h2m7 0h2M1318 182l-8 8 8 8m33-16 8 8-8 8m-14-19-6 22" />
        <rect x="42" y="820" width="74" height="48" rx="5" />
        <path d="M60 844h38m-8-7 8 7-8 7" />
        <circle cx="1325" cy="470" r="17" /><circle cx="1367" cy="422" r="5" /><circle cx="1385" cy="500" r="5" /><circle cx="1260" cy="480" r="5" />
        <path d="M1337 457l26-31m-22 52 39 20m-72-25-43 6M84 372v76q0 20 20 20h25v70M79 808V680q0-20 20-20h26M1338 223v70q0 20-20 20h-25v85M1350 745V620q0-20-20-20h-26v-65" strokeDasharray="4 8" />
      </g>
      <motion.path className={styles.signal} d="M23 70v180q0 24 24 24h37v32m0 66v76q0 20 20 20h25v70M1417 110v150q0 24-24 24h-55v9q0 20-20 20h-25v85m57 347V620q0-20-20-20h-26v-65" style={{ pathLength: drawn }} />
    </motion.svg>
  </div>;
}
