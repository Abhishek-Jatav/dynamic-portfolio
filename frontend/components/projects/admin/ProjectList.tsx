"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "../../../lib/api/projects/getAllProjects";
import { deleteProject } from "../../../lib/api/projects/deleteProject";
import { updateProject } from "../../../lib/api/projects/updateProject";
import UpdateProjectForm from "./UpdateProjectForm";

import type { Project } from "../../../lib/types/project";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Fetch All
  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Toggle Featured
  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = await updateProject(project._id, {
        isFeatured: !project.isFeatured,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="border p-5 rounded-lg shadow-sm bg-dark">
          {/* VIEW MODE */}
          {editingId !== project._id && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-400">
                    Start Date: {project.startDate}
                  </p>

                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 px-2 py-1 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setEditingId(project._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded">
                    {project.isFeatured ? "Unfeature" : "Feature"}
                  </button>

                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}

          {/* EDIT MODE */}
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
                className="mt-3 bg-gray-400 text-white px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-gray-500 text-center">No projects found.</p>
      )}
    </div>
  );
}
