import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACCENT_GREEN, ACCENT_PURPLE, BG_DARK, TEXT_MUTED, FONT_MONO } from "../theme.js";

export default function BlogNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isPost = location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const linkStyle = {
    color: TEXT_MUTED,
    fontSize: isMobile ? "10px" : "12px",
    textDecoration: "none",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    transition: "color 0.2s",
  };

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
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(124,58,237,0.15)` : "none",
        transition: "all 0.3s ease",
        fontFamily: FONT_MONO,
      }}
    >
      <Link
        to="/"
        style={{
          color: ACCENT_GREEN,
          fontSize: "14px",
          textDecoration: "none",
          letterSpacing: "2px",
        }}
      >
        {">"} $ FERMARTZ
      </Link>
      <div
        style={{
          display: "flex",
          gap: isMobile ? "16px" : "24px",
        }}
      >
        {isPost && (
          <Link
            to="/blog"
            style={linkStyle}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ACCENT_GREEN)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = TEXT_MUTED)}
          >
            ← BLOG
          </Link>
        )}
        {!isMobile && (
          <Link
            to="/#contact"
            style={linkStyle}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ACCENT_GREEN)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = TEXT_MUTED)}
          >
            CONTACT
          </Link>
        )}
      </div>
    </nav>
  );
}
