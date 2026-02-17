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
      <section className="w-full px-4 sm:px-8 lg:px-16 py-6 relative">
        <HeroCarousel autoPlayDelay={4000} />

        <div className="absolute bottom-6 right-6 z-50">
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
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Handles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Connect with me across platforms 🌐
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LeetcodeStats />
          <GithubStats />
          <SocialHandlesColumn />
        </div>
      </section>

      {/* section 4 */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Contact Me
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Have a project idea or want to collaborate? Let’s talk 💬
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <SubmitContactForm />
        </div>
      </section>
    </>
  );
}
