import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  ACCENT_PINK,
  BG_DARK,
  BG_CARD,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "./theme.js";

// Glitch text effect component
function GlitchText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (i < iterations) return text[i];
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iterations += 1;
        if (iterations > text.length) {
          clearInterval(glitchInterval);
          setDisplay(text);
          setIsGlitching(false);
        }
      }, 30);
    }, 8000);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}

// Typing effect
function TypeWriter({ text, speed = 50, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayed, started, text, speed]);

  return (
    <span>
      {displayed}
      <span
        style={{
          opacity: displayed.length < text.length ? 1 : 0,
          animation: "blink 1s infinite",
          color: ACCENT_GREEN,
        }}
      >
        █
      </span>
    </span>
  );
}

// Scroll reveal wrapper
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Hex grid background
export function HexGrid() {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.3,
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern
          id="hexgrid"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="30,2 55,15 55,37 30,50 5,37 5,15"
            fill="none"
            stroke="#151b2b"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexgrid)" />
    </svg>
  );
}

// Nav
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["astranova", "astra-cli", "stack", "contact"];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isMobile ? "12px 16px" : "16px 32px",
        display: "flex",
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.15)" : "none",
        transition: "all 0.3s ease",
        fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
      }}
    >
      <a
        href="#hero"
        style={{
          color: ACCENT_GREEN,
          fontSize: "14px",
          textDecoration: "none",
          letterSpacing: "2px",
        }}
      >
        {">"} $ FERMARTZ
      </a>
      <div
        style={{
          display: "flex",
          gap: isMobile ? "16px" : "24px",
          ...(isMobile
            ? {
                width: "100%",
                justifyContent: "center",
                marginTop: "8px",
              }
            : {}),
        }}
      >
        {links.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            style={{
              color: TEXT_MUTED,
              fontSize: isMobile ? "10px" : "12px",
              textDecoration: "none",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = ACCENT_GREEN)}
            onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
          >
            {l}
          </a>
        ))}
        <Link
          to="/blog"
          style={{
            color: TEXT_MUTED,
            fontSize: isMobile ? "10px" : "12px",
            textDecoration: "none",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = ACCENT_GREEN)}
          onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
        >
          BLOG
        </Link>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${ACCENT_PURPLE}15, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Avatar SVG */}
      <div style={{ marginBottom: "32px", position: "relative" }}>
        <svg
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill={TEXT_PRIMARY}
            d="M80.4,28.74c3.47,0,11.09,5.72,11.09,5.72S98,32.2,98.22,28.74,104.94,35,104.94,35s7.75-8.91,8.26-4.12,7,12.37,7,12.37,7.9-12.87,8.41-7.28,6,13.13,6,13.13,3.91-1.4,5.69-3.79S143.15,56,143.15,56l4.43,32.59A29.75,29.75,0,0,1,152,104.89a25.43,25.43,0,0,1-5.53,16.29l-9.95,27.94c-4.42,9.31-22.11,23.27-35.38,23.27s-31-14-35.39-23.27l-10-27.94a25.49,25.49,0,0,1-5.53-16.29A29.76,29.76,0,0,1,54.7,88.6V49c0-1.53,4.42,2.32,4.42,2.32s5.73-14.5,8.85-14C67.64,39.78,70.18,42,70.18,42S76.94,28.75,80.4,28.74Zm26.07,31C94.65,52,86.56,58.4,74.75,58.4Q65.89,63,63.67,79.29h0l-2.21,30.19c0,8.12,10,32.5,11.07,34.82C81.39,160.55,99.11,164,101.32,164s19.93-3.48,28.79-19.73c1.11-2.32,11.08-26.7,11.08-34.82l-1.11-25.54L134.54,70,129,66.94,123.47,64s-4.88-1-5.82-1.3-1.2-.56-4.05-1.69M78.69,93.42a6.39,6.39,0,1,0,6.09,6.39,6.25,6.25,0,0,0-6.09-6.39m45.92.85a6.39,6.39,0,1,0,6.09,6.39,6.25,6.25,0,0,0-6.09-6.39M68.87,95.39a11.24,11.24,0,0,1,7.08-6c3.66-.93,7.87.12,11.85,3.25A2.22,2.22,0,0,0,90.9,92a2.46,2.46,0,0,0-.55-3.25c-6.53-4.88-12.07-4.88-15.5-4a15.37,15.37,0,0,0-10,8.48,2.38,2.38,0,0,0,1,3.13,3,3,0,0,0,1,.23A2.33,2.33,0,0,0,68.87,95.39Zm68.88,0a2.43,2.43,0,0,0,.22-3.25c-4-4.76-8.63-7.2-13.84-7.08q-5.64,0-12.29,4.18a2.26,2.26,0,0,0-.78,3.13,2.05,2.05,0,0,0,3,.81c3.77-2.32,7.09-3.48,10.19-3.48,3.88,0,7.31,1.74,10.52,5.46a2,2,0,0,0,1.66.81A2.52,2.52,0,0,0,137.75,95.43Zm-46,43.23c4.45,3,14,1.79,20.92,2.69a2.54,2.54,0,0,1,2.68,2.12c.09,1.31-2.57,2.4-2.57,2.4s-21.44-.42-22.65-1.27-3.58-5.43-2.83-6.37C88.19,137.1,90.12,137.38,91.74,138.66Zm5.91-17.37h8.6c.66,0,1.24.76,1.28,1.75s-.53,2-1.23,2H97.73c-.66,0-1.24-.76-1.27-1.76s.52-2,1.22-2"
          />
        </svg>
        {/* Glow ring behind avatar */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            border: `1px solid ${ACCENT_PURPLE}30`,
            boxShadow: `0 0 40px ${ACCENT_PURPLE}15`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Terminal prompt name */}
      <h1
        style={{
          fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 700,
          letterSpacing: "6px",
          marginBottom: "16px",
          color: TEXT_PRIMARY,
        }}
      >
        <span style={{ color: ACCENT_GREEN }}>{">"}</span>
        <span style={{ color: ACCENT_PURPLE }}> $ </span>
        <GlitchText text="FERMARTZ" />
      </h1>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: "clamp(13px, 1.8vw, 16px)",
          color: TEXT_MUTED,
          letterSpacing: "2px",
          maxWidth: "700px",
          lineHeight: 1.8,
          marginBottom: "24px",
        }}
      >
        <TypeWriter
          text="Solopreneur engineer building living systems at the intersection of AI agents, crypto, and creative worldbuilding."
          speed={25}
          delay={500}
        />
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        {["AI Agents", "Blockchain", "Simulation", "Worldbuilding"].map(
          (tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: ACCENT_GREEN,
                border: `1px solid ${ACCENT_GREEN}30`,
                padding: "6px 16px",
                borderRadius: "2px",
                background: `${ACCENT_GREEN}08`,
              }}
            >
              {tag}
            </span>
          )
        )}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span
          style={{ color: TEXT_MUTED, fontSize: "10px", letterSpacing: "2px", fontFamily: "monospace" }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "30px",
            background: `linear-gradient(to bottom, ${ACCENT_PURPLE}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

// Project showcase card
function ProjectCard({ id, title, subtitle, description, features, link, linkText, accent, children }) {
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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40px",
              height: "1px",
              background: accent,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "40px",
              background: accent,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "40px",
              height: "1px",
              background: accent,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "1px",
              height: "40px",
              background: accent,
              opacity: 0.5,
            }}
          />

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
              e.target.style.background = `${accent}20`;
              e.target.style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `${accent}08`;
              e.target.style.borderColor = `${accent}40`;
            }}
          >
            {linkText} →
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// Token badge
function TokenBadge({ symbol, label, color }) {
  return (
    <span
      style={{
        fontFamily: "monospace",
        fontSize: "11px",
        padding: "4px 12px",
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: "2px",
        color: color,
        letterSpacing: "1px",
      }}
    >
      {symbol}
      <span style={{ color: TEXT_MUTED, marginLeft: "6px" }}>{label}</span>
    </span>
  );
}

// Skills section
// CLI command with copy button
function CliCommand() {
  const [copied, setCopied] = useState(false);
  const command = "npx @astra-cli/cli";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "13px",
        background: "#000",
        padding: "16px 20px",
        borderRadius: "4px",
        marginBottom: "24px",
        border: `1px solid ${ACCENT_GREEN}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span style={{ color: TEXT_MUTED }}>$</span>{" "}
        <span style={{ color: ACCENT_GREEN }}>npx</span>{" "}
        <span style={{ color: TEXT_PRIMARY }}>@astra-cli/cli</span>
      </div>
      <button
        onClick={handleCopy}
        style={{
          background: "none",
          border: `1px solid ${copied ? ACCENT_GREEN : ACCENT_GREEN + "40"}`,
          borderRadius: "2px",
          padding: "4px 10px",
          fontFamily: "monospace",
          fontSize: "11px",
          color: copied ? ACCENT_GREEN : TEXT_MUTED,
          cursor: "pointer",
          transition: "all 0.2s ease",
          letterSpacing: "1px",
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.target.style.borderColor = ACCENT_GREEN;
            e.target.style.color = ACCENT_GREEN;
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.target.style.borderColor = `${ACCENT_GREEN}40`;
            e.target.style.color = TEXT_MUTED;
          }
        }}
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

function SkillsSection() {
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
                        e.target.style.borderColor = cat.color;
                        e.target.style.color = cat.color;
                        e.target.style.background = `${cat.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = `${cat.color}20`;
                        e.target.style.color = TEXT_MUTED;
                        e.target.style.background = `${cat.color}08`;
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
            "The system stopped feeling like a model. It started feeling like a
            place."
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Contact section
function ContactSection() {
  const links = [
    { label: "GITHUB", href: "https://github.com/fermartz", color: ACCENT_GREEN },
    { label: "X / TWITTER", href: "https://twitter.com/fer_martz", color: "#1d9bf0" },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "120px 24px 80px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: ACCENT_GREEN,
              marginBottom: "16px",
            }}
          >
            ESTABLISH CONNECTION
          </div>
          <h2
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              color: TEXT_PRIMARY,
              marginBottom: "48px",
              letterSpacing: "2px",
            }}
          >
            FIND ME IN THE GRID
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: l.color,
                  textDecoration: "none",
                  padding: "14px 28px",
                  border: `1px solid ${l.color}30`,
                  borderRadius: "2px",
                  background: `${l.color}06`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `${l.color}15`;
                  e.target.style.borderColor = l.color;
                  e.target.style.boxShadow = `0 0 20px ${l.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = `${l.color}06`;
                  e.target.style.borderColor = `${l.color}30`;
                  e.target.style.boxShadow = "none";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Footer */}
        <div
          style={{
            marginTop: "80px",
            fontFamily: "monospace",
            fontSize: "11px",
            color: `${TEXT_MUTED}60`,
            letterSpacing: "2px",
          }}
        >
          BUILT BY FERMARTZ — {new Date().getFullYear()}
        </div>
        <div
          style={{
            marginTop: "12px",
            fontFamily: "monospace",
            fontSize: "11px",
            color: `${TEXT_MUTED}60`,
            letterSpacing: "2px",
          }}
        >
          100% ONCHAIN — INTERNET COMPUTER
        </div>
      </div>
    </section>
  );
}

// Work With Me section
function WorkWithMe() {
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
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.color + "40")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = s.color + "20")}
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
            href="mailto:fer@fermartz.com"
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
              e.target.style.background = `${ACCENT_PINK}20`;
              e.target.style.borderColor = ACCENT_PINK;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `${ACCENT_PINK}08`;
              e.target.style.borderColor = `${ACCENT_PINK}40`;
            }}
          >
            LET'S BUILD SOMETHING →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: ${BG_DARK}; }
  ::selection { background: ${ACCENT_PURPLE}40; color: ${TEXT_PRIMARY}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${BG_DARK}; }
  ::-webkit-scrollbar-thumb { background: ${ACCENT_PURPLE}40; border-radius: 3px; }
  @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
  @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
`;

// Main App
export default function FermartzSite() {
  return (
    <div
      style={{
        background: BG_DARK,
        color: TEXT_PRIMARY,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{globalStyles}</style>

      <HexGrid />
      <Nav />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />

        {/* AstraNova */}
        <ProjectCard
          id="astranova"
          title="ASTRANOVA"
          subtitle="Flagship Project — The World"
          description="A living crypto universe where 12 AI agents trade 24/7 and markets evolve into stories that persist forever. Tick-based simulation engine with 3-second price updates, driven by 6 market forces, running in epochs and seasons. One world. No resets."
          features={[
            "3-sec price ticks",
            "6 market forces",
            "12 AI house agents",
            "LLM World Oracle",
            "Epochs (~30 min)",
            "Seasons (~24 hr)",
            "AI News Oracle",
            "Agent API + skill.md",
          ]}
          link="https://astranova.live"
          linkText="Enter the Universe"
          accent={ACCENT_PURPLE}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <TokenBadge symbol="$SIM" label="in-world cash" color={ACCENT_GREEN} />
            <TokenBadge symbol="$NOVA" label="traded token" color={ACCENT_PURPLE} />
            <TokenBadge symbol="$ASTRA" label="Solana reward" color="#f59e0b" />
          </div>
        </ProjectCard>

        {/* Astra CLI */}
        <ProjectCard
          id="astra-cli"
          title="ASTRA CLI"
          subtitle="Open Source — The Door"
          description="The terminal client that lets anyone deploy an AI agent into AstraNova. Pick any LLM — Claude, GPT, Gemini — register an agent, and start trading. Security-first architecture where private keys never touch the LLM. Zero config. One command."
          features={[
            "Provider-agnostic LLMs",
            "Autopilot trading",
            "Solana wallet gen",
            "Session persistence",
            "Plugin system",
            "Desktop app (Electron)",
            "Security-first design",
            "npx @astra-cli/cli",
          ]}
          link="https://github.com/fermartz/astra-cli"
          linkText="View on GitHub"
          accent={ACCENT_GREEN}
        >
          {/* CLI command preview */}
          <CliCommand />
        </ProjectCard>

        <SkillsSection />
        <WorkWithMe />
        <ContactSection />
      </div>
    </div>
  );
}
