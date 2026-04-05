import { useState } from "react";
import { ACCENT_PURPLE, BG_CARD, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import { getGenre } from "../../utils/musicHelpers.ts";

export function TrackItem({
  track,
  isActive,
  isPlaying,
  onClick,
  isMobile,
}: {
  track: any;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const genreData = getGenre(track.genre);
  const tagColor = genreData.iconColor || ACCENT_PURPLE;
  const tagBg = genreData.iconBg || BG_CARD;
  const tagLabel = genreData.tagLabel || track.genre.toUpperCase();

  return (
    <div>
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "10px" : "16px",
          padding: isMobile ? "10px 12px" : "12px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          background: isActive ? "#130d20" : hovered ? BG_CARD : "transparent",
          border: isActive ? `1px solid ${ACCENT_PURPLE}50` : "1px solid transparent",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13px",
            color: isActive && isPlaying ? ACCENT_PURPLE : TEXT_MUTED,
            width: "24px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {isActive && isPlaying ? "▶" : track.num}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: isMobile ? "13px" : "14px",
              color: isActive ? TEXT_PRIMARY : hovered ? TEXT_PRIMARY : TEXT_MUTED,
              transition: "color 0.15s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track.name}
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              color: TEXT_MUTED,
              fontStyle: "italic",
              marginTop: "2px",
            }}
          >
            {track.style}
          </div>
        </div>

        {!isMobile && (
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "9px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: tagColor,
              background: tagBg,
              padding: "3px 8px",
              borderRadius: "3px",
              flexShrink: 0,
            }}
          >
            {tagLabel}
          </span>
        )}

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "12px",
            color: TEXT_MUTED,
            flexShrink: 0,
          }}
        >
          {track.duration}
        </div>
      </div>
    </div>
  );
}
