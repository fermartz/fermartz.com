import { useState } from "react";
import { ACCENT_GREEN, TEXT_PRIMARY, TEXT_MUTED } from "../theme.js";

export function CliCommand() {
  const [copied, setCopied] = useState(false);
  const command = "npx @astra-cli/cli";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "13px",
        background: "#000",
        padding: "16px 20px",
        borderRadius: "4px",
        marginBottom: "24px",
        border: `1px solid ${ACCENT_GREEN}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span style={{ color: TEXT_MUTED }}>$</span>{" "}
        <span style={{ color: ACCENT_GREEN }}>npx</span>{" "}
        <span style={{ color: TEXT_PRIMARY }}>@astra-cli/cli</span>
      </div>
      <button
        onClick={handleCopy}
        style={{
          background: "none",
          border: `1px solid ${copied ? ACCENT_GREEN : ACCENT_GREEN + "40"}`,
          borderRadius: "2px",
          padding: "4px 10px",
          fontFamily: "monospace",
          fontSize: "11px",
          color: copied ? ACCENT_GREEN : TEXT_MUTED,
          cursor: "pointer",
          transition: "all 0.2s ease",
          letterSpacing: "1px",
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            const el = e.target as HTMLElement;
            el.style.borderColor = ACCENT_GREEN;
            el.style.color = ACCENT_GREEN;
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            const el = e.target as HTMLElement;
            el.style.borderColor = `${ACCENT_GREEN}40`;
            el.style.color = TEXT_MUTED;
          }
        }}
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}
