import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechStackCassette } from "@/components/TechStackCassette";
import { PlaygroundSection } from "@/components/PlaygroundSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-notebook-ruled text-slate-900 selection:bg-amber-300 selection:text-slate-950 overflow-x-hidden">
      
      {/* Notebook Navigation Header Dock */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-6">
        {/* HERO SECTION */}
        <Hero />

        {/* "ABOUT ME" COLLAGE SECTION */}
        <AboutSection />

        {/* "FEATURED PROJECTS & LAB WORK" */}
        <FeaturedProjects />

        {/* TECH STACK STICKER WALL */}
        <TechStackCassette />

        {/* "JUST FOR FUN" / PLAYGROUND STICKER BOARD */}
        <PlaygroundSection />

        {/* "LET'S TALK" / CONTACT BOARD */}
        <ContactSection />

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
