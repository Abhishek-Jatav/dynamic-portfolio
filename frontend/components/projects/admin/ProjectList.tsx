"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "../../../lib/api/projects/getAllProjects";
import { deleteProject } from "../../../lib/api/projects/deleteProject";
import { updateProject } from "../../../lib/api/projects/updateProject";
import UpdateProjectForm from "./UpdateProjectForm";
import type { Project } from "../../../lib/types/project";
import toast from "react-hot-toast";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted 🗑️");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = await updateProject(project._id, {
        isFeatured: !project.isFeatured,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );

      toast.success(
        updated.isFeatured ? "Marked as Featured ⭐" : "Removed from Featured",
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading)
    return (
      <p className="text-center text-neutral-500 dark:text-neutral-400">
        Loading projects...
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-4">
      {projects.map((project) => {
        const isExpanded = expandedId === project._id;

        return (
          <div
            key={project._id}
            className={`rounded-2xl border transition-all duration-300 
            ${
              isExpanded
                ? "bg-white dark:bg-neutral-900 shadow-xl border-neutral-300 dark:border-neutral-700"
                : "bg-white/70 dark:bg-neutral-900/60 hover:shadow-md border-neutral-200 dark:border-neutral-800"
            }`}>
            {/* HEADER */}
            <button
              onClick={() => toggleExpand(project._id)}
              className="w-full flex items-center justify-between px-5 py-4">
              <h3 className="text-lg font-semibold tracking-tight">
                {project.name}
              </h3>

              <span
                className={`transform transition-transform duration-300 text-xl ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}>
                ⌄
              </span>
            </button>

            {/* CONTENT WRAPPER */}
            <div
              className={`transition-all duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[800px] px-5 pt-2 pb-8" : "max-h-0"
                }`}>
                {editingId !== project._id && (
                  <div className="flex flex-col lg:flex-row justify-between gap-6 mb-2">
                    <div className="flex-1 space-y-3">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>

                      <p className="text-sm text-neutral-400">
                        Start Date: {project.startDate}
                      </p>

                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 items-start">
                      <button
                        onClick={() => setEditingId(project._id)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                        Edit
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition">
                        {project.isFeatured ? "Unfeature" : "Feature"}
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {editingId === project._id && (
                  <div className="mt-4">
                    <UpdateProjectForm
                      project={project}
                      onUpdated={(updatedProject) => {
                        setProjects((prev) =>
                          prev.map((p) =>
                            p._id === updatedProject._id ? updatedProject : p,
                          ),
                        );
                        setEditingId(null);
                      }}
                    />

                    <button
                      onClick={() => setEditingId(null)}
                      className="mt-4 px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {projects.length === 0 && (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          No projects found.
        </p>
      )}
    </div>
  );
}
