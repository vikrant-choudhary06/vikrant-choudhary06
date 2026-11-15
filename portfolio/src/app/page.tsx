import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowDownRight, ArrowUpRight, Code2, Command, CornerDownRight } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio-data';
import { PROJECT_LOGOS } from '@/lib/design-data';
import { ProfileSidebar } from '@/components/ProfileSidebar';
import { GitHubActivity } from '@/components/GitHubActivity';
import { ContactForm } from '@/components/ContactForm';

export default function Home() {
  return <div className="site-shell">
    <header className="site-header"><Link href="/" className="wordmark"><Command size={17} /><span>vikrant<span className="wordmark-dot">.</span></span></Link><nav aria-label="Page navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact <ArrowUpRight size={12} /></a></nav></header>
    <div className="portfolio-grid"><ProfileSidebar /><main id="main-content" className="main-column">
      <section id="about" className="panel about-panel" aria-labelledby="about-heading"><div className="about-copy"><h2 id="about-heading" className="about-name">Vikrant<br /><span className="headline-accent">Kumar.</span></h2><div className="about-bio"><p className="eyebrow"><span className="tiny-dot" /> ABOUT ME</p><p>I’m <strong>Vikrant</strong>, a backend-focused full-stack developer and <a href="https://miidaystudio.online/" target="_blank" rel="noreferrer">founder of MiidayStudio <ArrowUpRight size={12} /></a>.</p><p>I build fast web applications, fine-tune databases, and connect the details that make a product work.</p><div className="about-signoff"><CornerDownRight size={14} /><span>Built from an idea. Made to work.</span></div></div></div><div className="sketch-portrait"><Image src="/vikrant-sketch.png" alt="Mirrored pencil sketch of Vikrant Kumar" width={1024} height={1024} sizes="(max-width: 480px) 85vw, 230px" className="sketch-image" /></div></section>
      <Suspense fallback={<section className="panel activity-loading" aria-label="Loading GitHub activity"><p className="eyebrow">GITHUB ACTIVITY</p><p>Fetching the latest contributions<span className="loading-dots">…</span></p><div className="loading-bars" aria-hidden="true">{Array.from({ length: 26 }, (_, i) => <span key={i} />)}</div></section>}><GitHubActivity /></Suspense>
      <section id="projects" className="panel projects-panel" aria-labelledby="projects-heading"><div className="section-top"><div><p className="eyebrow">THINGS I’VE PUT INTO THE WORLD</p><h2 id="projects-heading">Selected projects<span className="heading-period">.</span></h2></div><span className="project-count">{String(PROJECTS.length).padStart(2, '0')} projects <ArrowDownRight size={14} /></span></div><div className="project-list">{PROJECTS.map((project, index) => <Link className="project-row group" key={project.slug} href={`/projects/${project.slug}`}><span className="project-index">{String(index + 1).padStart(2, '0')}</span><div className="project-copy"><div className="project-title-line"><h3>{project.name}</h3>{project.labels?.includes('Under development') && <span className="project-status">in progress</span>}</div><p>{project.summary}</p><div className="project-tech">{project.stack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div></div><div className="project-logo"><Image src={PROJECT_LOGOS[project.slug]} alt={`${project.name} logo`} width={46} height={46} /></div><ArrowUpRight className="project-arrow" size={18} /></Link>)}</div><div className="projects-footnote"><Code2 size={14} /><p>Real problems. Thoughtful decisions. Working software.</p></div></section>
      <ContactForm />
      <footer className="site-footer"><span>© {new Date().getFullYear()} Vikrant Kumar</span><span>Made with intention. <span aria-hidden="true">↗</span></span><a href="#about">Back to top ↑</a></footer>
    </main></div>
  </div>;
}
