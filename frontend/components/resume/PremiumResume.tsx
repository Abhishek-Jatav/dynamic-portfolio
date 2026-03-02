"use client";

import toast from "react-hot-toast";
import { Download } from "lucide-react";
import { getResumeUrl } from "../../lib/api/resume/resume.api"; // ✅ import helper

export default function PremiumResume() {
  const handleDownload = async () => {
    let resumeUrl: string;

    try {
      resumeUrl = getResumeUrl(); // ✅ get URL from helper
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-black py-16 px-6">
      {/* ===== HEADER BAR ===== */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Resume
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Full Stack Developer • AI Enthusiast • Problem Solver
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-7 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* ===== REST OF YOUR COMPONENT (UNCHANGED) ===== */}
    </div>
  );
}
