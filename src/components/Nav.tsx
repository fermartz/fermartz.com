import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ACCENT_GREEN, TEXT_MUTED } from "../theme.js";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const links = ["astranova", "astra-cli", "stack", "contact"];

  const linkStyle = {
    color: TEXT_MUTED,
    fontSize: isMobile ? "10px" : "12px",
    textDecoration: "none",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    transition: "color 0.2s",
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) =>
    ((e.target as HTMLElement).style.color = ACCENT_GREEN);
  const onLeave = (e: React.MouseEvent<HTMLElement>) =>
    ((e.target as HTMLElement).style.color = TEXT_MUTED);

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
            style={linkStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {l}
          </a>
        ))}
        <Link to="/blog" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          BLOG
        </Link>
        <Link to="/music" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          MUSIC
        </Link>
      </div>
    </nav>
  );
}
