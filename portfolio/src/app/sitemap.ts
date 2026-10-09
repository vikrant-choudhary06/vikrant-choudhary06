import type { MetadataRoute } from "next";
import { PROJECTS, SITE_URL } from "@/data/portfolio-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
