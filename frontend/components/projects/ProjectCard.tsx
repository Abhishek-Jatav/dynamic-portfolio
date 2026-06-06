"use client";

import type { Project } from "../../lib/types/project";
import ProjectStructureTree from "./ProjectStructureTree";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import YoutubeModalWrapper from "../youtube/YoutubeModalWrapper";
import { ExternalLink, Github, Play, Star, Calendar, FolderTree, ChevronDown } from "lucide-react";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const [showStructure, setShowStructure] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setShowStructure(isDesktop);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 lg:min-h-[640px]">

        {/* ── LEFT PANEL ────────────────── */}
        <div
          className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden"
          style={{ background: "var(--bg-card)" }}
        >
          {/* Card header bar */}
          <div
            className="flex items-center justify-between px-7 py-5"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div className="flex items-center gap-3">
              {project.isFeatured && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    color: "white",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <Star size={10} fill="white" />
                  Featured
                </span>
              )}
              <span
                className="flex items-center gap-1.5 text-[11px]"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                <Calendar size={11} />
                {new Date(project.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Window dots */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-7 overflow-auto">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {project.name}
            </h2>

            <div
              className="prose prose-sm max-w-none leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>

            {/* Tech stack */}
            {project.techStack.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ────────────────── */}
        <div
          className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden"
          style={{
            background: "var(--bg-card)",
            minWidth: 0,
          }}
        >
          {/* Links header */}
          <div
            className="flex items-center gap-3 px-7 py-5"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--accent-glow)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                }}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-glass)",
                  border: "1px solid var(--border-card)",
                  color: "var(--text-secondary)",
                }}
              >
                <Github size={12} />
                Repository
              </a>
            )}
            {project.demoLink && (
              <YoutubeModalWrapper videoUrl={project.demoLink}>
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                >
                  <Play size={12} fill="#f87171" />
                  Watch Demo
                </span>
              </YoutubeModalWrapper>
            )}
          </div>

          {/* Folder structure */}
          <div className="flex-1 p-7 flex flex-col overflow-auto">
            {project.folderStructure.length > 0 ? (
              <>
                <button
                  onClick={() => setShowStructure(!showStructure)}
                  className="lg:hidden flex items-center gap-2 text-sm font-semibold mb-4 transition-colors duration-200"
                  style={{ color: "var(--accent)" }}
                >
                  <FolderTree size={14} />
                  {showStructure ? "Hide Structure" : "View Project Structure"}
                  <ChevronDown
                    size={14}
                    style={{
                      transform: showStructure ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>

                {/* Desktop always shows label */}
                <div
                  className="hidden lg:flex items-center gap-2 text-xs mb-4"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <FolderTree size={12} />
                  Project Structure
                </div>

                {showStructure && (
                  <div
                    className="flex-1 overflow-auto rounded-2xl p-5 text-xs"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-subtle)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <ProjectStructureTree folders={project.folderStructure} />
                  </div>
                )}
              </>
            ) : (
              <div
                className="flex-1 flex items-center justify-center"
                style={{ color: "var(--text-muted)" }}
              >
                <p className="text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                  No folder structure available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
