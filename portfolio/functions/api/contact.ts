interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const TO_EMAIL = "vikrantchoudhary1203@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
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
    body = (await request.json()) as ContactPayload;
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

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "The contact form isn't working right now. Please email me directly." }, 500);
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
