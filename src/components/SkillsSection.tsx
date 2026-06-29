import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  ACCENT_PINK,
  TEXT_PRIMARY,
  TEXT_MUTED,
} from "../theme.js";
import { Reveal } from "./Effects.tsx";

export function SkillsSection() {
  const categories = [
    {
      label: "AI & AGENTS",
      skills: ["Autonomous Agents", "Multi-Agent Systems", "MCP (servers + clients)", "RAG", "Agentic Web"],
      color: ACCENT_PURPLE,
    },
    {
      label: "LLM PROVIDERS",
      skills: ["Anthropic / Claude", "OpenAI", "Gemini", "xAI", "Vercel AI SDK", "AWS Bedrock"],
      color: ACCENT_GREEN,
    },
    {
      label: "LANGUAGES & FRAMEWORKS",
      skills: ["TypeScript", "Node.js", "React", "Next.js", "Rust", "Motoko", "Python"],
      color: ACCENT_PINK,
    },
    {
      label: "BLOCKCHAIN & WEB3",
      skills: ["Solana", "Internet Computer", "Bitcoin PSBTs", "Chain-Key Cryptography"],
      color: "#f59e0b",
    },
    {
      label: "INFRASTRUCTURE",
      skills: ["AWS ECS Fargate", "AWS CDK", "S3", "RDS", "Docker", "PostgreSQL", "Supabase", "DynamoDB"],
      color: "#f97316",
    },
  ];

  return (
    <section
      id="stack"
      style={{
        padding: "120px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <Reveal>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: ACCENT_PURPLE,
              marginBottom: "16px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Technical Arsenal
          </div>
          <h2
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: TEXT_PRIMARY,
              marginBottom: "48px",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            THE STACK
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
          {categories.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 100}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "3px",
                    color: cat.color,
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ opacity: 0.5 }}>{"///"}</span> {cat.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12px",
                        padding: "8px 16px",
                        background: `${cat.color}08`,
                        border: `1px solid ${cat.color}20`,
                        borderRadius: "2px",
                        color: TEXT_MUTED,
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.target as HTMLElement;
                        el.style.borderColor = cat.color;
                        el.style.color = cat.color;
                        el.style.background = `${cat.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.target as HTMLElement;
                        el.style.borderColor = `${cat.color}20`;
                        el.style.color = TEXT_MUTED;
                        el.style.background = `${cat.color}08`;
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Builder statement */}
        <Reveal delay={500}>
          <div
            style={{
              marginTop: "56px",
              padding: "24px 32px",
              borderLeft: `2px solid ${ACCENT_PURPLE}40`,
              fontFamily: "monospace",
              fontSize: "13px",
              color: TEXT_MUTED,
              lineHeight: 1.8,
              fontStyle: "italic",
              maxWidth: "600px",
              margin: "56px auto 0",
            }}
          >
            "I take products from idea to production — and I work as well inside a team as I do owning the whole stack."
          </div>
        </Reveal>
      </div>
    </section>
  );
}
