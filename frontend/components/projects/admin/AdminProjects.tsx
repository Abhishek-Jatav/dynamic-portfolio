"use client";

import { useEffect, useState } from "react";

import { getAllProjects } from "@/lib/api/projects/getAllProjects";
import { createProject } from "@/lib/api/projects/createProject";
import { updateProject } from "@/lib/api/projects/updateProject";
import { deleteProject } from "@/lib/api/projects/deleteProject";

import type { Project } from "@/lib/types/project";
import type { CreateProjectDto } from "@/lib/types/project.dto";

import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (data: CreateProjectDto) => {
    if (!token) return alert("Unauthorized");

    try {
      if (editing) {
        await updateProject(editing._id, data, token);
      } else {
        await createProject(data, token);
      }

      setEditing(null);
      loadProjects();
    } catch (err) {
      alert("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return alert("Unauthorized");

    try {
      await deleteProject(id, token);
      loadProjects();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <section className="space-y-12">
      {/* FORM */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 p-8 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6">
          {editing ? "Edit Project" : "Create New Project"}
        </h3>

        <ProjectForm onSubmit={handleSubmit} initial={editing || undefined} />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6">All Projects</h3>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400">No projects found.</p>
        ) : (
          <ProjectTable
            projects={projects}
            loading={loading}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
      </div>
    </section>
  );
}
