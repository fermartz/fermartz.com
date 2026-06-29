import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  ACCENT_PINK,
  BG_CARD,
  TEXT_PRIMARY,
  TEXT_MUTED,
} from "../theme.js";
import { Reveal } from "./Effects.tsx";
import { CtaLink } from "./CtaLink.tsx";

export function WorkWithMe() {
  const services = [
    {
      title: "AI Agent Systems",
      description: "Autonomous agents, multi-provider LLM orchestration, MCP servers & clients, RAG, agentic-web integrations",
      color: ACCENT_PURPLE,
    },
    {
      title: "Full-Stack Products",
      description: "Next.js, React, Node.js, TypeScript, PostgreSQL — payments, i18n, real-time — concept to production, fast",
      color: ACCENT_PINK,
    },
    {
      title: "Cloud Infrastructure",
      description: "AWS CDK, ECS Fargate, CI/CD pipelines, containerized deployments",
      color: "#f59e0b",
    },
    {
      title: "Blockchain & Web3",
      description: "Solana programs, Internet Computer canisters, wallet infrastructure",
      color: ACCENT_GREEN,
    },
  ];

  return (
    <section
      id="work-with-me"
      style={{
        padding: "120px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
        <Reveal>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: ACCENT_PINK,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Available — Full-Time or Freelance
          </div>
          <h2
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: TEXT_PRIMARY,
              marginBottom: "32px",
              letterSpacing: "2px",
            }}
          >
            WORK WITH ME
          </h2>
          <p
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "14px",
              color: TEXT_MUTED,
              lineHeight: 1.8,
              maxWidth: "700px",
              margin: "0 auto 48px",
            }}
          >
            I've spent 16+ years building software, and the last stretch going deep on
            AI — autonomous agents, the agentic web, and the tooling that drives them. I
            ship production AI products end to end:{" "}
            <a href="https://delphy.network" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_GREEN, textDecoration: "none" }}>Delphy</a>
            , an @identity layer for the agentic web that's live today;{" "}
            <a href="https://github.com/fermartz/delphy-agent" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_GREEN, textDecoration: "none" }}>Delphy Agent</a>
            , a desktop hub that drives any LLM through MCP; and{" "}
            <a href="https://astranova.live" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_GREEN, textDecoration: "none" }}>AstraNova</a>
            , a living market universe run by AI agents. I move fast because modern tooling
            lets one engineer own the whole stack.
            If you're building with AI and want it taken from idea to production, let's talk.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                style={{
                  padding: "24px",
                  background: BG_CARD,
                  border: `1px solid ${s.color}20`,
                  borderRadius: "4px",
                  textAlign: "left",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = s.color + "40")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = s.color + "20")}
              >
                <div
                  style={{
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: s.color,
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: TEXT_MUTED,
                    lineHeight: 1.6,
                  }}
                >
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              textAlign: "left",
            }}
          >
            {/* Freelance path */}
            <div
              id="build"
              style={{
                padding: "28px",
                background: BG_CARD,
                border: `1px solid ${ACCENT_PINK}20`,
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: ACCENT_PINK,
                  letterSpacing: "1px",
                }}
              >
                Need something built?
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "13px", color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
                Freelance — I scope it, build it, and ship it. Idea to production, fast.
              </p>
              <CtaLink href="mailto:fer.martz@icloud.com" accent={ACCENT_PINK} arrow>
                Start a project
              </CtaLink>
            </div>

            {/* Full-time path */}
            <div
              id="hire"
              style={{
                padding: "28px",
                background: BG_CARD,
                border: `1px solid ${ACCENT_GREEN}20`,
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: ACCENT_GREEN,
                  letterSpacing: "1px",
                }}
              >
                Hiring for a role?
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "13px", color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
                Open to full-time roles building AI products. Here's the rundown.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <CtaLink href="/fermartz_2026_resume.pdf" accent={ACCENT_GREEN} newTab>
                  Résumé
                </CtaLink>
                <CtaLink href="https://linkedin.com/in/fernando-martinez-valdez" accent={ACCENT_GREEN}>
                  LinkedIn
                </CtaLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
