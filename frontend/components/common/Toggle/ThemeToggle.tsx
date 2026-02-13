"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-4 py-2 rounded-lg border cursor-pointer
                 bg-white text-black border-gray-300
                 dark:bg-black dark:text-white dark:border-gray-700">
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
