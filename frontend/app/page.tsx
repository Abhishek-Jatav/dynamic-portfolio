import React from "react";
import HeroCarousel from "../components/HeroImage/HeroCarousel";
import ProjectCarousel from "../components/projects/ProjectCarousel";
import SubmitContactForm from "../components/contact/SubmitContactForm";
import HomeVideoSection from "../components/videos/HomeVideoSection";
import LeetcodeStats from "../components/leetcode/leetcode";
import GithubStats from "../components/github/GithubStats";
import SocialHandlesColumn from "../components/Handles/SocialHandlesColumn";

export default function Home() {
  return (
    <>
      {/* section 1 */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-2 relative">
        <HeroCarousel autoPlayDelay={4000} />

        <div className="absolute bottom-4 right-4 z-50">
          <HomeVideoSection />
        </div>
      </section>

      {/* section 2 */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">My Projects</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Some of my best work in Full Stack Development 🚀
          </p>
        </div>

        <div className="mt-10">
          <ProjectCarousel />
        </div>
      </section>

      {/* section 3 handles */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Handles</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Connect with me across platforms 🌐
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <LeetcodeStats />
          <GithubStats />
          <SocialHandlesColumn />
        </div>
      </section>

      {/* section 4 */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact Me</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Have a project idea or want to collaborate? Let’s talk 💬
          </p>
        </div>

        <SubmitContactForm />
      </section>
    </>
  );
}
