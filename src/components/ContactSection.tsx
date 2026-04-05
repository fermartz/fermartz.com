import { ACCENT_GREEN, TEXT_PRIMARY, TEXT_MUTED } from "../theme.js";
import { Reveal } from "./Effects.tsx";

export function ContactSection() {
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
                  const el = e.target as HTMLElement;
                  el.style.background = `${l.color}15`;
                  el.style.borderColor = l.color;
                  el.style.boxShadow = `0 0 20px ${l.color}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.background = `${l.color}06`;
                  el.style.borderColor = `${l.color}30`;
                  el.style.boxShadow = "none";
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
