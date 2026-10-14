"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ScrollNavigation.module.css";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
const TICKS = Array.from({ length: 51 }, (_, index) => index * 2);

interface NavigationState {
  progress: number;
  height: number;
  active: string;
  positions: number[];
}

export function ScrollNavigation() {
  const [navigation, setNavigation] = useState<NavigationState>({ progress: 0, height: 0, active: "hero", positions: [] });
  const drag = useRef<{ y: number; scroll: number } | null>(null);
  const range = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      frame = 0;
      if (!desktop.matches || disposed) return;
      const height = window.innerHeight;
      const maximum = Math.max(0, document.documentElement.scrollHeight - height);
      const progress = maximum ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      // Labels stay attached to the real section position. Never clamp/pin them.
      const positions = SECTIONS.map((section) => document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity);
      let active: string = "hero";
      positions.forEach((top, index) => { if (top <= height * .2) active = SECTIONS[index].id; });
      if (maximum > 0 && progress > .995) active = "contact";
      setNavigation({ progress, height, active, positions: positions.map((top) => top + 72) });
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  const moveTo = (progress: number) => {
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: Math.max(0, Math.min(1, progress)) * maximum, behavior: "instant" });
  };
  const indicator = Math.max(20, Math.min(navigation.height - 25, navigation.progress * navigation.height));
  const percent = Math.round(navigation.progress * 100);

  return (
    <nav className={styles.overlay} aria-label="Page section navigation">
      <div className={styles.accessibleLinks}>
        {SECTIONS.map((section) => <Link key={section.id} href={`/#${section.id}`}>Jump to {section.label}</Link>)}
      </div>
      {SECTIONS.map((section, index) => {
        const y = navigation.positions[index];
        const visible = Number.isFinite(y) && y >= -70 && y <= navigation.height + 40;
        const approaching = y > navigation.height * .3 && y < navigation.height - 50;
        return (
          <Link
            key={section.id}
            href={`/#${section.id}`}
            hidden={!visible}
            className={styles.sectionLabel}
            aria-current={navigation.active === section.id ? "location" : undefined}
            style={visible ? { transform: `translateY(${y}px) rotate(${approaching ? -90 : 0}deg)` } : undefined}
          >
            {section.label}
          </Link>
        );
      })}
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
        <div aria-hidden="true">
          {TICKS.map((tick) => {
            const y = (tick / 100 - navigation.progress) * navigation.height * 1.7 + indicator;
            return (
              <span key={tick} hidden={y < 0 || y > navigation.height} className={`${styles.tick} ${tick % 10 === 0 ? styles.major : ""}`} style={{ transform: `translateY(${y}px)` }}>
                {tick % 10 === 0 && <span className={styles.tickNumber}>{tick}</span>}
              </span>
            );
          })}
          <span className={styles.indicator} style={{ transform: `translateY(${indicator}px)` }}>
            <span className={styles.percent}>{String(percent).padStart(3, "0")}%</span>
          </span>
        </div>
        <input
          ref={range}
          type="range"
          min={0}
          max={100}
          step={.1}
          value={navigation.progress * 100}
          aria-label="Page scroll position"
          aria-orientation="vertical"
          aria-valuetext={`${percent} percent, ${SECTIONS.find((section) => section.id === navigation.active)?.label}`}
          className={styles.range}
          onChange={(event) => moveTo(Number(event.target.value) / 100)}
          onKeyDown={(event) => {
            const step = event.shiftKey ? .1 : .01;
            const targets: Record<string, number> = {
              Home: 0, End: 1,
              ArrowDown: navigation.progress + step, ArrowRight: navigation.progress + step,
              ArrowUp: navigation.progress - step, ArrowLeft: navigation.progress - step,
              PageDown: navigation.progress + .1, PageUp: navigation.progress - .1,
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
