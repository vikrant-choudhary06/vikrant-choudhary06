import { Resend } from 'resend';
import { PERSONAL_INFO } from '@/data/portfolio-data';

export const runtime = 'nodejs';
// Best-effort per-process throttling; production platform rate limits should also be enabled.
const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: 'Request not allowed.' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) return Response.json({ error: 'Invalid request.' }, { status: 415 });
  if (Number(request.headers.get('content-length')) > 20000) return Response.json({ error: 'Message is too long.' }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return Response.json({ error: 'Message is too long.' }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
  } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (body.website) return Response.json({ ok: true });
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000) {
    return Response.json({ error: 'Please enter a name, valid email, and a message of 10–5,000 characters.' }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return Response.json({ error: 'The contact form is temporarily unavailable. Please use the email link below.' }, { status: 503 });
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const key = email.toLowerCase();
  const entry = attempts.get(key) ?? { count: 0, expires: now + 600000 };
  if (entry.count >= 3 || attempts.size >= 5000) return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  entry.count++;
  attempts.set(key, entry);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || PERSONAL_INFO.email,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) return Response.json({ error: 'Your message could not be delivered. Please try again or use the email link.' }, { status: 502 });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: 'Email service is unavailable. Please try again later or email me directly.' }, { status: 502 }); }
}
