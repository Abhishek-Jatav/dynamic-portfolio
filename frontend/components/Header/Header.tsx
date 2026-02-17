"use client";

import Navbar from "../common/Navbar/Navbar";
import ThemeToggle from "../common/Toggle/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full px-6 sm:px-10 lg:px-16 py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Name */}
        <div>
          <h1 className="text-md sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Abhishek Jatav
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Full Stack Developer
          </p>
        </div>

        <ThemeToggle />
      </div>

      {/* Navbar */}
      <div className="mt-6 flex justify-center">
        <Navbar />
      </div>
    </header>
  );
}
