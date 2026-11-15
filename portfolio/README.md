# Vikrant Kumar · new-design

A new, two-dimensional black-and-white portfolio built with Next.js, React, TypeScript and Tailwind CSS v4.

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
- GitHub activity: six calendar months of contributions, grouped into weekly bars, with PRs raised and merged in the same date range. Contributions use the public github-contributions-api; PR counts use GitHub's public search API. Server fetches refresh hourly and fail gracefully without fabricated metrics. No token is required; public API limits apply.
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
