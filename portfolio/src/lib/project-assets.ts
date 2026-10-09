import fs from "node:fs";
import path from "node:path";

const LOGO_EXTENSIONS = ["svg", "png", "webp"];

// Looks for public/projects/<slug>/logo.{svg,png,webp} at build time, so adding
// a logo only means dropping the file in that folder.
export function findProjectLogo(slug: string): string | undefined {
  for (const ext of LOGO_EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "projects", slug, `logo.${ext}`);
    if (fs.existsSync(file)) {
      return `/projects/${slug}/logo.${ext}`;
    }
  }
  return undefined;
}
