"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, MapPin, Rocket } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="w-full relative overflow-hidden flex flex-col justify-center items-center text-center pt-20 pb-12">
      
      {/* Centerpiece Content Stack */}
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center my-auto">

        {/* 1. CENTERPIECE NAME BOX (The Orange Framed Card) */}
        <div className="relative my-4 flex flex-col items-center">

          {/* Top Label: "my name is ~" with hand-drawn squiggle underline */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-1.5 z-10"
          >
            <span className="font-handwriting text-lg sm:text-xl text-neutral-700 font-bold">
              my name is ~
            </span>
            <svg className="w-16 h-2 text-neutral-600 mt-0.5" viewBox="0 0 60 8" fill="none">
              <path d="M2 5 Q 30 1, 58 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Pure White Index Card Container */}
          <div className="relative">

            {/* THE 4 CORNER STICKER TABS */}

            {/* Top-Left Tab: CODE CONCURRENCY ● */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-3.5 -left-10 sm:-left-16 z-20"
            >
              <div className="bg-[#D2F4E3] text-[#136C47] text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-[2px_3px_0px_rgba(0,0,0,0.08)] flex items-center gap-1.5 border border-[#B3E8CE]">
                <span>CODE CONCURRENCY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#136C47] animate-pulse" />
              </div>
            </motion.div>

            {/* Top-Right Tab: SUB-50MS APIs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-3.5 -right-10 sm:-right-16 z-20"
            >
              <div className="bg-[#FFF3C4] text-[#8C6D07] text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-[2px_3px_0px_rgba(0,0,0,0.08)] flex items-center gap-1.5 border border-[#FDE699]">
                <span>SUB-50MS APIs</span>
                <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
              </div>
            </motion.div>

            {/* Orange Framed Card Box (#FF7A29) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white px-10 sm:px-14 py-4 border-2 border-[#FF7A29] rounded-sm shadow-[3px_3px_0px_rgba(255,122,41,0.25)] mx-auto w-fit flex items-center justify-center select-none"
            >
              {/* Tiny orange plus marker crosses (+) at 4 inner corners */}
              <span className="absolute top-1 left-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute top-1 right-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>

              {/* Center Typography: Pixelated Font "VIKRANT" */}
              <h1 className="font-pixel text-7xl sm:text-8xl tracking-widest text-black font-black leading-none py-1">
                VIKRANT
              </h1>
            </motion.div>

            {/* Bottom-Left Tab: Full-Stack & Python Eng */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 -left-12 sm:-left-20 z-20 flex items-center gap-1"
            >
              <div className="bg-[#FFE2B0] text-[#9A5B0A] text-[11px] font-sans font-bold px-3 py-1 rounded-md shadow-[2px_3px_0px_rgba(0,0,0,0.08)] border border-[#FCD289]">
                Full-Stack &amp; Python Eng
              </div>
              <svg className="w-4 h-4 text-neutral-700 hidden sm:block transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>

            {/* Bottom-Right Tab: Mathura, India */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 -right-12 sm:-right-20 z-20 flex items-center gap-1"
            >
              <svg className="w-4 h-4 text-neutral-700 hidden sm:block transform rotate-180 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div className="bg-[#D2EFE6] text-[#1C6B56] text-[11px] font-sans font-bold px-3 py-1 rounded-md shadow-[2px_3px_0px_rgba(0,0,0,0.08)] border border-[#AADECE] flex items-center gap-1">
                <span>Mathura, India</span>
                <MapPin className="w-3 h-3 text-emerald-700 inline" />
              </div>
            </motion.div>

          </div>

        </div>

        {/* 2. Micro Availability Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-[11px] font-mono tracking-wider text-neutral-700 flex items-center justify-center gap-2 bg-white border border-neutral-300 px-4 py-1.5 rounded-full shadow-xs font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>● OPEN TO INTERNSHIPS &amp; FREELANCE // MANIPAL JAIPUR (BCA)</span>
        </motion.div>

        {/* 3. Large Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 text-center mt-6 leading-tight max-w-2xl"
        >
          I build fast web apps <Zap className="w-7 h-7 sm:w-9 sm:h-9 text-amber-500 fill-amber-400 inline-block align-middle -mt-1" /> <br />
          break APIs &amp; ship real code. <Rocket className="w-7 h-7 sm:w-9 sm:h-9 text-blue-600 inline-block align-middle -mt-1" />
        </motion.h2>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://github.com/vikrant-choudhary06"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#194BFD] text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-2 cursor-pointer rounded-sm"
          >
            <span>[ VIEW GITHUB ↗ ]</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="bg-white text-black text-xs font-mono font-bold uppercase tracking-wider px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-2 cursor-pointer rounded-sm"
          >
            <span>[ CONTACT ME ]</span>
          </a>
        </motion.div>

      </div>

    </section>
  );
}
