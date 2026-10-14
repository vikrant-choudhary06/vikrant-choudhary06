"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";

import styles from "./FeaturedProjects.module.css";



export function SelectedProjectGallery({ displayClass, logos }: { displayClass: string; logos: Record<string, string | undefined> }) {
  const track = useRef<HTMLDivElement>(null);
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
      setPosition({ index, progress: maximum > 0 ? element.scrollLeft / maximum : 0 });
    };
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const index = Math.max(0, Math.min(PROJECTS.length - 1, position.index + direction));
    const panel = element.children[index] as HTMLElement;
    element.scrollTo({ left: panel.offsetLeft - parseFloat(getComputedStyle(element).paddingLeft), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>02 / Selected work</p>
        <h2 id="projects-title" className={`${styles.title} ${displayClass}`}>IDEAS. BUILT.</h2>
      </header>
      <div ref={track} className={styles.track} aria-label="Selected projects" tabIndex={0}>
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
                </div>
                <span className={styles.open} aria-hidden="true"><ArrowUpRight size={26} /></span>
              </div>
            </Link>
          );
        })}
      </div>
      <footer className={styles.controls}>
        <span className={styles.count}>{String(position.index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
        <div className={styles.progress} aria-hidden="true"><span style={{ width: `${(1 / PROJECTS.length + position.progress * (1 - 1 / PROJECTS.length)) * 100}%` }} /></div>
        <span className={styles.hint}>Scroll to explore</span>
        <button onClick={() => move(-1)} disabled={position.index === 0} aria-label="Previous project"><ArrowLeft size={20} /></button>
        <button onClick={() => move(1)} disabled={position.index === PROJECTS.length - 1} aria-label="Next project"><ArrowRight size={20} /></button>
      </footer>
    </section>
  );
}
