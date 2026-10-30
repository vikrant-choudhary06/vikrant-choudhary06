import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import styles from "./ProjectPage.module.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FoldInItem } from "@/components/FoldInItem";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";
import { projectJsonLd, serializeJsonLd } from "@/lib/structured-data";

const displayFont = localFont({ src: "../../fonts/anton.ttf", display: "swap", weight: "400" });

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

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  // Sections for the ruler navigation, in page order.
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    ...(project.decisions.length > 0 ? [{ id: "decisions", label: "Decisions" }] : []),
    { id: "challenge", label: "Challenge" },
  ];

  return (
    <div className="min-h-screen text-ink overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd(project)) }} />
      <Navbar sections={sections} />

      <main className={styles.page}>
        <Link href="/#projects" className={styles.back}>
          <ArrowLeft size={14} aria-hidden="true" />
          All projects
        </Link>

        <header id="overview" className={styles.header}>
          <p className={styles.eyebrow}>
            <span>{String(index + 1).padStart(2, "0")} / Case study · {project.year}</span>
            {project.labels?.map((label) => <span key={label} className={styles.label}>{label}</span>)}
          </p>
          <h1 className={`${styles.title} ${displayFont.className}`}>{project.name}</h1>
          <p className={styles.kind}>{project.kind} · built by {PERSONAL_INFO.name}</p>
          <p className={styles.summary}>{project.summary}</p>
          {project.note && <p className={styles.note}>{project.note}</p>}

          <div className={styles.meta}>
            <p className={styles.stack}>{project.stack.join(" / ")}</p>
            <div className={styles.links}>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                  Live site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.links.video && (
                <a href={project.links.video} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                  Demo video <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={project.links.live ? styles.secondary : styles.primary}>
                  Source code <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          {project.source === "private" && (
            <p className={styles.private}>
              <Lock size={14} aria-hidden="true" />
              Source is private. Happy to walk through the code in an interview.
            </p>
          )}
        </header>

        <ProjectGallery images={project.images} />

        <section id="problem" className={styles.section} aria-labelledby="problem-title">
          <h2 id="problem-title" className={styles.sectionLabel}><span>01</span>The problem</h2>
          <p className={styles.prose}>{project.problem}</p>
        </section>

        {project.decisions.length > 0 && (
          <section id="decisions" className={styles.section} aria-labelledby="decisions-title">
            <h2 id="decisions-title" className={styles.sectionLabel}><span>02</span>Decisions and why</h2>
            <ol className={styles.decisions}>
              {project.decisions.map((decision) => (
                <FoldInItem key={decision.title} className={styles.decision}>
                  <h3>{decision.title}</h3>
                  <p>{decision.why}</p>
                </FoldInItem>
              ))}
            </ol>
          </section>
        )}

        <section id="challenge" className={styles.section} aria-labelledby="challenge-title">
          <h2 id="challenge-title" className={styles.sectionLabel}><span>{project.decisions.length > 0 ? "03" : "02"}</span>The hardest part</h2>
          <p className={styles.prose}>{project.challenge}</p>
        </section>

        <p className={styles.talk}>
          Want to talk about {project.name}? <Link href="/#contact">Get in touch</Link>
        </p>

        <Link href={`/projects/${next.slug}`} className={styles.next}>
          <span>
            <small>Next project</small>
            <span className={`${styles.nextName} ${displayFont.className}`}>{next.name}</span>
          </span>
          <ArrowUpRight size={40} aria-hidden="true" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}
