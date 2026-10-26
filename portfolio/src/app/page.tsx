import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechStackCassette } from "@/components/TechStackCassette";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { NotebookBackground } from "@/components/NotebookBackground";
import { SectionPolish } from "@/components/SectionPolish";

import { homeJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen text-ink overflow-x-clip">
      <NotebookBackground />
      <SectionPolish />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd()) }} />
      <Navbar />
      <main className="relative z-[1]">

        <Hero />
        <AboutSection />
        <FeaturedProjects />
        <TechStackCassette />
        <ContactSection />


      </main>
      <div className="relative z-[1]"><Footer /></div>
    </div>
  );
}
