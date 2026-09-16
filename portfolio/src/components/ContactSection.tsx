"use client";

import React, { useState } from "react";
import { ArrowRight, Bot, Cpu, CheckCircle2, ShieldCheck, Sparkles, Rocket } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    authorityContact: "",
    protocolEmail: "",
    automationScope: "",
    systemBrief: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.authorityContact,
          email: formData.protocolEmail,
          scope: formData.automationScope,
          brief: formData.systemBrief,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Fallback for local development when Cloudflare Functions are not running
        if (response.status === 404 && process.env.NODE_ENV === "development") {
          console.warn("Notice: /api/contact function runs via Cloudflare Pages in production. Simulating success in dev mode.");
          setSubmitted(true);
          return;
        }
        throw new Error(data.error || "Failed to dispatch briefing.");
      }

      setSubmitted(true);
      setFormData({
        authorityContact: "",
        protocolEmail: "",
        automationScope: "",
        systemBrief: "",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Transmission failed. Please check network.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* SECTION ANNOTATION & HEAVY PIXEL HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white border-2 border-black text-black font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_#000]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>AI AGENT BRIEFING TERMINAL</span>
        </div>

        <h2 className="font-pixel text-5xl sm:text-7xl font-black text-black tracking-wider leading-none uppercase mb-2">
          SUBMIT BRIEFING TO AGENT SWARM
        </h2>

        <p className="font-handwriting text-2xl sm:text-3xl text-neutral-700 max-w-xl mx-auto leading-relaxed flex items-center justify-center gap-1.5">
          <span>Define the operational context for your autonomous system, RAG pipeline, or custom LangGraph workforce.</span>
          <Sparkles className="w-5 h-5 text-amber-500 inline shrink-0" />
        </p>
      </div>

      {/* TERMINAL BRIEFING MODULE CONTAINER */}
      <div className="bg-[#FFFDF7] border-2 border-black rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_#000] grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        
        {/* A. LEFT SIDE (System State & Identity - md:col-span-5) */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0 md:pr-8">
          <div>
            {/* System Status Header Tag */}
            <div className="font-mono uppercase text-xs font-bold text-neutral-900 bg-[#D2F4E3] border border-[#136C47] px-3.5 py-1.5 rounded-full w-fit flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#136C47] animate-pulse" />
              <span>[ PROTOCOL ACTIVE ]</span>
            </div>

            <h3 className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest mt-6 mb-3">
              // SYSTEM TELEMETRY
            </h3>

            {/* Micro Data Telemetry Box */}
            <div className="text-neutral-800 font-mono text-xs space-y-2.5 bg-white p-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>SWARM STATUS</span>
                </span>
                <span className="font-bold text-emerald-700">ONLINE</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-neutral-600" />
                  <span>CACHE LATENCY</span>
                </span>
                <span className="font-bold text-black">&lt;18ms</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                  <span>GUARDRAILS</span>
                </span>
                <span className="font-bold text-black">Nemo // AST</span>
              </div>
            </div>

            {/* Agent Swarm Specs */}
            <div className="mt-6 space-y-3 font-sans text-xs text-neutral-700 font-medium">
              <div className="flex items-start gap-2.5">
                <Bot className="w-4 h-4 text-black mt-0.5 shrink-0" />
                <span>Sub-20ms vector retrieval &amp; semantic routing capabilities.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Deterministic memory persistence with Redis &amp; PostgreSQL.</span>
              </div>
            </div>
          </div>

          {/* Authority Signature Stamp */}
          <div className="pt-4 border-t border-neutral-200">
            <span className="font-handwriting text-xl text-neutral-800 font-bold block">
              Vikrant Engineering // Mathura, IN
            </span>
            <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
              AUTHORITY STAMP // AUTH-2026-SYS
            </span>
          </div>
        </div>

        {/* B. RIGHT SIDE (Briefing Input Form - md:col-span-7) */}
        <div className="md:col-span-7 flex flex-col justify-center">
          {submitted ? (
            <div className="p-8 rounded-xl bg-[#D1FAE5] border-2 border-black text-emerald-950 space-y-4 text-center shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h4 className="font-bold text-lg font-sans">Briefing Transmitted Successfully!</h4>
              <p className="text-xs font-mono text-emerald-900 font-semibold">
                Your briefing has been sent directly to Vikrant via Resend. Protocol updates will be dispatched to your email shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <span>[ SEND ANOTHER BRIEFING ]</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border-2 border-rose-500 text-rose-900 text-xs font-mono">
                  <strong>⚠️ Transmission Error:</strong> {errorMessage}
                </div>
              )}

              {/* Field 1: Authority Contact */}
              <div className="space-y-1.5">
                <label htmlFor="authorityContact" className="font-mono text-xs font-bold text-black uppercase tracking-wider block">
                  AUTHORITY CONTACT
                </label>
                <input
                  id="authorityContact"
                  type="text"
                  required
                  value={formData.authorityContact}
                  onChange={handleChange}
                  placeholder="Your Name // Organization Name"
                  className="h-11 w-full rounded-lg bg-white border-2 border-black px-4 text-xs font-mono text-black shadow-[2px_2px_0px_#000] focus:bg-amber-50 transition-colors outline-none"
                />
              </div>

              {/* Field 2: Protocol Email */}
              <div className="space-y-1.5">
                <label htmlFor="protocolEmail" className="font-mono text-xs font-bold text-black uppercase tracking-wider block">
                  PROTOCOL EMAIL
                </label>
                <input
                  id="protocolEmail"
                  type="email"
                  required
                  value={formData.protocolEmail}
                  onChange={handleChange}
                  placeholder="Where agents send updates (e.g. name@domain.com)"
                  className="h-11 w-full rounded-lg bg-white border-2 border-black px-4 text-xs font-mono text-black shadow-[2px_2px_0px_#000] focus:bg-amber-50 transition-colors outline-none"
                />
              </div>

              {/* Field 3: Automation Scope */}
              <div className="space-y-1.5">
                <label htmlFor="automationScope" className="font-mono text-xs font-bold text-black uppercase tracking-wider block">
                  AUTOMATION SCOPE
                </label>
                <input
                  id="automationScope"
                  type="text"
                  value={formData.automationScope}
                  onChange={handleChange}
                  placeholder="e.g., RAG search, multi-agent workflows, autonomous scrapers"
                  className="h-11 w-full rounded-lg bg-white border-2 border-black px-4 text-xs font-mono text-black shadow-[2px_2px_0px_#000] focus:bg-amber-50 transition-colors outline-none"
                />
              </div>

              {/* Field 4: System Brief */}
              <div className="space-y-1.5">
                <label htmlFor="systemBrief" className="font-mono text-xs font-bold text-black uppercase tracking-wider block">
                  SYSTEM BRIEF
                </label>
                <textarea
                  id="systemBrief"
                  required
                  value={formData.systemBrief}
                  onChange={handleChange}
                  placeholder="Outline your architecture requirements, data sources, latency targets, or agent behaviors..."
                  className="w-full min-h-[120px] rounded-lg bg-white border-2 border-black p-3.5 text-xs font-mono text-black shadow-[2px_2px_0px_#000] focus:bg-amber-50 transition-colors outline-none resize-y"
                />
              </div>

              {/* Action Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white font-mono font-bold text-xs px-6 py-3.5 rounded-full border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Rocket className={`w-4 h-4 text-amber-400 ${loading ? "animate-spin" : ""}`} />
                  <span>
                    {loading
                      ? "[ TRANSMITTING DATA // PLEASE WAIT... ]"
                      : "[ DEPLOY AGENT // INITIATE BRIEFING ]"}
                  </span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </section>
  );
}
