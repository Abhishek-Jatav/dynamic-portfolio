import React from "react";
import HeroCarousel from "../components/HeroImage/HeroCarousel";
import SubmitContactForm from "../components/contact/SubmitContactForm";
import HomeVideoSection from "../components/videos/HomeVideoSection";
import LeetcodeStats from "../components/leetcode/leetcode";
import GithubStats from "../components/github/GithubStats";
import SocialHandlesColumn from "../components/Handles/SocialHandlesColumn";
import ProjectCarousel from "../components/projects/ProjectCarousel";

export default function Home() {
  const homeYoutubeId = "uOAV3SlY7do";

  return (
    <main className="w-full">
      {/* ✅ Premium Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

      {/* section 1 - HERO */}
      <section className="w-full px-4 sm:px-8 lg:px-16 pt-6 pb-10">
        <div className="relative">
          <HeroCarousel autoPlayDelay={4000} />

          {/* ✅ Always bottom-right inside hero */}
          <div
            className="
              absolute bottom-4 right-4 z-50
              sm:bottom-6 sm:right-6
              lg:bottom-7 lg:right-7
            ">
            <HomeVideoSection youtubeId={homeYoutubeId} />
          </div>
        </div>
      </section>

      {/* section 2 - PROJECTS */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            My Projects
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/60">
            Some of my best work in Full Stack Development 🚀
          </p>
        </div>

        <div className="mt-12">
          <ProjectCarousel />
        </div>
      </section>

      {/* section 3 - HANDLES */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Handles
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            Connect with me across platforms 🌐
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LeetcodeStats />
          <GithubStats />
          <SocialHandlesColumn />
        </div>
      </section>

      {/* section 4 - CONTACT */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 py-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Let’s Work Together
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-400">
            Have a project idea or want to collaborate? Let’s build something
            amazing 🚀
          </p>
        </div>

        <div className="mt-14 max-w-4xl mx-auto">
          <SubmitContactForm />
        </div>
      </section>
    </main>
  );
}
