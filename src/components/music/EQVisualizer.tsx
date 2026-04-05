import { useRef, useEffect } from "react";
import { ACCENT_PURPLE } from "../../theme.js";
import { RESTING_HEIGHTS } from "../../utils/musicHelpers.ts";

export function EQVisualizer({ analyser, isPlaying }: { analyser: any; isPlaying: boolean }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || !analyser) {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.height = `${RESTING_HEIGHTS[i]}px`;
      });
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
      analyser.getByteFrequencyData(dataArray);
      const binCount = dataArray.length;
      const step = Math.floor(binCount / 5);
      for (let i = 0; i < 5; i++) {
        const val = dataArray[i * step] || 0;
        const height = Math.max(4, Math.min(28, (val / 255) * 28));
        const bar = barsRef.current[i];
        if (bar) {
          bar.style.height = `${height}px`;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [analyser, isPlaying]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "28px" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
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
