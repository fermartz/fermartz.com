import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import musicData from "../data/music.json";

const S3_BASE = "https://fermartz-site-music.s3.amazonaws.com";

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

  // Initialize audio elements and Web Audio API
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.volume = volume;
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
      audioCtxRef.current.resume();
    }
  }, []);

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
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
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
      initAudio();
      const audio = audioRef.current;

      if (currentTrack && currentTrack.id === track.id) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play().catch(() => {});
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
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
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
      audioRef.current.play().catch(() => {});
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
        audioRef.current.play().catch(() => {});
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
        audioRef.current.play().catch(() => {});
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
