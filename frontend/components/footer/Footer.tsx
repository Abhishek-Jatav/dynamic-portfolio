"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Abhishek.dev</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Full Stack Developer building scalable web applications with modern
            technologies like Next.js, NestJS, and MongoDB.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Me
          </h3>

          <div className="flex space-x-4 mb-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              className="hover:text-white transition">
              <Github size={20} />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              className="hover:text-white transition">
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:yourmail@gmail.com"
              className="hover:text-white transition">
              <Mail size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-400">
            Let’s build something amazing together 🚀
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {year} Abhishek.dev. All rights reserved.
      </div>
    </footer>
  );
}
