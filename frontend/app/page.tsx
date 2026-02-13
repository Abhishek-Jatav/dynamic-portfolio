import React from "react";
import Navbar from "../components/common/Navbar/Navbar";
import ThemeToggle from "../components/common/Toggle/ThemeToggle";
import HeroCarousel from "@/components/HeroImage/HeroCarousel";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import LeetcodeStats from "../components/Leetcode/Leetcode";
import GithubStats from "../components/Github/GithubStats";
import LinkedInButton from "@/components/Handles/LinkedIn";
import InstagramButton from "@/components/Handles/Instagram";
import SubmitContactForm from "@/components/contact/SubmitContactForm";
import HomeVideoSection from "@/components/videos/HomeVideoSection";
import Footer from "../components/footer/Footer";

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

      {/* section 2: hero images */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-2">
        <HeroCarousel autoPlayDelay={4000} />
      </section>

      {/* section 2.1: video */}
      <HomeVideoSection />

      {/* section 3: projects */}
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

      {/* section 4: handles */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Handles</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Connect with me across platforms 🌐
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LeetcodeStats />
          <GithubStats />
          <LinkedInButton />
          <InstagramButton />
        </div>
      </section>

      {/* section 5: contact */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
        <SubmitContactForm />
      </section>

      {/* section 6: footer */}
      <Footer />
    </main>
  );
}
