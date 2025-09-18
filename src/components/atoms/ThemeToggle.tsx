"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

/**
 * Animated dark-mode toggle button for Tailwind v4 + Next.js App Router.
 * SHAPE: rectangular (same vibe as inputs), not circular. Wider track.
 * - Default theme is DARK.
 * - Toggles `.dark` and `.light` on <html>, persists to localStorage.
 * - Sliding knob with spring animation; sun/moon cross-fade inside the knob.
 */
export function ThemeToggle({
  width = 72, // long track
  height = 38, // input-like height
  radius = 12, // ~rounded-lg
}: {
  width?: number;
  height?: number;
  radius?: number;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme");
      const root = document.documentElement;
      const isLight = root.classList.contains("light") || stored === "light";
      applyTheme(isLight ? "light" : "dark", false);
    } catch { }
  }, []);

  function applyTheme(next: "dark" | "light", persist = true) {
    const root = document.documentElement;
    if (next === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    if (persist) localStorage.setItem("theme", next);
    setTheme(next);
  }

  if (!mounted) return null; // avoid hydration mismatch

  const isDark = theme === "dark";
  const trackPad = Math.max(3, Math.round(height * 0.16));
  const knob = height - trackPad * 2; // knob fits inside track with padding
  const leftX = -((width - knob) / 2 - trackPad);
  const rightX = (width - knob) / 2 - trackPad;

  return (
    <motion.button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex items-center justify-center border shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ width, height, borderRadius: radius, overflow: "hidden" }}
    >
      {/* Track (rectangular, input-like) */}
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{ borderRadius: radius }}
        initial={false}
        animate={{
          backgroundColor: isDark ? "oklch(0.18 0 0)" : "oklch(0.98 0 0)",
          borderColor: isDark ? "oklch(0.28 0 0)" : "oklch(0.9 0 0)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      />

      {/* Knob */}
      <motion.span
        aria-hidden
        className="relative z-10 flex items-center justify-center border"
        style={{ width: knob, height: knob, borderRadius: knob / 2 }}
        initial={false}
        animate={{
          x: isDark ? leftX : rightX,
          rotate: isDark ? -6 : 6,
          backgroundColor: isDark ? "oklch(0.1 0 0)" : "oklch(1 0 0)",
          borderColor: isDark ? "oklch(0.3 0 0)" : "oklch(0.92 0 0)",
          boxShadow: isDark
            ? "0 6px 24px oklch(0.2 0 0 / 0.35)"
            : "0 6px 24px oklch(0.85 0.02 95 / 0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-foreground"
            >
              <Moon size={Math.round(knob * 0.58)} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, scale: 0.7, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-foreground"
            >
              <Sun size={Math.round(knob * 0.62)} className="text-yellow-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>

      {/* Soft aura */}
      <motion.span
        aria-hidden
        className="absolute -z-10 rounded-[999px] blur-2xl"
        initial={false}
        animate={{
          backgroundColor: isDark ? "oklch(0.55 0.12 270 / 0.18)" : "oklch(0.95 0.05 95 / 0.35)",
          width: width * 1.2,
          height: height * 1.8,
          scale: isDark ? 1.02 : 1.04,
        }}
        transition={{ duration: 0.35 }}
      />
    </motion.button>
  );
}

/** Hook to observe theme elsewhere (unchanged) */
export function useThemeState() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  React.useEffect(() => {
    const root = document.documentElement;
    const isLight = root.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
    const observer = new MutationObserver(() => {
      const isLightNow = root.classList.contains("light");
      setTheme(isLightNow ? "light" : "dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}
