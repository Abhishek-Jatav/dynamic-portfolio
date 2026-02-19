"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/project" },
  { name: "Resume", path: "/resume" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-[520px]">
      <div
        className="
          flex items-center justify-between
          gap-2
          rounded-2xl
          border border-gray-200/60 dark:border-white/10
          bg-white/70 dark:bg-white/5
          backdrop-blur-xl
          shadow-sm
          px-2 py-2
        ">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`
                flex-1 text-center
                px-3 py-2
                rounded-xl
                text-sm font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-900 text-white shadow-md dark:bg-white dark:text-black"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                }
              `}>
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
