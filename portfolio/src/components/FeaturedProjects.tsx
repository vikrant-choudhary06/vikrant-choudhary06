"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
      
      {/* SECTION ANNOTATION & HEAVY PIXEL TITLE */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-handwriting text-xl sm:text-2xl text-neutral-600 -rotate-2 inline-block mb-1">
            selected work &amp; lab builds ~ (click card to view all projects)
          </span>
          <h2 className="font-pixel text-3xl sm:text-6xl lg:text-7xl font-black text-black tracking-wider leading-none uppercase">
            FEATURED PROJECTS &amp; LAB WORK
          </h2>
        </div>
      </div>

      {/* PRIMARY FEATURED PROJECTS (2 FOLDER CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">

        {/* CARD 01: OMNIRETAIL ERP (FLAGSHIP) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative group cursor-pointer"
        >
          <Link href="/projects" className="block">
            {/* TOP FOLDER TAB */}
            <div className="flex items-center">
              <div className="bg-[#1E40AF] border-2 border-black border-b-0 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-t-xl font-mono text-[10px] sm:text-xs font-bold text-white flex items-center gap-2 relative z-10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse shrink-0" />
                <span>✦ FLAGSHIP // ENTERPRISE</span>
              </div>
              <div className="h-[2px] bg-black flex-1 -ml-[2px] z-0" />
            </div>

            {/* CARD CONTAINER BODY */}
            <div className="bg-[#0F172A] text-white border-2 border-black rounded-b-2xl rounded-tr-2xl p-3.5 sm:p-5 shadow-[6px_6px_0px_#000] relative group-hover:shadow-[10px_10px_0px_#000] transition-shadow duration-300">
              {/* INNER IMAGE FRAME */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/20 bg-[#1E293B] p-1.5 sm:p-2 shadow-inner">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/ecom_mockup.png"
                    alt="OmniRetail ERP POS Dashboard"
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Hover Click Badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] p-2">
                    <span className="bg-white text-black font-mono text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black shadow-lg text-center">
                      [ ✦ VIEW ALL PROJECTS IN REGISTRY → ]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM TYPOGRAPHY & METADATA */}
            <div className="text-center mt-4 px-2 sm:px-4">
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-black group-hover:text-blue-600 transition-colors">
                OmniRetail ERP
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1 max-w-sm mx-auto leading-relaxed">
                Multi-Tenant Retail &amp; Dining ERP — Sub-100ms barcode POS, automated GST invoicing, real-time kitchen dispatch, and attendance payroll.
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 font-mono text-[10px] sm:text-[11px]">
                {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis"].map((tech) => (
                  <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-neutral-300 text-neutral-800 font-semibold shadow-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CARD 02: POPCORNSTREAM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative group cursor-pointer"
        >
          <Link href="/projects" className="block">
            {/* TOP FOLDER TAB */}
            <div className="flex items-center">
              <div className="bg-[#EAB308] border-2 border-black border-b-0 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-t-xl font-mono text-[10px] sm:text-xs font-bold text-black flex items-center gap-2 relative z-10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse shrink-0" />
                <span>✦ STREAMING ENGINE</span>
              </div>
              <div className="h-[2px] bg-black flex-1 -ml-[2px] z-0" />
            </div>

            {/* CARD CONTAINER BODY */}
            <div className="bg-[#FFFDF5] border-2 border-black rounded-b-2xl rounded-tr-2xl p-3.5 sm:p-5 shadow-[6px_6px_0px_#000] relative group-hover:shadow-[10px_10px_0px_#000] transition-shadow duration-300">
              {/* INNER IMAGE FRAME */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-black/10 bg-neutral-100 p-1.5 sm:p-2 shadow-inner">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/fintech_mockup.png"
                    alt="PopcornStream Video Streaming Engine"
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Hover Click Badge */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] p-2">
                    <span className="bg-black text-white font-mono text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/40 shadow-lg text-center">
                      [ ✦ VIEW ALL PROJECTS IN REGISTRY → ]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM TYPOGRAPHY & METADATA */}
            <div className="text-center mt-4 px-2 sm:px-4">
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-black group-hover:text-blue-600 transition-colors">
                PopcornStream
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1 max-w-sm mx-auto leading-relaxed">
                Video streaming platform with adaptive bitrate playback, JWT watchlists, and smart bandwidth caching.
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 font-mono text-[10px] sm:text-[11px]">
                {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-neutral-300 text-neutral-800 font-semibold shadow-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>

      </div>

      {/* EXPLORE ALL PROJECTS BUTTON */}
      <div className="mt-8 pt-6 border-t-2 border-dashed border-neutral-300 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer group"
        >
          <span>✦ EXPLORE ALL PROJECTS (5)</span>
          <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

    </section>
  );
}
