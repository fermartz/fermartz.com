import { ACCENT_PURPLE, BG_DARK, TEXT_PRIMARY } from "../theme.js";

// Hex grid background
export function HexGrid() {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.3,
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern
          id="hexgrid"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="30,2 55,15 55,37 30,50 5,37 5,15"
            fill="none"
            stroke="#151b2b"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexgrid)" />
    </svg>
  );
}

export const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: ${BG_DARK}; }
  ::selection { background: ${ACCENT_PURPLE}40; color: ${TEXT_PRIMARY}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${BG_DARK}; }
  ::-webkit-scrollbar-thumb { background: ${ACCENT_PURPLE}40; border-radius: 3px; }
  @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
  @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
`;
