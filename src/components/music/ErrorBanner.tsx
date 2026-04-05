/**
 * ErrorBanner — user-facing playback error UI with recovery actions.
 *
 * Rendered inside NowPlayingBar whenever AudioPlayerContext.playbackError
 * is non-null (network failure, decode error, unsupported format, 404 on
 * source). Offers two recovery paths:
 *
 *   • RETRY   → calls onRetry, which reloads the current src and replays
 *   • DISMISS → clears the error without touching playback state
 *
 * Uses role="alert" + aria-live="assertive" so screen readers announce the
 * error, and the pink accent so it's impossible to miss visually.
 */
import { ACCENT_PINK, FONT_MONO } from "../../theme.js";

type ErrorBannerProps = {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
};

const buttonStyle = {
  fontFamily: FONT_MONO,
  fontSize: "10px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: ACCENT_PINK,
  background: "transparent",
  border: `1px solid ${ACCENT_PINK}60`,
  borderRadius: "4px",
  padding: "4px 10px",
  cursor: "pointer",
};

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: FONT_MONO,
        fontSize: "11px",
        letterSpacing: "1px",
        color: ACCENT_PINK,
        background: `${ACCENT_PINK}12`,
        border: `1px solid ${ACCENT_PINK}40`,
        borderRadius: "6px",
        padding: "10px 12px",
        marginBottom: "12px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>⚠ {message}</span>
      <button type="button" onClick={onRetry} style={buttonStyle} aria-label="Retry playback">
        Retry
      </button>
      <button type="button" onClick={onDismiss} style={buttonStyle} aria-label="Dismiss error">
        Dismiss
      </button>
    </div>
  );
}
