"use client";

import React from "react";
import { Sparkles, Code2, Zap, GitPullRequest, Layers, Flame } from "lucide-react";

export function MarqueeTicker() {
  const items = [
    { text: "8+ REAL-WORLD APPS SHIPPED", icon: Flame, color: "text-amber-600" },
    { text: "TYPESCRIPT · GO · PYTHON · NEXT.JS", icon: Code2, color: "text-cyan-600" },
    { text: "SUB-100MS API BENCHMARKS", icon: Zap, color: "text-emerald-600" },
    { text: "POSTGRESQL · PRISMA · REDIS · DOCKER", icon: Layers, color: "text-purple-600" },
    { text: "ACTIVE OPEN-SOURCE CONTRIBUTOR", icon: GitPullRequest, color: "text-rose-600" },
    { text: "FULL-STACK & DISTRIBUTED SYSTEMS", icon: Sparkles, color: "text-amber-600" },
  ];

  return (
    <div className="w-full my-8 overflow-hidden border-y-2 border-zinc-200 bg-white/80 py-3 backdrop-blur-md select-none relative shadow-xs">
      {/* Side Fade Gradients for Seamless Infinity */}
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex w-max animate-marquee gap-8">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 px-3.5 py-1 rounded-full bg-white border border-zinc-200 font-mono text-xs font-bold uppercase tracking-wider text-zinc-800 shrink-0 shadow-[2px_2px_0px_#e4e4e7]"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-zinc-400">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
