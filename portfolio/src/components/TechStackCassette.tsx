import Link from "next/link";
import { ALSO_FAMILIAR, PROJECTS, STACK } from "@/data/portfolio-data";
import type { Project, StackItem } from "@/types";

const LABEL_COLORS = ["bg-amber-300", "bg-emerald-300", "bg-pink-300", "bg-sky-300"];

function resolve(item: StackItem): { name: string; usedIn: Project[] } {
  if (typeof item === "string") {
    const key = item.toLowerCase();
    return {
      name: item,
      usedIn: PROJECTS.filter((p) => p.stack.some((s) => s.toLowerCase() === key)),
    };
  }
  return {
    name: item.name,
    usedIn: PROJECTS.filter((p) => item.projects.includes(p.slug)),
  };
}

export function TechStackCassette() {
  return (
    <section id="stack" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <span className="font-handwriting text-xl sm:text-2xl text-ink-soft -rotate-2 inline-block mb-1">
          what I work with ~
        </span>
        <h2 className="font-pixel text-4xl sm:text-6xl text-ink tracking-wider leading-none uppercase">
          Tech Stack
        </h2>
        <p className="text-sm text-ink-soft mt-3">Next to each one: the projects where I used it.</p>
      </div>

      <div className="bg-cream border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--shadow)] divide-y divide-line">
        {STACK.map((group, i) => (
          <div key={group.title} className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6">
            <div>
              <span
                className={`font-mono text-xs font-bold uppercase tracking-wider text-neutral-950 px-3 py-0.5 rounded-full border border-ink ${LABEL_COLORS[i % LABEL_COLORS.length]}`}
              >
                {group.title}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((raw) => {
                const { name, usedIn } = resolve(raw);
                return (
                  <div
                    key={name}
                    className="px-3 py-1.5 rounded-md bg-card border-2 border-ink font-mono text-xs"
                  >
                    <span className="font-bold text-ink">{name}</span>
                    {usedIn.length > 0 && (
                      <span className="text-muted">
                        {" · "}
                        {usedIn.map((project, j) => (
                          <span key={project.slug}>
                            {j > 0 && ", "}
                            <Link href={`/projects/${project.slug}`} className="hover:text-blue-600 hover:underline">
                              {project.name}
                            </Link>
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6 bg-subtle rounded-b-xl">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-soft px-3 py-0.5 rounded-full border border-line bg-card">
              Also familiar
            </span>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {ALSO_FAMILIAR.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-md bg-card border border-dashed border-line font-mono text-xs font-bold text-ink-soft"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted mt-2">I know these, but haven&apos;t shipped a project with them yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
