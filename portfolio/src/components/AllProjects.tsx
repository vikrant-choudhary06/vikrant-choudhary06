"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { GithubIcon } from "./icons";

type CategoryFilter = "all" | "fullstack" | "api";

export function AllProjects() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  return (
    <div
      className="min-h-screen bg-[#FAF8F5]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 31px, #E5E0DA 31px, #E5E0DA 32px)",
        backgroundSize: "100% 32px",
      }}
    >
      {/* 1. HEADER CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10 text-left">
        <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-wider block">
          [ 01-05 // SELECTED WORKS ]
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2">
          Projects &amp; Lab Work.
        </h1>

        <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
          A curated collection of web platforms, concurrent scrapers, and backend systems I&apos;ve architected and shipped.
        </p>

        {/* 2. STREAMLINED FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
              activeFilter === "all"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            All (5)
          </button>

          <button
            onClick={() => setActiveFilter("fullstack")}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
              activeFilter === "fullstack"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Full-Stack &amp; ERP
          </button>

          <button
            onClick={() => setActiveFilter("api")}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
              activeFilter === "api"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            APIs &amp; Python
          </button>
        </div>
      </div>

      {/* 3. CLEAN PROJECT LIST */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 mt-2 pb-16">

        {/* CARD 1: OMNIRETAIL ERP (FLAGSHIP FEATURED CARD) */}
        {(activeFilter === "all" || activeFilter === "fullstack") && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-neutral-900">
                  OmniRetail ERP
                </h2>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold px-3 py-1 rounded-full">
                  [ Flagship ]
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Live Demo ↗</span>
                </a>
                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-mono text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub ↗</span>
                </a>
              </div>
            </div>

            {/* Plain English Summary */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-5 font-sans">
              Multi-tenant retail and dining ERP featuring sub-100ms barcode checkout, automated GST billing, real-time kitchen order display, and staff payroll.
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs">
              {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Mockup Frame */}
            <div className="relative aspect-[16/9] sm:aspect-[16/8] w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-inner">
              <Image
                src="/ecom_mockup.png"
                alt="OmniRetail ERP POS Dashboard"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* CARDS 2 TO 5 (2-COLUMN GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 02: IMDb Fast Scraper & API */}
          {(activeFilter === "all" || activeFilter === "api") && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-neutral-900">
                    IMDb Concurrent Scraper
                  </h3>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                    [ Python &amp; Redis ]
                  </span>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed font-sans mb-4">
                  High-throughput web scraper with automatic retry handling and sub-15ms cached REST API responses for film metadata.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-xs">
                  {["Python", "FastAPI", "Redis", "AsyncIO"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end">
                  <a
                    href="https://github.com/vikrant-choudhary06"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* CARD 03: PopcornStream */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-neutral-900">
                    PopcornStream
                  </h3>
                  <span className="bg-blue-100 text-blue-900 border border-blue-300 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                    [ React &amp; Node ]
                  </span>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed font-sans mb-4">
                  Full-stack streaming platform with adaptive bitrate video playback, JWT watchlists, and smart caching.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-xs">
                  {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                  <a
                    href="https://github.com/vikrant-choudhary06"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Live Demo ↗</span>
                  </a>
                  <a
                    href="https://github.com/vikrant-choudhary06"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* CARD 04: NovaStore E-Commerce */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-neutral-900">
                    NovaStore E-Commerce
                  </h3>
                  <span className="bg-pink-100 text-pink-900 border border-pink-300 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                    [ Next.js &amp; Prisma ]
                  </span>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed font-sans mb-4">
                  Headless shopping engine built with dynamic variant filters and idempotent checkout pipelines.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-xs">
                  {["Next.js", "TypeScript", "PostgreSQL", "Prisma"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end">
                  <a
                    href="https://github.com/vikrant-choudhary06"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* CARD 05: Tech Us Developer Hub */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-neutral-900">
                    Tech Us Developer Hub
                  </h3>
                  <span className="bg-teal-100 text-teal-900 border border-teal-300 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                    [ Full-Stack ]
                  </span>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed font-sans mb-4">
                  Interactive developer forum with real-time threads, markdown syntax highlighting, and user profiles.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-xs">
                  {["React", "TypeScript", "Node.js", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end">
                  <a
                    href="https://github.com/vikrant-choudhary06"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* 4. MINIMAL CALLOUT & FOOTER */}
        <div className="bg-[#FFFDF7] border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000] text-center mt-12 mb-10">
          <p className="font-handwriting text-xl sm:text-2xl text-neutral-800 font-bold mb-3">
            Want to build something together? Reach out at{" "}
            <a
              href="mailto:vikrantchoudhary1203@gmail.com"
              className="text-blue-600 hover:underline"
            >
              vikrantchoudhary1203@gmail.com
            </a>{" "}
            or say hi on{" "}
            <a
              href="https://github.com/vikrant-choudhary06"
              target="_blank"
              rel="noreferrer"
              className="text-black underline font-bold"
            >
              GitHub
            </a>
            .
          </p>
          <div className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-wider">
            Mathura, India // Vikrant Choudhary // 2026
          </div>
        </div>

      </div>
    </div>
  );
}

