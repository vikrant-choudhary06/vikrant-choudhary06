import localFont from "next/font/local";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import styles from "./AboutSection.module.css";
import { AboutNarrative } from "./AboutNarrative";

const displayFont = localFont({ src: "../../public/fonts/Tanker-Regular.otf", display: "swap", weight: "400" });
const bodyFont = localFont({ src: "../../public/fonts/GeneralSans-Variable.ttf", display: "swap", weight: "200 700" });

export function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.inner}>
        <p className={`${styles.display} ${displayFont.className}`} aria-hidden="true">ABOUT ME</p>
        <div className={styles.content}>
          <div className={styles.story}>
            <h2 id="about-title" className={`${styles.title} ${displayFont.className}`}>VIKRANT KUMAR</h2>
            <AboutNarrative className={bodyFont.className} />
            <p className={`${styles.motto} ${displayFont.className}`}>Built from an idea.<br />Made to work.</p>
          </div>
          <div id="about-portrait-slot" className={styles.portraitSlot} aria-hidden="true">
            <Image src="/hero-portrait-new.webp" alt="" fill sizes="(max-width: 767px) 80vw, 40vw" className={styles.staticPortrait} />
          </div>
        </div>
        <ul className={styles.details} aria-label="Education and location">
          <li>BCA student</li><li>Manipal University Jaipur</li><li>{PERSONAL_INFO.location}</li>
        </ul>
        <p className={styles.closing}><span aria-hidden="true">“</span>Every detail matters — from the interface to what powers it.</p>
      </div>
    </section>
  );
}
