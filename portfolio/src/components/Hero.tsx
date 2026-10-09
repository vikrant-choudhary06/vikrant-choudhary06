import { ArrowUpRight, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export function Hero() {
  return (
    <section
      id="hero"
      className="w-full flex flex-col items-center text-center pt-28 pb-16 px-4 sm:px-6"
    >
      <span className="font-handwriting text-xl text-ink-soft font-bold">
        my name is ~
      </span>

      {/* Name card with the four corner chips */}
      <div className="relative mt-3 max-w-full">
        <div className="absolute -top-3.5 left-0 sm:-left-14 z-10 bg-[#D2F4E3] text-[#136C47] text-[10px] sm:text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-[#B3E8CE]">
          building Rizzoto
        </div>
        <div className="absolute -top-3.5 right-0 sm:-right-14 z-10 bg-[#FFF3C4] text-[#8C6D07] text-[10px] sm:text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-[#FDE699]">
          Next.js · NestJS
        </div>

        <div className="bg-card px-6 sm:px-14 py-3 sm:py-4 border-2 border-[#FF7A29] rounded-sm shadow-[3px_3px_0px_rgba(255,122,41,0.25)]">
          <h1 className="font-pixel text-5xl sm:text-8xl tracking-widest text-ink leading-none py-1">
            VIKRANT
            <span className="sr-only"> Choudhary, {PERSONAL_INFO.role.toLowerCase()}</span>
          </h1>
        </div>

        <div className="absolute -bottom-4 left-0 sm:-left-16 z-10 bg-[#FFE2B0] text-[#9A5B0A] text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-md border border-[#FCD289]">
          {PERSONAL_INFO.role}
        </div>
        <div className="absolute -bottom-4 right-0 sm:-right-16 z-10 bg-[#D2EFE6] text-[#1C6B56] text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-md border border-[#AADECE] flex items-center gap-1">
          {PERSONAL_INFO.location}
          <MapPin className="w-3 h-3" />
        </div>
      </div>

      <p className="mt-10 text-[11px] font-mono text-ink-soft flex items-center gap-2 bg-card border border-line px-4 py-1.5 rounded-full font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        {PERSONAL_INFO.status}
      </p>

      <h2 className="mt-6 font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-ink max-w-2xl leading-tight">
        I build web apps and the backends behind them.
      </h2>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="bg-[#194BFD] text-white text-xs font-mono font-bold px-6 py-3 border-2 border-ink shadow-[3px_3px_0px_var(--shadow)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_var(--shadow)] transition-all rounded-sm"
        >
          See my work
        </a>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card text-ink text-xs font-mono font-bold px-6 py-3 border-2 border-ink shadow-[3px_3px_0px_var(--shadow)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_var(--shadow)] transition-all inline-flex items-center gap-1.5 rounded-sm"
        >
          GitHub
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
