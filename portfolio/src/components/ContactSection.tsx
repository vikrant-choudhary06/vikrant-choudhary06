"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "", website: "" };

const inputClass =
  "w-full rounded-lg bg-white border-2 border-black px-4 text-sm text-black shadow-[2px_2px_0px_#000] focus:bg-amber-50 transition-colors outline-none";

export function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // The function only exists on Cloudflare Pages, so `next dev` returns 404.
        if (response.status === 404 && process.env.NODE_ENV === "development") {
          console.warn("/api/contact runs on Cloudflare Pages only. Pretending it worked in dev.");
          setSubmitted(true);
          return;
        }
        throw new Error(data.error || "Couldn't send your message.");
      }

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Couldn't send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="font-handwriting text-xl sm:text-2xl text-neutral-600 -rotate-2 inline-block mb-1">
          say hi ~
        </span>
        <h2 className="font-pixel text-4xl sm:text-6xl text-black tracking-wider leading-none uppercase">
          Contact
        </h2>
      </div>

      <div className="bg-[#FFFDF7] border-2 border-black rounded-2xl p-5 sm:p-8 shadow-[6px_6px_0px_#000] grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-5 md:border-r md:border-neutral-200 md:pr-8">
          <p className="text-neutral-800 leading-relaxed">
            Have an internship, a freelance project or just a question about something I&apos;ve built? Send me a
            message and I&apos;ll reply by email.
          </p>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 font-mono text-sm font-bold text-black hover:text-blue-600 break-all"
          >
            <Mail className="w-4 h-4 shrink-0" />
            {PERSONAL_INFO.email}
          </a>
          <p className="flex items-center gap-2 font-mono text-sm text-neutral-600">
            <MapPin className="w-4 h-4 shrink-0" />
            {PERSONAL_INFO.location}
          </p>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-xl bg-[#D1FAE5] border-2 border-black text-center space-y-4 shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="font-bold text-lg">Thanks, your message is on its way.</h3>
              <p className="text-sm text-emerald-900">I&apos;ll get back to you at the email you gave.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="bg-white border-2 border-black px-4 py-2 rounded-full font-mono text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border-2 border-rose-500 text-rose-900 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="name" className="font-mono text-xs font-bold text-black uppercase block">
                  Name
                </label>
                <input id="name" name="name" required maxLength={100} value={form.name} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-xs font-bold text-black uppercase block">
                  Email
                </label>
                <input id="email" name="email" type="email" required maxLength={200} value={form.email} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-mono text-xs font-bold text-black uppercase block">
                  Subject <span className="text-neutral-500 normal-case font-medium">(optional)</span>
                </label>
                <input id="subject" name="subject" maxLength={150} value={form.subject} onChange={handleChange} className={`h-11 ${inputClass}`} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="font-mono text-xs font-bold text-black uppercase block">
                  Message
                </label>
                <textarea id="message" name="message" required maxLength={5000} value={form.message} onChange={handleChange} className={`min-h-[140px] py-3 resize-y ${inputClass}`} />
              </div>

              {/* Honeypot: hidden from people, bots tend to fill it in. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white font-mono font-bold text-xs px-6 py-3.5 rounded-full border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-2"
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
