"use client";

import React from "react";
import { motion } from "framer-motion";

export function TechStackCassette() {
  return (
    <section id="stack" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
      {/* SECTION HEADER */}
      <div className="mb-10 text-center">
        <span className="font-handwriting text-xl sm:text-2xl text-neutral-600 -rotate-2 inline-block mb-1">
          languages &amp; tools i break &amp; build with ~
        </span>
        <h2 className="font-pixel text-3xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-wider leading-none uppercase">
          TECH STACK
        </h2>
      </div>

      {/* STICKER BOXES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. LANGUAGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#FFFDF7] p-4 sm:p-6 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] relative group"
        >
          <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-amber-300 text-black px-3 py-0.5 rounded-full border border-black shadow-xs">
              01. LANGUAGES
            </span>
            <span className="font-mono text-xs text-neutral-500 font-bold">// CORE</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Python", "Go", "TypeScript", "JavaScript", "SQL"].map((lang) => (
              <span
                key={lang}
                className="px-3.5 py-1.5 rounded-md bg-white border-2 border-black font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 transition-transform"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 2. FRAMEWORKS & DATABASES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#FFFDF7] p-4 sm:p-6 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] relative group"
        >
          <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-emerald-300 text-black px-3 py-0.5 rounded-full border border-black shadow-xs">
              02. FRAMEWORKS &amp; DBs
            </span>
            <span className="font-mono text-xs text-neutral-500 font-bold">// STACK</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["FastAPI", "Next.js", "Django", "Node.js", "PostgreSQL", "Redis", "MongoDB"].map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-md bg-white border-2 border-black font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 transition-transform"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3. TOOLS & INFRASTRUCTURE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#FFFDF7] p-4 sm:p-6 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] relative group"
        >
          <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-pink-300 text-black px-3 py-0.5 rounded-full border border-black shadow-xs">
              03. TOOLS &amp; INFRA
            </span>
            <span className="font-mono text-xs text-neutral-500 font-bold">// WORKFLOW</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Docker", "Git", "Postman", "Prisma"].map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 rounded-md bg-white border-2 border-black font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 transition-transform"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
