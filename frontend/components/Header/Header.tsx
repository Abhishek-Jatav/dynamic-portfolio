"use client";

import Navbar from "../common/Navbar/Navbar";
import ThemeToggle from "../common/Toggle/ThemeToggle";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(var(--bg-primary-rgb, 250,250,250),0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex flex-col">
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              NexaBuild
            </span>
            <span
              className="text-[11px] sm:text-xs mt-[3px] tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                opacity: 0.85,
              }}
            >
              Abhishek Jatav · Full Stack Dev
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:block">
            <Navbar />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden mt-4">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
