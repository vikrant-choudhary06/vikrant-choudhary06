import { PERSONAL_INFO, PROJECTS, SITE_URL, STACK } from "@/data/portfolio-data";
import type { Project } from "@/types";

// Schema.org data that tells search engines and AI assistants who I am and
// what I built. Every value comes from portfolio-data.ts, so it can't drift
// from what the page shows.

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function projectUrl(project: Project): string {
  return `${SITE_URL}/projects/${project.slug}`;
}

function stackNames(): string[] {
  return STACK.flatMap((group) => group.items.map((item) => (typeof item === "string" ? item : item.name)));
}

function person() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSONAL_INFO.name,
    url: SITE_URL,
    image: `${SITE_URL}/pic.webp`,
    jobTitle: PERSONAL_INFO.role,
    description: PERSONAL_INFO.about.join(" "),
    email: `mailto:${PERSONAL_INFO.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mathura",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Manipal University Jaipur",
    },
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin, PERSONAL_INFO.instagram],
    knowsAbout: stackNames(),
  };
}

function projectNode(project: Project) {
  const base = {
    "@id": `${projectUrl(project)}#project`,
    name: project.name,
    alternateName: `${project.name}: ${project.kind}`,
    description: project.summary,
    url: projectUrl(project),
    dateCreated: project.year,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: project.stack.join(", "),
  };

  // Public code is a SoftwareSourceCode; private apps are described by what they do.
  if (project.links.github) {
    return {
      "@type": "SoftwareSourceCode",
      ...base,
      codeRepository: project.links.github,
      programmingLanguage: project.stack,
      ...(project.links.live ? { sameAs: [project.links.live] } : {}),
    };
  }
  return {
    "@type": "SoftwareApplication",
    ...base,
    applicationCategory: "BusinessApplication",
    ...(project.links.live ? { sameAs: [project.links.live] } : {}),
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: `${PERSONAL_INFO.name} — Portfolio`,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      person(),
      {
        "@type": "ItemList",
        name: `Projects by ${PERSONAL_INFO.name}`,
        itemListElement: PROJECTS.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: projectUrl(project),
          name: project.name,
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      projectNode(project),
      person(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: project.name, item: projectUrl(project) },
        ],
      },
    ],
  };
}

// Escape "<" so a value can never close the <script> tag early.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
