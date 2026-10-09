import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";
import { projectJsonLd, serializeJsonLd } from "@/lib/structured-data";

// Static export: only the slugs listed below exist, anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  const title = `${project.name}: ${project.kind}`;
  const description = `${project.summary} Built by ${PERSONAL_INFO.name}.`;
  const path = `/projects/${project.slug}`;
  const image = { url: `/og/${project.slug}.png`, width: 1200, height: 630, alt: `${project.name} by ${PERSONAL_INFO.name}` };
  return {
    title,
    description,
    keywords: [project.name, project.kind, PERSONAL_INFO.name, ...project.stack],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: PERSONAL_INFO.name,
      locale: "en_IN",
      title: `${title} — ${PERSONAL_INFO.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${PERSONAL_INFO.name}`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-notebook-ruled text-ink overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd(project)) }} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 bg-card border-2 border-ink px-4 py-2 rounded-full font-mono text-xs font-bold shadow-[2px_2px_0px_var(--shadow)] hover:bg-amber-300 dark:hover:bg-amber-400 dark:hover:text-neutral-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <article className="mt-6 bg-card border-2 border-ink rounded-2xl p-5 sm:p-10 shadow-[8px_8px_0px_var(--shadow)]">
          <header className="pb-8 border-b border-line">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs text-muted font-bold">{project.year}</p>
              {project.labels?.map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-400 text-amber-900 dark:bg-amber-400/15 dark:border-amber-400/50 dark:text-amber-200 font-mono text-[11px] font-bold"
                >
                  {label}
                </span>
              ))}
            </div>
            <h1 className="font-pixel text-5xl sm:text-7xl tracking-wider text-ink leading-none mt-2 uppercase">
              {project.name}
            </h1>
            <p className="mt-3 font-mono text-xs sm:text-sm text-muted font-bold">
              {project.kind} · built by {PERSONAL_INFO.name}
            </p>
            <p className="text-lg sm:text-xl text-ink-soft mt-4 leading-relaxed">{project.summary}</p>
            {project.note && (
              <p className="mt-4 text-sm text-amber-950 bg-amber-50 border-l-4 border-amber-400 dark:text-amber-100 dark:bg-amber-400/10 px-4 py-2.5">
                {project.note}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-5 font-mono text-xs">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-subtle border border-line font-semibold">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#194BFD] text-white font-mono text-xs font-bold px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_var(--shadow)] rounded-sm"
                >
                  Live site
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.links.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-card font-mono text-xs font-bold px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_var(--shadow)] rounded-sm"
                >
                  Demo video
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-card font-mono text-xs font-bold px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_var(--shadow)] rounded-sm"
                >
                  Source code
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.source === "private" && (
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                  <Lock className="w-3.5 h-3.5" />
                  Source is private. Happy to walk through the code in an interview.
                </span>
              )}
            </div>
          </header>

          <ProjectGallery images={project.images} />

          <section className="mt-10">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">The problem</h2>
            <p className="mt-3 text-ink leading-relaxed">{project.problem}</p>
          </section>

          {project.decisions.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Decisions and why
              </h2>
              <div className="mt-4 space-y-5">
                {project.decisions.map((decision) => (
                  <div key={decision.title} className="border-l-4 border-amber-300 dark:border-amber-500/60 pl-4">
                    <h3 className="font-bold text-ink">{decision.title}</h3>
                    <p className="mt-1 text-ink-soft leading-relaxed">{decision.why}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              The hardest part
            </h2>
            <p className="mt-3 text-ink leading-relaxed">{project.challenge}</p>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
