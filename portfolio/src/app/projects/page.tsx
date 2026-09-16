import React from "react";
import { Navbar } from "@/components/Navbar";
import { AllProjects } from "@/components/AllProjects";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-notebook-ruled text-slate-900 selection:bg-amber-300 selection:text-slate-950 overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Showcase */}
      <main className="relative z-10 pt-16">
        <AllProjects />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
