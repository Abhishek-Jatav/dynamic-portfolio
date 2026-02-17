"use client";

import { Project } from "@/lib/types/project";
import { useState } from "react";

type Props = {
  project: Project;
  onUpdate: (data: Partial<Project>) => Promise<void>;
  onDelete: () => Promise<void>;
};

export default function ProjectEditor({ project, onUpdate, onDelete }: Props) {
  const [form, setForm] = useState(project);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await onUpdate(form);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-100">Project Details</h2>

      {/* Name */}
      <input
        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-gray-100 placeholder:text-gray-500
        focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Project name"
      />

      {/* Description */}
      <textarea
        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-gray-100 placeholder:text-gray-500
        focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Project description"
        rows={4}
      />

      {/* Progress */}
      <input
        type="number"
        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-gray-100
        focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={form.progress || 0}
        onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
        min={0}
        max={100}
      />

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black transition
          hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition
          hover:bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
