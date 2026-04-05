/**
 * Audio player context — centralizes playback state for the music page and
 * the site-wide MiniPlayer. Wraps an HTMLAudioElement with Web Audio API
 * nodes (AnalyserNode) so visualizer components can read frequency data.
 *
 * Error handling is two-layer: user-facing messages are surfaced through
 * `playbackError` + `retryPlayback` + `dismissError` on the context value
 * (rendered as ErrorBanner with recovery actions in NowPlayingBar), and
 * developer-facing logs are sent to console.warn/error with a "[audio]"
 * prefix. Pure helpers (validation, error mapping, safePlay) live in
 * utils/audioHelpers.ts and are individually unit-testable.
 */
import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import musicData from "../data/music.json";
import {
  isValidPlaylist,
  isValidTrack,
  safePlay,
  toPlaybackErrorMessage,
} from "../utils/audioHelpers.ts";

// Configurable via VITE_MUSIC_S3_BASE; defaults to the public assets bucket
// for the site. This is a read-only CDN origin — no credentials are stored
// client-side, and the value is only used as a URL prefix for <audio src>.
const S3_BASE =
  (import.meta.env.VITE_MUSIC_S3_BASE as string | undefined) ||
  "https://fermartz-site-music.s3.amazonaws.com";

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);
  const [analyserNode, setAnalyserNode] = useState(null);
  // User-visible error state for track load / playback failures. Cleared on
  // every new track selection and on any successful play() resolution.
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Lazily construct the <audio> element and Web Audio graph. Wrapped in
  // try/catch so browsers without Web Audio (older Safari, locked iframes)
  // still get a working UI, minus the visualizer.
  const initAudio = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.volume = volume;
      }
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) {
          console.warn("[audio] Web Audio API not supported in this browser");
          return;
        }
        audioCtxRef.current = new AudioCtx();
        const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
        const analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(audioCtxRef.current.destination);
        setAnalyserNode(analyser);
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch((err) => console.warn("[audio] resume failed:", err));
      }
    } catch (err) {
      console.error("[audio] initialization failed:", err);
    }
  }, [volume]);

  // Time update and event handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);

    // Auto-advance to the next track. playTrack isn't called directly to
    // avoid a stale closure — we replicate its core logic inline.
    const handleEnded = () => {
      if (!currentPlaylist || !currentTrack) return;
      const tracks = currentPlaylist.tracks;
      const nextTrack = tracks[(tracks.findIndex((t) => t.id === currentTrack.id) + 1) % tracks.length];
      audio.src = `${S3_BASE}${nextTrack.url}`;
      audio.load();
      setCurrentTrack(nextTrack);
      setCurrentTime(0);
      setDuration(0);
      setProgress(0);
      setPlaybackError(null);
      safePlay(audio, "auto-advance").then(() => setIsPlaying(true));
    };

    // Surface element-level errors (404, CORS, decode, network) to the UI.
    const handleError = () => {
      console.warn("[audio] element error:", audio.error?.code, audio.error?.message);
      setPlaybackError(toPlaybackErrorMessage(audio.error));
      setIsPlaying(false);
    };
    const handleStalled = () => console.warn("[audio] playback stalled (network)");
    const handleCanPlay = () => setPlaybackError(null);

    const listeners: [keyof HTMLMediaElementEventMap, EventListener][] = [
      ["timeupdate", handleTimeUpdate],
      ["loadedmetadata", handleLoadedMetadata],
      ["ended", handleEnded],
      ["error", handleError],
      ["stalled", handleStalled],
      ["canplay", handleCanPlay],
    ];
    listeners.forEach(([name, fn]) => audio.addEventListener(name, fn));
    return () => listeners.forEach(([name, fn]) => audio.removeEventListener(name, fn));
  }, [currentPlaylist, currentTrack]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup on provider unmount (app close).
  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioCtxRef.current) audioCtxRef.current.close();
    },
    []
  );

  const playTrack = useCallback(
    (track: unknown) => {
      // Validate track shape before any side effects — prevents crashes from
      // malformed music.json entries or accidental null/undefined propagation.
      if (!isValidTrack(track)) {
        console.warn("[audio] playTrack called with invalid track:", track);
        return;
      }

      initAudio();
      const audio = audioRef.current;
      if (!audio) {
        console.warn("[audio] playTrack: audio element unavailable after init");
        return;
      }

      if (currentTrack && currentTrack.id === track.id) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          safePlay(audio, "resume");
          setIsPlaying(true);
        }
        return;
      }

      audio.src = `${S3_BASE}${track.url}`;
      audio.load();
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);
      setProgress(0);
      setPlaybackError(null);
      setHasEverPlayed(true);
      safePlay(audio, "playTrack").then(() => {
        setIsPlaying(true);
      });
    },
    [currentTrack, isPlaying, initAudio]
  );

  // Dismiss the ErrorBanner without touching playback state.
  const dismissError = useCallback(() => setPlaybackError(null), []);

  // Retry the current track after a playback error. Reloads the src (clears
  // MediaError state) and attempts play() again. No-op if nothing is loaded.
  const retryPlayback = useCallback(() => {
    setPlaybackError(null);
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.load();
    safePlay(audio, "retry").then(() => setIsPlaying(true));
  }, [currentTrack]);

  // Validated playlist setter — null is allowed (used to return to the
  // playlist grid). Any other non-conforming input is logged and ignored.
  const selectPlaylist = useCallback((playlist: unknown) => {
    if (playlist === null) {
      setCurrentPlaylist(null);
      return;
    }
    if (!isValidPlaylist(playlist)) {
      console.warn("[audio] selectPlaylist rejected invalid playlist:", playlist);
      return;
    }
    setCurrentPlaylist(playlist);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!currentTrack) {
      if (currentPlaylist && currentPlaylist.tracks && currentPlaylist.tracks.length > 0) {
        playTrack(currentPlaylist.tracks[0]);
      }
      return;
    }
    initAudio();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      safePlay(audioRef.current, "control");
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack, currentPlaylist, initAudio, playTrack]);

  // Step forward or backward through the current playlist with wraparound.
  const navigate = useCallback(
    (delta: 1 | -1) => {
      if (!currentPlaylist || !currentTrack) return;
      const tracks = currentPlaylist.tracks;
      const idx = tracks.findIndex((t) => t.id === currentTrack.id);
      const nextIdx = (idx + delta + tracks.length) % tracks.length;
      playTrack(tracks[nextIdx]);
      setTimeout(() => {
        safePlay(audioRef.current, "control").then(() => setIsPlaying(true));
      }, 100);
    },
    [currentPlaylist, currentTrack, playTrack]
  );

  const handlePrev = useCallback(() => navigate(-1), [navigate]);
  const handleNext = useCallback(() => navigate(1), [navigate]);

  const handleSeek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const handleVolumeChange = useCallback((val: number) => setVolume(val), []);

  const value = {
    currentPlaylist,
    setCurrentPlaylist: selectPlaylist,
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    analyserNode,
    hasEverPlayed,
    playbackError,
    retryPlayback,
    dismissError,
    playTrack,
    handlePlayPause,
    handlePrev,
    handleNext,
    handleSeek,
    handleVolumeChange,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}
