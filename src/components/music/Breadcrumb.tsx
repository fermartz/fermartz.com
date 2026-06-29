import type { ReactNode, KeyboardEvent } from "react";
import { ACCENT_PURPLE, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import type { Playlist } from "../../types.ts";

export function Breadcrumb({
  playlist,
  onNavigate,
}: {
  playlist: Playlist | null;
  onNavigate: (p: Playlist | null) => void;
}) {
  const crumbStyle = {
    fontFamily: FONT_MONO,
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
  };

  const parts: ReactNode[] = [];

  if (!playlist) {
    parts.push(
      <span key="playlists" style={{ ...crumbStyle, color: ACCENT_PURPLE }}>
        Playlists
      </span>
    );
  } else {
    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNavigate(null);
      }
    };
    parts.push(
      <span
        key="playlists"
        role="button"
        tabIndex={0}
        aria-label="Back to playlists"
        style={{ ...crumbStyle, color: TEXT_MUTED, cursor: "pointer", transition: "color 0.2s" }}
        onClick={() => onNavigate(null)}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT_PURPLE)}
        onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
      >
        Playlists
      </span>,
      <span key="sep1" style={{ ...crumbStyle, color: TEXT_MUTED, margin: "0 8px" }}>/</span>,
      <span key="playlist" style={{ ...crumbStyle, color: ACCENT_PURPLE }}>
        {playlist.name}
      </span>
    );
  }

  return <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>{parts}</div>;
}
