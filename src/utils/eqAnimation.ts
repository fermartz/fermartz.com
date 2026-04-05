/**
 * Shared helpers for the audio frequency visualizer.
 *
 * Both `MiniEQ` (MiniPlayer) and `EQVisualizer` (music page) sample an
 * AnalyserNode every animation frame and map the byte-frequency data onto
 * a row of DOM bars. The sampling math and DOM write loop are identical —
 * this module centralizes that logic so the two components only differ in
 * markup and resting heights.
 */

/**
 * Allocate a Uint8Array sized to the analyser's frequency bins. Returns
 * null if the analyser is unavailable or reports zero bins (which can
 * happen on browsers that tear down the AudioContext mid-render).
 */
export function createFrequencyBuffer(
  analyser: AnalyserNode | null | undefined
): Uint8Array<ArrayBuffer> | null {
  if (!analyser) return null;
  const binCount = analyser.frequencyBinCount;
  if (!Number.isFinite(binCount) || binCount <= 0) return null;
  return new Uint8Array(new ArrayBuffer(binCount));
}

/**
 * Map a single frequency sample to a pixel height within a min/max range.
 * Pure function, no DOM access — easy to unit test.
 */
export function sampleToHeight(
  sample: number,
  minHeight: number,
  maxHeight: number
): number {
  const normalized = Math.max(0, Math.min(255, sample)) / 255;
  return Math.max(minHeight, Math.min(maxHeight, normalized * maxHeight));
}

/**
 * Read the analyser once and write a new height into each bar element.
 * Returns silently if the buffer is empty or the ref array is the wrong
 * shape, so callers don't need to guard every frame.
 */
export function updateBarHeights(
  analyser: AnalyserNode,
  dataArray: Uint8Array<ArrayBuffer>,
  bars: (HTMLDivElement | null)[],
  maxHeight: number,
  minHeight = 3
): void {
  analyser.getByteFrequencyData(dataArray);
  if (dataArray.length === 0 || bars.length === 0) return;
  const step = Math.max(1, Math.floor(dataArray.length / bars.length));
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    if (!bar) continue;
    bar.style.height = `${sampleToHeight(dataArray[i * step] || 0, minHeight, maxHeight)}px`;
  }
}

/**
 * Reset every bar to its resting height (used when playback pauses or the
 * analyser becomes unavailable).
 */
export function resetBarHeights(
  bars: (HTMLDivElement | null)[],
  restingHeights: readonly number[]
): void {
  bars.forEach((bar, i) => {
    if (bar) bar.style.height = `${restingHeights[i] ?? 0}px`;
  });
}
