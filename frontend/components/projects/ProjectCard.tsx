"use client";

import type { Project } from "../../lib/types/project";
import ProjectStructureTree from "./ProjectStructureTree";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import YoutubeModalWrapper from "../youtube/YoutubeModalWrapper";

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
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:h-[700px]">
        {/* LEFT */}
        <div className="flex-1 flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <div className="p-6 overflow-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.name}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Started: {new Date(project.startDate).toLocaleDateString()}
                </p>
              </div>

              {project.isFeatured && (
                <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                  Featured
                </span>
              )}
            </div>

            <div className="mt-6">
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>

            {project.techStack.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-neutral-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <div className="p-6 flex flex-col h-full">
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
                <YoutubeModalWrapper videoUrl={project.demoLink}>
                  <span className="text-purple-600 hover:underline cursor-pointer">
                    Demo
                  </span>
                </YoutubeModalWrapper>
              )}
            </div>

            {project.folderStructure.length > 0 && (
              <div className="mt-6 flex flex-col flex-1">
                <button
                  onClick={() => setShowStructure(!showStructure)}
                  className="text-sm font-medium text-indigo-600 hover:underline lg:hidden">
                  {showStructure ? "Hide Structure" : "View Project Structure"}
                </button>

                {showStructure && (
                  <div className="mt-4 flex-1 overflow-auto p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <ProjectStructureTree folders={project.folderStructure} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
