import { TEXT_MUTED } from "../theme.js";

export function TokenBadge({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "monospace",
        fontSize: "11px",
        padding: "4px 12px",
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: "2px",
        color: color,
        letterSpacing: "1px",
      }}
    >
      {symbol}
      <span style={{ color: TEXT_MUTED, marginLeft: "6px" }}>{label}</span>
    </span>
  );
}
