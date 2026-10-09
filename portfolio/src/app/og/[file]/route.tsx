import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";
import { renderOgCard } from "@/lib/og-image";

// Link-preview images, written at build time as /og/home.png and /og/<slug>.png.
// A real .png file name matters: static hosts pick the Content-Type from it,
// and social sites ignore previews that aren't served as images.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "home.png" }, ...PROJECTS.map((p) => ({ file: `${p.slug}.png` }))];
}

// Very light or black brand colours would vanish as the accent stripe on the dark card.
const HIDDEN_ACCENTS = ["#000000", "#F5F5F4"];

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const slug = file.replace(/\.png$/, "");

  if (slug === "home") {
    return renderOgCard({
      eyebrow: "PORTFOLIO",
      title: PERSONAL_INFO.name,
      subtitle: `${PERSONAL_INFO.role} from ${PERSONAL_INFO.location}. I build web apps and the backends behind them.`,
      footer: PROJECTS.slice(0, 6).map((p) => p.name),
    });
  }

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return new Response("Not found", { status: 404 });
  }
  return renderOgCard({
    eyebrow: `PROJECT · ${project.year}${project.labels?.length ? ` · ${project.labels.join(" · ").toUpperCase()}` : ""}`,
    title: project.name,
    subtitle: project.kind,
    accent: project.color && !HIDDEN_ACCENTS.includes(project.color) ? project.color : undefined,
    footer: project.stack.slice(0, 6),
  });
}
