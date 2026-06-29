import { useState, useEffect } from "react";
import { BG_DARK, BG_CARD, TEXT_PRIMARY, TEXT_MUTED } from "../theme.js";
import { Reveal } from "./Effects.tsx";
import { CtaLink } from "./CtaLink.tsx";

type EcoProject = {
  subtitle: string;
  title: string;
  status: { label: string; color: string };
  description: string;
  features: string[];
  link: string;
  linkText: string;
  accent: string;
};

type EcosystemCardProps = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  connector?: string;
  left: EcoProject;
  right: EcoProject;
};

function EcoColumn({ project }: { project: EcoProject }) {
  const [hovered, setHovered] = useState(false);
  const { accent } = project;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: BG_DARK,
        border: `1px solid ${hovered ? accent + "40" : accent + "15"}`,
        borderRadius: "3px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Subtitle device */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "3px",
          color: accent,
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        {project.subtitle}
      </div>

      {/* Title + status pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <h3
          style={{
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: "clamp(20px, 2.4vw, 26px)",
            fontWeight: 700,
            color: TEXT_PRIMARY,
            letterSpacing: "1.5px",
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: project.status.color,
            border: `1px solid ${project.status.color}40`,
            background: `${project.status.color}12`,
            borderRadius: "2px",
            padding: "4px 9px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: project.status.color,
            }}
          />
          {project.status.label}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: "13px",
          color: TEXT_MUTED,
          lineHeight: 1.7,
          marginBottom: "20px",
          flexGrow: 0,
        }}
      >
        {project.description}
      </p>

      {/* Features */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {project.features.map((f, i) => (
          <div
            key={i}
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: TEXT_MUTED,
              padding: "9px 12px",
              background: `${accent}06`,
              border: `1px solid ${accent}15`,
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: accent, fontSize: "12px" }}>◆</span>
            {f}
          </div>
        ))}
      </div>

      {/* CTA */}
      <CtaLink
        href={project.link}
        accent={accent}
        arrow
        style={{ marginTop: "auto", alignSelf: "flex-start", fontSize: "12px", padding: "11px 22px" }}
      >
        {project.linkText}
      </CtaLink>
    </div>
  );
}

export function EcosystemCard({
  id,
  label,
  title,
  tagline,
  connector,
  left,
  right,
}: EcosystemCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
            maxWidth: "940px",
            width: "100%",
            background: BG_CARD,
            border: `1px solid ${hovered ? left.accent + "40" : "#1a1f2e"}`,
            borderRadius: "4px",
            padding: "clamp(28px, 4vw, 48px)",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.4s ease",
          }}
        >
          {/* Corner accents — left.accent top-left, right.accent bottom-right */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "1px", background: left.accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "40px", background: left.accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "40px", height: "1px", background: right.accent, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "40px", background: right.accent, opacity: 0.5 }} />

          {/* Glows */}
          <div style={{ position: "absolute", top: "-40%", right: "-15%", width: "400px", height: "400px", background: `radial-gradient(circle, ${left.accent}08, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40%", left: "-15%", width: "400px", height: "400px", background: `radial-gradient(circle, ${right.accent}08, transparent 70%)`, pointerEvents: "none" }} />

          {/* Ecosystem header */}
          <div style={{ position: "relative", textAlign: "center", marginBottom: "36px" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                color: TEXT_MUTED,
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
            <h2
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "clamp(24px, 3.4vw, 36px)",
                fontWeight: 700,
                color: TEXT_PRIMARY,
                letterSpacing: "2px",
                margin: "0 0 14px",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "14px",
                color: TEXT_MUTED,
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              {tagline}
            </p>
          </div>

          {/* Two columns */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "20px",
            }}
          >
            <EcoColumn project={left} />
            <EcoColumn project={right} />
          </div>

          {/* Connector */}
          {connector && (
            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginTop: "28px",
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "3px",
                color: `${TEXT_MUTED}99`,
                textTransform: "uppercase",
              }}
            >
              {connector}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
