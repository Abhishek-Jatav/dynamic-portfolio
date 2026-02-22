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
      className="relative min-h-screen 
      bg-gradient-to-br 
      from-white via-neutral-100 to-white 
      dark:from-black dark:via-neutral-900 dark:to-black
      text-neutral-900 dark:text-white 
      transition-colors duration-500 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/20 dark:bg-purple-600/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 dark:bg-blue-600/20 blur-3xl rounded-full -z-10"></div>

      {/* HERO SECTION */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
          🚀 My Work & Engineering Journey
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mx-auto">
          Every project I build reflects discipline, curiosity, and a genuine
          passion for technology. 💻✨ I don’t just focus on making things work
          — I focus on making them scalable, reliable, and thoughtfully
          designed.
        </p>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mx-auto mt-6">
          I approach development with structured thinking 🧠, performance
          awareness ⚡, and deep attention to detail. For me, engineering is not
          a task — it’s a craft that I refine every single day.
        </p>
      </section>

      {/* CAROUSEL */}
      <section className="py-16 px-4 sm:px-8 lg:px-12">
        <ProjectCarousel />
      </section>

      {/* CLOSING SECTION */}
      <section className="py-20 px-6 sm:px-10 lg:px-16">
        <div
          className="max-w-4xl mx-auto 
          bg-white/70 dark:bg-white/5 
          backdrop-blur-xl 
          border border-neutral-200 dark:border-white/10 
          rounded-3xl 
          p-8 sm:p-12 
          shadow-xl 
          hover:scale-[1.02] transition-all duration-500">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
            🌟 What These Projects Represent
          </h2>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
            These projects are milestones in my journey — each one pushing me to
            think deeper about system design 🏗️, performance optimization ⚡,
            and writing clean, maintainable code.
          </p>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg mt-6">
            I invest time in understanding the “why” behind every decision.
            Whether it’s refining user experience 🎨 or strengthening backend
            logic 🔐, I focus on the details that elevate overall quality.
          </p>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg mt-6">
            My journey is driven by consistency 📈, resilience 💪, and a deep
            love for building meaningful digital experiences. I’m committed to
            growing into a dependable and thoughtful engineer — one improvement
            at a time.
          </p>
        </div>
      </section>
    </main>
  );
}
