"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, type MotionStyle } from "framer-motion";
import styles from "./Hero.module.css";

export function HeroMotion({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const portraitElement = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const destinationX = useMotionValue(0);
  const destinationY = useMotionValue(0);
  const destinationScale = useMotionValue(1);
  const settleAt = useMotionValue(1);
  const targetProgress = useTransform(() => reducedMotion ? 0 : Math.max(0, Math.min(1, scrollY.get() / settleAt.get())));
  const smoothProgress = useSpring(targetProgress, { stiffness: 85, damping: 23, mass: .8, restDelta: .0001, restSpeed: .0001 });
  const progress = useTransform(smoothProgress, (value) => value > .9995 ? 1 : value < .0005 ? 0 : Math.max(0, Math.min(1, value)));
  const eased = useTransform(progress, (value) => value * value * (3 - 2 * value));
  useEffect(() => {
    const root = stage.current;
    const portrait = root?.querySelector<HTMLElement>("[data-hero-portrait]");
    const slot = document.getElementById("about-portrait-slot");
    if (!root || !portrait || !slot) return;
    portraitElement.current = portrait;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const origin = root.getBoundingClientRect();
      const target = slot.getBoundingClientRect();
      const width = portrait.offsetWidth;
      const height = portrait.offsetHeight;
      // The square cutout is contained at the bottom of a taller hero box.
      // Match its visible size and bottom edge, rather than shrinking the whole box to the slot.
      const visibleSize = Math.min(width, height);
      const scale = Math.min(target.width, target.height) / Math.max(1, visibleSize);
      destinationX.set(target.left + target.width / 2 - (origin.left + portrait.offsetLeft + width / 2));
      destinationY.set(target.bottom - (origin.top + portrait.offsetTop + height / 2) - height * scale / 2);
      destinationScale.set(scale);
      const aboutTop = slot.closest("section")?.getBoundingClientRect().top ?? target.top;
      // Finish when About reaches the viewport, rather than waiting for its lower image slot.
      settleAt.set(Math.max(1, aboutTop + window.scrollY - 72));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(root); observer.observe(slot);
    observer.observe(document.body);
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => { disposed = true; portraitElement.current = null; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", schedule); };
  }, [destinationX, destinationY, destinationScale, settleAt]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 24 });
  const textX = useTransform(x, (value) => `${value * -12}px`);
  const textY = useTransform(y, (value) => `${value * -8}px`);
  const portraitTransform = useTransform(() => {
    if (reducedMotion) return "none";
    const amount = eased.get();
    const moveX = destinationX.get() * amount + x.get() * 6 * (1 - amount);
    const moveY = destinationY.get() * amount - Math.sin(progress.get() * Math.PI) * 40 + y.get() * 4 * (1 - amount);
    const scale = 1 + (destinationScale.get() - 1) * amount;
    return `translate3d(${moveX}px, ${moveY}px, 0) rotateY(${amount * 180}deg) scale(${scale})`;
  });
  // Write only the moving layer: inherited CSS variables would invalidate the entire hero every frame.
  useMotionValueEvent(portraitTransform, "change", (value) => {
    if (portraitElement.current) portraitElement.current.style.transform = value;
  });
  const reset = () => { pointerX.set(0); pointerY.set(0); };

  return <motion.div ref={stage} className={styles.stage}
    style={{ "--text-x": textX, "--text-y": textY } as MotionStyle}
    onPointerMove={(event) => {
      if (reducedMotion || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)));
      pointerY.set(Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)));
    }}
    onPointerLeave={reset}
    onPointerCancel={reset}
  >{children}</motion.div>;
}
