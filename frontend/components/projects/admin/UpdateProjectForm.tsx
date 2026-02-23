"use client";

import { useState } from "react";
import { updateProject } from "../../../lib/api/projects/updateProject";
import type { Project } from "../../../lib/types/project";
import type { UpdateProjectDto } from "../../../lib/types/project.dto";
import toast from "react-hot-toast";

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
    liveLink: project.liveLink || "",
    repoLink: project.repoLink || "",
    demoLink: project.demoLink || "",
    isFeatured: project.isFeatured,
  });

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none transition";

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
      toast.success("Updated successfully 🚀");
    } catch (err: any) {
      toast.error(err.message || "Invalid JSON");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700">
      {/* Project Name */}
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Project Name"
        className={inputStyle}
      />

      {/* Description */}
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Project Description"
        className={inputStyle}
      />

      {/* Start Date */}
      <input
        value={form.startDate}
        type="date"
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        className={inputStyle}
      />

      {/* ✅ Live Link */}
      <input
        value={form.liveLink}
        onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        placeholder="Live Link"
        className={inputStyle}
      />

      {/* ✅ Repository Link */}
      <input
        value={form.repoLink}
        onChange={(e) => setForm({ ...form, repoLink: e.target.value })}
        placeholder="Repository Link"
        className={inputStyle}
      />

      {/* ✅ Demo Link */}
      <input
        value={form.demoLink}
        onChange={(e) => setForm({ ...form, demoLink: e.target.value })}
        placeholder="Demo (YouTube) Link"
        className={inputStyle}
      />

      {/* Tech Stack */}
      <input
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        placeholder="Tech stack (comma separated)"
        className={inputStyle}
      />

      {/* Featured Toggle */}
      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        Mark as Featured
      </label>

      {/* Folder Structure JSON */}
      <textarea
        value={folderInput}
        onChange={(e) => setFolderInput(e.target.value)}
        className={`${inputStyle} h-32 font-mono text-sm`}
        placeholder="Folder Structure JSON"
      />

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition">
        Update Project
      </button>
    </form>
  );
}
