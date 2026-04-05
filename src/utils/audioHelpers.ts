/**
 * Pure helpers for the audio player context.
 *
 * These are split out of AudioContext.tsx so the context file stays focused
 * on state + React wiring. Everything here is a pure function (no hooks,
 * no component state) and individually unit-testable.
 *
 * - safePlay:                wraps HTMLAudioElement.play() with a catch+log
 * - toPlaybackErrorMessage:  maps a MediaError code to a user-facing string
 * - isValidTrack:            type guard for Track objects
 * - isValidPlaylist:         type guard for Playlist objects
 */
import type { Playlist, Track } from "../types.ts";

/**
 * Safely start playback. Browsers reject play() if autoplay policy blocks it,
 * if the network fails, or if CORS headers are missing — we log and swallow
 * so the caller's state machine can continue. Surface-level errors from the
 * element itself are handled separately by the <audio> 'error' event
 * listener in AudioContext, which populates playbackError for the UI.
 */
export function safePlay(audio: HTMLAudioElement | null, label: string): Promise<void> {
  if (!audio) return Promise.resolve();
  return audio.play().catch((err) => {
    console.warn(`[audio] ${label} failed:`, err);
  });
}

/**
 * Translate a MediaError code into a message the user can act on.
 * Returned by the <audio> 'error' event listener and stored in
 * playbackError state, which NowPlayingBar reads and renders as a visible
 * ErrorBanner with Retry / Dismiss actions.
 */
export function toPlaybackErrorMessage(error: MediaError | null | undefined): string {
  if (!error) return "Playback failed. Try another track.";
  switch (error.code) {
    case MediaError.MEDIA_ERR_NETWORK:
      return "Network error — check your connection.";
    case MediaError.MEDIA_ERR_DECODE:
      return "This track couldn't be decoded.";
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return "Track not found or unsupported format.";
    default:
      return "Playback failed. Try another track.";
  }
}

/**
 * Validate a Track shape before any audio side effects. Returns true if
 * the object is safe to hand to playTrack.
 */
export function isValidTrack(track: unknown): track is Track {
  if (!track || typeof track !== "object") return false;
  const t = track as Partial<Track>;
  return typeof t.url === "string" && typeof t.id === "string";
}

/**
 * Validate a Playlist shape. Null is handled by the caller (used to
 * return to the playlist grid).
 */
export function isValidPlaylist(playlist: unknown): playlist is Playlist {
  if (!playlist || typeof playlist !== "object") return false;
  const p = playlist as Partial<Playlist>;
  return Array.isArray(p.tracks) && p.tracks.length > 0;
}
