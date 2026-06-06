"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import LeetcodeStats from "../leetcode/leetcode";
import GithubStats from "../github/GithubStats";
import SocialHandlesColumn from "../Handles/SocialHandlesColumn";

const skills = [
  { cat: "Frontend", icon: "⚛️", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { cat: "Backend", icon: "🔐", items: ["Node.js", "NestJS", "FastAPI", "REST APIs"] },
  { cat: "Database", icon: "🗄️", items: ["MongoDB", "PostgreSQL", "Redis"] },
  { cat: "Languages", icon: "💻", items: ["TypeScript", "Python", "C++", "JavaScript"] },
  { cat: "DSA & Systems", icon: "🧩", items: ["LeetCode 250+", "Data Structures", "Algorithms", "OOP"] },
  { cat: "Tools & AI", icon: "🚀", items: ["Git", "Docker", "MediaPipe", "OpenCV"] },
];

export default function AboutSection() {
  useEffect(() => {
    toast.success("Welcome to my journey ✨");
  }, []);

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 bg-dot-grid pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label animate-fade-up" style={{ animationFillMode: "both" }}>
            / About Me
          </span>
          <h1
            className="mt-4 text-4xl sm:text-6xl font-bold animate-fade-up"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              animationDelay: "0.1s",
              animationFillMode: "both",
            }}
          >
            Building software
            <br />
            <span className="gradient-text">with intention.</span>
          </h1>
          <p
            className="mt-6 text-base sm:text-lg max-w-2xl leading-relaxed animate-fade-up"
            style={{
              color: "var(--text-secondary)",
              animationDelay: "0.2s",
              animationFillMode: "both",
            }}
          >
            I'm a Full Stack Developer and Mechanical Engineering student at DTU, Delhi.
            Coding, for me, is about solving real problems — thinking clearly, improving consistently,
            and writing systems that last.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16">
          <LeetcodeStats />
          <GithubStats />
          <SocialHandlesColumn />
        </div>

        {/* Philosophy cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Discipline */}
          <div
            className="glass-card rounded-3xl p-8 sm:p-10 stat-card-border-top"
            style={{ background: "var(--bg-card)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">💪</span>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Discipline & Consistency
              </h2>
            </div>

            <div
              className="space-y-4 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Real growth in tech comes from showing up every day — solving problems, strengthening
                fundamentals, and staying curious even when things feel complex.
              </p>
              <p>
                I enjoy diving into system design, improving performance, debugging deeply, and writing
                clean, maintainable code. The journey of refining systems excites me as much as delivering them.
              </p>
              <p>
                My mindset is long-term. No shortcuts — just steady improvement, strong foundations, and
                continuous evolution.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div
            className="glass-card rounded-3xl p-8 sm:p-10 stat-card-border-top"
            style={{ background: "var(--bg-card)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🧠</span>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Technical Strength
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((s) => (
                <div
                  key={s.cat}
                  className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{s.icon}</span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                    >
                      {s.cat}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--accent-glow)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivations banner */}
        <div
          className="glass-card rounded-3xl p-10 sm:p-14 text-center"
          style={{
            background: "var(--bg-card)",
            borderImage: "linear-gradient(135deg, var(--accent), var(--accent-2)) 1",
          }}
        >
          <span className="text-4xl mb-6 block">🌟</span>
          <h3
            className="text-2xl sm:text-3xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Drives Me
          </h3>

          <div
            className="space-y-4 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              I'm motivated by meaningful progress — whether it's improving code quality, learning a new
              concept, or optimizing a system for speed and clarity.
            </p>
            <p>
              My goal is to become a dependable, thoughtful engineer who builds efficient, scalable, and
              impactful solutions. I care deeply about craftsmanship, clarity, and long-term excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
