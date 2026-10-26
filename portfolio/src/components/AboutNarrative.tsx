"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const PARTS = [
  { text: "I’m " },
  { text: "Vikrant Kumar", bold: true },
  { text: ", " },
  { text: "Founder of MiidayStudio", link: true },
  { text: " and a " },
  { text: "backend-focused", highlight: true },
  { text: " Full Stack Developer. I specialize in building fast, optimized web applications and fine-tuning " },
  { text: "databases", highlight: true },
  { text: " for " },
  { text: "performance", highlight: true },
  { text: " at scale." },
];
const COUNT = PARTS.reduce((count, part) => count + part.text.split(/(\s+)/).filter((word) => word.trim()).length, 0);

function Word({ children, index, progress }: { children: string; index: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, [index / COUNT * .8, index / COUNT * .8 + .2], [.75, 1]);
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{children}</motion.span>;
}

export function AboutNarrative({ className }: { className: string }) {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: paragraph, offset: ["start 90%", "end 45%"] });
  let index = 0;
  return <p ref={paragraph} className={className}>{PARTS.map((part, partIndex) => {
    const words = part.text.split(/(\s+)/).map((word, wordIndex) => word.trim() ? <Word key={wordIndex} index={index++} progress={scrollYProgress}>{word}</Word> : word);
    if (part.bold) return <strong key={partIndex}>{words}</strong>;
    if (part.highlight) return <span className="about-highlight" key={partIndex}>{words}</span>;
    if (part.link) return <a key={partIndex} href="https://miidaystudio.online/" target="_blank" rel="noopener noreferrer">{words}</a>;
    return <span key={partIndex}>{words}</span>;
  })}</p>;
}
