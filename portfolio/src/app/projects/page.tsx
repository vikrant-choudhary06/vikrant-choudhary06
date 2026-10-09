import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects by ${PERSONAL_INFO.name}: ${PROJECTS.map((p) => p.name).join(", ")}.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: PERSONAL_INFO.name,
    locale: "en_IN",
    title: `Projects — ${PERSONAL_INFO.name}`,
    description: `Projects by ${PERSONAL_INFO.name}: ${PROJECTS.map((p) => p.name).join(", ")}.`,
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-notebook-ruled text-ink overflow-x-hidden">
      <Navbar />
      <main className="pt-14">
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
}
