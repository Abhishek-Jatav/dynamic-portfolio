"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import ProjectCarousel from "@/components/projects/ProjectCarousel";

export default function ProjectsPage() {
  useEffect(() => {
    toast.success("Welcome to my engineering space 🚀");
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-glow), transparent)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent)" }}
      />

      {/* Hero section */}
      <section className="py-16 sm:py-20 max-w-3xl">
        <span className="section-label animate-fade-up" style={{ animationFillMode: "both" }}>
          / Selected Work
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
          My Work &amp;
          <br />
          <span className="gradient-text">Engineering Journey</span>
        </h1>

        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl animate-fade-up"
          style={{
            color: "var(--text-secondary)",
            animationDelay: "0.2s",
            animationFillMode: "both",
          }}
        >
          Every project reflects discipline, curiosity, and genuine passion for
          technology. Not just making things work — making them scalable,
          reliable, and thoughtfully designed.
        </p>
      </section>

      {/* Carousel */}
      <section className="pb-16 sm:pb-20">
        <ProjectCarousel />
      </section>

      {/* Closing section */}
      <section className="pb-20">
        <div
          className="glass-card rounded-3xl p-10 sm:p-14"
          style={{ background: "var(--bg-card)" }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold mb-8 gradient-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What These Projects Represent
          </h2>

          <div
            className="space-y-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              Each project is a milestone — pushing me to think deeper about system design,
              performance optimization, and writing clean, maintainable code.
            </p>
            <p>
              I invest time understanding the "why" behind every decision. Whether it's
              refining user experience or strengthening backend logic, I focus on the details
              that elevate quality.
            </p>
            <p>
              Driven by consistency, resilience, and a deep love for building meaningful
              digital experiences — committed to growing into a dependable engineer, one
              improvement at a time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
