"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-xl"
        style={{ background: "var(--bg-glass)", border: "1px solid var(--border-card)" }}
      />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group"
      style={{
        background: "var(--bg-glass)",
        border: "1px solid var(--border-card)",
        color: "var(--text-secondary)",
        backdropFilter: "blur(8px)",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-base transition-transform duration-300 group-hover:scale-110">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
