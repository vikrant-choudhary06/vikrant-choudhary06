import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO, STACK } from '@/data/portfolio-data';
import { TECH_ICONS } from '@/lib/design-data';

export function ProfileSidebar() {
  const tools = Array.from(new Set(STACK.slice(0, 5).flatMap(group => group.items.map(item => typeof item === 'string' ? item : item.name))));
  return <aside className="profile-sidebar" aria-label="Profile and technology stack">
    <div className="profile-main">
      <Link href="/" aria-label="Vikrant Kumar, home" className="portrait-link"><div className="portrait-circle"><Image src="/hero-portrait-new.webp" alt="Vikrant Kumar wearing glasses and a navy shirt" fill priority sizes="150px" className="profile-image" /></div><span className="available-dot" title="Open to work" /></Link>
      <h1>{PERSONAL_INFO.name}</h1>
      <a className="github-handle" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Image src="/stack/github.svg" alt="" width={13} height={13} /> vikrant-choudhary06 <ArrowUpRight size={11} /></a>
      <p className="pronouns">he / him</p>
      <p className="tagline">Code that calculates.<br /><span>Software that scales.</span></p>
      <p className="location"><MapPin size={12} />{PERSONAL_INFO.location}</p>
      <div className="social-links"><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Image src="/stack/github.svg" alt="" width={16} height={16} /></a><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Image src="/stack/linkedin.svg" alt="" width={16} height={16} /></a><a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email"><Mail size={16} /></a></div>
    </div>
    <section className="stack-panel" aria-labelledby="stack-label"><div className="stack-heading"><h2 id="stack-label">The toolkit</h2><span>{tools.length} tools</span></div>
      <div className="tech-grid">{tools.map(name => <div key={name} className="tech-badge" tabIndex={0} aria-label={name}><span className="tech-circle">{TECH_ICONS[name] ? <Image src={`/stack/${TECH_ICONS[name]}.svg`} alt="" width={20} height={20} /> : <span className="tech-initials">{name === 'SQL' ? 'SQL' : name === 'Wails' ? 'W' : name.split(/\s+/).map(word => word[0]).join('').slice(0, 3)}</span>}</span><span className="tech-tooltip">{name}</span></div>)}</div>
      <p className="stack-note">From the interface to the infrastructure.</p>
    </section>
    <div className="sidebar-note"><span className="tiny-dot" />Open to internships<br /><span className="note-indent">& freelance collaborations.</span><a href={`mailto:${PERSONAL_INFO.email}`}>Let’s talk <ArrowUpRight size={13} /></a></div>
  </aside>;
}
