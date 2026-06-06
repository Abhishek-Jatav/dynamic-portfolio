import React from "react";
import HeroCarousel from "../components/HeroImage/HeroCarousel";
import SubmitContactForm from "../components/contact/SubmitContactForm";
import HomeVideoSection from "../components/videos/HomeVideoSection";
import LeetcodeStats from "../components/leetcode/leetcode";
import GithubStats from "../components/github/GithubStats";
import SocialHandlesColumn from "../components/Handles/SocialHandlesColumn";
import ProjectCarousel from "../components/projects/ProjectCarousel";
import { getIntroductionVideoUrl } from "../lib/api/introductionVideo/introductionVideo.api";

export default function Home() {
  const introductionVideoUrl = getIntroductionVideoUrl();

  return (
    <main className="w-full">
      {/* ── HERO ─────────────────────────────────── */}
      <section className="w-full pt-4 pb-16">
        {/* Eyebrow label */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="section-label animate-fade-up"
            style={{ opacity: 0 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full animate-fade-up"
              style={{
                background: "var(--accent-glow)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                animationDelay: "0.1s",
                animationFillMode: "both",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Available for Hire
            </span>
          </div>
        </div>

        <div className="relative">
          <HeroCarousel autoPlayDelay={4000} />
          {/* Video bubble */}
          <div className="absolute bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 lg:bottom-7 lg:right-7">
            <HomeVideoSection youtubeUrl={introductionVideoUrl} />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────── */}
      <section className="w-full py-20 sm:py-24">
        <div className="mb-12">
          <span
            className="section-label animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            / Selected Work
          </span>
          <h2
            className="mt-3 text-3xl sm:text-5xl font-bold animate-fade-up"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              animationDelay: "0.2s",
              animationFillMode: "both",
            }}
          >
            My Projects
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-lg animate-fade-up"
            style={{
              color: "var(--text-secondary)",
              animationDelay: "0.3s",
              animationFillMode: "both",
            }}
          >
            Full stack work spanning AI, web apps, and everything in between.
          </p>
        </div>

        <div className="mt-8">
          <ProjectCarousel />
        </div>
      </section>

      {/* ── PLATFORMS ────────────────────────────── */}
      <section className="w-full py-20 sm:py-24">
        <div className="mb-12">
          <span className="section-label">/ Online Presence</span>
          <h2
            className="mt-3 text-3xl sm:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Platforms
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Where I sharpen my craft, share my work, and connect.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <LeetcodeStats />
          <GithubStats />
          <SocialHandlesColumn />
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────── */}
      <section
        className="relative w-full py-24 overflow-hidden rounded-3xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--accent-glow), transparent)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent)",
            opacity: 0.5,
          }}
        />

        <div className="relative px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="section-label">/ Contact</span>
            <h2
              className="mt-4 text-3xl sm:text-5xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let's Work Together
            </h2>
            <p
              className="mt-5 text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Have a project idea or want to collaborate? I'd love to hear from
              you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SubmitContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
