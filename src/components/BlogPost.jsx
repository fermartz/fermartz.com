import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
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

// Sorted oldest → newest for prev/next navigation
const sortedPosts = Object.values(postModules)
  .filter((mod) => mod.frontmatter?.slug)
  .sort((a, b) => new Date(a.frontmatter.date + "T00:00:00") - new Date(b.frontmatter.date + "T00:00:00"));

const postsBySlug = {};
for (const mod of sortedPosts) {
  postsBySlug[mod.frontmatter.slug] = mod;
}

const mdxComponents = {
  h1: (props) => (
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
  h2: (props) => (
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
  h3: (props) => (
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
  p: (props) => (
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
  a: (props) => (
    <a
      style={{
        color: ACCENT_GREEN,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: ACCENT_GREEN + "40",
        transition: "text-decoration-color 0.2s",
      }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
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
  ol: (props) => (
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
  li: (props) => (
    <li style={{ marginBottom: "8px" }} {...props} />
  ),
  blockquote: (props) => (
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
  code: (props) => (
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
  pre: (props) => (
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
        textAlign: "left",
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
  figure: (props) => (
    <figure
      style={{
        margin: "32px 0",
        textAlign: "center",
      }}
      {...props}
    />
  ),
};

function PostNavLink({ post, direction }) {
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

export default function BlogPost() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const mod = postsBySlug[slug];

  if (!mod) return <Navigate to="/blog" replace />;

  const Post = mod.default;
  const { title, date, tags } = mod.frontmatter;
  const currentIndex = sortedPosts.indexOf(mod);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "120px 24px 80px",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Post header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: TEXT_MUTED, letterSpacing: "1px" }}>
              {new Date(date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
            {tags?.map((tag) => (
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
          <h1
            style={{
              fontFamily: FONT_MONO,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: TEXT_PRIMARY,
              letterSpacing: "2px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* MDX content */}
        <Post components={mdxComponents} />

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div
            style={{
              marginTop: "64px",
              paddingTop: "32px",
              borderTop: `1px solid ${ACCENT_PURPLE}20`,
              display: "flex",
              gap: "16px",
            }}
          >
            {prevPost ? <PostNavLink post={prevPost} direction="prev" /> : <div style={{ flex: 1 }} />}
            {nextPost ? <PostNavLink post={nextPost} direction="next" /> : <div style={{ flex: 1 }} />}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "24px",
            borderTop: `1px solid ${ACCENT_PURPLE}20`,
            fontFamily: "monospace",
            fontSize: "11px",
            color: `${TEXT_MUTED}60`,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          FERMARTZ — {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
