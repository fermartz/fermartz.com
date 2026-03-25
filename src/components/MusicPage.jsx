import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { HexGrid, globalStyles } from "../App.jsx";
import { useAudioPlayer } from "../contexts/AudioContext.jsx";
import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  BG_DARK,
  BG_CARD,
  TEXT_PRIMARY,
  TEXT_MUTED,
  FONT_MONO,
} from "../theme.js";
import musicData from "../data/music.json";
import "./MusicPage.css";

const RESTING_HEIGHTS = [6, 12, 18, 8, 14];

const TAG_COLORS = {
  SYNTH: { color: "#9b5fe4", bg: "#1a0d2e" },
  SPANISH: { color: "#7fe040", bg: "#0d1a09" },
  DARK: { color: "#8b95a5", bg: "#1a1f2e" },
  MINIMAL: { color: "#3f94c4", bg: "#0d1520" },
  HOUSE: { color: "#3f94c4", bg: "#0d1520" },
  DEEP: { color: "#3fc4a0", bg: "#0d1a1a" },
  HYPNOTIC: { color: "#c4a03f", bg: "#1a1509" },
  INSTRUMENTAL: { color: "#8b95a5", bg: "#1a1f2e" },
  ROCK: { color: "#ec4899", bg: "#1a0d1a" },
  CHILLWAVE: { color: "#c4a03f", bg: "#1a1509" },
  SAMBA: { color: "#fde047", bg: "#1a1a0d" },
  FRENCH: { color: "#e879a8", bg: "#1a0d15" },
  LOUNGE: { color: "#d4a0c0", bg: "#1a0d1a" },
};

function getTagStyle(tag) {
  const t = TAG_COLORS[tag] || { color: TEXT_MUTED, bg: "#1a1f2e" };
  return { color: t.color, background: t.bg };
}

// Helper to look up genre data for a playlist or track
function getGenre(genreId) {
  return musicData.genres[genreId] || {};
}

// ─── Nav ────────────────────────────────────────────────────────────────────────

function MusicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const linkStyle = {
    color: TEXT_MUTED,
    fontSize: isMobile ? "10px" : "12px",
    textDecoration: "none",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    transition: "color 0.2s",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isMobile ? "12px 16px" : "16px 32px",
        display: "flex",
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.15)" : "none",
        transition: "all 0.3s ease",
        fontFamily: FONT_MONO,
      }}
    >
      <Link
        to="/"
        style={{
          color: ACCENT_GREEN,
          fontSize: "14px",
          textDecoration: "none",
          letterSpacing: "2px",
        }}
      >
        {">"} $ FERMARTZ
      </Link>
      <div
        style={{
          display: "flex",
          gap: isMobile ? "16px" : "24px",
          ...(isMobile
            ? { width: "100%", justifyContent: "center", marginTop: "8px" }
            : {}),
        }}
      >
        <Link
          to="/blog"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = ACCENT_GREEN)}
          onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
        >
          BLOG
        </Link>
        <span style={{ ...linkStyle, color: ACCENT_GREEN }}>MUSIC</span>
        {!isMobile && (
          <Link
            to="/#contact"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = ACCENT_GREEN)}
            onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
          >
            CONTACT
          </Link>
        )}
      </div>
    </nav>
  );
}

// ─── Breadcrumb ─────────────────────────────────────────────────────────────────

function Breadcrumb({ playlist, onNavigate }) {
  const crumbStyle = {
    fontFamily: FONT_MONO,
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  };

  const parts = [];

  if (!playlist) {
    parts.push(
      <span key="playlists" style={{ ...crumbStyle, color: ACCENT_PURPLE }}>
        Playlists
      </span>
    );
  } else {
    parts.push(
      <span
        key="playlists"
        style={{ ...crumbStyle, color: TEXT_MUTED, cursor: "pointer", transition: "color 0.2s" }}
        onClick={() => onNavigate(null)}
        onMouseEnter={(e) => (e.target.style.color = ACCENT_PURPLE)}
        onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
      >
        Playlists
      </span>,
      <span key="sep1" style={{ ...crumbStyle, color: TEXT_MUTED, margin: "0 8px" }}>/</span>,
      <span key="playlist" style={{ ...crumbStyle, color: ACCENT_PURPLE }}>
        {playlist.name}
      </span>
    );
  }

  return <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>{parts}</div>;
}

// ─── MusicHeader ────────────────────────────────────────────────────────────────

function MusicHeader({ playlist, onNavigate, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-start",
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

// ─── BackButton ─────────────────────────────────────────────────────────────────

function BackButton({ label, onClick }) {
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

// ─── PlaylistCard ───────────────────────────────────────────────────────────────

function PlaylistCard({ playlist, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const genre = getGenre(playlist.genre);
  const trackCount = playlist.tracks ? playlist.tracks.length : 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: BG_CARD,
        border: "1px solid #1a1f2e",
        borderRadius: "8px",
        padding: isMobile ? "20px" : "24px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        borderBottom: hovered ? `2px solid ${genre.accent}` : "2px solid transparent",
      }}
    >
      {/* Arrow on hover */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", minHeight: "20px" }}>
        <span
          style={{
            color: genre.accent,
            fontSize: "16px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          →
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "18px",
          fontWeight: 500,
          color: TEXT_PRIMARY,
          marginBottom: "6px",
        }}
      >
        {playlist.name}
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "12px",
          fontStyle: "italic",
          color: TEXT_MUTED,
          marginBottom: "20px",
        }}
      >
        {playlist.description}
      </div>

      {/* Tags */}
      {playlist.tags && playlist.tags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {playlist.tags.map((tag) => {
            const tagStyle = getTagStyle(tag);
            return (
              <span
                key={tag}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "8px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: tagStyle.color,
                  background: tagStyle.background,
                  padding: "2px 7px",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "11px",
          color: TEXT_MUTED,
          letterSpacing: "1px",
          display: "flex",
          gap: "16px",
        }}
      >
        <span>
          <span style={{ color: ACCENT_PURPLE }}>{trackCount}</span>{" "}
          {trackCount === 1 ? "track" : "tracks"}
        </span>
      </div>
    </div>
  );
}

// ─── PlaylistGrid ──────────────────────────────────────────────────────────────

function PlaylistGrid({ playlists, onSelectPlaylist, isMobile }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : playlists.length === 1 ? "1fr" : "1fr 1fr",
        gap: "16px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {playlists.map((pl) => (
        <PlaylistCard
          key={pl.id}
          playlist={pl}
          onClick={() => onSelectPlaylist(pl)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

// ─── EQ Visualizer ──────────────────────────────────────────────────────────────

function EQVisualizer({ analyser, isPlaying }) {
  const barsRef = useRef([null, null, null, null, null]);
  const animRef = useRef(null);

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

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
      analyser.getByteFrequencyData(dataArray);
      const binCount = dataArray.length;
      const step = Math.floor(binCount / 5);
      for (let i = 0; i < 5; i++) {
        const val = dataArray[i * step] || 0;
        const height = Math.max(4, Math.min(28, (val / 255) * 28));
        if (barsRef.current[i]) {
          barsRef.current[i].style.height = `${height}px`;
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
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "28px" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{
            width: "3px",
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

// ─── NowPlayingBar ──────────────────────────────────────────────────────────────

function NowPlayingBar({
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
}) {
  const formatTime = (secs) => {
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
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8b4ae8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT_PURPLE)}
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

// ─── ControlButton ──────────────────────────────────────────────────────────────

function ControlButton({ onClick, children, title }) {
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

// ─── NotesPanel ─────────────────────────────────────────────────────────────────

function NotesPanel({ notes }) {
  return (
    <div
      style={{
        padding: "12px 16px 12px 20px",
        borderLeft: `2px solid ${ACCENT_PURPLE}60`,
        marginTop: "8px",
        marginLeft: "28px",
        marginRight: "16px",
        marginBottom: "4px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "10px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: ACCENT_PURPLE,
          marginBottom: "8px",
        }}
      >
        PRODUCTION PROMPT
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "11px",
          color: TEXT_MUTED,
          lineHeight: 1.7,
        }}
      >
        {notes}
      </div>
    </div>
  );
}

// ─── TrackItem ──────────────────────────────────────────────────────────────────

function TrackItem({ track, isActive, isPlaying, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const genreData = getGenre(track.genre);
  const tagColor = genreData.iconColor || ACCENT_PURPLE;
  const tagBg = genreData.iconBg || BG_CARD;
  const tagLabel = genreData.tagLabel || track.genre.toUpperCase();

  return (
    <div>
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "10px" : "16px",
          padding: isMobile ? "10px 12px" : "12px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          background: isActive ? "#130d20" : hovered ? BG_CARD : "transparent",
          border: isActive ? `1px solid ${ACCENT_PURPLE}50` : "1px solid transparent",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13px",
            color: isActive && isPlaying ? ACCENT_PURPLE : TEXT_MUTED,
            width: "24px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {isActive && isPlaying ? "▶" : track.num}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: isMobile ? "13px" : "14px",
              color: isActive ? TEXT_PRIMARY : hovered ? TEXT_PRIMARY : TEXT_MUTED,
              transition: "color 0.15s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track.name}
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              color: TEXT_MUTED,
              fontStyle: "italic",
              marginTop: "2px",
            }}
          >
            {track.style}
          </div>
        </div>

        {!isMobile && (
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "9px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: tagColor,
              background: tagBg,
              padding: "3px 8px",
              borderRadius: "3px",
              flexShrink: 0,
            }}
          >
            {tagLabel}
          </span>
        )}

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "12px",
            color: TEXT_MUTED,
            flexShrink: 0,
          }}
        >
          {track.duration}
        </div>

        {/* {track.notes && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotes(!showNotes);
            }}
            style={{
              fontFamily: FONT_MONO,
              fontSize: "9px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: showNotes ? ACCENT_PURPLE : TEXT_MUTED,
              background: "transparent",
              border: `1px solid ${showNotes ? ACCENT_PURPLE + "60" : "#2a2a3a"}`,
              borderRadius: "10px",
              padding: "3px 10px",
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT_PURPLE + "60";
              e.currentTarget.style.color = ACCENT_PURPLE;
            }}
            onMouseLeave={(e) => {
              if (!showNotes) {
                e.currentTarget.style.borderColor = "#2a2a3a";
                e.currentTarget.style.color = TEXT_MUTED;
              }
            }}
          >
            NOTES
          </button>
        )} */}
      </div>
      {/* {showNotes && track.notes && <NotesPanel notes={track.notes} />} */}
    </div>
  );
}

// ─── TrackView ──────────────────────────────────────────────────────────────────

function TrackView({
  playlist,
  currentTrack,
  isPlaying,
  progress,
  duration,
  currentTime,
  analyser,
  volume,
  onBack,
  onSelectTrack,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  isMobile,
}) {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <BackButton label="BACK TO PLAYLISTS" onClick={onBack} />

      <NowPlayingBar
        track={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        currentTime={currentTime}
        analyser={analyser}
        onPlayPause={onPlayPause}
        onPrev={onPrev}
        onNext={onNext}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        volume={volume}
        isMobile={isMobile}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid #1a1f2e",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "16px",
            fontWeight: 500,
            color: TEXT_PRIMARY,
          }}
        >
          {playlist.name}
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: TEXT_MUTED,
          }}
        >
          {playlist.tracks.length} {playlist.tracks.length === 1 ? "track" : "tracks"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {playlist.tracks.map((track, idx) => (
          <TrackItem
            key={track.id}
            track={track}
            index={idx}
            isActive={currentTrack && currentTrack.id === track.id}
            isPlaying={isPlaying && currentTrack && currentTrack.id === track.id}
            onClick={() => onSelectTrack(track)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MusicPage ──────────────────────────────────────────────────────────────────

export default function MusicPage() {
  const {
    currentPlaylist,
    setCurrentPlaylist,
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    analyserNode,
    playTrack,
    handlePlayPause,
    handlePrev,
    handleNext,
    handleSeek,
    handleVolumeChange,
  } = useAudioPlayer();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPlaylist]);

  const handleNavigate = useCallback((playlist) => {
    setCurrentPlaylist(playlist);
  }, [setCurrentPlaylist]);

  const handleSelectPlaylist = useCallback((playlist) => {
    setCurrentPlaylist(playlist);
  }, [setCurrentPlaylist]);

  const view = currentPlaylist ? "tracks" : "playlists";

  return (
    <div
      style={{
        background: BG_DARK,
        color: TEXT_PRIMARY,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{globalStyles}</style>
      <HexGrid />
      <MusicNav />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "100px 16px 80px" : "120px 24px 80px",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <MusicHeader
          playlist={currentPlaylist}
          onNavigate={handleNavigate}
          isMobile={isMobile}
        />

        {view === "playlists" && (
          <PlaylistGrid
            playlists={musicData.playlists}
            onSelectPlaylist={handleSelectPlaylist}
            isMobile={isMobile}
          />
        )}

        {view === "tracks" && (
          <TrackView
            playlist={currentPlaylist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            analyser={analyserNode}
            volume={volume}
            onBack={() => {
              setCurrentPlaylist(null);
            }}
            onSelectTrack={playTrack}
            onPlayPause={handlePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            isMobile={isMobile}
          />
        )}

        <div
          style={{
            marginTop: "80px",
            fontFamily: FONT_MONO,
            fontSize: "11px",
            color: `${TEXT_MUTED}60`,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          BUILT BY FERMARTZ — {new Date().getFullYear()}
          <div style={{ marginTop: "12px" }}>
            100% ONCHAIN — INTERNET COMPUTER
          </div>
        </div>
      </div>
    </div>
  );
}
