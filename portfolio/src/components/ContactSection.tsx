"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import styles from "./ContactSection.module.css";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ContactVerification } from "./ContactVerification";
import { ContactTrace } from "./ContactTrace";

const displayFont = localFont({ src: "../app/fonts/anton.ttf", display: "swap", weight: "400" });

const EMPTY_FORM = { name: "", email: "", subject: "", message: "", website: "" };

const inputClass =
  styles.input;

export function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!turnstileToken) {
      setErrorMessage("Please complete the verification before sending.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // The function only exists on Cloudflare Pages, so `next dev` returns 404.
        if (response.status === 404 && process.env.NODE_ENV === "development") {
          throw new Error("No message was sent. The contact form runs on Cloudflare Pages; use the email link during local development.");
        }
        throw new Error(data.error || "Couldn't send your message.");
      }
      if (data.success !== true) throw new Error("Couldn't confirm your message was sent.");

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Couldn't send your message.");
    } finally {
      setLoading(false);
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
    }
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <ContactTrace />
      <header className={styles.header}>
        <p className={styles.eyebrow}>04 / Start a conversation</p>
        <h2 id="contact-title" className={`${styles.title} ${displayFont.className}`}>LET’S BUILD SOMETHING.</h2>
      </header>
      <div className={styles.layout}>
        <div className={styles.details}>
          <p className={styles.availability}><span aria-hidden="true" />Open to internships &amp; freelance work</p>
<h3 className={`${styles.invitation} ${displayFont.className}`}>Have an idea?<br />Let&apos;s make it work.</h3>
<p className={styles.description}>
            Have an internship, a freelance project or just a question about something I&apos;ve built? Send me a
            message and I&apos;ll reply by email.
          </p>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className={styles.email}
          >
            <Mail className="w-4 h-4 shrink-0" />
            {PERSONAL_INFO.email}
          </a>
          <p className={styles.location}>
            <MapPin className="w-4 h-4 shrink-0" />
            {PERSONAL_INFO.location}
          </p>
        </div>

        <div className={styles.formArea}>
          <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {loading ? "Sending your message." : submitted ? "Thanks, your message is on its way." : ""}
          </p>
          {submitted ? (
            <div className="p-8 rounded-xl bg-[#D1FAE5] text-emerald-950 dark:bg-emerald-400/10 dark:text-emerald-100 border-2 border-ink text-center space-y-4 shadow-[4px_4px_0px_var(--shadow)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 dark:text-emerald-300 mx-auto" />
              <h3 className="font-bold text-lg">Thanks, your message is on its way.</h3>
              <p className="text-sm text-emerald-900 dark:text-emerald-200">I&apos;ll get back to you at the email you gave.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="bg-card border-2 border-ink px-4 py-2 rounded-full font-mono text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-400/10 transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={loading} className="space-y-4">
              {errorMessage && (
                <div role="alert" className="p-3 rounded-lg bg-rose-50 border-2 border-rose-500 text-rose-900 dark:bg-rose-500/10 dark:text-rose-200 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="name" className="font-mono text-xs font-bold text-ink uppercase block">
                  Name
                </label>
                <input id="name" name="name" required maxLength={100} value={form.name} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-xs font-bold text-ink uppercase block">
                  Email
                </label>
                <input id="email" name="email" type="email" required maxLength={200} value={form.email} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-mono text-xs font-bold text-ink uppercase block">
                  Subject <span className="text-muted normal-case font-medium">(optional)</span>
                </label>
                <input id="subject" name="subject" maxLength={150} value={form.subject} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="font-mono text-xs font-bold text-ink uppercase block">
                  Message
                </label>
                <textarea id="message" name="message" required maxLength={5000} value={form.message} onChange={handleChange} className={`min-h-[140px] py-3 resize-y ${inputClass}`} />
              </div>

              {/* Honeypot: hidden from people, bots tend to fill it in. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
              </div>

              <ContactVerification key={verificationAttempt} onToken={setTurnstileToken} />

              <button
                type="submit"
                disabled={loading || !turnstileToken}
                className={styles.submit}
              >
                {loading ? "Sending..." : "Send message"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
