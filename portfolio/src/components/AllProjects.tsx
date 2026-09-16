"use client";

import React, { useState } from "react";
import { ALL_PROJECTS, PERSONAL_INFO } from "@/data/portfolio-data";
import { TactileCard } from "./TactileCard";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Film, 
  ShoppingBag, 
  Share2, 
  Zap, 
  Layers, 
  MapPin, 
  Coffee, 
  Quote, 
  CheckCircle2, 
  Cpu,
  Play,
  Globe,
  ExternalLink
} from "lucide-react";
import { GithubIcon } from "./icons";
import { ProjectActionModal, ModalData } from "./ProjectActionModal";

export function AllProjects() {
  const flagship = ALL_PROJECTS.find((p) => p.id === "retail-erp-suite") || ALL_PROJECTS[0];
  const otherProjects = ALL_PROJECTS.filter((p) => p.id !== "retail-erp-suite");

  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleDemoClick = (project: { title: string; demoUrl?: string; githubUrl?: string }) => {
    if (project.demoUrl) {
      window.open(project.demoUrl, "_blank", "noopener,noreferrer");
    } else {
      setModalData({
        type: "demo",
        projectTitle: project.title,
        githubUrl: project.githubUrl,
      });
    }
  };

  const handleLiveClick = (project: { title: string; liveUrl?: string; githubUrl?: string }) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setModalData({
        type: "live",
        projectTitle: project.title,
        githubUrl: project.githubUrl,
      });
    }
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "movie-streaming":
        return <Film className="w-4 h-4 text-rose-400" />;
      case "imdb-scraper":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "ecommerce-app":
        return <ShoppingBag className="w-4 h-4 text-blue-400" />;
      case "tech-us":
        return <Share2 className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-zinc-200">
      <div className="space-y-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Things I&apos;ve Built &amp; Shipped</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Featured Projects &amp; Lab Work
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            From an interconnected retail &amp; dining ERP platform to concurrent web scrapers 
            and media streaming pipelines. Real working software, no toy tutorials.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. THE BIG FLAGSHIP CARD (Spans 2 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 flex flex-col"
          >
            <TactileCard 
              category="FLAGSHIP B2B SUITE"
              title="OmniRetail — Multi-Tenant Retail & Dining ERP" 
              badge="Sub-100ms Cart • High-Throughput"
              variant="featured"
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-semibold">
                      {flagship.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-xs">
                      {flagship.ecosystem || "POS • Invoicing • Tasks • Payroll"}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                    {flagship.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed font-sans max-w-3xl">
                    {flagship.description}
                  </p>
                </div>

                {/* 4 Connected Modules Visual Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {flagship.highlights.map((highlight, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 hover:border-emerald-400 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{highlight.split(":")[0]}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 pl-5 font-sans">
                        {highlight.split(":")[1]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap gap-1.5">
                  {flagship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800 font-medium shadow-2xs hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Demo, Source Code, Live */}
                <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleDemoClick(flagship)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-800 hover:text-zinc-950 font-mono text-xs font-bold shadow-[0_3px_0_0_#e4e4e7] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600/20" />
                    <span>Demo</span>
                  </button>

                  <a
                    href={flagship.githubUrl || "https://github.com/vikrant-choudhary06"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-800 hover:text-zinc-950 font-mono text-xs font-bold shadow-[0_3px_0_0_#e4e4e7] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>

                  <button
                    onClick={() => handleLiveClick(flagship)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-[0_3px_0_0_#047857] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </button>
                </div>
              </div>
            </TactileCard>
          </motion.div>

          {/* 2. PERSONALITY / BUILDER VIBE CARD (Bento Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 flex flex-col"
          >
            <TactileCard 
              category="BUILDER CREED"
              title="vikrant.mindset" 
              badge="Active"
              variant="accent"
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4 font-mono text-xs">
                {/* Quote */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-50/60 via-white to-white border border-cyan-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-700 font-semibold text-[11px]">
                    <Quote className="w-3.5 h-3.5" />
                    <span>Engineering Creed</span>
                  </div>
                  <p className="text-zinc-700 text-xs italic font-sans leading-relaxed">
                    &quot;{PERSONAL_INFO.currentVibe.devQuote}&quot;
                  </p>
                </div>

                {/* Live Stats */}
                <div className="space-y-2 pt-2 border-t border-zinc-200 text-[11px]">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-cyan-600" /> Location:
                    </span>
                    <span className="text-zinc-900 font-semibold">{PERSONAL_INFO.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-emerald-600" /> Building:
                    </span>
                    <span className="text-zinc-900 text-right truncate max-w-[140px]" title={PERSONAL_INFO.currentVibe.building}>
                      {PERSONAL_INFO.currentVibe.building.split(" ")[0]} APIs
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Coffee className="w-3 h-3 text-amber-600" /> Fuel:
                    </span>
                    <span className="text-zinc-800">Chai &amp; Late Nights</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 text-center">
                  <span className="text-[10px] text-emerald-700 font-bold tracking-wide uppercase">
                    ● 100% Focused on shipping software
                  </span>
                </div>
              </div>
            </TactileCard>
          </motion.div>

          {/* 3. OTHER PROJECTS CARDS */}
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="flex flex-col"
            >
              <TactileCard 
                category={project.category.toUpperCase()}
                title={project.title}
                badge={project.metrics || project.status}
                variant="default"
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getProjectIcon(project.id)}
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                    <ul className="space-y-1.5">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 font-sans">
                          <span className="text-emerald-600 text-[10px] mt-0.5">●</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-200 mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-800 hover:border-zinc-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Demo, Source Code, Live */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleDemoClick(project)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-800 hover:text-zinc-950 font-mono text-xs font-bold shadow-[0_2px_0_0_#e4e4e7] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-amber-600 fill-amber-600/20" />
                      <span>Demo</span>
                    </button>

                    <a
                      href={project.githubUrl || "https://github.com/vikrant-choudhary06"}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-800 hover:text-zinc-950 font-mono text-xs font-bold shadow-[0_2px_0_0_#e4e4e7] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                    </a>

                    <button
                      onClick={() => handleLiveClick(project)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-[0_2px_0_0_#047857] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 select-none cursor-pointer"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live</span>
                    </button>
                  </div>
                </div>
              </TactileCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Popup Modal for Demo / Live Fallback */}
      <ProjectActionModal 
        data={modalData} 
        onClose={() => setModalData(null)} 
      />
    </section>
  );
}
