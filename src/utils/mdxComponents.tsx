import type { ComponentPropsWithoutRef } from "react";
import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "../theme.js";

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      style={{
        fontFamily: FONT_MONO,
        fontSize: "clamp(24px, 3vw, 32px)",
        fontWeight: 700,
        color: TEXT_PRIMARY,
        letterSpacing: "1px",
        margin: "48px 0 16px",
      }}
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      style={{
        fontFamily: FONT_MONO,
        fontSize: "clamp(20px, 2.5vw, 24px)",
        fontWeight: 700,
        color: TEXT_PRIMARY,
        letterSpacing: "1px",
        margin: "40px 0 12px",
      }}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      style={{
        fontFamily: FONT_MONO,
        fontSize: "18px",
        fontWeight: 600,
        color: TEXT_PRIMARY,
        margin: "32px 0 8px",
      }}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      style={{
        fontFamily: FONT_MONO,
        fontSize: "14px",
        color: TEXT_MUTED,
        lineHeight: 1.9,
        margin: "16px 0",
      }}
      {...props}
    />
  ),
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    // Only open external links in a new tab; internal/#anchor links navigate
    // in-place (and don't need rel="noopener").
    const isExternal = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href}
        style={{
          color: ACCENT_GREEN,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: ACCENT_GREEN + "40",
          transition: "text-decoration-color 0.2s",
        }}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      style={{
        fontFamily: FONT_MONO,
        fontSize: "14px",
        color: TEXT_MUTED,
        lineHeight: 1.9,
        paddingLeft: "24px",
        margin: "16px 0",
      }}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      style={{
        fontFamily: FONT_MONO,
        fontSize: "14px",
        color: TEXT_MUTED,
        lineHeight: 1.9,
        paddingLeft: "24px",
        margin: "16px 0",
      }}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li style={{ marginBottom: "8px" }} {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      style={{
        borderLeft: `2px solid ${ACCENT_PURPLE}40`,
        paddingLeft: "20px",
        margin: "24px 0",
        fontStyle: "italic",
        color: TEXT_MUTED,
        fontFamily: FONT_MONO,
        fontSize: "14px",
        lineHeight: 1.8,
      }}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      style={{
        fontFamily: FONT_MONO,
        fontSize: "13px",
        background: `${ACCENT_PURPLE}15`,
        padding: "2px 6px",
        borderRadius: "3px",
        color: ACCENT_GREEN,
      }}
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      style={{
        fontFamily: FONT_MONO,
        fontSize: "13px",
        background: "#0d1117",
        border: `1px solid ${ACCENT_PURPLE}20`,
        borderRadius: "4px",
        padding: "20px",
        margin: "24px 0",
        overflowX: "auto",
        lineHeight: 1.6,
        textAlign: "left" as const,
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${ACCENT_PURPLE}20`,
        margin: "40px 0",
      }}
    />
  ),
  figure: (props: ComponentPropsWithoutRef<"figure">) => (
    <figure
      style={{
        margin: "32px 0",
        textAlign: "center",
      }}
      {...props}
    />
  ),
};
