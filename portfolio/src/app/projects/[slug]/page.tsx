import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Code2, Globe, Lock } from 'lucide-react';
import type { Metadata } from 'next';
import { PROJECTS } from '@/data/portfolio-data';
import { PROJECT_LOGOS } from '@/lib/design-data';

export function generateStaticParams() { return PROJECTS.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(item => item.slug === slug);
  return { title: project?.name ?? 'Project not found', description: project?.summary };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find(item => item.slug === slug);
  if (!project) notFound();
  return <main id="main-content" className="detail-shell">
    <Link href="/#projects" className="back-link"><ArrowLeft size={14} />All projects</Link>
    <header className="detail-header"><Image src={PROJECT_LOGOS[project.slug]} alt={`${project.name} logo`} width={65} height={65} className="detail-logo" /><p className="eyebrow" style={{ marginTop: 25 }}>{project.year} / {project.kind}</p><h1>{project.name}</h1><p className="detail-summary">{project.summary}</p>{project.note && <p className="detail-summary" style={{ fontSize: 13 }}>{project.note}</p>}<div className="detail-links">{project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer"><Globe size={14} />Live project <ArrowUpRight size={13} /></a>}{project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer"><Code2 size={14} />Source code <ArrowUpRight size={13} /></a>}{project.source === 'private' && <span className="back-link"><Lock size={12} />Private source</span>}</div></header>
    <section className="detail-section"><h2>The toolkit</h2><div className="detail-stack">{project.stack.map(name => <span key={name}>{name}</span>)}</div>{project.images.map(image => <figure key={image.src}><Image src={image.src} alt={image.alt} width={1400} height={900} className="detail-image" /><figcaption className="activity-note">{image.caption}</figcaption></figure>)}</section>
    <section className="detail-section"><h2>The problem</h2><p>{project.problem}</p></section>
    <section className="detail-section"><h2>Decisions behind the build</h2>{project.decisions.map((decision, index) => <article key={decision.title}><h3>{String(index + 1).padStart(2, '0')} / {decision.title}</h3><p>{decision.why}</p></article>)}</section>
    <section className="detail-section"><h2>The hardest part</h2><p>{project.challenge}</p></section><footer style={{ paddingTop: 28 }}><Link className="back-link" href="/#projects"><ArrowLeft size={14} />Back to all projects</Link></footer>
  </main>;
}
