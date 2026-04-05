import { ACCENT_PURPLE, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import { EQVisualizer } from "./EQVisualizer.tsx";
import { ControlButton } from "./ControlButton.tsx";

type NowPlayingBarProps = {
  track: any;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  analyser: any;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (t: number) => void;
  onVolumeChange: (v: number) => void;
  volume: number;
  isMobile: boolean;
};

export function NowPlayingBar({
  track,
  isPlaying,
  duration,
  currentTime,
  analyser,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  volume,
  isMobile,
}: NowPlayingBarProps) {
  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        background: "#0e0e1a",
        border: "1px solid #2a1a4a",
        borderRadius: "10px",
        padding: isMobile ? "16px" : "20px",
        marginBottom: "28px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
        <EQVisualizer analyser={analyser} isPlaying={isPlaying} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: "15px",
              color: TEXT_PRIMARY,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track ? track.name : "Hit play. Start vibing."}
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              color: TEXT_MUTED,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginTop: "2px",
            }}
          >
            {track ? `${track.style} · ${track.duration}` : ""}
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "12px",
            color: TEXT_MUTED,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: "14px", height: "3px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "#1a1f2e",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            width: `${progressPercent}%`,
            background: ACCENT_PURPLE,
            borderRadius: "2px",
            transition: "width 0.1s linear",
          }}
        />
        <input
          type="range"
          className="music-progress"
          min="0"
          max={duration || 0}
          value={currentTime || 0}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          style={{
            position: "absolute",
            top: "-6px",
            left: 0,
            width: "100%",
            height: "16px",
            background: "transparent",
            cursor: "pointer",
            opacity: 0,
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ControlButton onClick={onPrev} title="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </ControlButton>

          <button
            onClick={onPlayPause}
            title={isPlaying ? "Pause" : "Play"}
            style={{
              width: "39px",
              height: "39px",
              borderRadius: "50%",
              background: ACCENT_PURPLE,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: TEXT_PRIMARY,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#8b4ae8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = ACCENT_PURPLE)}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <ControlButton onClick={onNext} title="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </ControlButton>
        </div>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={TEXT_MUTED}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
              {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
            </svg>
            <input
              type="range"
              className="music-volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
