import { useState, useEffect, useRef, type ReactNode } from "react";
import { ACCENT_GREEN } from "../theme.js";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Glitch text effect
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

  useEffect(() => {
    if (prefersReducedMotion()) return; // honor reduced-motion: show static text
    let glitchInterval: ReturnType<typeof setInterval> | undefined;
    const interval = setInterval(() => {
      let iterations = 0;
      glitchInterval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (i < iterations) return text[i];
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iterations += 1;
        if (iterations > text.length) {
          clearInterval(glitchInterval);
          setDisplay(text);
        }
      }, 30);
    }, 8000);
    return () => {
      clearInterval(interval);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}

// Typing effect
export function TypeWriter({ text, speed = 50, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayed(text); // honor reduced-motion: show full text, no typing
      return;
    }
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayed, started, text, speed]);

  return (
    <span>
      {displayed}
      <span
        style={{
          opacity: displayed.length < text.length ? 1 : 0,
          animation: "blink 1s infinite",
          color: ACCENT_GREEN,
        }}
      >
        █
      </span>
    </span>
  );
}

// Scroll reveal wrapper
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
