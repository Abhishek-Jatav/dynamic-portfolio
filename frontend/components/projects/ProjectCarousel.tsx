"use client";

import { useEffect, useMemo, useState } from "react";
import { getProjects } from "@/lib/api/projects/get-all-projects";
import { Project } from "../../lib/types/project";

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data: Project[] = await getProjects();

        // Optional: Sort by createdAt newest first
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setProjects(sorted);
      } catch (err) {
        console.error("Projects Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const currentProject = useMemo(() => {
    if (!projects.length) return null;
    return projects[index];
  }, [projects, index]);

  const handlePrev = () => {
    if (!projects.length) return;
    setIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!projects.length) return;
    setIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[250px] rounded-2xl bg-gray-200 animate-pulse" />
    );
  }

  if (!currentProject) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[200px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
        No projects found
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                   bg-black/70 text-white px-4 py-2 rounded-full 
                   hover:bg-black transition">
        ◀
      </button>

      {/* Project Card */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-md p-6 sm:p-10">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold">{currentProject.name}</h3>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          {currentProject.description}
        </p>

        {/* Tags */}
        {currentProject.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {currentProject.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Status + Progress */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{currentProject.status}</span>
          </p>

          <div className="w-full sm:w-[250px]">
            <p className="text-sm mb-1">
              <span className="font-semibold">Progress:</span>{" "}
              {currentProject.progress}%
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full"
                style={{ width: `${currentProject.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Links */}
        {currentProject.links?.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-sm mb-2">Links:</p>
            <div className="flex flex-col gap-2">
              {currentProject.links.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 hover:underline break-all">
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer Count */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Project {index + 1} of {projects.length}
        </p>
      </div>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                   bg-black/70 text-white px-4 py-2 rounded-full 
                   hover:bg-black transition">
        ▶
      </button>
    </div>
  );
}
