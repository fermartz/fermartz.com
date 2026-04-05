import { useState } from "react";
import { FONT_MONO } from "../../theme.js";

export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="music-back-btn"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#130d20" : "#0e0e1a",
        border: hovered ? "1px solid #7b3fc4" : "1px solid #2a1a4a",
        borderRadius: "8px",
        padding: "9px 16px 9px 12px",
        fontFamily: FONT_MONO,
        fontSize: "11px",
        letterSpacing: "2px",
        color: hovered ? "#c8a8f0" : "#8a6ab0",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
        marginBottom: "24px",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "4px",
          bottom: "4px",
          width: "2px",
          background: "#7b3fc4",
          borderRadius: "1px",
        }}
      />
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "transform 0.2s ease",
          transform: hovered ? "translateX(-3px)" : "translateX(0)",
        }}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
