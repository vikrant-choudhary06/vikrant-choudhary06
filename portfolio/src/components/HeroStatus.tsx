"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const formatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });

/** Availability plus the current time in Mathura, updated every 30 seconds. */
export function HeroStatus({ status, place }: { status: string; place: string }) {
  // Rendered empty on the server: its clock would not match the visitor's.
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={styles.status}>
      <p><span className={styles.statusDot} aria-hidden="true" />{status}</p>
      <p>{place} · <time suppressHydrationWarning>{time ?? "--:--"}</time> IST</p>
    </div>
  );
}
