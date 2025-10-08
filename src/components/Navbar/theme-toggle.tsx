"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md border border-gray-400 dark:border-gray-600
                 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                 px-3 py-2 transition"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
