"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, type MotionStyle } from "framer-motion";
import styles from "./Hero.module.css";
import type { ParticlePortrait } from "@/lib/particle-portrait";

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

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

  // Depth for the rest of the hero while the portrait flies to About: the name
  // falls back into the page, the tool icons scatter towards the camera and the
  // intro tilts away. Written straight to the elements, like the portrait.
  const depth = useRef<{
    backdrop: HTMLElement | null;
    intro: HTMLElement | null;
    icons: { element: HTMLElement; dx: number; dy: number }[];
    strength: number;
  }>({ backdrop: null, intro: null, icons: [], strength: 1 });
  const applyDepth = (value: number) => {
    const { backdrop, intro, icons, strength } = depth.current;
    // Finish in the first part of the journey, so the stage is clear while the portrait lands.
    const t = Math.min(1, Math.max(0, value / .45));
    const amount = t * t * (3 - 2 * t);
    const k = amount * strength;
    if (backdrop) {
      backdrop.style.transform = amount ? `perspective(1100px) rotateX(${k * 42}deg) translateZ(${-k * 260}px)` : "";
      backdrop.style.opacity = String(1 - amount * .85);
    }
    if (stage.current?.dataset.orbit !== "true") {
      icons.forEach(({ element, dx, dy }) => {
        element.style.transform = amount ? `translate3d(${dx * k * 260}px, ${dy * k * 200}px, ${k * 240}px)` : "";
        element.style.opacity = String(1 - amount);
      });
    }
    if (intro) {
      intro.style.transform = amount ? `perspective(1000px) rotateX(${k * 16}deg) translateY(${-k * 36}px)` : "";
      intro.style.opacity = String(1 - amount * .9);
    }
  };
  useMotionValueEvent(progress, "change", applyDepth);
  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      depth.current = {
        backdrop: root.querySelector<HTMLElement>('[data-depth="backdrop"]'),
        intro: root.querySelector<HTMLElement>('[data-depth="intro"]'),
        // Each icon flies outwards along the line from the stage centre to where it sits.
        icons: Array.from(root.querySelectorAll<HTMLElement>('[data-depth="icon"]')).map((element) => {
          const icon = (element.firstElementChild as HTMLElement | null)?.getBoundingClientRect();
          const x = icon ? icon.left + icon.width / 2 - cx : 0;
          const y = icon ? icon.top + icon.height / 2 - cy : 0;
          const length = Math.max(1, Math.hypot(x, y));
          return { element, dx: x / length, dy: y / length };
        }),
        strength: window.innerWidth < 768 ? .5 : 1,
      };
      applyDepth(progress.get());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [progress]);
  useEffect(() => {
    // Restore the current transform even when mounting at an existing scroll offset.
    const frame = requestAnimationFrame(() => {
      if (portraitElement.current) portraitElement.current.style.transform = portraitTransform.get();
    });
    return () => cancelAnimationFrame(frame);
  }, [portraitTransform]);
  // Particle portrait: on capable devices the hero photo is drawn as thousands of
  // GPU particles. They assemble the face on load, burst apart along the
  // portrait's flight on scroll and re-form in About, where the
  // real photo takes over. Without WebGL, or with reduced motion, the plain photo
  // and its flip (above) are used unchanged.
  const particleCanvas = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const root = stage.current;
    const canvas = particleCanvas.current;
    const portrait = root?.querySelector<HTMLElement>("[data-hero-portrait]");
    const image = portrait?.querySelector("img");
    if (!root || !canvas || !portrait || !image || reducedMotion !== false) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    // Hide the photo before the first paint, so the particles build it from nothing.
    portrait.style.opacity = "0";
    let system: ParticlePortrait | null = null;
    let disposed = false;
    let raf = 0;
    let introStart = 0;
    let lastActivity = 0;
    const INTRO_MS = 2400;
    let fit = { cover: false, px: .5, py: 1, ratio: 1 };

    const measureFit = () => {
      const style = getComputedStyle(image);
      const [px = "50%", py = "100%"] = style.objectPosition.split(" ");
      const fraction = (value: string) => value.endsWith("%") ? parseFloat(value) / 100 : .5;
      fit = { cover: style.objectFit === "cover", px: fraction(px), py: fraction(py), ratio: (image.naturalWidth || 1) / (image.naturalHeight || 1) };
    };

    const draw = (now: number) => {
      raf = 0;
      if (!system || disposed) return;
      if (!introStart) introStart = now;
      const intro = Math.min(1, (now - introStart) / INTRO_MS);
      const p = progress.get();
      const amount = eased.get();
      // The portrait's untransformed box, moved exactly like portraitTransform moves it.
      const origin = root.getBoundingClientRect();
      const width = portrait.offsetWidth;
      const height = portrait.offsetHeight;
      const moveX = destinationX.get() * amount + x.get() * 6 * (1 - amount);
      const moveY = destinationY.get() * amount - Math.sin(p * Math.PI) * 40 + y.get() * 4 * (1 - amount);
      const scale = 1 + (destinationScale.get() - 1) * amount;
      const cx = origin.left + portrait.offsetLeft + width / 2 + moveX;
      const cy = origin.top + portrait.offsetTop + height / 2 + moveY;
      const box = { x: cx - width * scale / 2, y: cy - height * scale / 2, width: width * scale, height: height * scale };
      // Where the image content sits inside that box (object-fit / object-position).
      const size = fit.cover ? Math.max(box.width / fit.ratio, box.height) : Math.min(box.width / fit.ratio, box.height);
      const contentWidth = size * fit.ratio;
      const rect = { x: box.x + (box.width - contentWidth) * fit.px, y: box.y + (box.height - size) * fit.py, width: contentWidth, height: size };

      // The real photo only returns once the portrait has landed in About.
      const photo = smoothstep(.9, 1, p);
      portrait.style.opacity = String(photo);
      system.render({
        rect, box, flip: amount, scatter: Math.sin(p * Math.PI), intro, opacity: 1 - photo, time: now / 1000,
      });
      const moving = intro < 1 || (p > .0005 && p < .9995) || now - lastActivity < 1200;
      if (moving) raf = requestAnimationFrame(draw);
    };
    const wake = () => {
      lastActivity = performance.now();
      if (!raf && !disposed) raf = requestAnimationFrame(draw);
    };
    const onResize = () => { system?.resize(); measureFit(); wake(); };

    measureFit();
    const stopProgress = progress.on("change", wake);
    window.addEventListener("resize", onResize);
    import("@/lib/particle-portrait")
      .then(({ createParticlePortrait }) => createParticlePortrait(canvas, image.currentSrc || image.src, window.innerWidth < 768 ? 9000 : 32000))
      .then((created) => {
        if (disposed) { created.dispose(); return; }
        system = created;
        wake();
      })
      .catch(() => { portrait.style.opacity = ""; });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      stopProgress();
      window.removeEventListener("resize", onResize);
      system?.dispose();
      portrait.style.opacity = "";
    };
  }, [reducedMotion, progress, eased, destinationX, destinationY, destinationScale, x, y]);

  // The name tilts with the mouse, as a whole, on its own layer.
  const nameTilt = useTransform(() => reducedMotion ? "" : `perspective(1400px) rotateY(${x.get() * 9}deg) rotateX(${-y.get() * 6}deg)`);
  useMotionValueEvent(nameTilt, "change", (value) => {
    const layer = stage.current?.querySelector<HTMLElement>("[data-tilt-layer]");
    if (layer) layer.style.transform = value;
  });

  // Orbit: on wide screens the tool icons become coins circling the portrait on a
  // tilted ring. Front coins pass over the face, back coins go behind it and
  // shrink. They slide out from behind the face after the intro, and on scroll
  // the ring breaks and they fly outwards.
  useEffect(() => {
    const root = stage.current;
    const portrait = root?.querySelector<HTMLElement>("[data-hero-portrait]");
    if (!root || !portrait || reducedMotion !== false) return;
    const wide = window.matchMedia("(min-width: 1100px)");
    let raf = 0;
    let visible = true;
    let disposed = false;
    const mountedAt = performance.now();
    type Coin = { wrapper: HTMLElement; nx: number; ny: number };
    let coins: Coin[] = [];
    let ring = { cx: 0, cy: 0, rx: 1, ry: 1 };

    const measure = () => {
      coins = Array.from(root.querySelectorAll<HTMLElement>('[data-depth="icon"]')).map((wrapper) => {
        const icon = wrapper.firstElementChild as HTMLElement | null;
        // Offsets are layout positions, so they ignore the transforms we write.
        return { wrapper, nx: icon ? icon.offsetLeft + icon.offsetWidth / 2 : 0, ny: icon ? icon.offsetTop + icon.offsetHeight / 2 : 0 };
      });
      const width = portrait.offsetWidth;
      const height = portrait.offsetHeight;
      const cx = portrait.offsetLeft + width / 2;
      // Keep the whole ring (plus a coin's width) inside the stage on the left.
      ring = { cx, cy: portrait.offsetTop + height * .48, rx: Math.max(80, Math.min(width * .55, cx - 56)), ry: height * .13 };
    };
    const clear = () => coins.forEach(({ wrapper }) => {
      wrapper.style.transform = "";
      wrapper.style.opacity = "";
      wrapper.style.zIndex = "";
      wrapper.style.transformOrigin = "";
    });

    const tick = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden || root.dataset.orbit !== "true") return;
      const seconds = (now - mountedAt) / 1000;
      // Coins emerge from behind the face once it has formed.
      const appear = smoothstep(2.2, 3.1, seconds);
      const grow = .3 + .7 * appear;
      const scatter = eased.get();
      const tilt = -10 * Math.PI / 180;
      const count = coins.length || 1;
      coins.forEach(({ wrapper, nx, ny }, index) => {
        const angle = seconds * (Math.PI * 2 / 24) + index * (Math.PI * 2 / count);
        const ex = Math.cos(angle) * ring.rx * grow;
        const ey = Math.sin(angle) * ring.ry * grow;
        const ox = ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const oy = ex * Math.sin(tilt) + ey * Math.cos(tilt);
        const depth = Math.sin(angle); // 1 = closest to you, -1 = behind the portrait
        const front = (depth + 1) / 2;
        // Scroll: the ring breaks and every coin flies outwards along its own line.
        const length = Math.max(1, Math.hypot(ox, oy));
        const fly = scatter * 360;
        const tx = ring.cx + ox + (ox / length) * fly - nx;
        const ty = ring.cy + oy + (oy / length) * fly - ny;
        const scale = (.72 + .4 * front) * (1 + scatter * .5);
        wrapper.style.transformOrigin = `${nx}px ${ny}px`;
        wrapper.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        wrapper.style.opacity = String(appear * (.4 + .6 * front) * (1 - scatter));
        wrapper.style.zIndex = depth > 0 ? "6" : "1";
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf && !disposed) raf = requestAnimationFrame(tick); };
    const sync = () => {
      const on = wide.matches;
      if (on) { root.dataset.orbit = "true"; measure(); start(); }
      else { delete root.dataset.orbit; clear(); }
    };
    // Only animate while the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); });
    observer.observe(root);
    const onResize = () => { if (wide.matches) measure(); };
    const onVisibility = () => { if (!document.hidden) start(); };
    sync();
    wide.addEventListener("change", sync);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      wide.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      delete root.dataset.orbit;
      clear();
    };
  }, [reducedMotion, eased]);

  // Buttons lean towards the cursor.
  useEffect(() => {
    const root = stage.current;
    if (!root || reducedMotion !== false) return;
    let current: HTMLElement | null = null;
    const release = () => { if (current) current.style.transform = ""; current = null; };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const button = (event.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (button !== current) release();
      if (!button) return;
      current = button;
      const bounds = button.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const py = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      button.style.transform = `perspective(500px) rotateX(${-py * 12}deg) rotateY(${px * 14}deg) translateY(-2px)`;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", release);
    return () => { root.removeEventListener("pointermove", onMove); root.removeEventListener("pointerleave", release); release(); };
  }, [reducedMotion]);

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
  ><canvas ref={particleCanvas} className={styles.particles} aria-hidden="true" />{children}</motion.div>;
}
