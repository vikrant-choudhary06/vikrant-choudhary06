export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  summary: string;
  year: string;
  stack: string[];
  source: "public" | "private";
  // Short status tags shown on the card, e.g. "Under development".
  labels?: string[];
  // One-line context shown at the top of the case study.
  note?: string;
  links: {
    github?: string;
    live?: string;
    video?: string;
  };
  problem: string;
  decisions: { title: string; why: string }[];
  challenge: string;
  images: ProjectImage[];
}

// A plain string is matched against each project's `stack` to find where it
// was used. Use the object form when the skill isn't a stack entry (e.g. "SSE").
export type StackItem = string | { name: string; projects: string[] };

export interface StackGroup {
  title: string;
  items: StackItem[];
}
