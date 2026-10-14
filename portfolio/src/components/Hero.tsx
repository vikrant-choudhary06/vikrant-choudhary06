import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import styles from "./Hero.module.css";

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
      <div className={styles.stage}>
        <p className={`${styles.backdrop} ${displayFont.className}`} aria-hidden="true">VIKRANT</p>
        <p className={`${styles.edgeLabel} ${styles.edgeLeft}`}>{PERSONAL_INFO.role}</p>
        <p className={`${styles.edgeLabel} ${styles.edgeRight}`} aria-hidden="true">Build. Learn. Repeat.</p>

        <div className={styles.portrait}>
          <Image
            src="/hero-portrait.webp"
            alt="Vikrant Choudhary wearing a black suit"
            fill
            preload
            sizes="(min-width: 1100px) 44vw, (min-width: 768px) 50vw, 90vw"
            className={styles.portraitImage}
          />
        </div>

        <div className={styles.intro}>
          <h1 id="hero-title" className={`font-pixel ${styles.name}`}>
            Vikrant<br />Choudhary<span className={styles.nameAccent} aria-hidden="true">_</span>
          </h1>
          <p className={styles.description}>I build web apps and the backends behind them.</p>
          <div className={styles.actions}>
            <a href="#projects" className={`${styles.button} ${styles.primary}`}>
              See my work <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className={`${styles.button} ${styles.secondary}`}>Let&apos;s talk</a>
          </div>
        </div>

        <aside className={styles.current} aria-label="Current project and availability">
          <p className={styles.eyebrow}>Currently building</p>
          <Link href="/projects/rizzoto" className={`font-pixel ${styles.projectName}`}>Rizzoto</Link>
          <p className={styles.projectDescription}>Offline-first restaurant POS</p>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.location}><MapPin size={15} aria-hidden="true" />{PERSONAL_INFO.location}</p>
          <p className={styles.availability}>{PERSONAL_INFO.status}</p>
        </aside>

        <a href="#about" className={styles.scrollCue}>
          <span aria-hidden="true" />Scroll to explore <ArrowDown size={14} aria-hidden="true" /><span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
