import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  ACCENT_PINK,
  BG_CARD,
  TEXT_PRIMARY,
  TEXT_MUTED,
} from "../theme.js";
import { Reveal } from "./Effects.tsx";

export function WorkWithMe() {
  const services = [
    {
      title: "AI Agent Systems",
      description: "Autonomous agents, LLM orchestration, RAG pipelines, MCP integrations",
      color: ACCENT_PURPLE,
    },
    {
      title: "Blockchain & On-Chain",
      description: "Solana programs, IC canisters, token design, wallet infrastructure",
      color: ACCENT_GREEN,
    },
    {
      title: "Full-Stack Products",
      description: "Next.js, React, Node.js, PostgreSQL — concept to production, fast",
      color: ACCENT_PINK,
    },
    {
      title: "Cloud Infrastructure",
      description: "AWS CDK, ECS Fargate, CI/CD pipelines, containerized deployments",
      color: "#f59e0b",
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
            Available for Projects
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
            I've been building software for over 15 years — enterprise systems, mobile
            apps, dashboards, dApps. The difference now is that AI has compressed what
            used to take a team of five into what one senior engineer can ship in a week.{" "}
            <a href="https://astranova.live" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_GREEN, textDecoration: "none" }}>AstraNova</a>
            {" "}and{" "}
            <a href="https://github.com/fermartz/astra-cli" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_GREEN, textDecoration: "none" }}>Astra CLI</a>
            {" "}— the market engine, the agent infrastructure, the
            on-chain integrations, the cross-platform apps — all built solo. Not because
            I'm cutting corners. Because the tools finally caught up to the ambition. If
            you need something built fast and built right, let's talk.
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
          <a
            href="mailto:fer.martz@icloud.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "13px",
              letterSpacing: "2px",
              color: ACCENT_PINK,
              textDecoration: "none",
              padding: "14px 40px",
              border: `1px solid ${ACCENT_PINK}40`,
              borderRadius: "2px",
              background: `${ACCENT_PINK}08`,
              transition: "all 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = `${ACCENT_PINK}20`;
              el.style.borderColor = ACCENT_PINK;
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = `${ACCENT_PINK}08`;
              el.style.borderColor = `${ACCENT_PINK}40`;
            }}
          >
            LET'S BUILD SOMETHING →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
