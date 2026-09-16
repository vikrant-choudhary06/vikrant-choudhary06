"use client";

import React from "react";
import { EXPERIENCES, PERSONAL_INFO } from "@/data/portfolio-data";
import { TactileCard } from "./TactileCard";
import { motion } from "framer-motion";
import { 
  Flame, 
  TrendingUp, 
  Shield, 
  Briefcase, 
  GitPullRequest, 
  GraduationCap, 
  Code2,
  Sparkles 
} from "lucide-react";

export function AboutSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "Freelance / Contract":
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case "Open Source":
        return <GitPullRequest className="w-4 h-4 text-emerald-400" />;
      case "Education":
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 border-t border-zinc-200">
      <div className="space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Developer Journey</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Driven by Curiosity, Built by Code
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            How a high-school obsession with building web apps evolved into architecting 
            scalable full-stack platforms and backend microservices.
          </p>
        </motion.div>

        {/* 1. The Pure Developer Story */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <TactileCard 
            category="ORIGIN & MISSION" 
            title="The Developer Journey" 
            badge="Coding Since 12th Grade"
            variant="featured"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
              <div className="lg:col-span-8 space-y-4 text-sm text-zinc-700 leading-relaxed">
                <p>
                  I wrote my first lines of code in <span className="text-zinc-950 font-semibold">12th grade</span>. 
                  What started as building small Python scripts and tinkering with simple HTML/CSS quickly became a genuine addiction to understanding how modern software systems actually work behind the scenes.
                </p>
                <p>
                  Instead of just watching video tutorials, I chose to learn by shipping real applications: 
                  <span className="text-emerald-700 font-medium"> designing multi-tenant databases, handling real-time WebSockets, creating concurrent web scrapers, and optimizing API response times down to milliseconds</span>.
                </p>
                <p>
                  Currently pursuing my <span className="text-zinc-950 font-semibold">BCA at Manipal University Jaipur</span>, 
                  I spend my days deep-diving into distributed systems, database internals, and computer networks. 
                  My primary focus is on <span className="text-cyan-700 font-medium">TypeScript, Go, and PostgreSQL</span>—building clean, reliable software that scales seamlessly under load.
                </p>
              </div>

              {/* Developer Principles */}
              <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>Engineering Mindset</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed font-sans">
                    Deep understanding of system design, clean API boundaries, and building resilient backends that fail gracefully.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-cyan-700 font-semibold">
                    <Code2 className="w-4 h-4" />
                    <span>Build Philosophy</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed font-sans">
                    Ship fast, write clean types, don&apos;t over-abstract too early, and always optimize for the end-user.
                  </p>
                </div>
              </div>
            </div>
          </TactileCard>
        </motion.div>

        {/* 2. Track Record */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Track Record &amp; Proof of Work</span>
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <TactileCard 
                  category={exp.type.toUpperCase()}
                  title={exp.role}
                  badge={exp.period}
                  variant="default"
                >
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        {getIcon(exp.type)}
                        <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        {exp.organization}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                      <ul className="space-y-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                            <span className="text-emerald-600 mt-0.5">➜</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TactileCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
