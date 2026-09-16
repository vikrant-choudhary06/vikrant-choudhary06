"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, User, Folder, Cpu, Sparkles, MessageSquare } from "lucide-react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", tab: "home" },
        { id: "about", tab: "about" },
        { id: "projects", tab: "projects" },
        { id: "stack", tab: "stack" },
        { id: "playground", tab: "playground" },
        { id: "contact", tab: "contact" },
      ];

      // Offset by navbar height + cushion
      const scrollPosition = window.scrollY + 180;

      // Check if near bottom of page -> activate last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveTab("contact");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(sections[i].tab);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-white/90 backdrop-blur-md border-b border-[#E2DDD5] px-3 sm:px-8 flex items-center justify-between shadow-xs">
      
      {/* LEFT BRANDING / LOGOMARK */}
      <div className="flex items-center shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <Image
            src="/icon.png"
            alt="Favicon Logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border border-black/15 shadow-2xs bg-white"
          />
        </Link>
      </div>

      {/* CENTER FLOATING NAVIGATION CONTAINER */}
      <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
        <Link
          href="/"
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "home"
              ? "bg-[#FFD028] text-neutral-950 shadow-xs"
              : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>HOME</span>
        </Link>

        <a
          href="#about"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-medium transition-colors ${
            activeTab === "about"
              ? "bg-[#FFD028] text-neutral-950 font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>ABOUT</span>
        </a>

        <a
          href="#projects"
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-medium transition-colors ${
            activeTab === "projects"
              ? "bg-[#FFD028] text-neutral-950 font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>PROJECTS</span>
        </a>

        <a
          href="#stack"
          onClick={() => setActiveTab("stack")}
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-medium transition-colors ${
            activeTab === "stack"
              ? "bg-[#FFD028] text-neutral-950 font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>STACK</span>
        </a>

        <a
          href="#playground"
          onClick={() => setActiveTab("playground")}
          className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-medium transition-colors ${
            activeTab === "playground"
              ? "bg-[#FFD028] text-neutral-950 font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PLAYGROUND</span>
        </a>
      </nav>

      {/* RIGHT ACTION CTA */}
      <a
        href="#contact"
        onClick={() => setActiveTab("contact")}
        className={`border-2 border-black rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
          activeTab === "contact"
            ? "bg-black text-white shadow-none"
            : "bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
        }`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>LET&apos;S TALK</span>
      </a>

    </header>
  );
}
