"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import LeetcodeStats from "../leetcode/leetcode";
import GithubStats from "../github/GithubStats";
import SocialHandlesColumn from "../Handles/SocialHandlesColumn";

export default function AboutSection() {
  useEffect(() => {
    toast.success("Welcome to my journey ✨");
  }, []);

  return (
    <section
      className="relative py-20 sm:py-24 px-6 sm:px-10 lg:px-16 
      bg-gradient-to-br 
      from-white via-neutral-100 to-white 
      dark:from-black dark:via-neutral-900 dark:to-black
      text-neutral-900 dark:text-white 
      transition-colors duration-500 overflow-hidden">
      {/* Soft Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-600/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/20 blur-3xl rounded-full -z-10"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            👋 About Me
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            I genuinely enjoy building with technology 💻. For me, coding is not
            just about writing functions — it’s about solving real problems,
            thinking clearly, and improving consistently.
          </p>
        </div>

        {/* HANDLES */}
              <section className="w-full px-4 sm:px-8 lg:px-16 py-16">
                <div className="max-w-6xl mx-auto">
                  <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-10 items-stretch">
                    <LeetcodeStats />
                    <GithubStats />
                    <SocialHandlesColumn />
                  </div>
                </div>
              </section>
        

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Dedication Card */}
          <div
            className="bg-white/70 dark:bg-white/5 
            backdrop-blur-xl 
            border border-neutral-200 dark:border-white/10 
            rounded-3xl p-8 sm:p-10 
            shadow-xl 
            hover:scale-[1.03] transition-all duration-500">
            <h2 className="text-2xl font-semibold mb-5">
              💪 Discipline & Consistency
            </h2>

            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I believe real growth in tech comes from showing up every single
              day 📈. Solving problems, strengthening fundamentals, and staying
              curious — even when things feel complex or uncomfortable.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              I enjoy diving into system design 🏗️, improving performance ⚡,
              debugging deeply, and writing clean, maintainable code. The
              journey of refining systems excites me as much as delivering them.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              My mindset is long-term. No shortcuts — just steady improvement,
              strong foundations, and continuous evolution.
            </p>
          </div>

          {/* Skills Card */}
          <div
            className="bg-white/70 dark:bg-white/5 
            backdrop-blur-xl 
            border border-neutral-200 dark:border-white/10 
            rounded-3xl p-8 sm:p-10 
            shadow-xl 
            hover:scale-[1.03] transition-all duration-500">
            <h2 className="text-2xl font-semibold mb-5">
              🧠 Technical Strength
            </h2>

            <ul className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ⚛️ Frontend Engineering:
                </span>{" "}
                Crafting scalable, responsive interfaces with structured
                component architecture.
              </li>

              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  🔐 Backend & APIs:
                </span>{" "}
                Designing secure authentication flows and reliable server-side
                logic.
              </li>

              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  🗄️ Databases & Performance:
                </span>{" "}
                Writing optimized queries and building systems that scale
                smoothly.
              </li>

              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  🧩 Problem Solving:
                </span>{" "}
                Strong analytical thinking and structured approach to complex
                challenges.
              </li>

              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  🚀 Continuous Learning:
                </span>{" "}
                Exploring AI, system design, and emerging technologies to keep
                evolving.
              </li>
            </ul>
          </div>
        </div>

        {/* Closing Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div
            className="bg-gradient-to-r 
            from-purple-500/10 to-blue-500/10 
            dark:from-purple-600/20 dark:to-blue-600/20 
            border border-neutral-200 dark:border-white/10 
            rounded-3xl p-8 sm:p-12 
            backdrop-blur-xl shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
              🌟 What Drives Me
            </h3>

            <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
              I am motivated by meaningful progress. Whether it’s improving code
              quality ✨, learning a new concept 📚, or optimizing a system ⚙️ —
              I take pride in steady, measurable growth.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg mt-6">
              My goal is to become a dependable, thoughtful engineer who builds
              efficient, scalable, and impactful solutions. I care deeply about
              craftsmanship, clarity, and long-term excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
