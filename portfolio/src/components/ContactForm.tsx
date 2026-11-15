'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const pending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    pending.current = true;
    setStatus('sending');
    setFeedback('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Your message could not be sent. Please try again.');
      setStatus('success');
      setFeedback('Message sent. Thanks for reaching out!');
      form.reset();
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'Sending timed out. Please try again or email me directly.');
    } finally {
      pending.current = false;
    }
  }

  return <section id="contact" className="panel contact-form-panel" aria-labelledby="contact-heading">
    <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
    <h2 id="contact-heading">Let’s build it together<span className="heading-period">.</span></h2>
    <p className="contact-intro">A project, an opportunity, or just a hello. I’d love to hear from you.</p>
    <form onSubmit={submit}>
      <div className="contact-fields"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" required minLength={2} maxLength={100} /></label><label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div>
      <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" rows={5} placeholder="Tell me a little about what you have in mind…" required minLength={10} maxLength={5000} /></label>
      <div className="contact-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="contact-form-bottom"><a href={`mailto:${PERSONAL_INFO.email}`}><Mail size={14} /> Prefer email?</a><button type="submit" className="contact-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}<ArrowUpRight size={16} /></button></div>
      <p className={`contact-feedback ${status === 'error' ? 'contact-error' : ''}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{feedback}</p>
    </form>
  </section>;
}
