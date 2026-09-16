import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { WaylineCaseStudy } from "@/components/WaylineCaseStudy";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectTitle = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div className="relative min-h-screen bg-notebook-ruled text-slate-900 selection:bg-amber-300 selection:text-slate-950 overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      <main className="relative z-10 pt-6 pb-12">
        {/* Back Link Bar */}
        <div className="max-w-6xl mx-auto px-6 mb-4">
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[ ← BACK TO PORTFOLIO ]</span>
          </Link>
        </div>

        {/* Detailed Case Study View */}
        <WaylineCaseStudy
          isOpen={true}
          projectTitle={projectTitle}
        />

        {/* Contact Board */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
