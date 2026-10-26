"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";

import styles from "./FeaturedProjects.module.css";



export function SelectedProjectGallery({ displayClass, logos }: { displayClass: string; logos: Record<string, string | undefined> }) {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const pinned = useRef(false);
  const geometry = useRef({ top: 0, distance: 0, padding: 0 });
  const [position, setPosition] = useState({ index: 0, progress: 0 });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const panels = Array.from(element.children) as HTMLElement[];
      let index = 0;
      let distance = Infinity;
      panels.forEach((panel, candidate) => {
        const gap = Math.abs(panel.offsetLeft - parseFloat(getComputedStyle(element).paddingLeft) - element.scrollLeft);
        if (gap < distance) { distance = gap; index = candidate; }
      });
      const maximum = element.scrollWidth - element.clientWidth;
      const progress = maximum > 0 ? element.scrollLeft / maximum : 0;
      if (bar.current) bar.current.style.width = `${(1 / PROJECTS.length + progress * (1 - 1 / PROJECTS.length)) * 100}%`;
      panels.forEach((panel) => {
        const centre = panel.offsetLeft + panel.clientWidth / 2 - element.scrollLeft;
        const focus = Math.max(0, 1 - Math.abs(centre - element.clientWidth * .4) / element.clientWidth);
        panel.style.setProperty("--panel-focus", String(focus));
      });
      setPosition((previous) => previous.index === index ? previous : { index, progress });
    };
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    const root = section.current;
    const element = track.current;
    if (!root || !element) return;
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let disposed = false;
    const sync = () => {
      frame = 0;
      if (!pinned.current) return;
      const { top, distance } = geometry.current;
      element.scrollLeft = Math.max(0, Math.min(distance, window.scrollY - top));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const measure = () => {
      if (disposed) return;
      pinned.current = media.matches;
      root.dataset.pinned = String(media.matches);
      const distance = Math.max(0, element.scrollWidth - element.clientWidth);
      geometry.current = { top: root.getBoundingClientRect().top + window.scrollY, distance, padding: parseFloat(getComputedStyle(element).paddingLeft) };
      root.style.height = media.matches ? `${window.innerHeight + distance}px` : "";
      sync();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure); media.removeEventListener("change", measure); };
  }, []);
  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const index = Math.max(0, Math.min(PROJECTS.length - 1, position.index + direction));
    const panel = element.children[index] as HTMLElement;
    if (pinned.current) {
      window.scrollTo({ top: geometry.current.top + Math.min(geometry.current.distance, panel.offsetLeft - geometry.current.padding), behavior: "smooth" });
      return;
    }
    element.scrollTo({ left: panel.offsetLeft - parseFloat(getComputedStyle(element).paddingLeft), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section ref={section} id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className={styles.pinnedStage}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>02 / Selected work</p>
        <h2 id="projects-title" className={`${styles.title} ${displayClass}`}>IDEAS. BUILT.</h2>
      </header>
      <div ref={track} className={styles.track} aria-label="Selected projects" tabIndex={0}
        onKeyDown={(event) => { if (pinned.current && (event.key === "ArrowRight" || event.key === "ArrowLeft")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
        onFocusCapture={(event) => {
          if (!pinned.current) return;
          const panel = (event.target as HTMLElement).closest("a");
          if (panel && panel.parentElement === track.current) window.scrollTo({ top: geometry.current.top + Math.min(geometry.current.distance, panel.offsetLeft - geometry.current.padding), behavior: "instant" });
        }}>
        {PROJECTS.map((project, index) => {
          const cover = project.images[0];
          const logo = logos[project.slug];
          return (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.panel}>
              <div className={`${styles.stage} ${!cover ? styles.logoStage : ""}`}>
                {cover ? <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 768px) 70vw, 85vw" className={styles.cover} />
                  : logo ? <Image src={logo} alt={`${project.name} logo`} fill sizes="(min-width: 768px) 70vw, 85vw" className={styles.logo} />
                  : <span className={`${styles.placeholder} ${displayClass}`}>{project.name}</span>}
                {!cover && <span className={styles.previewNote}>{project.kind}</span>}
              </div>
              <div className={styles.info}>
                <span className={`${styles.number} ${displayClass}`}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.description}>
                  <h3>{project.name}</h3>
                  <p className={styles.kind}>{project.kind}</p>
                  {project.labels?.length ? <p className={styles.status}>{project.labels.join(" · ")}</p> : null}
                  <p className={styles.summary}>{project.summary}</p>
                  <p className={styles.stack}>{project.stack.slice(0, 4).join(" / ")}</p>
                  <span className={styles.viewProject}>View project <span aria-hidden="true">↗</span></span>
                </div>
                <span className={styles.open} aria-hidden="true"><ArrowUpRight size={26} /></span>
              </div>
            </Link>
          );
        })}
      </div>
      <footer className={styles.controls}>
        <span className={styles.count}>{String(position.index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
        <div className={styles.progress} aria-hidden="true"><span ref={bar} style={{ width: `${(1 / PROJECTS.length + position.progress * (1 - 1 / PROJECTS.length)) * 100}%` }} /></div>
        <span className={styles.hint}>Scroll to explore</span>
        <button onClick={() => move(-1)} disabled={position.index === 0} aria-label="Previous project"><ArrowLeft size={20} /></button>
        <button onClick={() => move(1)} disabled={position.index === PROJECTS.length - 1} aria-label="Next project"><ArrowRight size={20} /></button>
      </footer>
      </div>
    </section>
  );
}
