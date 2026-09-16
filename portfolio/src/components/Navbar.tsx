"use client";

import React, { useState, useEffect } from "react";
import { Home, FolderGit2, Cpu, User, Mail } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "#home", icon: Home },
    { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", href: "#skills", icon: Cpu },
    { id: "about", label: "About", href: "#about", icon: User },
    { id: "contact", label: "Contact", href: "#contact", icon: Mail },
  ];

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "about", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Subtle Brand Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/90 border border-zinc-200/90 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-zinc-900">
            Vikrant Choudhary
          </span>
          <span className="text-zinc-400 font-mono text-xs">/</span>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Full-Stack &amp; Systems
          </span>
        </div>

        <a
          href="https://github.com/vikrant-choudhary06"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/90 border border-zinc-200/90 text-xs font-mono text-zinc-700 hover:text-zinc-950 hover:border-zinc-300 shadow-xs backdrop-blur-md transition-all"
        >
          GitHub ↗
        </a>
      </div>

      {/* Floating iOS / macOS Icon Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav
          className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-white/90 border-2 border-zinc-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.08),_0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-2xl"
          aria-label="iOS Dock Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className="relative group p-2 sm:p-2.5 rounded-xl transition-all duration-300 flex flex-col items-center justify-center hover:scale-110 active:scale-95"
                aria-label={item.label}
              >
                {/* iOS Hover Tooltip */}
                <span className="absolute -top-9 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-100 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                </span>

                {/* Icon Container */}
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-md scale-105"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/90"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* iOS Active Indicator Dot */}
                <span
                  className={`w-1 h-1 rounded-full mt-1 transition-all duration-300 ${
                    isActive ? "bg-emerald-600 opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
