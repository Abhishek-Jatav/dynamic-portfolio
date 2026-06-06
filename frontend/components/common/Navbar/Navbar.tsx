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
    <nav>
      <div
        className="flex items-center gap-1 rounded-2xl p-1"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-card)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.path}
              href={link.path}
              className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250"
              style={{
                fontFamily: "var(--font-body)",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#fff" : "var(--text-secondary)",
                boxShadow: isActive ? "0 4px 14px var(--accent-glow)" : "none",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
