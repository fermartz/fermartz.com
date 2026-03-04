import { Link } from "react-router-dom";
import { HexGrid, globalStyles } from "../App.jsx";
import BlogNav from "./BlogNav.jsx";
import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  BG_DARK,
  BG_CARD,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "../theme.js";

const postModules = import.meta.glob("../posts/*.mdx", { eager: true });

const posts = Object.values(postModules)
  .map((mod) => mod.frontmatter)
  .filter(Boolean)
  .sort((a, b) => new Date(b.date + "T00:00:00") - new Date(a.date + "T00:00:00"));

export default function BlogIndex() {
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
      <BlogNav />

      <div style={{ position: "relative", zIndex: 1, padding: "120px 24px 80px", maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "3px",
            color: ACCENT_PURPLE,
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          Transmissions
        </div>
        <h1
          style={{
            fontFamily: FONT_MONO,
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: TEXT_PRIMARY,
            letterSpacing: "2px",
            marginBottom: "48px",
          }}
        >
          BLOG
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: BG_CARD,
                  border: "1px solid #1a1f2e",
                  borderRadius: "4px",
                  padding: "32px",
                  transition: "border-color 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT_GREEN + "40";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1f2e";
                }}
              >
                {/* Corner accents */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "30px", height: "1px", background: ACCENT_GREEN, opacity: 0.5 }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "30px", background: ACCENT_GREEN, opacity: 0.5 }} />

                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: TEXT_MUTED, letterSpacing: "1px" }}>
                    {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "monospace",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: ACCENT_GREEN,
                        border: `1px solid ${ACCENT_GREEN}30`,
                        padding: "2px 8px",
                        borderRadius: "2px",
                        background: `${ACCENT_GREEN}08`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: TEXT_PRIMARY,
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {post.title}
                </h2>

                {post.summary && (
                  <p
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "13px",
                      color: TEXT_MUTED,
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {post.summary}
                  </p>
                )}

                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: ACCENT_GREEN,
                  }}
                >
                  READ MORE →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
