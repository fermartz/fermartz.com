import { useState, ReactNode } from "react";
import { TEXT_MUTED } from "../../theme.js";

export function ControlButton({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: ReactNode;
  title: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "37px",
        height: "37px",
        borderRadius: "6px",
        background: hovered ? "#1a1f2e" : "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT_MUTED,
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}
