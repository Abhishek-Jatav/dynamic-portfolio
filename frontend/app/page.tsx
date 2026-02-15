import React from "react";
import Navbar from "../components/common/Navbar/Navbar";
import ThemeToggle from "../components/common/Toggle/ThemeToggle";
import HeroCarousel from "../components/HeroImage/HeroCarousel";
import ProjectCarousel from "../components/projects/ProjectCarousel";
import SubmitContactForm from "../components/contact/SubmitContactForm";
import HomeVideoSection from "../components/videos/HomeVideoSection";
import Footer from "../components/footer/Footer";
import LeetcodeStats from "../components/leetcode/leetcode";
import GithubStats from "../components/github/GithubStats";
import SocialHandlesColumn from "../components/Handles/SocialHandlesColumn";

export default function Home() {
  return (
    <main>
      {/* section 1: Header */}
      <section className="w-full p-6">
        <div className="flex items-center justify-between">
          <div>Logo</div>
          <ThemeToggle />
        </div>

        <div className="mt-3 flex justify-center md:mt-0 md:-translate-y-10">
          <Navbar />
        </div>
      </section>

      {/* section 2 */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-2 relative">
        <HeroCarousel autoPlayDelay={4000} />

        <div className="absolute bottom-4 right-4 z-50">
          <HomeVideoSection />
        </div>
      </section>

      {/* section 4 */}
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

      {/* section 5 handles */}
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

      {/* section 6: contact FULL WIDTH */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <div className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Contact Me</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Have a project idea or want to collaborate? Let’s talk 💬
            </p>
          </div>

          <div className="w-full">
            <SubmitContactForm />
          </div>
        </div>
      </section>

      {/* section 7 */}
      <Footer />
    </main>
  );
}
