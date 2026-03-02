"use client";

import toast from "react-hot-toast";
import { Download } from "lucide-react";
import { getResumeUrl } from "../../lib/api/resume/resume.api";

export default function PremiumResume() {
  const handleDownload = async () => {
    let resumeUrl: string;

    try {
      resumeUrl = getResumeUrl();
    } catch (error) {
      toast.error("Resume URL not configured.");
      return;
    }

    toast.success("Preparing your resume...");

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Abhishek_Jatav_Resume.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed.");
    }
  };

  return (
    <div className="w-full space-y-14">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Abhishek Jatav</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Full Stack Developer • AI Enthusiast • Problem Solver
          </p>
          <p className="text-sm mt-3 text-neutral-500">
            (+91) 8285127250 • abhidel44@gmail.com
          </p>
          <p className="text-sm text-neutral-500">
            Delhi Technological University (2022–2026)
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* ================= EDUCATION ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>

        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          <div>
            <p className="font-semibold">B.Tech – Mechanical Engineering</p>
            <p>Delhi Technological University, Delhi (2022 – 2026)</p>
          </div>

          <div>
            <p className="font-semibold">CBSE – Class XII</p>
            <p>SBBM Govt., Delhi (2021) – 84.4%</p>
          </div>

          <div>
            <p className="font-semibold">CBSE – Class X</p>
            <p>SBBM Govt., Delhi (2019) – 79%</p>
          </div>
        </div>
      </section>

      {/* ================= WORK EXPERIENCE ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold">
              Web Developer Intern – PeakForce Reality
            </h3>
            <p className="text-sm text-neutral-500">
              June 2025 – July 2025 | Delhi, India
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>
                Built and optimized 12+ responsive web pages using React.js,
                Next.js, and TypeScript.
              </li>
              <li>
                Integrated 5+ RESTful APIs reducing page load time by 30%.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">
              Frontend Developer Intern – PeakForce Reality
            </h3>
            <p className="text-sm text-neutral-500">
              June 2024 – July 2024 | Delhi, India
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>Developed 20+ reusable UI components using HTML, CSS, JS.</li>
              <li>Improved performance by 18% (PageSpeed Insights).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
          <div>
            <p className="font-semibold">
              NexaBuild – Full-Stack Developer Portfolio
            </p>
            <p>
              Built production-ready platform with JWT auth, admin panel, GitHub
              & LeetCode stats integration.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              JustBlink – AI Vision Document Control
            </p>
            <p>
              Built AI-powered blink-based document control using MediaPipe,
              WebSockets & FastAPI.
            </p>
          </div>

          <div>
            <p className="font-semibold">Cab Booking System (Freelance)</p>
            <p>
              Developed real-time booking system with dashboards and analytics.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>

        <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
          <p>
            <span className="font-semibold">Frontend:</span> Next.js, React,
            TypeScript, Tailwind CSS, Responsive UI
          </p>
          <p>
            <span className="font-semibold">Backend:</span> Node.js, NestJS,
            Express, FastAPI, MongoDB, Firebase, REST APIs, JWT, WebSockets
          </p>
          <p>
            <span className="font-semibold">Machine Learning:</span> Python,
            MediaPipe, Pandas, NumPy, scikit-learn
          </p>
          <p>
            <span className="font-semibold">Soft Skills:</span> Problem Solving
            (250+ DSA), System Design, Debugging, Agile Collaboration
          </p>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Achievements & Activities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Event Manager – ASHRAE DTU (Organized 3+ workshops, 250+
            participants)
          </li>
          <li>Hackathon Finalist – Smart India Hackathon 2024</li>
          <li>Completed 100 Days of Code (250+ DSA problems solved)</li>
          <li>Active volunteer in tech fests and community drives</li>
        </ul>
      </section>
    </div>
  );
}
