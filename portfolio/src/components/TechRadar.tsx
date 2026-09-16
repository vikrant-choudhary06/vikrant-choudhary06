"use client";

import React from "react";
import { TECH_RADAR } from "@/data/portfolio-data";
import { TactileCard } from "./TactileCard";
import { motion } from "framer-motion";
import { Sparkles, Code2 } from "lucide-react";

export function TechRadar() {
  const getBadgeStyle = (categoryTitle: string, isCore: boolean) => {
    if (!isCore) {
      return "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300";
    }

    switch (categoryTitle) {
      case "Languages I Code In":
        return "bg-emerald-50 border-emerald-300 text-emerald-900 hover:border-emerald-400 shadow-xs";
      case "Frontend & UI":
        return "bg-cyan-50 border-cyan-300 text-cyan-900 hover:border-cyan-400 shadow-xs";
      case "Backend & Systems":
        return "bg-amber-50 border-amber-300 text-amber-950 hover:border-amber-400 shadow-xs";
      case "Databases & Caching":
        return "bg-purple-50 border-purple-300 text-purple-900 hover:border-purple-400 shadow-xs";
      case "DevOps & Tooling":
        return "bg-blue-50 border-blue-300 text-blue-900 hover:border-blue-400 shadow-xs";
      default:
        return "bg-zinc-100 border-zinc-200 text-zinc-800";
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-zinc-200">
      <div className="space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-300 text-xs font-mono text-cyan-800">
            <Code2 className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Tools &amp; Technologies I Build With
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Languages, frameworks, databases, and infra I actually use to ship applications. 
            Color-coded by active production stack.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_RADAR.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="flex flex-col"
            >
              <TactileCard 
                category="TECH STACK" 
                title={cat.title}
                badge={`${cat.skills.filter(s => s.level === "Core").length} Core`}
                variant="default"
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-950">{cat.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-sans">{cat.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => {
                      const isCore = skill.level === "Core";
                      const badgeClasses = getBadgeStyle(cat.title, isCore);

                      return (
                        <div
                          key={skill.name}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-default ${badgeClasses}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isCore ? "bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.6)]" : "bg-zinc-400"
                            }`}
                          />
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TactileCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
