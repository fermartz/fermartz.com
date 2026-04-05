import { useRef, useEffect } from "react";
import { ACCENT_PURPLE } from "../../theme.js";
import { RESTING_HEIGHTS } from "../../utils/musicHelpers.ts";
import { createFrequencyBuffer, resetBarHeights, updateBarHeights } from "../../utils/eqAnimation.ts";

const BAR_COUNT = 5;
const MAX_HEIGHT = 28;
const MIN_HEIGHT = 4;

export function EQVisualizer({
  analyser,
  isPlaying,
}: {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || !analyser) {
      resetBarHeights(barsRef.current, RESTING_HEIGHTS);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    const dataArray = createFrequencyBuffer(analyser);
    if (!dataArray) return;

    const tick = () => {
      updateBarHeights(analyser, dataArray, barsRef.current, MAX_HEIGHT, MIN_HEIGHT);
      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [analyser, isPlaying]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "28px" }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          style={{
            width: "3px",
            height: `${RESTING_HEIGHTS[i]}px`,
            background: ACCENT_PURPLE,
            borderRadius: "1px",
            transition: isPlaying ? "none" : "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
