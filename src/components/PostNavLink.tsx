import { useState } from "react";
import { Link } from "react-router-dom";
import { ACCENT_GREEN, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../theme.js";

export function PostNavLink({ post, direction }: { post: any; direction: "prev" | "next" }) {
  const [hovered, setHovered] = useState(false);
  const isPrev = direction === "prev";

  return (
    <Link
      to={`/blog/${post.frontmatter.slug}`}
      style={{
        textDecoration: "none",
        flex: 1,
        textAlign: isPrev ? "left" : "right",
        padding: "20px",
        border: `1px solid ${hovered ? ACCENT_GREEN + "40" : "#1a1f2e"}`,
        borderRadius: "4px",
        background: hovered ? `${ACCENT_GREEN}06` : "transparent",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "2px",
          color: ACCENT_GREEN,
          marginBottom: "8px",
          textTransform: "uppercase",
        }}
      >
        {isPrev ? "← PREV" : "NEXT →"}
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "13px",
          color: hovered ? TEXT_PRIMARY : TEXT_MUTED,
          transition: "color 0.2s",
        }}
      >
        {post.frontmatter.title}
      </div>
    </Link>
  );
}
