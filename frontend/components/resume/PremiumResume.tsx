"use client";

import toast from "react-hot-toast";
import { Download, MapPin, Mail, Phone, ExternalLink, Briefcase, GraduationCap, Code2, Layers, Star } from "lucide-react";
import { getResumeUrl } from "../../lib/api/resume/resume.api";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="space-y-5">
    <div className="flex items-center gap-3">
      <span
        className="text-xs tracking-widest uppercase"
        style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--border-card)" }} />
    </div>
    {children}
  </section>
);

const SkillPill = ({ label }: { label: string }) => (
  <span className="tech-tag">{label}</span>
);

export default function PremiumResume() {
  const handleDownload = async () => {
    let resumeUrl: string;
    try {
      resumeUrl = getResumeUrl();
    } catch {
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
    } catch {
      toast.error("Download failed.");
    }
  };

  return (
    <div className="w-full space-y-14">

      {/* ── HEADER ──────────────────────── */}
      <div
        className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8"
        style={{ background: "var(--bg-card)" }}
      >
        <div>
          <span className="section-label mb-3 block">/ Resume</span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            Abhishek Jatav
          </h1>

          <p className="text-lg mb-4 gradient-text font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Full Stack Developer · AI Engineer · Computer Vision
          </p>

          <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> (+91) 8285127250
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} /> abhidel44@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Delhi, India
            </span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="btn-primary flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* ── SUMMARY ──────────────────────── */}
      <Section label="Professional Summary">
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Full Stack &amp; AI Engineer building low-latency, real-time systems using Next.js,
          FastAPI, and computer vision. Strong experience in scalable API design, WebSocket
          pipelines, and end-to-end product deployment.
        </p>
      </Section>

      {/* ── SKILLS ──────────────────────── */}
      <Section label="Technical Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              category: "Frontend",
              icon: <Layers size={14} />,
              skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
            },
            {
              category: "Backend & APIs",
              icon: <Code2 size={14} />,
              skills: ["FastAPI", "Node.js", "NestJS", "Express.js", "REST APIs", "WebSockets", "JWT"],
            },
            {
              category: "AI & Vision",
              icon: <Star size={14} />,
              skills: ["Python", "MediaPipe", "OpenCV", "NumPy", "Computer Vision", "EAR Algorithm"],
            },
            {
              category: "Databases & Infra",
              icon: <Briefcase size={14} />,
              skills: ["MongoDB", "Firebase", "Git", "Vercel", "Postman"],
            },
          ].map((group) => (
            <div
              key={group.category}
              className="rounded-2xl p-5"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
              >
                {group.icon}
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <SkillPill key={s} label={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EXPERIENCE ──────────────────────── */}
      <Section label="Work Experience">
        <div className="space-y-6">
          {[
            {
              role: "Web Developer Intern",
              company: "PeakForce Reality",
              duration: "Jun 2025 – Jul 2025",
              location: "Delhi",
              points: [
                "Built and optimized 12+ responsive web applications using Next.js, React, and TypeScript with strong performance and accessibility.",
                "Integrated 5+ third-party APIs reducing load time by 30% and contributed to Agile development, debugging, and code reviews.",
              ],
            },
            {
              role: "Frontend Developer Intern",
              company: "PeakForce Reality",
              duration: "Jun 2024 – Jul 2024",
              location: "Delhi",
              points: [
                "Developed 20+ reusable UI components improving scalability and design consistency.",
                "Improved performance by 18% via lazy loading, code splitting, and optimization.",
              ],
            },
          ].map((exp) => (
            <div
              key={exp.role}
              className="glass-card rounded-2xl p-6 sm:p-7"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  <span>{exp.duration}</span>
                  <span>·</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PROJECTS ──────────────────────── */}
      <Section label="Projects">
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              name: "JustBlink",
              tag: "AI · Computer Vision",
              desc: "Real-time hands-free document navigation using MediaPipe, EAR algorithm, and WebSockets with sub-100ms latency.",
            },
            {
              name: "NexaBuild",
              tag: "Full Stack · CMS",
              desc: "Full-stack portfolio platform with JWT auth, admin panel, REST APIs, and scalable architecture using NestJS and MongoDB.",
            },
          ].map((proj) => (
            <div
              key={proj.name}
              className="glass-card rounded-2xl p-6 stat-card-border-top"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {proj.name}
                </h3>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--accent-glow)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {proj.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {proj.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ──────────────────────── */}
      <Section label="Education">
        <div className="space-y-4">
          {[
            {
              degree: "B.Tech – Mechanical Engineering",
              institution: "Delhi Technological University",
              year: "2022 – 2026",
              score: "CGPA: 6.2",
            },
            {
              degree: "CBSE Class XII",
              institution: "Senior Secondary School",
              year: "2021",
              score: "84.4%",
            },
          ].map((edu) => (
            <div
              key={edu.degree}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl px-6 py-5"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex items-start gap-3">
                <GraduationCap size={18} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                    {edu.degree}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {edu.institution}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {edu.year}
                </p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--accent)" }}>
                  {edu.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EXTRA ──────────────────────── */}
      <Section label="Extra Curricular">
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-glass)", border: "1px solid var(--border-subtle)" }}
        >
          <ul className="space-y-3">
            {[
              "Built and deployed multiple production-grade applications including AI systems and real-time platforms.",
              "Active learner exploring LLM APIs, AI applications, and modern system design patterns.",
              "250+ LeetCode problems solved with a 4-star HackerRank rating in algorithms and data structures.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
