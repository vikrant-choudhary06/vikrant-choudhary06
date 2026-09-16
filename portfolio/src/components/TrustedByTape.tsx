import React from "react";
import { Zap, Database, Cpu, Flame, Box, Code2, Layers } from "lucide-react";

const STICKERS = [
  {
    id: "python",
    label: "Python 3.12",
    icon: Code2,
    style: "bg-[#E3F2FD] border border-[#BBDEFB] text-[#1565C0]",
    rotate: "-rotate-1",
  },
  {
    id: "nextts",
    label: "TypeScript / Next.js",
    icon: Layers,
    style: "bg-white border-2 border-neutral-900 text-neutral-950",
    rotate: "rotate-2",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    icon: Zap,
    style: "bg-[#E0F2F1] border border-[#B2DFDB] text-[#00695C]",
    rotate: "-rotate-2",
  },
  {
    id: "golang",
    label: "Go (Golang)",
    icon: Cpu,
    style: "bg-[#E0F7FA] border border-[#80DEEA] text-[#00838F]",
    rotate: "rotate-1",
  },
  {
    id: "postgres",
    label: "PostgreSQL // Prisma",
    icon: Database,
    style: "bg-[#EDE7F6] border border-[#D1C4E9] text-[#4527A0]",
    rotate: "-rotate-1",
  },
  {
    id: "redis",
    label: "Redis Caching",
    icon: Flame,
    style: "bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828]",
    rotate: "rotate-2",
  },
  {
    id: "docker",
    label: "Docker",
    icon: Box,
    style: "bg-[#E1F5FE] border border-[#B3E5FC] text-[#0277BD]",
    rotate: "-rotate-2",
  },
];

export function TrustedByTape() {
  return (
    <section className="relative py-12 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* SECTION HEADER (PLAYFUL NOTEBOOK ANNOTATION) */}
      <div className="text-center mb-6 relative">
        <span className="font-handwriting text-lg sm:text-xl text-neutral-600 inline-flex items-center justify-center gap-2">
          tools &amp; tech powering the engine ~
          <svg className="w-4 h-4 text-neutral-500 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>

      {/* TACTILE PEELABLE STICKER TAPE STRIP */}
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3 relative">
        
        {/* Left End Masking Tape Overlay Accent */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-14 h-5 bg-white/70 backdrop-blur-xs border border-neutral-300/80 -rotate-12 shadow-xs pointer-events-none hidden sm:block z-20" />

        {STICKERS.map((sticker) => {
          const Icon = sticker.icon;
          return (
            <div
              key={sticker.id}
              className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-semibold tracking-tight shadow-[2px_2px_0px_rgba(0,0,0,0.08)] cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-200 flex items-center gap-2 select-none ${sticker.style} ${sticker.rotate}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{sticker.label}</span>
            </div>
          );
        })}

        {/* Right End Masking Tape Overlay Accent */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-14 h-5 bg-white/70 backdrop-blur-xs border border-neutral-300/80 rotate-12 shadow-xs pointer-events-none hidden sm:block z-20" />

      </div>
    </section>
  );
}
