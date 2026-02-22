"use client";

import toast from "react-hot-toast";

export default function PremiumResume() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

  const handleDownload = async () => {
    if (!resumeUrl) {
      toast.error("Resume URL not configured.");
      return;
    }

    toast.success("Downloading resume...");

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Abhishek_Resume.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-black py-12 px-4">
      {/* ===== TOP SECTION ===== */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-white">
          My Resume
        </h1>

        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          Download Resume
        </button>
      </div>

      {/* ===== RESUME PAPER (ALWAYS WHITE) ===== */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 sm:p-14 border border-neutral-200 text-[15px] leading-relaxed text-neutral-900">
        {/* HEADER */}
        <div className="text-center border-b border-neutral-300 pb-6 mb-8">
          <h2 className="text-3xl font-bold tracking-wide">ABHISHEK</h2>
          <p className="text-neutral-700 mt-2">
            Full Stack Developer | AI Enthusiast | Problem Solver
          </p>
          <p className="text-sm text-neutral-600 mt-1">
            +91 8285127250 | abhidel44@gmail.com | LinkedIn
          </p>
        </div>

        {/* EDUCATION */}
        <section className="mb-8">
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Education
          </h3>

          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <p className="font-semibold">B.Tech – Mechanical Engineering</p>
              <p className="text-neutral-700">
                Delhi Technological University, Delhi
              </p>
            </div>
            <p className="text-neutral-600">2022 – 2026</p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="mb-8">
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Work Experience
          </h3>

          {/* Experience 1 */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between">
              <p className="font-semibold">
                Web Developer Intern – PeakForce Reality
              </p>
              <p className="text-neutral-600">June 2025 – July 2025</p>
            </div>

            <ul className="list-disc ml-5 mt-2 space-y-2 text-neutral-800">
              <li>
                Built and optimized 12+ responsive web pages using React.js,
                Next.js, and TypeScript following modern component-driven
                architecture.
              </li>
              <li>
                Integrated 5+ REST APIs improving data flow and reducing page
                load time by 30%.
              </li>
              <li>
                Worked in Agile sprint-based workflow and deployed applications
                via Vercel.
              </li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between">
              <p className="font-semibold">
                Frontend Developer Intern – PeakForce Reality
              </p>
              <p className="text-neutral-600">June 2024 – July 2024</p>
            </div>

            <ul className="list-disc ml-5 mt-2 space-y-2 text-neutral-800">
              <li>
                Developed 20+ reusable UI components using HTML, CSS, and
                JavaScript.
              </li>
              <li>
                Improved website performance by 18% using optimization
                strategies.
              </li>
              <li>
                Collaborated in debugging, testing, and responsive UI
                implementation.
              </li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-8">
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Projects
          </h3>

          <div className="mb-5">
            <p className="font-semibold">
              Appointment Booking Platform | Next.js, NestJS, PostgreSQL
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-neutral-800">
              <li>
                Designed and implemented full-stack booking system with
                role-based authentication.
              </li>
              <li>
                Built secure REST APIs and optimized backend logic for
                scalability.
              </li>
              <li>
                Created admin dashboard for real-time analytics and monitoring.
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <p className="font-semibold">
              AutoBill AI – Invoice OCR & Parser | TensorFlow, Pandas
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-neutral-800">
              <li>
                Developed AI-powered invoice parser achieving 91% data
                extraction accuracy.
              </li>
              <li>
                Automated document processing workflow reducing manual effort.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">
              Cab Booking System | Next.js, Firebase
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-neutral-800">
              <li>Built real-time cab booking platform with live tracking.</li>
              <li>
                Implemented authentication and scalable frontend architecture.
              </li>
            </ul>
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Technical Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-800">
            <p>
              <strong>Frontend:</strong> Next.js, React.js, TypeScript, Tailwind
              CSS
            </p>
            <p>
              <strong>Backend:</strong> Node.js, NestJS, Express.js
            </p>
            <p>
              <strong>Databases:</strong> PostgreSQL, Firebase
            </p>
            <p>
              <strong>AI/ML:</strong> Python, Pandas, NumPy, scikit-learn
            </p>
            <p>
              <strong>Tools:</strong> Git, REST APIs, JWT, Vercel
            </p>
            <p>
              <strong>Soft Skills:</strong> 500+ DSA Problems, System Design
              Basics, Agile Collaboration
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
