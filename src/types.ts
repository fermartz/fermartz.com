/**
 * Shared domain types for the music player feature.
 *
 * These describe the shape of entries in `src/data/music.json` and the
 * runtime objects passed through `AudioPlayerContext`. Defining them in one
 * place gives the rest of the codebase a single source of truth and lets
 * components fail at compile time instead of with a runtime TypeError.
 */

export type Track = {
  id: string;
  num: string | number;
  name: string;
  style: string;
  duration: string;
  genre: string;
  url: string;
  notes?: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  genre: string;
  tags?: string[];
  tracks: Track[];
};

export type PlaybackErrorCode =
  | "network"
  | "decode"
  | "unsupported"
  | "unknown";

export type PlaybackError = {
  code: PlaybackErrorCode;
  message: string;
};
