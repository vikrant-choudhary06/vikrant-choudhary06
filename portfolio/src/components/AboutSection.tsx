"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Code2, Zap, Cpu, Boxes, Database, Eye } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 px-6 relative max-w-6xl mx-auto min-h-[520px] flex flex-col items-center justify-center">
      
      {/* 1. Micro Tag */}
      <div className="font-handwriting text-lg text-neutral-600 -rotate-3 absolute top-4 left-6 select-none">
        about me!
      </div>

      {/* 2. Section Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-2 border-black bg-white px-5 py-1 text-sm font-mono font-medium rounded-sm shadow-[2px_2px_0px_#000] mb-5 inline-block select-none"
      >
        [ what&apos;s up ]
      </motion.div>

      {/* 3. Bio Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-xl text-center z-10 px-4"
      >
        <p className="font-handwriting text-2xl text-neutral-800 leading-snug font-normal flex flex-wrap items-center justify-center gap-1">
          <span>Hi, I&apos;m Vikrant. I&apos;ve been writing code and shipping software since 12th grade. Whether it&apos;s crafting snappy frontends, building concurrent scrapers, or architecting sub-50ms REST APIs, I love getting into the weeds of software engineering.</span>
          <Sparkles className="w-5 h-5 text-amber-500 inline" />
        </p>
      </motion.div>

      {/* 4. Left Polaroid (Framed developer avatar: /pic.png) */}
      <motion.div
        initial={{ opacity: 0, rotate: -3, x: -20 }}
        whileInView={{ opacity: 1, rotate: -3, x: 0 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white p-3 pb-7 shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-neutral-200/80 -rotate-3 absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-44 sm:w-52 hidden lg:block z-20 cursor-pointer"
      >
        {/* Light Blue Masking Tape Ribbon across corners */}
        <div className="bg-[#93C5FD]/80 backdrop-blur-xs w-16 h-5 -rotate-45 absolute -top-2.5 -left-4 shadow-sm pointer-events-none" />
        <div className="bg-[#93C5FD]/80 backdrop-blur-xs w-16 h-5 rotate-45 absolute -top-2.5 -right-4 shadow-sm pointer-events-none" />

        <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden border border-neutral-200 bg-neutral-100 group">
          <Image
            src="/pic.png"
            alt="Vikrant Developer Portrait"
            fill
            className="object-cover object-[center_10%] scale-[1.85] origin-top transition-transform duration-500 group-hover:scale-[2]"
          />
        </div>
        <div className="mt-2 text-center font-handwriting text-base text-neutral-700 font-bold">
          vikrant ✦
        </div>
      </motion.div>

      {/* 5. Right Polaroid (Desk setup / My Terminal) */}
      <motion.div
        initial={{ opacity: 0, rotate: 3, x: 20 }}
        whileInView={{ opacity: 1, rotate: 3, x: 0 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white p-3 pb-7 shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-neutral-200/80 rotate-3 absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-44 sm:w-52 hidden lg:block z-20 cursor-pointer"
      >
        {/* Warm Yellow Tape Ribbon across corners */}
        <div className="bg-[#FEF08A]/90 backdrop-blur-xs w-16 h-5 -rotate-12 absolute -top-2.5 left-4 shadow-sm pointer-events-none border border-amber-300/60" />
        <div className="bg-[#FEF08A]/90 backdrop-blur-xs w-16 h-5 rotate-12 absolute -top-2.5 right-4 shadow-sm pointer-events-none border border-amber-300/60" />

        <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden border border-neutral-200 bg-neutral-900 group">
          <Image
            src="/terminal.png"
            alt="Vikrant Terminal Neofetch"
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-2 text-center font-handwriting text-base text-neutral-700 font-bold flex items-center justify-center gap-1.5">
          <span>my terminal</span>
          <Terminal className="w-4 h-4 text-neutral-700" />
        </div>
      </motion.div>

      {/* 6. Skill Stickers: Centered 2x2 Grid right below narrative */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto text-xs font-semibold z-10"
      >
        {/* Yellow Sticker: Full-Stack Web */}
        <div className="bg-[#FFCA38] text-black font-bold text-xs px-4 py-2.5 rounded-xs shadow-sm flex items-center justify-between border border-amber-400">
          <span>[ Full-Stack Web ]</span>
          <Sparkles className="w-3.5 h-3.5 text-black" />
        </div>

        {/* Green Sticker: Python & FastAPI */}
        <div className="bg-[#13A867] text-white font-bold text-xs px-4 py-2.5 rounded-xs shadow-sm flex items-center justify-between border border-emerald-600">
          <span>[ Python &amp; FastAPI ]</span>
          <Code2 className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Pink Sticker: Distributed Systems */}
        <div className="bg-[#FF4685] text-white font-bold text-xs px-4 py-2.5 rounded-xs shadow-sm flex items-center justify-between border border-pink-600">
          <span>[ Distributed Systems ]</span>
          <Cpu className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Blue Sticker: Postgres & Redis */}
        <div className="bg-[#2257F5] text-white font-bold text-xs px-4 py-2.5 rounded-xs shadow-sm flex items-center justify-between border border-blue-700">
          <span>[ Postgres &amp; Redis ]</span>
          <Database className="w-3.5 h-3.5 text-white" />
        </div>
      </motion.div>

    </section>
  );
}
