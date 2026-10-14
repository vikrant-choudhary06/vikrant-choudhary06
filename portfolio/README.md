# Portfolio

Static Next.js portfolio with Cloudflare Pages Functions for contact email. Shared content lives in src/data/portfolio-data.ts. Fonts are bundled under src/app/fonts with their SIL Open Font Licenses; builds do not download fonts.

## Development and checks

Run npm ci, npm run dev, npm run lint, npm test, and npm run build. Tests use Node 24's built-in SQLite support. The build creates out/. next dev does not run Pages Functions and never pretends to send email.

Production builds use Next.js's supported webpack bundler because Turbopack's CSS worker crashes in this Windows environment.

For local endpoint testing, copy wrangler.example.jsonc to wrangler.jsonc and replace the database ID with your D1 database ID. Apply the local schema with npx wrangler d1 migrations apply CONTACT_RATE_LIMITS --local, build, then run npx wrangler pages dev out. For production apply the same migration with --remote. Set the public widget key before building and use .dev.vars for runtime secrets.

## Cloudflare Pages deployment

Use portfolio as the build root, npm run build as the build command, and out as the output directory. Deploy through the Pages Git integration or Wrangler so functions/api/contact.ts is deployed too. A plain static host cannot send contact email.

Before deploying the contact form:

1. Create a Turnstile widget and allow the production hostname (and localhost for testing).
2. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in the Pages build environment and rebuild. This is the public widget key.
3. Set runtime secrets TURNSTILE_SECRET_KEY and RESEND_API_KEY. Optionally set RESEND_FROM_EMAIL to a sender on a verified Resend domain.
4. Create a D1 database, execute migrations/0001_contact_rate_limits.sql against it, and bind it to Pages as CONTACT_RATE_LIMITS. Configure preview bindings separately when preview deployments need the form.
5. Redeploy and submit a real message to verify delivery.

Use a gitignored .dev.vars for local runtime secrets. The endpoint allows five attempts per client IP over ten minutes using an atomic D1 counter and hashed IP keys. It verifies single-use Turnstile tokens, hostname and the contact action before sending. Expired rows are removed on subsequent requests. Missing protection configuration disables sending; visitors can email directly.

Official references: [Pages D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/) and [Turnstile verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

Use lowercase project slug directories for logos. Lookup prefers SVG, then WebP, then PNG. Assets live in public/projects/<slug>/.
