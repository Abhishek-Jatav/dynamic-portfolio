"use client";

import { useState } from "react";
import { updateProject } from "../../../lib/api/projects/updateProject";
import type { Project } from "../../../lib/types/project";
import type { UpdateProjectDto } from "../../../lib/types/project.dto";

export default function UpdateProjectForm({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: (p: Project) => void;
}) {
  const [techInput, setTechInput] = useState(
    project.techStack?.join(", ") || "",
  );
  const [folderInput, setFolderInput] = useState(
    JSON.stringify(project.folderStructure || [], null, 2),
  );

  const [form, setForm] = useState<UpdateProjectDto>({
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    liveLink: project.liveLink,
    repoLink: project.repoLink,
    demoLink: project.demoLink,
    isFeatured: project.isFeatured,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: UpdateProjectDto = {
        ...form,
        techStack: techInput ? techInput.split(",").map((t) => t.trim()) : [],
        folderStructure: JSON.parse(folderInput || "[]"),
      };

      const updated = await updateProject(project._id, payload);

      onUpdated(updated);
      alert("Updated successfully");
    } catch (err: any) {
      alert(err.message || "Invalid JSON");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        value={form.startDate}
        type="date"
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <textarea
        value={folderInput}
        onChange={(e) => setFolderInput(e.target.value)}
        className="border p-2 w-full rounded h-32"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Project
      </button>
    </form>
  );
}
