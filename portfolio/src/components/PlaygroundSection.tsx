import React from "react";
import Image from "next/image";
import { Rocket, Zap, Database, Cpu, Sparkles, Coffee, ArrowRight } from "lucide-react";

export function PlaygroundSection() {
  return (
    <section id="playground" className="relative py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* 1. SECTION HEADER (Services Theme) */}
      <div className="text-center mb-10 relative z-10">
        <span className="font-handwriting text-lg sm:text-xl text-neutral-600 -rotate-2 inline-block mb-1">
          what i ship &amp; build ~
        </span>
        <h2 className="font-pixel text-3xl sm:text-6xl font-extrabold tracking-wider text-neutral-950 uppercase leading-none">
          SERVICES &amp; CAPABILITIES
        </h2>
        <p className="font-mono text-xs sm:text-sm text-neutral-600 text-center max-w-xl mx-auto mt-3 leading-relaxed">
          End-to-end full-stack engineering, sub-50ms backend systems, and responsive web apps built for speed.
        </p>
      </div>

      {/* 2. PINBOARD COLLAGE CANVAS */}
      <div className="relative w-full border-2 border-dashed border-neutral-300/80 rounded-2xl p-4 sm:p-8 lg:p-10 bg-white/40 backdrop-blur-xs flex flex-wrap items-center justify-around gap-6 sm:gap-8 pt-12 pb-14 sm:pt-14 sm:pb-16">
        
        {/* SURROUNDING STICKER BADGES (4 Outer Pins) */}
        
        {/* Top-Left Sticker: Lavender pill */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-6 bg-[#EDE9FE] text-purple-950 font-mono text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-purple-200/80 shadow-xs -rotate-3 z-30 flex items-center gap-1.5 select-none">
          <span>full-stack ready</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
        </div>

        {/* Top-Right Sticker: Pastel mint pill */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-6 bg-[#D1FAE5] text-emerald-950 font-mono text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-emerald-200/80 shadow-xs rotate-2 z-30 flex items-center gap-1.5 select-none">
          <span>production grade</span>
          <Zap className="w-3.5 h-3.5 text-emerald-700" />
        </div>

        {/* Bottom-Left Sticker: Soft violet chip */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-6 bg-[#F3E8FF] text-violet-950 font-mono text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-violet-200/80 shadow-xs -rotate-2 z-30 flex items-center gap-1.5 select-none">
          <span>clean code only</span>
          <Coffee className="w-3.5 h-3.5 text-violet-700" />
        </div>

        {/* Bottom-Right Sticker: Pastel yellow hire me button */}
        <a
          href="#contact"
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-6 bg-[#FEF3C7] text-amber-950 font-mono text-[10px] sm:text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span>hire me</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-900" />
        </a>

        {/* 4 PINNED SERVICE POLAROID CARDS */}

        {/* CARD 01: Full-Stack Web Development */}
        <div className="relative group cursor-pointer -rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 z-20 w-full max-w-[260px] sm:w-64">
          {/* Tape: Off-white semi-transparent masking tape at top center */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/80 border border-neutral-300 shadow-xs z-30 rotate-1" />
          <div className="bg-white p-3 sm:p-3.5 border-2 border-black shadow-[6px_6px_0px_#000] rounded-xl w-full">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
              <Image
                src="/ecom_mockup.png"
                alt="Full-Stack Web Development Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-neutral-500 font-bold">// SERVICE 01</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Next.js + TS</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold mt-1.5 flex items-center justify-start gap-1">
                <span>01 // modern web apps</span>
                <Rocket className="w-4 h-4 text-blue-600 inline shrink-0" />
              </p>
            </div>
          </div>
        </div>

        {/* CARD 02: High-Throughput REST APIs & Backends */}
        <div className="relative group cursor-pointer rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 z-10 w-full max-w-[260px] sm:w-64">
          {/* Tape: Soft pastel sky-blue tape ribbon on top-left corner */}
          <div className="absolute -top-3.5 left-4 w-16 h-5 bg-[#D4E7FE]/90 border border-blue-300 shadow-xs z-30 -rotate-3" />
          <div className="bg-white p-3 sm:p-3.5 border-2 border-black shadow-[6px_6px_0px_#000] rounded-xl w-full">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
              <Image
                src="/retro_mac.png"
                alt="High-Throughput REST APIs Showcase"
                fill
                className="object-contain p-2 bg-[#FAF8F5] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-neutral-500 font-bold">// SERVICE 02</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">FastAPI + Go</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold mt-1.5 flex items-center justify-start gap-1">
                <span>02 // sub-50ms fast apis</span>
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400 inline shrink-0" />
              </p>
            </div>
          </div>
        </div>

        {/* CARD 03: Multi-Tenant Architecture & ERP */}
        <div className="relative group cursor-pointer -rotate-1 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 z-20 w-full max-w-[260px] sm:w-64">
          {/* Tape: Warm butter-yellow tape ribbon on top center */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FEF08A]/90 border border-amber-300 shadow-xs z-30 rotate-2" />
          <div className="bg-white p-3 sm:p-3.5 border-2 border-black shadow-[6px_6px_0px_#000] rounded-xl w-full">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
              <Image
                src="/fintech_mockup.png"
                alt="Multi-Tenant Architecture Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-neutral-500 font-bold">// SERVICE 03</span>
                <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">PostgreSQL + Redis</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold mt-1.5 flex items-center justify-start gap-1">
                <span>03 // database &amp; systems</span>
                <Database className="w-4 h-4 text-indigo-600 inline shrink-0" />
              </p>
            </div>
          </div>
        </div>

        {/* CARD 04: Web Scraping & Data Pipelines */}
        <div className="relative group cursor-pointer rotate-3 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 z-10 w-full max-w-[260px] sm:w-64">
          {/* Tape: Translucent white tape on top edge */}
          <div className="absolute -top-3.5 right-6 w-16 h-5 bg-white/80 border border-neutral-300 shadow-xs z-30 -rotate-2" />
          <div className="bg-white p-3 sm:p-3.5 border-2 border-black shadow-[6px_6px_0px_#000] rounded-xl w-full">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
              <Image
                src="/swarm_mockup.png"
                alt="Web Scraping & Data Pipelines Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-neutral-500 font-bold">// SERVICE 04</span>
                <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Python + AsyncIO</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold mt-1.5 flex items-center justify-start gap-1">
                <span>04 // concurrent scrapers</span>
                <Cpu className="w-4 h-4 text-purple-600 inline shrink-0" />
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
