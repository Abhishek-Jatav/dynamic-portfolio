"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-4 py-2 rounded-lg border transition-colors duration-300
                 bg-white text-black border-gray-300
                 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
