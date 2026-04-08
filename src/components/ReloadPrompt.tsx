import { useRegisterSW } from "virtual:pwa-register/react";
import { ACCENT_GREEN, BG_CARD, TEXT_PRIMARY, FONT_MONO } from "../theme";

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        background: BG_CARD,
        border: `1px solid ${ACCENT_GREEN}`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: FONT_MONO,
        fontSize: 13,
        color: TEXT_PRIMARY,
        boxShadow: `0 0 20px ${ACCENT_GREEN}33`,
      }}
    >
      <span>New version available</span>
      <button
        onClick={() => updateServiceWorker(true)}
        style={{
          background: ACCENT_GREEN,
          color: "#000",
          border: "none",
          borderRadius: 4,
          padding: "4px 10px",
          fontFamily: FONT_MONO,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Reload
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        style={{
          background: "transparent",
          color: TEXT_PRIMARY,
          border: `1px solid ${TEXT_PRIMARY}44`,
          borderRadius: 4,
          padding: "4px 10px",
          fontFamily: FONT_MONO,
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        Dismiss
      </button>
    </div>
  );
}
