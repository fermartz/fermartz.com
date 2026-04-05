import { describe, it, expect } from "vitest";
import { getTagStyle, RESTING_HEIGHTS } from "./musicHelpers.ts";

describe("getTagStyle", () => {
  it("returns the mapped color for a known tag", () => {
    const style = getTagStyle("SYNTH");
    expect(style.color).toBe("#9b5fe4");
    expect(style.background).toBe("#1a0d2e");
  });

  it("returns a fallback style for an unknown tag", () => {
    const style = getTagStyle("NOT_A_REAL_TAG");
    expect(style.color).toBeTruthy();
    expect(style.background).toBe("#1a1f2e");
  });
});

describe("RESTING_HEIGHTS", () => {
  it("has exactly 5 bars for the EQ visualizer", () => {
    expect(RESTING_HEIGHTS).toHaveLength(5);
    expect(RESTING_HEIGHTS.every((h) => h > 0)).toBe(true);
  });
});
