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
    <div className="bg-gray-50 p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Project Details</h2>

      <input
        className="border p-2 w-full rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="border p-2 w-full rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        className="border p-2 w-full rounded"
        value={form.progress || 0}
        onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
      />

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded">
          Update
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
