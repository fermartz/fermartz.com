import { useState } from "react";
import { ACCENT_PURPLE, BG_CARD, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import { getGenre, getTagStyle } from "../../utils/musicHelpers.ts";

export function PlaylistCard({
  playlist,
  onClick,
  isMobile,
}: {
  playlist: any;
  onClick: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const genre = getGenre(playlist.genre);
  const trackCount = playlist.tracks ? playlist.tracks.length : 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: BG_CARD,
        border: "1px solid #1a1f2e",
        borderRadius: "8px",
        padding: isMobile ? "20px" : "24px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        borderBottom: hovered ? `2px solid ${genre.accent}` : "2px solid transparent",
      }}
    >
      {/* Arrow on hover */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", minHeight: "20px" }}>
        <span
          style={{
            color: genre.accent,
            fontSize: "16px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          →
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "18px",
          fontWeight: 500,
          color: TEXT_PRIMARY,
          marginBottom: "6px",
        }}
      >
        {playlist.name}
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "12px",
          fontStyle: "italic",
          color: TEXT_MUTED,
          marginBottom: "20px",
        }}
      >
        {playlist.description}
      </div>

      {/* Tags */}
      {playlist.tags && playlist.tags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {playlist.tags.map((tag: string) => {
            const tagStyle = getTagStyle(tag);
            return (
              <span
                key={tag}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "8px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: tagStyle.color,
                  background: tagStyle.background,
                  padding: "2px 7px",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "11px",
          color: TEXT_MUTED,
          letterSpacing: "1px",
          display: "flex",
          gap: "16px",
        }}
      >
        <span>
          <span style={{ color: ACCENT_PURPLE }}>{trackCount}</span>{" "}
          {trackCount === 1 ? "track" : "tracks"}
        </span>
      </div>
    </div>
  );
}
