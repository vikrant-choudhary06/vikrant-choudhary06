import Link from "next/link";
import localFont from "next/font/local";
import { Braces, Code2, Database, Layers, Cloud, Terminal, Workflow } from "lucide-react";
import { ALSO_FAMILIAR, PROJECTS, STACK } from "@/data/portfolio-data";
import type { StackItem } from "@/types";
import styles from "./TechStackCassette.module.css";

const displayFont = localFont({ src: "../app/fonts/anton.ttf", display: "swap", weight: "400" });
function resolve(item: StackItem) {
  const name = typeof item === "string" ? item : item.name;
  const usedIn = PROJECTS.filter((project) => typeof item === "string"
    ? project.stack.some((tech) => tech.toLowerCase() === item.toLowerCase())
    : item.projects.includes(project.slug));
  return { name, usedIn };
}
function Technology({ item }: { item: StackItem }) {
  const { name, usedIn } = resolve(item);
  return <li className={styles.row}>
    <span className={styles.techName}>{name}</span>
    {usedIn.length > 0 && <span className={styles.evidence}>{usedIn.map((project, index) => <span key={project.slug}>{index > 0 && " · "}<Link href={`/projects/${project.slug}`}>{project.name}</Link></span>)}</span>}
  </li>;
}
export function TechStackCassette() {
  const group = (title: string) => STACK.find((entry) => entry.title === title)?.items ?? [];
  const groups = [
    { title: "Languages", icon: Braces, items: group("Languages"), featured: 4 },
    { title: "Frontend", icon: Code2, items: group("Frontend"), featured: 4 },
    { title: "Backend & data", icon: Database, items: [...group("Backend"), ...group("Data")], featured: 0 },
    { title: "Infra & tools", icon: Cloud, items: group("Infra & tools"), featured: 3 },
  ];
  const backendHighlights: StackItem[] = ["NestJS", "Express", "PostgreSQL", "Prisma", "Redis", "BullMQ"];
  return (
    <section id="stack" className={styles.stack} aria-labelledby="stack-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>03 / The toolkit <span /></p>
        <h2 id="stack-title" className={`${styles.title} ${displayFont.className}`}>WHAT POWERS THE BUILD.</h2>
        <p className={styles.subtitle}>The tools behind the interfaces, APIs and systems I build.</p>
        <div className={styles.grid}>
          {groups.map((entry, index) => {
            const Icon = entry.icon;
            const featured = entry.featured ? entry.items.slice(0, entry.featured) : backendHighlights;
            const extra = entry.items.filter((item) => !featured.some((primary) => resolve(primary).name === resolve(item).name));
            return <div className={styles.group} key={entry.title}>
              <h3 className={styles.category}><span>{String(index + 1).padStart(2, "0")} /</span>{entry.title}<span className={styles.rule} /></h3>
              <div className={styles.groupContent}><Icon className={styles.groupIcon} size={30} aria-hidden="true" /><ul className={styles.rows}>{featured.map((item) => <Technology key={resolve(item).name} item={item} />)}</ul></div>
              {extra.length > 0 && <details className={styles.more}><summary>More {entry.title.toLowerCase()} <span>+</span></summary><ul className={styles.rows}>{extra.map((item) => <Technology key={resolve(item).name} item={item} />)}</ul></details>}
            </div>;
          })}
        </div>
        <div className={styles.deep}>
          <div className={styles.deepHeading}><Layers size={34} aria-hidden="true" /><h3 className={displayFont.className}>DEEPER UNDER THE HOOD</h3></div>
          <div className={styles.deepGroups}>
            {[{ title: "Database internals", icon: Terminal }, { title: "Real-time", icon: Workflow }].map(({ title, icon: Icon }) => <div key={title}><h4><Icon size={16} aria-hidden="true" />{title}</h4><ul className={styles.deepList}>{group(title).map((item) => <Technology key={resolve(item).name} item={item} />)}</ul></div>)}
          </div>
        </div>
        <details className={styles.familiar}><summary>Also familiar</summary><p>{ALSO_FAMILIAR.join(" / ")}</p><p className={styles.familiarNote}>I know these, but haven’t shipped a project with them yet.</p></details>
      </div>
    </section>
  );
}
