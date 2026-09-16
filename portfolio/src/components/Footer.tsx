import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ArrowUp, Code2 } from "lucide-react";
import { GithubIcon } from "./icons";
import { CopyEmailButton } from "./CopyEmailButton";

export function Footer() {
  return (
    <footer id="contact" className="pt-16 pb-28 md:pt-24 md:pb-36 border-t border-zinc-200 bg-zinc-50/50">
      <div className="space-y-12">
        {/* Contact Banner with Subtle Gradient */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-white via-zinc-50 to-zinc-50 border-2 border-zinc-200/90 text-center space-y-4 max-w-3xl mx-auto shadow-xl shadow-zinc-200/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] relative overflow-hidden">
          {/* Subtle Top Sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Roles &amp; Internships</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950">
            Ready to build something great together?
          </h2>
          
          <p className="text-zinc-600 text-sm max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking for a full-stack engineer, a backend developer, 
            or an intern with a solid grasp on business logic, feel free to reach out.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {/* Interactive 1-Click Copy Primary Button */}
            <CopyEmailButton email={PERSONAL_INFO.email} variant="primary" />

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-700 hover:text-zinc-950 font-mono text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#e4e4e7] active:shadow-none flex items-center gap-2 select-none"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Designed &amp; Engineered by {PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-zinc-950 transition-colors">
              Home
            </a>
            <a href="#projects" className="hover:text-zinc-950 transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-zinc-950 transition-colors">
              Skills
            </a>
            <a href="#about" className="hover:text-zinc-950 transition-colors">
              About
            </a>
            <a href="#home" className="hover:text-emerald-700 text-zinc-600 transition-colors flex items-center gap-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
