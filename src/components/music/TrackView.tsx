import { TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../../theme.js";
import type { Playlist, Track } from "../../types.ts";
import { BackButton } from "./BackButton.tsx";
import { NowPlayingBar } from "./NowPlayingBar.tsx";
import { TrackItem } from "./TrackItem.tsx";

type TrackViewProps = {
  playlist: Playlist;
  currentTrack: Track | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  analyser: AnalyserNode | null;
  volume: number;
  playbackError: string | null;
  onRetryPlayback: () => void;
  onDismissError: () => void;
  onBack: () => void;
  onSelectTrack: (t: Track) => void;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (t: number) => void;
  onVolumeChange: (v: number) => void;
  isMobile: boolean;
};

export function TrackView({
  playlist,
  currentTrack,
  isPlaying,
  duration,
  currentTime,
  analyser,
  volume,
  playbackError,
  onRetryPlayback,
  onDismissError,
  onBack,
  onSelectTrack,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  isMobile,
}: TrackViewProps) {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <BackButton label="BACK TO PLAYLISTS" onClick={onBack} />

      <NowPlayingBar
        track={currentTrack}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
        analyser={analyser}
        onPlayPause={onPlayPause}
        onPrev={onPrev}
        onNext={onNext}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        volume={volume}
        playbackError={playbackError}
        onRetryPlayback={onRetryPlayback}
        onDismissError={onDismissError}
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
        {playlist.tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isActive={currentTrack?.id === track.id}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onClick={() => onSelectTrack(track)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
