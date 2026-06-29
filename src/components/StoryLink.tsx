import { Link } from "react-router-dom";

/**
 * Quiet secondary link from a project to its build-in-public posts, filtered by
 * tag on the blog index (e.g. /blog?tag=delphy). Deliberately understated — a
 * plain underlined accent label — so it sits below the project's primary CTA.
 */
export function StoryLink({ tag, accent }: { tag: string; accent: string }) {
  return (
    <Link
      to={`/blog?tag=${tag}`}
      style={{
        fontFamily: "monospace",
        fontSize: "11px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: accent,
        textDecoration: "none",
        opacity: 0.75,
        borderBottom: `1px solid ${accent}40`,
        paddingBottom: "2px",
        transition: "opacity 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
      onFocus={(e) => (e.currentTarget.style.opacity = "1")}
      onBlur={(e) => (e.currentTarget.style.opacity = "0.75")}
    >
      The Story
    </Link>
  );
}
