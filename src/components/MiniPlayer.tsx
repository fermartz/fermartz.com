/**
 * MiniPlayer — persistent playback widget rendered in the site-wide layout.
 * Hides itself on /music (where the full player is shown) and on routes
 * the user has never played anything from. Reads playback state from the
 * shared AudioPlayerContext.
 */
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudioPlayer } from "../contexts/AudioContext.jsx";
import {
  ACCENT_PURPLE,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "../theme.js";
import "./MiniPlayer.css";

const RESTING_HEIGHTS = [5, 10, 7];
const BAR_COUNT = 3;

function MiniEQ({ analyser, isPlaying }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || !analyser) {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.height = `${RESTING_HEIGHTS[i]}px`;
      });
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    // Validate analyser state before allocating. frequencyBinCount can be 0
    // on some browsers if the AudioContext was torn down mid-render.
    const binCount = analyser.frequencyBinCount;
    if (!Number.isFinite(binCount) || binCount <= 0) {
      console.warn("[mini-eq] analyser has no frequency bins, skipping animation");
      return;
    }

    const dataArray = new Uint8Array(binCount);
    const step = Math.max(1, Math.floor(binCount / BAR_COUNT));

    function animate() {
      analyser.getByteFrequencyData(dataArray);
      if (dataArray.length === 0) return;
      for (let i = 0; i < BAR_COUNT; i++) {
        const val = dataArray[i * step] || 0;
        const height = Math.max(3, Math.min(16, (val / 255) * 16));
        const bar = barsRef.current[i];
        if (bar) {
          bar.style.height = `${height}px`;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [analyser, isPlaying]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "16px", flexShrink: 0 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          style={{
            width: "2px",
            height: `${RESTING_HEIGHTS[i]}px`,
            background: ACCENT_PURPLE,
            borderRadius: "1px",
            transition: isPlaying ? "none" : "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function MiniPlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentTrack,
    isPlaying,
    progress,
    analyserNode,
    hasEverPlayed,
    handlePlayPause,
  } = useAudioPlayer();

  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Don't render on /music or if nothing has played
  if (location.pathname === "/music" || !hasEverPlayed) {
    return null;
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: isMobile ? "0" : "20px",
        right: isMobile ? "0" : "20px",
        left: isMobile ? "0" : "auto",
        zIndex: 50,
        background: hovered ? "#131320" : "#0e0e1a",
        border: isMobile ? "none" : (hovered ? "1px solid #7b3fc4" : "1px solid #2a1a4a"),
        borderTop: isMobile ? (hovered ? "1px solid #7b3fc4" : "1px solid #2a1a4a") : undefined,
        borderRadius: isMobile ? "0" : "10px",
        padding: isMobile ? "14px 16px" : "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: FONT_MONO,
        animation: "miniPlayerSlideIn 0.3s ease",
        transition: "all 0.2s ease",
        cursor: "default",
        maxWidth: isMobile ? "none" : "280px",
        overflow: "hidden",
      }}
    >
      {/* Mini EQ */}
      <MiniEQ analyser={analyserNode} isPlaying={isPlaying} />

      {/* Track info — clickable to go to /music */}
      <div
        onClick={() => navigate("/music")}
        style={{
          flex: 1,
          minWidth: 0,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: TEXT_PRIMARY,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {currentTrack ? currentTrack.name : ""}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: TEXT_MUTED,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop: "1px",
          }}
        >
          {currentTrack ? currentTrack.style : ""}
        </div>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={handlePlayPause}
        title={isPlaying ? "Pause" : "Play"}
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: ACCENT_PURPLE,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_PRIMARY,
          flexShrink: 0,
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#8b4ae8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT_PURPLE)}
      >
        {isPlaying ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "#1a1f2e",
          borderRadius: "0 0 10px 10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: ACCENT_PURPLE,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
