import { type CSSProperties, type ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  accent: string;
  /** Append a " →" after the label. */
  arrow?: boolean;
  /** Force opening in a new tab (defaults to true for http(s) links). */
  newTab?: boolean;
  /** Extra style overrides merged last (padding, fontSize, marginTop, etc.). */
  style?: CSSProperties;
};

/**
 * Shared call-to-action link used across the homepage cards, hero, and
 * sections. Centralizes the accent-tinted button styling, the hover/focus
 * feedback (so keyboard users get the same affordance as mouse users), and
 * the external-vs-mailto target handling. Uses e.currentTarget — never
 * e.target — so styling stays correct even with child elements.
 */
export function CtaLink({ href, children, accent, arrow = false, newTab, style }: CtaLinkProps) {
  const isExternal = newTab ?? href.startsWith("http");

  const setActive = (el: HTMLElement) => {
    el.style.background = `${accent}20`;
    el.style.borderColor = accent;
  };
  const setIdle = (el: HTMLElement) => {
    el.style.background = `${accent}08`;
    el.style.borderColor = `${accent}40`;
  };

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={(e) => setActive(e.currentTarget)}
      onMouseLeave={(e) => setIdle(e.currentTarget)}
      onFocus={(e) => setActive(e.currentTarget)}
      onBlur={(e) => setIdle(e.currentTarget)}
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
        ...style,
      }}
    >
      {children}
      {arrow ? " →" : null}
    </a>
  );
}
