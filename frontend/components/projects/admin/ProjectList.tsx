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

  if (loading)
    return (
      <p className="text-center text-neutral-500 dark:text-neutral-400">
        Loading projects...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-lg border dark:border-neutral-800 transition hover:shadow-xl">
          {editingId !== project._id && (
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
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

              <div className="flex flex-wrap gap-2">
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
            <div className="mt-6">
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
      ))}

      {projects.length === 0 && (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          No projects found.
        </p>
      )}
    </div>
  );
}
