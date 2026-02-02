"use client";

import { useState } from "react";
import { Project } from "@/lib/types/project";

type Props = {
  initialData?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  submitLabel: string;
};

export default function ProjectForm({
  initialData = {},
  onSubmit,
  submitLabel,
}: Props) {
  const [form, setForm] = useState<Partial<Project>>(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: keyof Project, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const submit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-3 border p-4 rounded bg-gray-50">
      <input
        name="name"
        placeholder="Project Name"
        value={form.name || ""}
        onChange={handleChange}
        className="input"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description || ""}
        onChange={handleChange}
        className="input"
      />

      <input
        name="status"
        placeholder="Status (active/completed)"
        value={form.status || ""}
        onChange={handleChange}
        className="input"
      />

      <input
        name="startDate"
        type="date"
        value={form.startDate || ""}
        onChange={handleChange}
        className="input"
      />

      <input
        placeholder="Team Members (comma separated)"
        onChange={(e) => handleArrayChange("teamMembers", e.target.value)}
        className="input"
      />

      <input
        placeholder="Tags (comma separated)"
        onChange={(e) => handleArrayChange("tags", e.target.value)}
        className="input"
      />

      <input
        name="progress"
        type="number"
        placeholder="Progress"
        value={form.progress ?? ""}
        onChange={handleChange}
        className="input"
      />

      <input
        placeholder="Links (comma separated)"
        onChange={(e) => handleArrayChange("links", e.target.value)}
        className="input"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitLabel}
      </button>
    </div>
  );
}
