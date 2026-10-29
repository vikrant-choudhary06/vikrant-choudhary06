import { ImageResponse } from "next/og";
import { SITE_URL } from "@/data/portfolio-data";

// Link-preview cards (LinkedIn, WhatsApp, X…), rendered at build time.
// Same oatmeal paper, pine ink and rust accent as the site (globals.css).

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#ad9878";
const INK = "#163c32";
const MUTED = "#345345";
const ACCENT = "#a64b35";

interface OgCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
  footer?: string[];
}

export function renderOgCard({ eyebrow, title, subtitle, accent = ACCENT, footer = [] }: OgCardProps) {
  const domain = SITE_URL.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "64px 72px",
          borderLeft: `24px solid ${accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: ACCENT, letterSpacing: 2 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: title.length > 18 ? 84 : 112, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 38, color: INK, opacity: 0.85, marginTop: 24, maxWidth: 980, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {footer.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 28 }}>
              {footer.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    fontSize: 24,
                    color: INK,
                    background: "#f2e9d8",
                    border: `2px solid ${MUTED}`,
                    borderRadius: 8,
                    padding: "6px 14px",
                    marginRight: 12,
                    marginBottom: 12,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: MUTED }}>
            <div style={{ display: "flex" }}>Vikrant Kumar · Full-stack developer</div>
            <div style={{ display: "flex" }}>{domain}</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
