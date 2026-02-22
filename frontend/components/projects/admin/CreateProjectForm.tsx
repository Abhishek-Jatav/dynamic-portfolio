"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createProject } from "../../../lib/api/projects/createProject";
import type { CreateProjectDto } from "../../../lib/types/project.dto";
import { useAuth } from "../../../lib/context/AuthContext";

export default function CreateProjectForm() {
  const { token } = useAuth();

  const [techInput, setTechInput] = useState("");
  const [folderInput, setFolderInput] = useState("[]");

  const [form, setForm] = useState<CreateProjectDto>({
    name: "",
    description: "",
    startDate: "",
    liveLink: "",
    repoLink: "",
    demoLink: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const payload: CreateProjectDto = {
        ...form,
        techStack: techInput ? techInput.split(",").map((t) => t.trim()) : [],
        folderStructure: folderInput ? JSON.parse(folderInput) : [],
      };

      await createProject(payload, token);

      toast.success("Project created successfully ✅");

      setForm({
        name: "",
        description: "",
        startDate: "",
        liveLink: "",
        repoLink: "",
        demoLink: "",
        isFeatured: false,
      });

      setTechInput("");
      setFolderInput("[]");
    } catch (err: any) {
      toast.error(err.message || "Invalid folderStructure JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl border border-white/20">
      <input
        name="name"
        placeholder="Project Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className={inputStyle}
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
        className={inputStyle}
      />

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        required
        className={inputStyle}
      />

      <input
        name="liveLink"
        placeholder="Live Link"
        value={form.liveLink}
        onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        className={inputStyle}
      />

      <input
        name="repoLink"
        placeholder="Repository Link"
        value={form.repoLink}
        onChange={(e) => setForm({ ...form, repoLink: e.target.value })}
        className={inputStyle}
      />

      <input
        name="demoLink"
        placeholder="Demo (YouTube) Link"
        value={form.demoLink}
        onChange={(e) => setForm({ ...form, demoLink: e.target.value })}
        className={inputStyle}
      />

      <input
        placeholder="Tech Stack (comma separated)"
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        className={inputStyle}
      />

      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        Mark as Featured
      </label>

      <textarea
        value={folderInput}
        onChange={(e) => setFolderInput(e.target.value)}
        className={`${inputStyle} h-40 font-mono text-sm`}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-60">
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
