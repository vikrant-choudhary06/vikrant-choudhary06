import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Vikrant Choudhary",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-notebook-ruled text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="pt-14">
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
}
