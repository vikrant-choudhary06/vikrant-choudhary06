"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Folder, Cpu, Sparkles, MessageSquare, Menu, X } from "lucide-react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { id: "home", label: "HOME", href: "/", icon: Home },
    { id: "about", label: "ABOUT", href: "#about", icon: User },
    { id: "projects", label: "PROJECTS", href: "#projects", icon: Folder },
    { id: "stack", label: "STACK", href: "#stack", icon: Cpu },
    { id: "playground", label: "PLAYGROUND", href: "#playground", icon: Sparkles },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-white/90 backdrop-blur-md border-b border-[#E2DDD5] px-4 sm:px-8 flex items-center justify-between shadow-xs">
        
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
            <span className="font-mono text-xs font-bold text-black tracking-wider md:hidden">
              VK.STUDIO
            </span>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION CONTAINER */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  isActive
                    ? "bg-[#FFD028] text-neutral-950 font-bold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 font-medium"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT ACTION CTA & MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={() => {
              setActiveTab("contact");
              setIsMobileMenuOpen(false);
            }}
            className={`border-2 border-black rounded-full px-3 sm:px-4 py-1.5 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "contact"
                ? "bg-black text-white shadow-none"
                : "bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LET&apos;S TALK</span>
            <span className="sm:hidden">TALK</span>
          </a>

          {/* HAMBURGER TOGGLE BUTTON (MOBILE ONLY) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-black bg-neutral-100 hover:bg-neutral-200 border border-black/10 rounded-full transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* MOBILE MENU OVERLAY & DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b-2 border-black p-5 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2 font-mono">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                      isActive
                        ? "bg-[#FFD028] text-neutral-950 border-black shadow-[2px_2px_0px_#000]"
                        : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-black" />
                    <span>{link.label}</span>
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={() => {
                  setActiveTab("contact");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border mt-2 ${
                  activeTab === "contact"
                    ? "bg-black text-white border-black shadow-[2px_2px_0px_#FFD028]"
                    : "bg-neutral-900 text-white border-black hover:bg-black shadow-[2px_2px_0px_#000]"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>LET&apos;S TALK // CONTACT</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

