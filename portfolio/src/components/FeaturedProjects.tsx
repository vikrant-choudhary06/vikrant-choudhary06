import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";

export function FeaturedProjects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10">
        <span className="font-handwriting text-xl sm:text-2xl text-ink-soft -rotate-2 inline-block mb-1">
          things I&apos;ve built ~
        </span>
        <h2 className="font-pixel text-4xl sm:text-6xl text-ink tracking-wider leading-none uppercase">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {PROJECTS.map((project) => {
          const cover = project.images[0];
          return (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
              <div className="flex items-center">
                <div className="bg-[#1E40AF] border-2 border-ink border-b-0 px-5 py-2 rounded-t-xl font-mono text-xs font-bold text-white">
                  {project.year}
                </div>
                <div className="h-[2px] bg-ink flex-1 -ml-[2px]" />
              </div>

              <div className="bg-[#0F172A] border-2 border-ink rounded-b-2xl rounded-tr-2xl p-3 sm:p-4 shadow-[6px_6px_0px_var(--shadow)] group-hover:shadow-[9px_9px_0px_var(--shadow)] transition-shadow">
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#1E293B]">
                  {cover ? (
                    <Image src={cover.src} alt={cover.alt} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-pixel text-5xl text-white/80">
                      {project.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 px-1">
                <h3 className="font-sans font-bold text-2xl text-ink group-hover:text-blue-600 transition-colors inline-flex items-center gap-1.5">
                  {project.name}
                  <ArrowUpRight className="w-5 h-5" />
                </h3>
                {project.labels && project.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-400 text-amber-900 dark:bg-amber-400/15 dark:border-amber-400/50 dark:text-amber-200 font-mono text-[11px] font-bold"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-ink-soft mt-1 leading-relaxed">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-3 font-mono text-[11px]">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-card border border-line text-ink font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
