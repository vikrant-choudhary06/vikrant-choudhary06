"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Terminal, 
  ArrowUpRight,
  Database,
  Zap,
  Code2,
  Layers,
  ShieldCheck,
  Film
} from "lucide-react";
import { GithubIcon } from "./icons";

type CategoryFilter = "all" | "erp" | "api" | "fullstack";

export function AllProjects() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      
      {/* 1. PAGE HEADER & TELEMETRY STRIP */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200/80">
        
        {/* Left Column */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/10 font-mono text-xs font-bold text-neutral-700 shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>[ REGISTRY // 01-05 DEPLOYED SYSTEMS ]</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.08]">
            Production Systems &amp; Engineering Labs.
          </h1>

          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Sub-50ms REST gateways, multi-tenant POS ecosystems, concurrent scrapers, and full-stack software built for production.
          </p>
        </div>

        {/* Right Column: Live Telemetry Counter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-black/10 shadow-xs text-center min-w-[110px]">
            <span className="font-pixel text-2xl font-bold text-neutral-950 block">[ 5 ]</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold mt-0.5">
              Production Engines
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-black/10 shadow-xs text-center min-w-[120px]">
            <span className="font-pixel text-2xl font-bold text-emerald-600 block">[ &lt;50ms ]</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold mt-0.5">
              Core API Latency
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-black/10 shadow-xs text-center min-w-[120px]">
            <span className="font-pixel text-2xl font-bold text-blue-600 block">[ 100% ]</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold mt-0.5">
              TS &amp; Py Coverage
            </span>
          </div>
        </div>

      </div>

      {/* 2. INTERACTIVE FILTER DOCK */}
      <div className="flex items-center gap-2 mt-8 mb-10 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilter("all")}
          className={`font-mono text-xs px-4 py-2 rounded-full transition-all cursor-pointer font-bold ${
            activeFilter === "all"
              ? "bg-neutral-950 text-white shadow-sm"
              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          [ All Projects (5) ]
        </button>

        <button
          onClick={() => setActiveFilter("erp")}
          className={`font-mono text-xs px-4 py-2 rounded-full transition-all cursor-pointer font-bold ${
            activeFilter === "erp"
              ? "bg-neutral-950 text-white shadow-sm"
              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          [ Enterprise ERP ]
        </button>

        <button
          onClick={() => setActiveFilter("api")}
          className={`font-mono text-xs px-4 py-2 rounded-full transition-all cursor-pointer font-bold ${
            activeFilter === "api"
              ? "bg-neutral-950 text-white shadow-sm"
              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          [ APIs &amp; Fast Scraping ]
        </button>

        <button
          onClick={() => setActiveFilter("fullstack")}
          className={`font-mono text-xs px-4 py-2 rounded-full transition-all cursor-pointer font-bold ${
            activeFilter === "fullstack"
              ? "bg-neutral-950 text-white shadow-sm"
              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          [ Full-Stack Apps ]
        </button>
      </div>

      {/* 3. ASYMMETRICAL PROJECTS REGISTRY */}
      <div className="space-y-10">

        {/* A. FLAGSHIP HERO PROJECT (Full-Width Split Blueprint) */}
        {(activeFilter === "all" || activeFilter === "erp") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2.5rem] bg-white border border-black/[0.08] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#DBEAFE] text-[#1E40AF] font-mono text-[11px] font-bold px-3 py-1 rounded-full border border-[#BFDBFE]">
                    [ FLAGSHIP PLATFORM ]
                  </span>
                  <span className="bg-[#D1FAE5] text-[#065F46] font-mono text-[11px] font-bold px-3 py-1 rounded-full border border-[#A7F3D0]">
                    [ ENTERPRISE ERP ]
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 mt-4 tracking-tight">
                  OmniRetail ERP Ecosystem
                </h2>

                {/* Problem & Architecture */}
                <p className="text-neutral-600 text-sm leading-relaxed mt-3 font-sans">
                  Engineered to replace fragmented billing systems in high-traffic retail. Features sub-100ms barcode checkout, automated GST invoicing, WebSocket kitchen dispatch, and attendance-linked payroll.
                </p>

                {/* Metrics Grid (2x2 mini spec box) */}
                <div className="grid grid-cols-2 gap-2.5 mt-5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[10px] text-neutral-500 font-bold block uppercase">Barcode Scan</span>
                    <span className="font-bold text-neutral-900">&lt;100ms checkout</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[10px] text-neutral-500 font-bold block uppercase">Tenancy</span>
                    <span className="font-bold text-neutral-900">Multi-Tenant Schema</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[10px] text-neutral-500 font-bold block uppercase">Real-Time Sync</span>
                    <span className="font-bold text-neutral-900">WebSocket KDS</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[10px] text-neutral-500 font-bold block uppercase">Compliance</span>
                    <span className="font-bold text-neutral-900">Automated GST</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 font-mono text-[11px]">
                  {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Row */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Live Demo ↗</span>
                </a>

                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-neutral-50 border-2 border-black text-black font-mono text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-all flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Source ↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Perspective Dashboard Mockup */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/10 shadow-2xl bg-neutral-900 group">
                <Image
                  src="/ecom_mockup.png"
                  alt="OmniRetail POS ERP Dashboard"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* B. 2-COLUMN BALANCED SYSTEM CARDS (4 Supporting Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CARD 01: IMDb Concurrent Scraper */}
          {(activeFilter === "all" || activeFilter === "api") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="bg-[#FEF3C7] text-[#92400E] font-bold px-3 py-1 rounded-full border border-[#FDE68A]">
                    [ PYTHON &amp; CONCURRENCY ]
                  </span>
                  <span className="text-emerald-600 font-bold">sub-15ms p99 response</span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                  IMDb Concurrent Extraction Engine
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-sans">
                  Concurrent pipeline featuring automatic retry backoff, headless browser workers, and a Redis-cached REST API delivering movie metadata at sub-15ms response times.
                </p>

                {/* Dark Code Snippet Terminal */}
                <div className="mt-4 p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs space-y-2 border border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 border-b border-neutral-800 pb-2">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Terminal className="w-3.5 h-3.5" />
                      curl -X GET /api/v1/movie/tt0111161
                    </span>
                    <span>200 OK</span>
                  </div>
                  <pre className="text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
{`{
  "status": "cached",
  "latency_ms": 11.4,
  "title": "The Shawshank Redemption",
  "rating": 9.3
}`}
                  </pre>
                </div>
              </div>

              {/* Stack & Link */}
              <div className="pt-5 mt-5 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["Python", "FastAPI", "Redis", "AsyncIO"].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-semibold text-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-neutral-900 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Repo ↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* CARD 02: PopcornStream */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="bg-[#E0E7FF] text-[#3730A3] font-bold px-3 py-1 rounded-full border border-[#C7D2FE]">
                    [ MEDIA &amp; STREAMING ]
                  </span>
                  <span className="text-blue-600 font-bold">Adaptive Bitrate</span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                  PopcornStream Engine
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-sans">
                  Full-stack streaming platform with adaptive bitrate playback, JWT watchlists, and dynamic CDN caching to minimize peak bandwidth usage.
                </p>

                {/* Media Preview Frame */}
                <div className="mt-4 relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900">
                  <Image
                    src="/fintech_mockup.png"
                    alt="PopcornStream playback engine"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-black shadow-lg">
                      <Film className="w-6 h-6 text-neutral-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack & Link */}
              <div className="pt-5 mt-5 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-semibold text-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-neutral-900 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Repo ↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* CARD 03: NovaStore Core */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="bg-[#FCE7F3] text-[#9D174D] font-bold px-3 py-1 rounded-full border border-[#FBCFE8]">
                    [ TRANSACTION ARCHITECTURE ]
                  </span>
                  <span className="text-pink-700 font-bold">Idempotent Transactions</span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                  NovaStore Core
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-sans">
                  Headless commerce platform engineered with idempotent checkout queues to prevent double charges, persistent state hydration, and multi-variant faceted indexing.
                </p>

                {/* Catalog Preview */}
                <div className="mt-4 relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900">
                  <Image
                    src="/ecom_mockup.png"
                    alt="NovaStore e-commerce interface"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Stack & Link */}
              <div className="pt-5 mt-5 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["TypeScript", "Next.js", "PostgreSQL", "Prisma"].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-semibold text-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-neutral-900 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Repo ↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* CARD 04: Tech Us Knowledge Platform */}
          {(activeFilter === "all" || activeFilter === "fullstack") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="bg-[#CCFBF1] text-[#115E59] font-bold px-3 py-1 rounded-full border border-[#99F6E4]">
                    [ REAL-TIME COMMUNITY ]
                  </span>
                  <span className="text-teal-700 font-bold">Live Markdown Rendering</span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                  Tech Us Knowledge Platform
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-sans">
                  Interactive developer forum featuring live Markdown code block syntax highlighting, real-time comment threads, and authenticated developer profiles.
                </p>

                {/* Thread Code Block Formatting Preview */}
                <div className="mt-4 p-4 rounded-xl bg-neutral-900 text-white font-mono text-xs space-y-2 border border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-800 pb-1.5">
                    <span>thread_post_42.md</span>
                    <span className="text-emerald-400">● LIVE</span>
                  </div>
                  <pre className="text-[11px] text-amber-300">
                    {`const fetchMetadata = async (id: string) => {\n  return await redis.get(\`movie:\${id}\`);\n};`}
                  </pre>
                </div>
              </div>

              {/* Stack & Link */}
              <div className="pt-5 mt-5 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["React", "TypeScript", "Node.js", "MongoDB"].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-semibold text-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/vikrant-choudhary06"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-neutral-900 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Repo ↗</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* 4. FOOTER & REPOSITORY CALLOUT */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xs border-2 border-black shadow-[4px_4px_0px_#000] text-xs font-mono">
          <span className="font-bold text-neutral-800">Looking to inspect the source code &amp; commit history?</span>
          <a
            href="https://github.com/vikrant-choudhary06"
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <span>[ github.com/vikrant-choudhary06 ↗ ]</span>
          </a>
        </div>

        <div className="mt-6 font-handwriting text-xl text-neutral-700 font-bold">
          Mathura, India // Updated 2026 // Vikrant Choudhary
        </div>
      </div>

    </section>
  );
}
