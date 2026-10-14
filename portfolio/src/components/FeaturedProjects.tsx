import localFont from "next/font/local";
import { PROJECTS } from "@/data/portfolio-data";
import { findProjectLogo } from "@/lib/project-assets";
import { SelectedProjectGallery } from "./SelectedProjectGallery";

const displayFont = localFont({ src: "../app/fonts/anton.ttf", display: "swap", weight: "400" });

export function FeaturedProjects() {
  const logos = Object.fromEntries(PROJECTS.map((project) => [project.slug, findProjectLogo(project.slug)]));
  return <SelectedProjectGallery displayClass={displayFont.className} logos={logos} />;
}
