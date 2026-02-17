"use client";

import Navbar from "../common/Navbar/Navbar";
import ThemeToggle from "../common/Toggle/ThemeToggle";

export default function Header() {
  return (
    <section className="w-full p-6">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Logo</div>
        <ThemeToggle />
      </div>

      {/* Navbar Centered */}
      <div className="mt-3 flex justify-center md:mt-0 md:-translate-y-10">
        <Navbar />
      </div>
    </section>
  );
}
