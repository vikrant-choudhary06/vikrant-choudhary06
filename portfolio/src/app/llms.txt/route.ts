import { ALSO_FAMILIAR, PERSONAL_INFO, PROJECTS, SITE_URL, STACK } from "@/data/portfolio-data";

// Plain-text summary for AI assistants (https://llmstxt.org). Built from the
// same data as the site, so it always matches what the pages say.
export const dynamic = "force-static";

function body(): string {
  const projects = PROJECTS.map((p) => {
    const links = [
      `[Case study](${SITE_URL}/projects/${p.slug})`,
      p.links.github && `[Source](${p.links.github})`,
      p.links.live && `[Live](${p.links.live})`,
    ]
      .filter(Boolean)
      .join(" · ");
    const status = p.labels?.length ? ` (${p.labels.join(", ")})` : "";
    return `- **${p.name}**${status}: ${p.kind}. ${p.summary} Stack: ${p.stack.join(", ")}. ${links}`;
  }).join("\n");

  const stack = STACK.map(
    (g) => `- ${g.title}: ${g.items.map((i) => (typeof i === "string" ? i : i.name)).join(", ")}`,
  ).join("\n");

  return `# ${PERSONAL_INFO.name}

> ${PERSONAL_INFO.role} from ${PERSONAL_INFO.location}. ${PERSONAL_INFO.education}. ${PERSONAL_INFO.status}.

${PERSONAL_INFO.about.join(" ")}

## Projects

${projects}

## Tech stack (used in the projects above)

${stack}

Also familiar with, but no shipped project yet: ${ALSO_FAMILIAR.join(", ")}.

## Contact

- Portfolio: ${SITE_URL}
- Email: ${PERSONAL_INFO.email}
- GitHub: ${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}
`;
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
