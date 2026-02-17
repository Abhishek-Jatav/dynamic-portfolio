"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        w-full md:w-[500px]
        h-auto md:h-[40px]
        flex flex-col md:flex-row
        items-center
        justify-center md:justify-around
        gap-2 md:gap-0
        rounded-[10px]
        bg-black
        p-2 md:p-0
      ">
      {/* Home */}
      <Link
        href="/"
        className="w-20 md:w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:-translate-y-[3px]">
        <p>Home</p>
      </Link>

      {/* About */}
      <Link
        href="/about"
        className="w-20 md:w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:-translate-y-[3px]">
        <p>About</p>
      </Link>

      {/* Projects */}
      <Link
        href="/project"
        className="w-20 md:w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:-translate-y-[3px]">
        <p>Project</p>
      </Link>

      {/* Resume */}
      <Link
        href="/resume"
        className="w-20 md:w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:-translate-y-[3px]">
        <p>Resume</p>
      </Link>
    </nav>
  );
}
