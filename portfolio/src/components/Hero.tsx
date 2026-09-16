"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Code2, Sparkles, Cpu, Flame, Coffee, Zap, Layers, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon } from "./icons";
import { CopyEmailButton } from "./CopyEmailButton";
import { MarqueeTicker } from "./MarqueeTicker";
import { TactileCard } from "./TactileCard";

export function Hero() {
  const highlightStack = ["TypeScript", "Go", "Next.js", "PostgreSQL", "Docker", "Redis"];

  return (
    <section id="home" className="pt-24 pb-8 md:pt-32 md:pb-12">
      <div className="space-y-8">
        {/* Main Grid: Left Pitch + Right Spatial Interactive Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): Hero Pitch & Tactile Buttons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill & Live Location */}
            <div className="flex flex-wrap items-center gap-2.5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800 shadow-xs select-none"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold">{PERSONAL_INFO.status}</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-mono text-zinc-700 shadow-xs select-none"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                <span>{PERSONAL_INFO.location}</span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1]">
                Hey, I&apos;m Vikrant. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                  I build fast web apps
                </span>, break APIs &amp; ship real code.
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans max-w-xl">
                Full-Stack developer and systems builder studying Computer Applications at <span className="text-zinc-950 font-semibold">Manipal University Jaipur</span>. 
                I turn complex requirements into high-performance web products, scalable backend microservices, and snappy real-time platforms.
              </p>
            </motion.div>

            {/* Tactile 3D Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-extrabold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#047857,_0_8px_20px_rgba(5,150,105,0.25)] active:shadow-none flex items-center gap-2 select-none"
              >
                <Code2 className="w-4 h-4 stroke-[2.5]" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#skills"
                className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-300 text-zinc-800 font-mono text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#d4d4d8] active:shadow-none flex items-center gap-2 select-none"
              >
                <Cpu className="w-4 h-4 text-cyan-600" />
                <span>Tech Stack</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-300 text-zinc-700 hover:text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#d4d4d8] active:shadow-none select-none"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <CopyEmailButton email={PERSONAL_INFO.email} />
            </motion.div>
          </div>

          {/* Right Column (5 cols): Spatial Builder Showcase Card (Zero Terminal!) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <TactileCard 
              category="LIVE SYSTEM STATUS" 
              title="vikrant.engine" 
              badge="Active"
              variant="featured"
            >
              <div className="space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-mono font-bold text-sm">
                      VC
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-950">Vikrant Choudhary</div>
                      <div className="text-[11px] font-mono text-zinc-500">Full-Stack &amp; Systems</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600">
                    BCA @ MUJ
                  </span>
                </div>

                {/* Live Activity Matrix */}
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" /> Current Focus:
                    </span>
                    <span className="text-zinc-900 font-semibold text-right">Go APIs &amp; WebSockets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" /> Flagship Suite:
                    </span>
                    <span className="text-emerald-700 font-semibold text-right">OmniRetail ERP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-cyan-600" /> Fuel:
                    </span>
                    <span className="text-zinc-800">Chai &amp; Late Nights</span>
                  </div>
                </div>

                {/* Floating Tactile Stack Chips */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    Active Production Weapons:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {highlightStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800 font-medium shadow-xs hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TactileCard>
          </motion.div>
        </div>

        {/* High-Energy Neo-Brutalist Marquee Ribbon */}
        <MarqueeTicker />

        {/* 4 Stats Compartments */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl bg-white border-2 border-zinc-200/90 space-y-1 transition-all duration-300 hover:border-zinc-300 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03),_inset_0_1px_0_0_rgba(255,255,255,1)]"
            >
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
                {stat.label}
              </div>
              <div className="text-base font-black text-zinc-950 font-mono">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
