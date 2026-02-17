"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getAllProjects } from "@/lib/api/projects/getAllProjects";
import type { Project } from "@/lib/types/project";

/* ======================
   Small UI Components
====================== */

const ProjectButtons = ({ links }: { links?: string[] }) => {
  const live = links?.[0];
  const repo = links?.[1];

  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition">
          🚀 Live
        </a>
      )}

      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          💻 Repo
        </a>
      )}
    </div>
  );
};

const ProjectDescription = ({ description }: { description?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
        {open ? "Hide Description ▲" : "Show Description ▼"}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 mt-3" : "max-h-0"
        }`}>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description || "No description available."}
        </p>
      </div>
    </div>
  );
};

const FolderStructure = ({ folders }: { folders?: Project["folders"] }) => {
  if (!folders?.length) {
    return (
      <p className="text-sm text-gray-500 mt-6">
        No folder structure available.
      </p>
    );
  }

  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border dark:border-gray-800">
      <p className="text-sm font-semibold mb-3">📂 Project Structure</p>

      <div className="space-y-2 text-sm">
        {folders.map((folder, i) => (
          <div key={i}>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              📁 {folder.name}
            </p>

            {folder.files?.map((file, idx) => (
              <p key={idx} className="pl-5 text-gray-600 dark:text-gray-400">
                📄 {file.name}
              </p>
            ))}

            {folder.subFolders?.map((sub, sIdx) => (
              <div key={sIdx} className="pl-5">
                <p className="font-medium">📂 {sub.name}</p>

                {sub.files?.map((f, fi) => (
                  <p key={fi} className="pl-5 text-gray-600 dark:text-gray-400">
                    📄 {f.name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ======================
   MAIN CAROUSEL
====================== */

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const total = projects.length;

  const activeProject = useMemo(() => {
    if (!projects.length) return null;
    return projects[activeIndex];
  }, [projects, activeIndex]);

  function goPrev() {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }

  function goNext() {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }

  function formatDate(date?: string) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  }

  if (loading)
    return (
      <div className="p-10 text-center">
        <div className="animate-pulse text-gray-500">Loading Projects...</div>
      </div>
    );

  if (!activeProject)
    return <div className="p-10 text-center">No Projects Found</div>;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="relative bg-white/70 dark:bg-black/40 backdrop-blur-lg border dark:border-gray-800 rounded-3xl shadow-xl p-6 sm:p-10 transition-all duration-500">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {activeProject.name}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          📅 Started on {formatDate(activeProject.startDate)}
        </p>

        <ProjectButtons links={activeProject.links} />

        <ProjectDescription description={activeProject.description} />

        <FolderStructure folders={activeProject.folders} />

        {/* Navigation Bottom Right */}
        <div className="absolute bottom-5 right-6 flex items-center gap-3">
          <button
            onClick={goPrev}
            className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition shadow">
            ← Prev
          </button>

          <button
            onClick={goNext}
            className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition shadow">
           Next →
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-6 text-xs text-gray-400">
          {activeIndex + 1} / {total}
        </div>
      </div>
    </div>
  );
}
