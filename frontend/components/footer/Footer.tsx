"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gray-200/60 dark:border-white/10 bg-gray-50/70 dark:bg-white/5 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Abhishek Jatav
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
            Full Stack Developer building scalable modern web apps.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Navigation
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Projects", path: "/project" },
              { name: "About", path: "/about" },
              { name: "Resume", path: "/resume" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Let’s Connect
          </h3>

          <div className="flex items-center gap-4 mb-5">
            <a
              href="https://github.com/Abhishek-Jatav/"
              target="_blank"
              className="p-3 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/abhishek-jatav-067946261/"
              target="_blank"
              className="p-3 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:abhishek@example.com"
              className="p-3 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <Mail size={18} />
            </a>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Open for opportunities, freelance work, and collaborations 🚀
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200/60 dark:border-white/10 text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © {year} Abhishek Jatav. All rights reserved.
      </div>
    </footer>
  );
}
