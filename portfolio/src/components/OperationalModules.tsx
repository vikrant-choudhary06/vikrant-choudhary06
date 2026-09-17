"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Palette, TrendingUp, Cpu, CheckCircle2 } from "lucide-react";

export function OperationalModules() {
  const [activeToken, setActiveToken] = useState<string>("amber");

  return (
    <section id="operational-modules" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b-2 border-slate-950 pb-6">
        <div>
          <span className="font-handwriting text-xl sm:text-2xl font-bold text-slate-800 block mb-1">
            capabilities &amp; toolkits ~
          </span>
          <h2 className="font-pixel text-3xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-none uppercase">
            OPERATIONAL MODULES
          </h2>
        </div>
        <p className="text-slate-700 text-xs sm:text-sm max-w-xs font-mono font-semibold">
          [ STACK // v4.8 ]
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Badge 01: Product Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-5 sm:p-8 bg-white border-2 border-slate-950 shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-slate-950 font-extrabold tracking-wider uppercase bg-amber-300 px-3.5 py-1 rounded-full border border-slate-950">
                [ MOD // 01 ]
              </span>
              <Target className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </div>

            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
              Product Strategy &amp; Architecture
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm mb-6 leading-relaxed">
              Aligning roadmap priorities with North Star metrics, retention loops, and friction-free user journeys.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase">01. Funnel Friction Reduction</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Streamlining multi-step drop-offs to maximize conversion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase">02. North Star Telemetry</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Establishing core retention telemetry &amp; unit-economics dashboards.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge 02: Design Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-5 sm:p-8 bg-white border-2 border-slate-950 shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-slate-950 font-extrabold tracking-wider uppercase bg-emerald-300 px-3.5 py-1 rounded-full border border-slate-950">
                [ MOD // 02 ]
              </span>
              <Palette className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </div>

            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
              Design Systems &amp; Token Governance
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm mb-6 leading-relaxed">
              Unified design tokens, component primitives, and accessible multi-theme architectures for handoff.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 text-white border-2 border-slate-900 shadow-md">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2 text-[11px] font-mono">
                <span className="text-slate-400">TOKEN_SWATCH_INSPECTOR</span>
                <span className="text-amber-400">v4.2.0</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">Accent Token:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveToken("amber")} className={`w-6 h-6 rounded-full bg-amber-400 border-2 ${activeToken === "amber" ? "border-white scale-110" : "border-transparent"}`} />
                  <button onClick={() => setActiveToken("teal")} className={`w-6 h-6 rounded-full bg-teal-400 border-2 ${activeToken === "teal" ? "border-white scale-110" : "border-transparent"}`} />
                  <button onClick={() => setActiveToken("pink")} className={`w-6 h-6 rounded-full bg-pink-400 border-2 ${activeToken === "pink" ? "border-white scale-110" : "border-transparent"}`} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge 03: Conversion Rate Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl p-5 sm:p-8 bg-white border-2 border-slate-950 shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-slate-950 font-extrabold tracking-wider uppercase bg-pink-300 px-3.5 py-1 rounded-full border border-slate-950">
                [ MOD // 03 ]
              </span>
              <TrendingUp className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </div>

            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
              Conversion Rate Optimization (CRO)
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm mb-6 leading-relaxed">
              Empirical A/B testing methodologies, checkout telemetry, and data-driven micro-interactions.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 text-white border-2 border-slate-900 shadow-md">
              <div className="flex items-center justify-between mb-2 font-mono text-xs">
                <span className="text-slate-400">CHECKOUT_CONVERSION_FUNNEL</span>
                <span className="text-emerald-400 font-bold">+42.4% LIFT</span>
              </div>
              <div className="relative h-14 w-full mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50">
                  <path d="M0,45 Q50,40 100,20 T200,15 T300,5" fill="none" stroke="#f59e0b" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge 04: Engineering Oversight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl p-5 sm:p-8 bg-white border-2 border-slate-950 shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-slate-950 font-extrabold tracking-wider uppercase bg-cyan-300 px-3.5 py-1 rounded-full border border-slate-950">
                [ MOD // 04 ]
              </span>
              <Cpu className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </div>

            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
              Engineering Oversight &amp; Tech Stack
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm mb-6 leading-relaxed">
              Leading cross-functional systems with React 19, Next.js 16, GSAP, Tailwind v4, and Go.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {[
                { name: "React 19", category: "UI Engine" },
                { name: "Next.js 16", category: "Framework" },
                { name: "TypeScript", category: "Language" },
                { name: "Golang", category: "Backend" },
              ].map((tech, idx) => (
                <div key={idx} className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-mono font-bold text-slate-950 block">{tech.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
