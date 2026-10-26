"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./ScrollNavigation.module.css";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
const TICKS = Array.from({ length: 51 }, (_, index) => index * 2);
const MotionLink = motion.create(Link);

function SectionLabel({ id, label, index, reached, active }: {
  id: string; label: string; index: number; reached: boolean; active: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionLink
      href={`/#${id}`}
      onClick={(event) => {
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        history.replaceState(null, "", `/#${id}`);
        window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72), behavior: reducedMotion ? "instant" : "smooth" });
      }}
      className={styles.sectionLabel}
      aria-label={label}
      aria-current={active ? "location" : undefined}
      aria-hidden={!reached}
      tabIndex={reached ? 0 : -1}
      initial={false}
      animate={{
        y: 72 + index * 48,
        scale: active ? 1 : .7,
      }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 26, mass: .65 }}
      style={{ pointerEvents: reached ? "auto" : "none" }}
    >
      {Array.from(label).map((letter, letterIndex) => (
        <motion.span
          key={letterIndex}
          aria-hidden="true"
          className={styles.letter}
          initial={false}
          animate={reached
            ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
            : { x: reducedMotion ? 0 : 65, y: reducedMotion ? 0 : 90, rotate: reducedMotion ? 0 : -90, scale: .45, opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : {
            duration: .65,
            ease: [.22, 1, .36, 1],
            // The last letter leads the backward wave; scrolling up reverses it.
            delay: (reached ? label.length - 1 - letterIndex : letterIndex) * .045,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </MotionLink>
  );
}

interface NavigationLayout {
  height: number;
  maximum: number;
  starts: number[];
}

export function ScrollNavigation() {
  const [layout, setLayout] = useState<NavigationLayout>({ height: 900, maximum: 1, starts: [] });
  const [active, setActive] = useState<string>("hero");
  const activeRef = useRef("hero");
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const smoothScroll = useSpring(scrollY, { stiffness: 160, damping: 28, mass: .55 });
  const visualScroll = reducedMotion ? scrollY : smoothScroll;
  const visualProgress = useTransform(visualScroll, (value) => Math.max(0, Math.min(1, value / Math.max(1, layout.maximum))));
  const indicatorY = useTransform(visualProgress, (value) => Math.max(20, Math.min(layout.height - 25, value * layout.height)));
  const tickOffset = useTransform(() => indicatorY.get() - visualProgress.get() * layout.height * 1.7);
  const percentText = useTransform(visualProgress, (value) => `${String(Math.round(value * 100)).padStart(3, "0")}%`);
  const drag = useRef<{ y: number; scroll: number } | null>(null);
  const range = useRef<HTMLInputElement>(null);

  useMotionValueEvent(scrollY, "change", (value) => {
    const progress = Math.max(0, Math.min(1, value / Math.max(1, layout.maximum)));
    let next = "hero";
    layout.starts.forEach((top, index) => { if (top <= value + layout.height * .2) next = SECTIONS[index].id; });
    if (progress > .995) next = "contact";
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
    if (range.current) {
      range.current.value = String(progress * 100);
      range.current.setAttribute("aria-valuetext", `${Math.round(progress * 100)} percent, ${next}`);
    }
  });

  useEffect(() => {
    // Clear state left by the removed horizontal experiment during Fast Refresh.
    delete document.documentElement.dataset.horizontalJourney;
    document.querySelectorAll<HTMLElement>("[data-horizontal-start]").forEach(element => delete element.dataset.horizontalStart);
    let frame = 0;
    let disposed = false;
    const desktop = window.matchMedia("(min-width: 0px)");
    const update = () => {
      frame = 0;
      if (!desktop.matches || disposed) return;
      const height = window.innerHeight;
      const maximum = Math.max(1, document.documentElement.scrollHeight - height);
      // Cache document offsets only when layout changes, never on scroll.
      const starts = SECTIONS.map((section) => {
        const element = document.getElementById(section.id);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
      });
      setLayout({ height, maximum, starts });
      smoothScroll.jump(scrollY.get());
      let next = "hero";
      starts.forEach((top, index) => { if (top <= window.scrollY + height * .2) next = SECTIONS[index].id; });
      activeRef.current = next;
      setActive(next);
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, [scrollY, smoothScroll]);

  const moveTo = (progress: number) => {
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: Math.max(0, Math.min(1, progress)) * maximum, behavior: "instant" });
  };
  const currentProgress = () => scrollY.get() / Math.max(1, layout.maximum);

  return (
    <nav className={styles.overlay} aria-label="Page section navigation">
      <div className={styles.accessibleLinks}>
        {SECTIONS.map((section) => <Link key={section.id} href={`/#${section.id}`}>Jump to {section.label}</Link>)}
      </div>
      {layout.starts.length > 0 && SECTIONS.map((section, index) => (
        <SectionLabel key={section.id} id={section.id} label={section.label}
          index={index} reached={index <= SECTIONS.findIndex((item) => item.id === active)}
          active={active === section.id} />
      ))}
      <div
        className={styles.ruler}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          drag.current = { y: event.clientY, scroll: window.scrollY };
          event.currentTarget.setPointerCapture(event.pointerId);
          range.current?.focus({ preventScroll: true });
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const maximum = document.documentElement.scrollHeight - window.innerHeight;
          if (maximum > 0) moveTo(drag.current.scroll / maximum + (event.clientY - drag.current.y) / window.innerHeight);
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}
      >
        <motion.div aria-hidden="true" style={{ y: tickOffset }}>
          {TICKS.map((tick) => {
            const y = tick / 100 * layout.height * 1.7;
            return (
              <span key={tick} className={`${styles.tick} ${tick % 10 === 0 ? styles.major : ""}`} style={{ transform: `translateY(${y}px)` }}>
                {tick % 10 === 0 && <span className={styles.tickNumber}>{tick}</span>}
              </span>
            );
          })}
        </motion.div>
        <motion.span aria-hidden="true" className={styles.indicator} style={{ y: indicatorY }}>
          <motion.span className={styles.percent}>{percentText}</motion.span>
        </motion.span>
        <input
          ref={range}
          type="range"
          min={0}
          max={100}
          step={.1}
          defaultValue={0}
          aria-label="Page scroll position"
          aria-orientation="vertical"
          className={styles.range}
          onChange={(event) => moveTo(Number(event.target.value) / 100)}
          onKeyDown={(event) => {
            const step = event.shiftKey ? .1 : .01;
            const targets: Record<string, number> = {
              Home: 0, End: 1,
              ArrowDown: currentProgress() + step, ArrowRight: currentProgress() + step,
              ArrowUp: currentProgress() - step, ArrowLeft: currentProgress() - step,
              PageDown: currentProgress() + .1, PageUp: currentProgress() - .1,
            };
            if (event.key in targets) {
              event.preventDefault();
              moveTo(targets[event.key]);
            }
          }}
        />
      </div>
    </nav>
  );
}
