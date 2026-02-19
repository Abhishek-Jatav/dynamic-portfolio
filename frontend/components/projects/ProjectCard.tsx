"use client";

import type { Project } from "@/lib/types/project";
import ProjectStructureTree from "./ProjectStructureTree";
import { useState } from "react";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div
      className="w-full 
                max-w-[95%] 
                sm:max-w-[85%] 
                md:max-w-[75%] 
                lg:max-w-[65%] 
                xl:max-w-[55%] 
                mx-auto transition-all duration-300">
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

      {/* Links */}
      <div className="mt-6 flex gap-6 text-sm font-medium">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            className="text-blue-600 hover:underline">
            Live
          </a>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            className="text-green-600 hover:underline">
            Repo
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            className="text-purple-600 hover:underline">
            Demo
          </a>
        )}
      </div>

      {/* Folder Toggle */}
      {project.folderStructure?.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="text-sm font-medium text-indigo-600 hover:underline">
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
  );
}
