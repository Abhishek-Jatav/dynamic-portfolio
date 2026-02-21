"use client";

import { useState } from "react";
import { createProject } from "../../../lib/api/projects/createProject";
import type { CreateProjectDto } from "../../../lib/types/project.dto";
import { useAuth } from "../../../lib/context/AuthContext"; // ✅ import auth

export default function CreateProjectForm() {
  const { token } = useAuth(); // ✅ get token from context

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, isFeatured: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("You are not authenticated. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const payload: CreateProjectDto = {
        ...form,
        techStack: techInput ? techInput.split(",").map((t) => t.trim()) : [],
        folderStructure: folderInput ? JSON.parse(folderInput) : [],
      };

      await createProject(payload, token); // ✅ pass token

      alert("Project created successfully ✅");

      // Reset form
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
      alert(err.message || "Invalid folderStructure JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-6 rounded-lg bg-dark shadow">
      <h2 className="text-xl font-bold">Create Project</h2>

      <input
        name="name"
        placeholder="Project Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="liveLink"
        placeholder="Live Link"
        value={form.liveLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="repoLink"
        placeholder="Repository Link"
        value={form.repoLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="demoLink"
        placeholder="Demo (YouTube) Link"
        value={form.demoLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Tech Stack (comma separated)"
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={handleCheckbox}
        />
        Mark as Featured
      </label>

      <div>
        <label className="block mb-1 font-medium">
          Folder Structure (JSON format)
        </label>
        <textarea
          value={folderInput}
          onChange={(e) => setFolderInput(e.target.value)}
          className="w-full border p-2 rounded h-40 font-mono text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
