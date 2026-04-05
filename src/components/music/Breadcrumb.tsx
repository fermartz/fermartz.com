import { ACCENT_PURPLE, TEXT_MUTED, FONT_MONO } from "../../theme.js";

export function Breadcrumb({ playlist, onNavigate }: { playlist: any; onNavigate: (p: any) => void }) {
  const crumbStyle = {
    fontFamily: FONT_MONO,
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
  };

  const parts: React.ReactNode[] = [];

  if (!playlist) {
    parts.push(
      <span key="playlists" style={{ ...crumbStyle, color: ACCENT_PURPLE }}>
        Playlists
      </span>
    );
  } else {
    parts.push(
      <span
        key="playlists"
        style={{ ...crumbStyle, color: TEXT_MUTED, cursor: "pointer", transition: "color 0.2s" }}
        onClick={() => onNavigate(null)}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ACCENT_PURPLE)}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = TEXT_MUTED)}
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
