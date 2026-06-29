import { useState } from "react";
import { BG_CARD, TEXT_PRIMARY, TEXT_MUTED } from "../theme.js";
import { Reveal } from "./Effects.tsx";
import { CtaLink } from "./CtaLink.tsx";

type CompactCardProps = {
  id: string;
  label: string;
  title: string;
  description: string;
  chips: string[];
  link: string;
  linkText: string;
  accent: string;
};

export function CompactCard({
  id,
  label,
  title,
  description,
  chips,
  link,
  linkText,
  accent,
}: CompactCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id={id}
      style={{
        padding: "64px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Reveal>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            maxWidth: "720px",
            width: "100%",
            background: BG_CARD,
            border: `1px solid ${hovered ? accent + "40" : "#1a1f2e"}`,
            borderRadius: "4px",
            padding: "clamp(24px, 3.5vw, 36px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
            flexWrap: "wrap",
            transition: "border-color 0.4s ease",
          }}
        >
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "32px", height: "1px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "32px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "1px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "32px", background: accent, opacity: 0.5 }} />

          {/* Glow */}
          <div style={{ position: "absolute", top: "-60%", right: "-10%", width: "300px", height: "300px", background: `radial-gradient(circle, ${accent}08, transparent 70%)`, pointerEvents: "none" }} />

          {/* Left: text */}
          <div style={{ position: "relative", flex: "1 1 300px", minWidth: 0 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                color: accent,
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
            <h3
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 700,
                color: TEXT_PRIMARY,
                letterSpacing: "2px",
                margin: "0 0 12px",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "13px",
                color: TEXT_MUTED,
                lineHeight: 1.7,
                margin: "0 0 16px",
              }}
            >
              {description}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {chips.map((c, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: TEXT_MUTED,
                    padding: "6px 12px",
                    background: `${accent}06`,
                    border: `1px solid ${accent}15`,
                    borderRadius: "2px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <CtaLink
            href={link}
            accent={accent}
            arrow
            style={{ position: "relative", flexShrink: 0, fontSize: "12px" }}
          >
            {linkText}
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
