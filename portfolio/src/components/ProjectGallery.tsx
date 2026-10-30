"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/types";

// Opens like a laptop lid: the frame starts tilted back and stands upright as it
// scrolls into view. Hinged at the bottom edge, so the screen "lifts" towards you.
function LidFrame({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: host, offset: ["start end", "start 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(progress, (value) => (reduced ? 0 : (1 - value) * 25));
  return (
    <div ref={host} style={{ perspective: "1400px" }}>
      <motion.div className="relative" style={{ rotateX, transformOrigin: "50% 100%" }}>
        {children}
      </motion.div>
    </div>
  );
}

// Screenshot slider: native scroll-snap does the swiping, the buttons and
// dots just scroll the track. Works with touch, trackpad and arrow keys.
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(images.length - 1, index));
    // Set it now rather than waiting for scroll events, which can arrive late
    // while the smooth scroll is still running.
    setActive(next);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  // Swipes and trackpad scrolls. Only positions that sit on a slide count, so the
  // in-between frames of a smooth scroll don't flip the dots back and forth.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const position = track.scrollLeft / track.clientWidth;
    const nearest = Math.round(position);
    if (Math.abs(position - nearest) < 0.02) {
      setActive(nearest);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const hasMany = images.length > 1;
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/90 text-ink border border-ink/40 hover:border-ink disabled:opacity-0 transition-opacity";

  return (
    <section className="mt-8" aria-roledescription="carousel" aria-label="Screenshots">
      <LidFrame>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={hasMany ? 0 : undefined}
          className="flex overflow-x-auto snap-x snap-mandatory rounded-lg border border-ink/20 bg-[#121211] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        >
          {images.map((image, i) => (
            <figure
              key={image.src}
              className="relative w-full shrink-0 snap-center aspect-[16/9]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-contain" priority={i === 0} />
            </figure>
          ))}
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous screenshot"
              className={`${arrowClass} left-3`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Next screenshot"
              className={`${arrowClass} right-3`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </LidFrame>

      <div className="mt-3 flex flex-col items-center gap-2">
        <p className="font-mono text-xs text-ink-soft text-center" aria-live="polite">
          {images[active]?.caption}
        </p>
        {hasMany && (
          <div className="flex items-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-[var(--accent)]" : "w-2 bg-ink/25 hover:bg-ink/50"}`}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-muted">
              {active + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
