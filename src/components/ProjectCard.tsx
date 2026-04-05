import { useState, ReactNode } from "react";
import { BG_CARD, TEXT_PRIMARY, TEXT_MUTED } from "../theme.js";
import { Reveal } from "./Effects.tsx";

type ProjectCardProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  link: string;
  linkText: string;
  accent: string;
  children?: ReactNode;
};

export function ProjectCard({
  id,
  title,
  subtitle,
  description,
  features,
  link,
  linkText,
  accent,
  children,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id={id}
      style={{
        padding: "120px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Reveal>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            maxWidth: "900px",
            width: "100%",
            background: BG_CARD,
            border: `1px solid ${hovered ? accent + "40" : "#1a1f2e"}`,
            borderRadius: "4px",
            padding: "clamp(32px, 5vw, 56px)",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.4s ease",
          }}
        >
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "1px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "40px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "40px", height: "1px", background: accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "40px", background: accent, opacity: 0.5 }} />

          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, ${accent}08, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Label */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: accent,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: TEXT_PRIMARY,
              marginBottom: "20px",
              letterSpacing: "2px",
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "14px",
              color: TEXT_MUTED,
              lineHeight: 1.8,
              maxWidth: "650px",
              marginBottom: "32px",
            }}
          >
            {description}
          </p>

          {/* Features grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: TEXT_MUTED,
                  padding: "12px 16px",
                  background: `${accent}06`,
                  border: `1px solid ${accent}15`,
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: accent, fontSize: "14px" }}>◆</span>
                {f}
              </div>
            ))}
          </div>

          {/* Extra content */}
          {children}

          {/* Link */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "13px",
              letterSpacing: "2px",
              color: accent,
              textDecoration: "none",
              padding: "12px 24px",
              border: `1px solid ${accent}40`,
              borderRadius: "2px",
              background: `${accent}08`,
              transition: "all 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = `${accent}20`;
              el.style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = `${accent}08`;
              el.style.borderColor = `${accent}40`;
            }}
          >
            {linkText} →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
