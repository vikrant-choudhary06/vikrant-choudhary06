"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Pencil, Train } from "lucide-react";

interface WaylineCaseStudyProps {
  isOpen?: boolean;
  onClose?: () => void;
  projectTitle?: string;
}

export function WaylineCaseStudy({
  isOpen = true,
  onClose,
  projectTitle = "Wayline",
}: WaylineCaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll into view when opened
  useEffect(() => {
    if (isOpen && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          ref={sectionRef}
          id="wayline-case-study"
          initial={{ opacity: 0, height: 0, y: 30 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-12 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
        >
          {/* SECTION ANNOTATION LABEL & CLOSE BUTTON */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-handwriting text-lg sm:text-xl text-neutral-600 -rotate-2 inline-block">
              deep dive case study ~ {projectTitle}
            </span>

            {onClose && (
              <button
                onClick={onClose}
                className="bg-black text-white font-mono text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-black shadow-[2px_2px_0px_#000] hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer z-30"
              >
                <X className="w-4 h-4" />
                <span>[ ✕ CLOSE DETAILS ]</span>
              </button>
            )}
          </div>

          {/* CASE STUDY CONTAINER CARD */}
          <div className="bg-white/95 backdrop-blur-xs border-2 border-black rounded-2xl p-4 sm:p-8 lg:p-12 shadow-[8px_8px_0px_#000] relative">
            
            {/* HEADER ROW WITH STACKED PASTEL INDEX TABS */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10 pb-8 border-b border-neutral-200">
              {/* Left Column: Title & Metadata */}
              <div className="flex-1 space-y-4">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block font-bold">
                  MAR 19, 2026
                </span>
                <h2 className="font-pixel text-3xl sm:text-6xl lg:text-7xl font-black tracking-wider text-black leading-none">
                  {projectTitle.toUpperCase()}
                </h2>
                <p className="text-base sm:text-xl text-neutral-700 max-w-xl font-medium leading-relaxed">
                  Making a whole city&apos;s transit app feel less like decoding a puzzle.
                </p>

                {/* Pill Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="border border-neutral-400 bg-[#FAF8F5] px-3.5 py-1 text-xs font-mono font-bold text-neutral-800 rounded-full shadow-xs">
                    [ MOBILITY ]
                  </span>
                  <span className="border border-neutral-400 bg-[#FAF8F5] px-3.5 py-1 text-xs font-mono font-bold text-neutral-800 rounded-full shadow-xs">
                    [ CONSUMER APP ]
                  </span>
                </div>
              </div>

              {/* Right Column: Stacked Pastel Sticky Index Tabs */}
              <div className="flex flex-wrap lg:flex-col gap-2.5 min-w-full lg:min-w-[260px]">
                <div className="bg-[#3B82F6] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-sm shadow-xs border border-blue-600 flex items-center justify-between -rotate-1 hover:rotate-0 transition-transform flex-1 lg:flex-none">
                  <span>ROLE</span>
                  <span className="opacity-90 ml-2">Lead Product Designer</span>
                </div>
                <div className="bg-[#EAB308] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-sm shadow-xs border border-yellow-500 flex items-center justify-between rotate-1 hover:rotate-0 transition-transform flex-1 lg:flex-none">
                  <span>TIMELINE</span>
                  <span>3 Months</span>
                </div>
                <div className="bg-[#10B981] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-sm shadow-xs border border-emerald-600 flex items-center justify-between -rotate-1 hover:rotate-0 transition-transform flex-1 lg:flex-none">
                  <span>TEAM</span>
                  <span className="ml-2">Founders + Me (Solo Eng)</span>
                </div>
                <div className="bg-[#EC4899] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-sm shadow-xs border border-pink-500 flex items-center justify-between rotate-1 hover:rotate-0 transition-transform flex-1 lg:flex-none">
                  <span>YEAR</span>
                  <span>2026</span>
                </div>
              </div>
            </div>

            {/* HERO IMAGE SHOWCASE */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border-2 border-black/10 shadow-xl mb-12 bg-neutral-900 group">
              <Image
                src="/wayline_hero.jpg"
                alt="Wayline App Transit Mobile UI Showcase"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              {/* Subtle taped corner ribbon */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-xs border border-neutral-300 font-mono text-[10px] text-neutral-700 px-3 py-1 rounded-xs shadow-xs -rotate-6">
                LIVE_METRO_STATION_TEST.RAW
              </div>
            </div>

            {/* RESULTS & METRIC BADGES BLOCK */}
            <div className="mb-12">
              <span className="font-handwriting text-xl sm:text-2xl text-neutral-600 -rotate-2 inline-flex items-center gap-1.5 mb-3">
                <span>the results</span>
                <Sparkles className="w-5 h-5 text-amber-500 inline" />
              </span>
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed max-w-3xl mb-8">
                Re-architected the real-time routing display engine and simplified multi-modal transit legs into a unified tactile timeline. Commuters reported zero-friction transfers during peak rush hours.
              </p>

              {/* 3 Pastel Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Card 1 (Soft Blue) */}
                <div className="bg-[#DBEAFE] border-2 border-[#BFDBFE] p-4 sm:p-6 rounded-xl shadow-xs -rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-pixel text-3xl sm:text-5xl font-black text-[#1E40AF] block mb-1">
                    47%
                  </span>
                  <p className="font-mono text-xs text-[#1E3A8A] font-bold uppercase tracking-wider">
                    Monthly Active Growth
                  </p>
                </div>

                {/* Card 2 (Soft Yellow) */}
                <div className="bg-[#FEF3C7] border-2 border-[#FDE68A] p-4 sm:p-6 rounded-xl shadow-xs rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-pixel text-3xl sm:text-5xl font-black text-[#B45309] block mb-1">
                    -55%
                  </span>
                  <p className="font-mono text-xs text-[#78350F] font-bold uppercase tracking-wider">
                    Support Tickets Slashing
                  </p>
                </div>

                {/* Card 3 (Soft Mint) */}
                <div className="bg-[#D1FAE5] border-2 border-[#A7F3D0] p-4 sm:p-6 rounded-xl shadow-xs -rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-pixel text-xl sm:text-3xl font-black text-[#065F46] block mb-2 leading-snug">
                    App Store Feature
                  </span>
                  <p className="font-mono text-xs text-[#064E3B] font-bold uppercase tracking-wider">
                    Editorial Mention
                  </p>
                </div>
              </div>
            </div>

            {/* SECONDARY GALLERY (2-COLUMN POLAROID STRIP) */}
            <div className="pt-6 border-t border-neutral-200">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block font-bold mb-6">
                // CANDID USER TESTING &amp; INTERFACE STRIP
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Polaroid 1 */}
                <div className="bg-white p-4 border border-neutral-200 shadow-lg rounded-sm -rotate-1 hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] w-full rounded-xs overflow-hidden bg-neutral-100">
                    <Image
                      src="/fintech_mockup.png"
                      alt="Interface component testing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-handwriting text-lg text-neutral-700 mt-3 text-center flex items-center justify-center gap-1.5">
                    <span>rapid wireframe iteration</span>
                    <Pencil className="w-4 h-4 text-neutral-600 inline" />
                  </p>
                </div>

                {/* Polaroid 2 */}
                <div className="bg-white p-4 border border-neutral-200 shadow-lg rounded-sm rotate-2 hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] w-full rounded-xs overflow-hidden bg-neutral-100">
                    <Image
                      src="/ecom_mockup.png"
                      alt="On-site transit testing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-handwriting text-lg text-neutral-700 mt-3 text-center flex items-center justify-center gap-1.5">
                    <span>station platform observation</span>
                    <Train className="w-4 h-4 text-neutral-600 inline" />
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
