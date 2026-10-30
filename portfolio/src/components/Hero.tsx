import type { CSSProperties } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { ArrowDown, ArrowRight, Database, Braces } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";
import styles from "./Hero.module.css";
import { HeroMotion } from "./HeroMotion";
import { HeroTerminal, type TerminalLine } from "./HeroTerminal";
import { HeroStatus } from "./HeroStatus";

// Everything here comes from portfolio-data.ts, so the hero can't drift from the rest of the site.
const current = PROJECTS[0];
const TERMINAL: TerminalLine[] = [
  { kind: "command", text: "whoami" },
  { kind: "output", text: `${PERSONAL_INFO.name.toLowerCase()} · backend-first full-stack · ${PERSONAL_INFO.location.toLowerCase()}` },
  { kind: "command", text: "cat now.txt" },
  { kind: "output", text: `building ${current.name.toLowerCase()}: ${current.kind.toLowerCase()}` },
];
const FEATURED = PROJECTS.slice(0, 3);

const displayFont = localFont({
  src: "../app/fonts/anton.ttf",
  display: "swap",
  weight: "400",
});

export function Hero() {
  return (
    <section
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <HeroMotion>
        {/* Wrappers carry the scroll-driven depth; the elements inside keep their own CSS animations. */}
        <div data-depth="backdrop" className={`${styles.depthLayer} ${styles.backdropLayer}`} aria-hidden="true">
          {/* Separate layer for the mouse tilt, so it never fights the scroll depth above. */}
          <div data-tilt-layer className={`${styles.depthLayer} ${styles.backdropLayer}`}>
            <p className={`${styles.backdrop} ${displayFont.className}`}>
              {Array.from("VIKRANT").map((letter, index) => (
                <span key={index} className={styles.letter} style={{ "--i": index } as CSSProperties}>{letter}</span>
              ))}
            </p>
          </div>
        </div>
        <p className={`${styles.edgeLabel} ${styles.edgeLeft}`}>{PERSONAL_INFO.role}</p>
        <HeroStatus status={PERSONAL_INFO.status} place="Mathura, IN" />

        <div className={styles.portrait} data-hero-portrait>
          <Image
            src="/hero-portrait-new.webp"
            alt="Vikrant Kumar wearing glasses and a navy shirt with folded arms"
            fill
            fetchPriority="high"
            sizes="(min-width: 1100px) 44vw, (min-width: 768px) 50vw, 90vw"
            className={styles.portraitImage}
          />
        </div>

        <div className={styles.floatingDetails} aria-hidden="true">
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.javascriptIcon}`}><Image src="/tech/javascript.svg" alt="" width={42} height={42} /></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.mongoIcon}`}><Image src="/tech/mongodb.svg" alt="" width={42} height={42} /></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.pythonIcon}`}><Image src="/tech/python.svg" alt="" width={42} height={42} /></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.languageIcon}`}><span className={styles.tsMark}>TS</span></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.databaseIcon}`}><Database size={36} /></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.apiIcon}`}><Braces size={36} /></span></span>
          <span data-depth="icon" className={styles.depthLayer}><span className={`${styles.floatIcon} ${styles.goIcon}`}><strong>Go</strong></span></span>
        </div>

        <div data-depth="intro" className={styles.intro}>
          <HeroTerminal lines={TERMINAL} />
          <h1 id="hero-title" className="sr-only">Vikrant Kumar — Full-stack developer</h1>
          <p className={styles.focusTitle}>Full-stack developer. <span>Backend at heart.</span></p>
          <p className={styles.focusDescription}>I focus on APIs, databases and reliable systems, and build the interfaces that bring them to life.</p>
          <div className={styles.actions}>
            <a href="#projects" data-tilt className={`${styles.button} ${styles.primary}`}>
              See my work <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" data-tilt className={`${styles.button} ${styles.secondary}`}>Let&apos;s talk</a>
          </div>
          <nav className={styles.featured} aria-label="Featured projects">
            <span>Featured</span>
            {FEATURED.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>{project.name} ↗</Link>
            ))}
          </nav>
        </div>


        <a href="#about" className={styles.scrollCue}>
          <span aria-hidden="true" />Scroll to explore <ArrowDown size={14} aria-hidden="true" /><span aria-hidden="true" />
        </a>
      </HeroMotion>
    </section>
  );
}
