import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { HexGrid, globalStyles } from "./Layout.tsx";
import BlogNav from "./BlogNav.jsx";
import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  BG_DARK,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "../theme.js";
import { sortedPosts, postsBySlug } from "../utils/postLoader.ts";
import { mdxComponents } from "../utils/mdxComponents.tsx";
import { PostNavLink } from "./PostNavLink.tsx";

export default function BlogPost() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const mod = slug ? postsBySlug[slug] : undefined;

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
            {tags?.map((tag: string) => (
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
          <div style={{ marginTop: "12px" }}>100% ONCHAIN — INTERNET COMPUTER</div>
        </div>
      </div>
    </div>
  );
}
