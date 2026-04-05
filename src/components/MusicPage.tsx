import { useState, useEffect, useCallback } from "react";
import { HexGrid, globalStyles } from "./Layout.tsx";
import { useAudioPlayer } from "../contexts/AudioContext.jsx";
import { BG_DARK, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../theme.js";
import musicData from "../data/music.json";
import "./MusicPage.css";
import { MusicNav } from "./music/MusicNav.tsx";
import { MusicHeader } from "./music/MusicHeader.tsx";
import { PlaylistGrid } from "./music/PlaylistGrid.tsx";
import { TrackView } from "./music/TrackView.tsx";

export default function MusicPage() {
  const {
    currentPlaylist,
    setCurrentPlaylist,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    analyserNode,
    playbackError,
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

  const handleNavigate = useCallback(
    (playlist: any) => {
      setCurrentPlaylist(playlist);
    },
    [setCurrentPlaylist]
  );

  const handleSelectPlaylist = useCallback(
    (playlist: any) => {
      setCurrentPlaylist(playlist);
    },
    [setCurrentPlaylist]
  );

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
            playlists={(musicData as any).playlists}
            onSelectPlaylist={handleSelectPlaylist}
            isMobile={isMobile}
          />
        )}

        {view === "tracks" && (
          <TrackView
            playlist={currentPlaylist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            duration={duration}
            currentTime={currentTime}
            analyser={analyserNode}
            volume={volume}
            playbackError={playbackError}
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
          <div style={{ marginTop: "12px" }}>100% ONCHAIN — INTERNET COMPUTER</div>
        </div>
      </div>
    </div>
  );
}
