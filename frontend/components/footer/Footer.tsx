"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Abhishek Jatav
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Full Stack Developer building scalable web applications with modern
            technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-gray-900 dark:hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="hover:text-gray-900 dark:hover:text-white transition">
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="hover:text-gray-900 dark:hover:text-white transition">
                Resume
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Connect With Me
          </h3>

          <div className="flex space-x-4 mb-4">
            <a
              href="https://github.com/Abhishek-Jatav/"
              target="_blank"
              className="hover:text-gray-900 dark:hover:text-white transition">
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/abhishek-jatav-067946261/"
              target="_blank"
              className="hover:text-gray-900 dark:hover:text-white transition">
              <Linkedin size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Let’s build something amazing together 🚀
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © {year} Abhishek Jatav All rights reserved.
      </div>
    </footer>
  );
}
