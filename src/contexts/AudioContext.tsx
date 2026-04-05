/**
 * Audio player context — centralizes playback state for the music page and
 * the site-wide MiniPlayer. Wraps an HTMLAudioElement with Web Audio API
 * nodes (AnalyserNode) so visualizer components can read frequency data.
 *
 * Error handling: all playback failures (autoplay blocks, network issues,
 * CORS errors) are caught and logged via console.warn so the UI never hangs
 * on a rejected play() promise. Initialization failures are caught and
 * logged via console.error; the provider remains mounted so the user can
 * retry by interacting with a playback control.
 */
import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import musicData from "../data/music.json";

// Configurable via VITE_MUSIC_S3_BASE; defaults to the public assets bucket
// for the site. This is a read-only CDN origin — no credentials are stored
// client-side, and the value is only used as a URL prefix for <audio src>.
const S3_BASE =
  (import.meta.env.VITE_MUSIC_S3_BASE as string | undefined) ||
  "https://fermartz-site-music.s3.amazonaws.com";

// Safely start playback. Browsers reject play() if autoplay policy blocks it,
// if the network fails, or if CORS headers are missing — log and swallow so
// the caller's state machine can continue.
const safePlay = (audio: HTMLAudioElement | null, label: string) => {
  if (!audio) return Promise.resolve();
  return audio.play().catch((err) => {
    console.warn(`[audio] ${label} failed:`, err);
  });
};

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

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  // Initialize audio elements and Web Audio API. All construction is wrapped
  // in try/catch: Web Audio API can throw if unavailable (older browsers, WebView
  // quirks, or autoplay-restricted iframes). A failure here must not crash the
  // provider — the user should still see the UI, just without visualizer data.
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
        sourceRef.current = source;
        analyserRef.current = analyser;
        setAnalyserNode(analyser);
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch((err) => {
          console.warn("[audio] resume failed:", err);
        });
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
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (currentPlaylist && currentTrack) {
        const tracks = currentPlaylist.tracks;
        const idx = tracks.findIndex((t) => t.id === currentTrack.id);
        const nextIdx = (idx + 1) % tracks.length;
        // Can't call playTrack directly due to stale closure, so inline the logic
        const nextTrack = tracks[nextIdx];
        audio.src = `${S3_BASE}${nextTrack.url}`;
        audio.load();
        setCurrentTrack(nextTrack);
        setCurrentTime(0);
        setDuration(0);
        setProgress(0);
        safePlay(audio, "auto-advance").then(() => {
          setIsPlaying(true);
        });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentPlaylist, currentTrack]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup on provider unmount (app close)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playTrack = useCallback(
    (track) => {
      // Validate track shape before any side effects — prevents crashes from
      // malformed music.json entries or accidental null/undefined propagation.
      if (!track || typeof track.url !== "string" || !track.id) {
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
      setHasEverPlayed(true);
      safePlay(audio, "playTrack").then(() => {
        setIsPlaying(true);
      });
    },
    [currentTrack, isPlaying, initAudio]
  );

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

  const handlePrev = useCallback(() => {
    if (!currentPlaylist || !currentTrack) return;
    const tracks = currentPlaylist.tracks;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = idx <= 0 ? tracks.length - 1 : idx - 1;
    playTrack(tracks[prevIdx]);
    setTimeout(() => {
      if (audioRef.current) {
        safePlay(audioRef.current, "control");
        setIsPlaying(true);
      }
    }, 100);
  }, [currentPlaylist, currentTrack, playTrack]);

  const handleNext = useCallback(() => {
    if (!currentPlaylist || !currentTrack) return;
    const tracks = currentPlaylist.tracks;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = (idx + 1) % tracks.length;
    playTrack(tracks[nextIdx]);
    setTimeout(() => {
      if (audioRef.current) {
        safePlay(audioRef.current, "control");
        setIsPlaying(true);
      }
    }, 100);
  }, [currentPlaylist, currentTrack, playTrack]);

  const handleSeek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const handleVolumeChange = useCallback((val) => {
    setVolume(val);
  }, []);

  const value = {
    currentPlaylist,
    setCurrentPlaylist,
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    analyserNode,
    hasEverPlayed,
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
