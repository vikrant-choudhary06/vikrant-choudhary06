import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechStackCassette } from "@/components/TechStackCassette";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-notebook-ruled text-slate-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <FeaturedProjects />
        <TechStackCassette />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
