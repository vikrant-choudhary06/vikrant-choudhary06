interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_RATE_LIMITS?: {
    prepare(sql: string): {
      bind(...values: (string | number)[]): {
        first<T>(): Promise<T | null>;
        run(): Promise<unknown>;
      };
    };
  };
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const TO_EMAIL = "vikrantchoudhary1203@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

// Everything a visitor types goes into an HTML email, so it must be escaped.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {
  let body: ContactPayload;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ error: "Invalid request." }, 400);
    }
    body = parsed as ContactPayload;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot filled in: almost certainly a bot. Pretend it worked so it doesn't retry.
  if (text(body.website, 200)) {
    return json({ success: true }, 200);
  }

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const subject = text(body.subject, 150);
  const message = text(body.message, 5000);

  if (!name || !email || !message) {
    return json({ error: "Please fill in your name, email and message." }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: "That email address doesn't look right." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_RATE_LIMITS) {
    console.error("Contact configuration is incomplete");
    return json({ error: "The contact form isn't working right now. Please email me directly." }, 503);
  }

  const token = text(body.turnstileToken, 2048);
  if (!token) return json({ error: "Please complete the verification." }, 400);

  try {
    // Cloudflare supplies this header; do not trust client-controlled forwarding headers.
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return json({ error: "Couldn't verify this request. Please email me directly." }, 503);
    const windowSeconds = 600;
    const now = Math.floor(Date.now() / 1000);
    const expires = now + windowSeconds;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${env.TURNSTILE_SECRET_KEY}:${ip}`));
    const key = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const limit = await env.CONTACT_RATE_LIMITS.prepare(`
      INSERT INTO contact_rate_limits (key, count, expires_at) VALUES (?, 1, ?)
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN expires_at <= ? THEN 1 ELSE count + 1 END,
        expires_at = CASE WHEN expires_at <= ? THEN excluded.expires_at ELSE expires_at END
      RETURNING count, expires_at
    `).bind(key, expires, now, now).first<{ count: number; expires_at: number }>();
    await env.CONTACT_RATE_LIMITS.prepare("DELETE FROM contact_rate_limits WHERE expires_at <= ?").bind(now).run();
    if (!limit) throw new Error("Rate limit returned no result");
    if (limit.count > 5) {
      return json({ error: "Too many attempts. Please wait a few minutes or email me directly." }, 429,
        { "Retry-After": String(Math.max(1, limit.expires_at - now)) });
    }
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verification.ok) throw new Error("Verification service unavailable");
    const result = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (!result.success || result.hostname !== new URL(request.url).hostname || result.action !== "contact") {
      return json({ error: "Verification expired or failed. Please try again." }, 400);
    }
  } catch (error) {
    console.error("Contact verification failed", error);
    return json({ error: "Couldn't verify your message. Please try again or email me directly." }, 503);
  }

  // Subject is a header, not HTML: strip line breaks instead of escaping.
  const subjectLine = `Portfolio message from ${name}${subject ? `: ${subject}` : ""}`.replace(/[\r\n]+/g, " ");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #000; border-radius: 12px; background: #fffdf7;">
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
      <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL || "Vikrant Portfolio <contact@vikrant.sbs>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: subjectLine,
        html,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend error", resendResponse.status, await resendResponse.text());
      return json({ error: "Couldn't send your message. Please try again or email me directly." }, 502);
    }

    return json({ success: true }, 200);
  } catch (error: unknown) {
    console.error("Contact function failed", error);
    return json({ error: "Couldn't send your message. Please try again or email me directly." }, 500);
  }
};
