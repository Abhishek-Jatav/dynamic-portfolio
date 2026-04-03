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
            Full Stack Developer • AI Engineer • Computer Vision Enthusiast
          </p>
          <p className="text-sm mt-3 text-neutral-500">
            (+91) 8285127250 • abhidel44@gmail.com
          </p>
          <p className="text-sm text-neutral-500">Delhi, India</p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* ================= SUMMARY ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          Full Stack & AI Engineer building low-latency, real-time systems using
          Next.js, FastAPI, and computer vision. Strong experience in scalable
          API design, WebSocket pipelines, and end-to-end product deployment.
        </p>
      </section>

      {/* ================= SKILLS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>

        <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
          <p>
            Next.js, React.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript
          </p>
          <p>
            FastAPI, Node.js, NestJS, Express.js, REST APIs, WebSockets, JWT
          </p>
          <p>MongoDB, Firebase (Realtime DB, Firestore)</p>
          <p>
            Python, MediaPipe, OpenCV, NumPy, Pandas, Computer Vision, EAR
            Algorithm
          </p>
          <p>Git, GitHub, Vercel, Postman, Agile/Scrum</p>
          <p>System Design, Microservices, Real-time Systems, API Design</p>
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
              Jun 2025 – Jul 2025 | Delhi
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>
                Built and optimized 12+ responsive web applications using
                Next.js, React, and TypeScript with strong performance and
                accessibility.
              </li>
              <li>
                Integrated 5+ third-party APIs reducing load time by 30% and
                contributed to Agile development, debugging, and code reviews.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">
              Frontend Developer Intern – PeakForce Reality
            </h3>
            <p className="text-sm text-neutral-500">
              Jun 2024 – Jul 2024 | Delhi
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>
                Developed 20+ reusable UI components improving scalability and
                design consistency.
              </li>
              <li>
                Improved performance by 18% via lazy loading, code splitting,
                and optimization.
              </li>
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
              JustBlink – AI Vision Document Control
            </p>
            <p>
              Built real-time hands-free document navigation using MediaPipe,
              EAR algorithm, and WebSockets with sub-100ms latency.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              NexaBuild – Full-Stack Portfolio Platform
            </p>
            <p>
              Developed full-stack CMS with JWT authentication, admin panel,
              REST APIs, and scalable architecture using NestJS and MongoDB.
            </p>
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>

        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          <div>
            <p className="font-semibold">B.Tech – Mechanical Engineering</p>
            <p>Delhi Technological University (2022 – 2026)</p>
            <p className="text-sm text-neutral-500">CGPA: 6.2</p>
          </div>

          <div>
            <p className="font-semibold">CBSE Class XII</p>
            <p>2021 – 84.4%</p>
          </div>
        </div>
      </section>

      {/* ================= EXTRA ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Extra Curricular & Activities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Built and deployed multiple production-grade applications including
            AI systems and real-time platforms.
          </li>
          <li>
            Active learner exploring LLM APIs, AI apps, and modern system
            design.
          </li>
        </ul>
      </section>
    </div>
  );
}
