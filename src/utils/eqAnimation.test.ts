import { describe, it, expect } from "vitest";
import { sampleToHeight, createFrequencyBuffer } from "./eqAnimation.ts";

describe("sampleToHeight", () => {
  it("maps zero to the minimum height", () => {
    expect(sampleToHeight(0, 3, 28)).toBe(3);
  });

  it("maps full-scale (255) to the maximum height", () => {
    expect(sampleToHeight(255, 3, 28)).toBe(28);
  });

  it("clamps out-of-range values", () => {
    expect(sampleToHeight(-50, 3, 28)).toBe(3);
    expect(sampleToHeight(999, 3, 28)).toBe(28);
  });

  it("scales linearly between min and max", () => {
    const mid = sampleToHeight(128, 0, 28);
    expect(mid).toBeGreaterThan(13);
    expect(mid).toBeLessThan(15);
  });
});

describe("createFrequencyBuffer", () => {
  it("returns null for a missing analyser", () => {
    expect(createFrequencyBuffer(null)).toBeNull();
    expect(createFrequencyBuffer(undefined)).toBeNull();
  });

  it("returns a Uint8Array sized to frequencyBinCount", () => {
    const fake = { frequencyBinCount: 32 } as AnalyserNode;
    const buf = createFrequencyBuffer(fake);
    expect(buf).toBeInstanceOf(Uint8Array);
    expect(buf!.length).toBe(32);
  });

  it("returns null when frequencyBinCount is zero", () => {
    const fake = { frequencyBinCount: 0 } as AnalyserNode;
    expect(createFrequencyBuffer(fake)).toBeNull();
  });
});
