import Image from "next/image";
import localFont from "next/font/local";
import { ArrowDown, ArrowRight, Database, Braces } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import styles from "./Hero.module.css";
import { HeroMotion } from "./HeroMotion";

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
        <p className={`${styles.backdrop} ${displayFont.className}`} aria-hidden="true">VIKRANT</p>
        <p className={`${styles.edgeLabel} ${styles.edgeLeft}`}>{PERSONAL_INFO.role}</p>

        <div className={styles.portrait} data-hero-portrait>
          <Image
            src="/hero-portrait-new.webp"
            alt="Vikrant Kumar wearing glasses and a navy shirt with folded arms"
            fill
            preload
            sizes="(min-width: 1100px) 44vw, (min-width: 768px) 50vw, 90vw"
            className={styles.portraitImage}
          />
        </div>

        <div className={styles.floatingDetails} aria-hidden="true">
          <span className={`${styles.floatIcon} ${styles.javascriptIcon}`}><Image src="/tech/javascript.svg" alt="" width={42} height={42} /></span>
          <span className={`${styles.floatIcon} ${styles.mongoIcon}`}><Image src="/tech/mongodb.svg" alt="" width={42} height={42} /></span>
          <span className={`${styles.floatIcon} ${styles.pythonIcon}`}><Image src="/tech/python.svg" alt="" width={42} height={42} /></span>
          <span className={`${styles.floatIcon} ${styles.languageIcon}`}><span className={styles.tsMark}>TS</span></span>
          <span className={`${styles.floatIcon} ${styles.databaseIcon}`}><Database size={36} /></span>
          <span className={`${styles.floatIcon} ${styles.apiIcon}`}><Braces size={36} /></span>
          <span className={`${styles.floatIcon} ${styles.goIcon}`}><strong>Go</strong></span>
        </div>

        <div className={styles.intro}>
          <h1 id="hero-title" className="sr-only">Vikrant Kumar — Full-stack developer</h1>
          <p className={styles.focusTitle}>Full-stack developer. <span>Backend at heart.</span></p>
          <p className={styles.focusDescription}>I focus on APIs, databases and reliable systems, and build the interfaces that bring them to life.</p>
          <div className={styles.actions}>
            <a href="#projects" className={`${styles.button} ${styles.primary}`}>
              See my work <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className={`${styles.button} ${styles.secondary}`}>Let&apos;s talk</a>
          </div>
        </div>


        <a href="#about" className={styles.scrollCue}>
          <span aria-hidden="true" />Scroll to explore <ArrowDown size={14} aria-hidden="true" /><span aria-hidden="true" />
        </a>
      </HeroMotion>
    </section>
  );
}
