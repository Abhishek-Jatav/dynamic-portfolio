"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2
                size={20}
                style={{ color: "var(--accent)" }}
              />
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                NexaBuild
              </span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Building scalable, modern software with a focus on clean
              architecture and great user experience.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  href: "https://github.com/Abhishek-Jatav/",
                  icon: <Github size={16} />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/abhishek-jatav-067946261/",
                  icon: <Linkedin size={16} />,
                  label: "LinkedIn",
                },
                {
                  href: "mailto:abhishek@example.com",
                  icon: <Mail size={16} />,
                  label: "Email",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-250 hover:-translate-y-0.5"
                  style={{
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-card)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-sm font-semibold mb-5 uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                fontSize: "0.68rem",
              }}
            >
              Navigation
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/project" },
                { name: "About", path: "/about" },
                { name: "Resume", path: "/resume" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="text-sm font-semibold mb-5 uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                fontSize: "0.68rem",
              }}
            >
              Let's Connect
            </h3>

            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to full-time opportunities, freelance projects, and
              interesting collaborations.
            </p>

            <a
              href="mailto:abhishek@example.com"
              className="btn-primary inline-block text-sm"
            >
              Get In Touch →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t text-center py-5 text-xs"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        © {year} Abhishek Jatav · Built with Next.js &amp; ❤️
      </div>
    </footer>
  );
}
