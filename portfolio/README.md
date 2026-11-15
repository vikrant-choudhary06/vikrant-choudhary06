# Vikrant Kumar · new-design

A new, two-dimensional electric-blue-and-white portfolio built with Next.js, React, TypeScript and Tailwind CSS v4.

## Run

```sh
npm install
npm run dev -- --webpack --port 3100
```

## Check

```sh
npm run lint
npm run build
```

## Content

- Profile, links, projects and tools: `src/data/portfolio-data.ts`, copied from `main`.
- Profile image: `public/hero-portrait-new.webp`, the older portrait without the armchair.
- Sketch: intentionally an illustrated placeholder until the finished sketch is supplied.
- GitHub activity: six calendar months of contributions, grouped into weekly bars, with PRs raised and merged in the same date range. Contributions use the public github-contributions-api; PR counts use GitHub's public search API. Server fetches refresh on-deployment and fail gracefully without fabricated metrics. No token is required; public API limits apply.
- Project case studies: `/projects/[slug]`, using the original project content.
- Local technology icons: Simple Icons and Devicon. `node scripts/download-icons.mjs` refreshes them.

No previous 3D, horizontal scrolling, theme toggle or hover-mask effects are included in this branch.

## Contact form setup

Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`
using a sender on your Resend-verified domain. `CONTACT_TO_EMAIL` defaults to the
existing portfolio inbox. Restart the server after changing environment variables;
set the same values in your deployment host. Never commit `.env.local`.

The server validates input, sends plain-text email, and sets the visitor address
as Reply-To. Honeypot and best-effort per-process throttling are included; enable
hosting-platform rate limits for public production traffic.

## Cloudflare Pages

Build from the repository root with the existing portfolio build command and use
`portfolio/out` as the output directory. The root `functions/api/contact.ts`
provides `/api/contact` through Cloudflare Pages Functions. Keep the Pages project
root at repository root so Functions are discovered. GitHub statistics refresh
on each build (static export does not run on-deployment server revalidation).

Set runtime environment variables in Cloudflare Pages for Production and Preview:
`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (e.g. `Vikrant Portfolio <contact@vikrant.sbs>`),
and optionally `CONTACT_TO_EMAIL`. The older `RESEND_FROM_EMAIL` name also works.
The sender domain must be verified in Resend. Redeploy after changing bindings.

For a production-equivalent local preview, build then run from repository root:
`npx wrangler pages dev portfolio/out --port 3100`.
The static Next dev server alone does not execute Cloudflare Pages Functions.
