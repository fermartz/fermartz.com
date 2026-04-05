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
      label: "LANGUAGES & FRAMEWORKS",
      skills: ["TypeScript", "Node.js", "React", "Next.js", "Rust", "Motoko", "Python"],
      color: ACCENT_GREEN,
    },
    {
      label: "AI & AGENTS",
      skills: ["Anthropic", "OpenAI", "Gemini", "AWS Bedrock", "Vercel AI SDK", "ElizaOS", "MCP", "RAG"],
      color: ACCENT_PURPLE,
    },
    {
      label: "BLOCKCHAIN & CRYPTO",
      skills: ["Solana", "Internet Computer", "Bitcoin PSBTs", "Chain-Key Crypto", "AMM Design", "Tokenomics"],
      color: "#f59e0b",
    },
    {
      label: "INFRASTRUCTURE",
      skills: ["AWS ECS Fargate", "AWS CDK", "S3", "RDS", "Docker", "PostgreSQL", "Supabase", "DynamoDB"],
      color: "#f97316",
    },
    {
      label: "CREATIVE & DESIGN",
      skills: ["SVG / Illustrator", "Worldbuilding & Lore", "Character Design", "Content Strategy"],
      color: ACCENT_PINK,
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
            "The system stopped feeling like a model. It started feeling like a place."
          </div>
        </Reveal>
      </div>
    </section>
  );
}
