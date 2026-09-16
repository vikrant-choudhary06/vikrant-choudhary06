import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AllProjects } from "@/components/AllProjects";
import { TechRadar } from "@/components/TechRadar";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-zinc-900 selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-hidden">
      {/* 1. Ambient Background Glow Orbs (Soft Mesh Aura) */}
      <div 
        className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-400/15 via-teal-300/10 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" 
        aria-hidden="true" 
      />
      <div 
        className="fixed top-[45%] -left-[200px] w-[600px] h-[600px] bg-cyan-400/10 blur-[160px] pointer-events-none -z-10 rounded-full" 
        aria-hidden="true" 
      />
      <div 
        className="fixed bottom-[10%] -right-[200px] w-[650px] h-[650px] bg-emerald-400/10 blur-[160px] pointer-events-none -z-10 rounded-full" 
        aria-hidden="true" 
      />

      {/* 2. Vignette Dot-Matrix Developer Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#94a3b8_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)] -z-10" 
        aria-hidden="true" 
      />

      {/* Floating iOS / macOS Icon Dock */}
      <Navbar />

      {/* Main Container */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10 space-y-4">
        {/* 1. Home (Hero & Live Bento Status) */}
        <Hero />

        {/* 2. Projects (All 8 Projects in Sequence) */}
        <AllProjects />

        {/* 3. Skills (Tech Radar) */}
        <TechRadar />

        {/* 4. About (The Story & Experience) */}
        <AboutSection />

        {/* 5. Contact (Email, GitHub, Back to top) */}
        <Footer />
      </main>
    </div>
  );
}
