"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** A list item that unfolds from its top edge, like a notebook page, as it scrolls in. */
export function FoldInItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      className={className}
      style={{ transformOrigin: "50% 0%" }}
      initial={reduced ? false : { rotateX: -18, opacity: 0.35 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  );
}
