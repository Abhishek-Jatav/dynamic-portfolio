"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

import { getProjectById } from "@/lib/api/projects/getProjectById";
import { getProjectByName } from "@/lib/api/projects/getProjectByName";
import { updateProject } from "@/lib/api/projects/updateProject";
import { deleteProject } from "@/lib/api/projects/deleteProject";

import { Project } from "@/lib/types/project";
import ProjectSearch from "./ProjectSearch";
import ProjectEditor from "./ProjectEditor";

export default function AdminProjectManager() {
  const { admin } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!admin) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Admin access required.
      </div>
    );
  }

  const handleSearchById = async (id: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjectById(id);
      setProject(data);
    } catch (err: any) {
      setError(err.message);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async (name: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjectByName(name);
      setProject(data);
    } catch (err: any) {
      setError(err.message);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!project?._id) return;

    try {
      const updated = await updateProject(project._id, data);
      setProject(updated);
      alert("Project updated successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!project?._id) return;

    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(project._id);
      alert("Project deleted successfully");
      setProject(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <ProjectSearch
        onSearchById={handleSearchById}
        onSearchByName={handleSearchByName}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {project && (
        <ProjectEditor
          project={project}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
