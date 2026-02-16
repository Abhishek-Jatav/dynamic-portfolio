"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getAllProjects } from "@/lib/api/projects/getAllProjects";
import type { Project } from "@/lib/types/project";

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllProjects();
        setProjects(data);

        setActiveIndex(0);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
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
    try {
      return new Date(date).toLocaleString();
    } catch {
      return date;
    }
  }

  if (loading) {
    return (
      <div className="w-full rounded-2xl border p-6 text-center">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-2xl border p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className="w-full rounded-2xl border p-6 text-center">
        No projects found.
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Prev Button */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border bg-white px-4 py-2 shadow-md hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900">
        ◀
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border bg-white px-4 py-2 shadow-md hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900">
        ▶
      </button>

      {/* Project Card */}
      <div className="mx-14 rounded-2xl border p-6 shadow-sm dark:border-gray-800">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold">{activeProject.name}</h3>
            <p className="text-sm text-gray-500">
              Project ID:{" "}
              <span className="font-medium">{activeProject.id}</span>
            </p>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-semibold">Owner:</span>{" "}
              {activeProject.owner || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {activeProject.status || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Start Date:</span>{" "}
              {formatDate(activeProject.startDate)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {activeProject.description || "No description available."}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5">
          <p className="text-sm font-semibold">Tags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeProject.tags?.length ? (
              activeProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-900">
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tags</p>
            )}
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-5">
          <p className="text-sm font-semibold">Team Members</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeProject.teamMembers?.length ? (
              activeProject.teamMembers.map((member, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-900">
                  {member}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No team members</p>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <p className="text-sm font-semibold">
            Progress:{" "}
            <span className="text-gray-600 dark:text-gray-400">
              {typeof activeProject.progress === "number"
                ? `${activeProject.progress}%`
                : "N/A"}
            </span>
          </p>

          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-2 rounded-full bg-black dark:bg-white"
              style={{
                width:
                  typeof activeProject.progress === "number"
                    ? `${activeProject.progress}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* Links */}
        <div className="mt-6">
          <p className="text-sm font-semibold">Links</p>

          <div className="mt-2 flex flex-col gap-2">
            {activeProject.links?.length ? (
              activeProject.links.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm text-blue-600 hover:underline">
                  {link}
                </a>
              ))
            ) : (
              <p className="text-sm text-gray-500">No links</p>
            )}
          </div>
        </div>

        {/* Folders + Files */}
        <div className="mt-7">
          <p className="text-sm font-semibold">Folders</p>

          <div className="mt-3 space-y-4">
            {activeProject.folders?.length ? (
              activeProject.folders.map((folder, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4 dark:border-gray-800">
                  <p className="font-semibold">
                    📁 {folder.name}{" "}
                    <span className="text-xs text-gray-500">
                      ({folder.path})
                    </span>
                  </p>

                  {/* Files */}
                  <div className="mt-3">
                    <p className="text-sm font-medium">Files</p>
                    <div className="mt-2 space-y-1">
                      {folder.files?.length ? (
                        folder.files.map((file, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            📄 {file.name}{" "}
                            <span className="text-xs text-gray-500">
                              ({file.path})
                            </span>
                          </p>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No files</p>
                      )}
                    </div>
                  </div>

                  {/* SubFolders */}
                  <div className="mt-4">
                    <p className="text-sm font-medium">Sub Folders</p>
                    <div className="mt-2 space-y-2">
                      {folder.subFolders?.length ? (
                        folder.subFolders.map((sub, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                            <p className="font-medium">
                              📂 {sub.name}{" "}
                              <span className="text-xs text-gray-500">
                                ({sub.path})
                              </span>
                            </p>

                            {/* Sub folder files */}
                            <div className="mt-2 space-y-1">
                              {sub.files?.length ? (
                                sub.files.map((f, fi) => (
                                  <p
                                    key={fi}
                                    className="text-sm text-gray-600 dark:text-gray-400">
                                    📄 {f.name}{" "}
                                    <span className="text-xs text-gray-500">
                                      ({f.path})
                                    </span>
                                  </p>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No files
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No sub folders</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No folders available</p>
            )}
          </div>
        </div>

        {/* Created/Updated */}
        <div className="mt-7 grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {formatDate(activeProject.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{" "}
            {formatDate(activeProject.updatedAt)}
          </p>
        </div>

        {/* Counter */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {activeIndex + 1} / {total}
        </div>
      </div>
    </div>
  );
}
