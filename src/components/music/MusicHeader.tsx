import { TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import { Breadcrumb } from "./Breadcrumb.tsx";

export function MusicHeader({
  playlist,
  onNavigate,
  isMobile,
}: {
  playlist: any;
  onNavigate: (p: any) => void;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "16px" : "0",
        marginBottom: "40px",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: FONT_MONO,
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: TEXT_PRIMARY,
            letterSpacing: "2px",
            marginBottom: "8px",
          }}
        >
          $DOS•IS
        </h1>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13px",
            color: TEXT_MUTED,
          }}
        >
          Agentic music production ...not just vibes
        </p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <Breadcrumb playlist={playlist} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
