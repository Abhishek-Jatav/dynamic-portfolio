"use client";

import Navbar from "../common/Navbar/Navbar";
import ThemeToggle from "../common/Toggle/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Name */}
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              NexaBuild
            </h1>
            <span className="text-sm text-white-600 dark:text-black-400 mt-1">
              Abhishek Jatav&nbsp;&nbsp;
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Full Stack Developer
            </span>
          </div>

          {/* Right Side (Optional Later: Theme Toggle / CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* <ThemeToggle/> */}
          </div>
        </div>

        {/* Navbar */}
        <div className="mt-6 flex justify-center">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
