"use client";

import type { Project } from "../../lib/types/project";
import ProjectStructureTree from "./ProjectStructureTree";
import { useState, useEffect } from "react";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const [showStructure, setShowStructure] = useState(false);

  // Responsive folder behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Tailwind lg breakpoint
        setShowStructure(true);
      } else {
        setShowStructure(false);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* ================= Section 1 ================= */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h2>

            {project.isFeatured && (
              <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-neutral-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ================= Section 2 ================= */}
        <div className="flex-1">
          {/* Links */}
          <div className="flex gap-6 text-sm font-medium">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                Live
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline">
                Repo
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline">
                Demo
              </a>
            )}
          </div>

          {/* Folder Structure */}
          {project.folderStructure?.length > 0 && (
            <div className="mt-6">
              {/* Hide toggle button on large screens */}
              <button
                onClick={() => setShowStructure(!showStructure)}
                className="text-sm font-medium text-indigo-600 hover:underline lg:hidden">
                {showStructure ? "Hide Structure" : "View Project Structure"}
              </button>

              {showStructure && (
                <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 max-h-64 overflow-auto">
                  <ProjectStructureTree folders={project.folderStructure} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
