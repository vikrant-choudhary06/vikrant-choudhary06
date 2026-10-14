"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface Turnstile {
  render(container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }): string;
  remove(id: string): void;
}

declare global {
  interface Window { turnstile?: Turnstile }
}

export function ContactVerification({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!ready || !sitekey || !container.current || !window.turnstile) return;
    const turnstile = window.turnstile;
    const id = turnstile.render(container.current, {
      sitekey, action: "contact", theme: "auto",
      callback: (token) => { setFailed(false); onToken(token); },
      "expired-callback": () => onToken(""),
      "error-callback": () => { onToken(""); setFailed(true); },
    });
    return () => turnstile.remove(id);
  }, [ready, sitekey, onToken]);

  if (!sitekey) return <p role="status" className="text-sm text-ink-soft">The form is unavailable right now. Please use the email link.</p>;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)} onError={() => setFailed(true)} />
      <div ref={container} />
      {failed && <p role="alert" className="text-sm text-ink-soft">Verification could not load. Please refresh or use the email link.</p>}
    </>
  );
}
