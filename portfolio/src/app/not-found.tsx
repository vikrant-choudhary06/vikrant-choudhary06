import Link from 'next/link';
export default function NotFound() {
  return <main id="main-content" className="detail-shell"><p className="eyebrow">404 / NOT FOUND</p><h1 style={{ fontSize: 40, fontWeight: 600 }}>Nothing to see here.</h1><p className="detail-summary">This page doesn’t exist. Let’s get you back to the portfolio.</p><Link className="contact-button" style={{ width: 'fit-content', marginTop: 24 }} href="/">Back home ↗</Link></main>;
}
