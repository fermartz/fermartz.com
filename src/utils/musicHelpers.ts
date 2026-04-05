import musicData from "../data/music.json";
import { TEXT_MUTED } from "../theme.js";

export const RESTING_HEIGHTS = [6, 12, 18, 8, 14];

const TAG_COLORS: Record<string, { color: string; bg: string }> = {
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

export function getTagStyle(tag: string) {
  const t = TAG_COLORS[tag] || { color: TEXT_MUTED, bg: "#1a1f2e" };
  return { color: t.color, background: t.bg };
}

export function getGenre(genreId: string): any {
  return (musicData as any).genres[genreId] || {};
}
