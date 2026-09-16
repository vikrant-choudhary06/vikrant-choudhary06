"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-transparent border-t border-neutral-300/80 relative text-neutral-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold">
        <div>
          © 2026 // VK.STUDIO // MATHURA, IN
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-black transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-black transition-colors">
            About
          </a>
          <a href="#case-studies" className="hover:text-black transition-colors">
            Case Study
          </a>
          <a href="#playground" className="hover:text-black transition-colors">
            Playground
          </a>
          <a href="#hero" className="hover:text-blue-600 transition-colors flex items-center gap-1 font-bold">
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
