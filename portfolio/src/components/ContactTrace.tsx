"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ContactTrace() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: host, offset: ["start 90%", "end 75%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12] text-ink">
    <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.path d="M0 120H75Q110 120 110 155V590Q110 635 160 635H390Q435 635 435 590V510Q435 480 470 480H520" style={{ pathLength: reduced ? 1 : progress }} />
      <motion.path d="M520 455h60v45h-60zM520 455l30 24 30-24" style={{ pathLength: reduced ? 1 : progress }} />
    </svg>
  </div>;
}
