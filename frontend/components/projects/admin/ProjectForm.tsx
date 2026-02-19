"use client";

import { useState } from "react";
import type { CreateProjectDto } from "@/lib/types/project.dto";
import FolderBuilder from "./FolderBuilder";

type Props = {
  onSubmit: (data: CreateProjectDto) => void;
  initial?: CreateProjectDto;
};

export default function ProjectForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState<CreateProjectDto>(
    initial || {
      name: "",
      description: "",
      startDate: "",
      techStack: [],
      folderStructure: [],
      isFeatured: false,
    },
  );

  const handleChange = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const addTech = (tech: string) => {
    if (!tech) return;
    handleChange("techStack", [...(form.techStack || []), tech]);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          placeholder="Project Name"
          className="p-3 border rounded-xl"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          type="date"
          className="p-3 border rounded-xl"
          value={form.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
      </div>

      <textarea
        placeholder="Description"
        className="w-full p-3 border rounded-xl"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <input
          placeholder="Live Link"
          className="p-3 border rounded-xl"
          value={form.liveLink || ""}
          onChange={(e) => handleChange("liveLink", e.target.value)}
        />

        <input
          placeholder="Repo Link"
          className="p-3 border rounded-xl"
          value={form.repoLink || ""}
          onChange={(e) => handleChange("repoLink", e.target.value)}
        />

        <input
          placeholder="Demo Link"
          className="p-3 border rounded-xl"
          value={form.demoLink || ""}
          onChange={(e) => handleChange("demoLink", e.target.value)}
        />
      </div>

      {/* Tech Stack */}
      <div>
        <h4 className="font-semibold mb-2">Tech Stack</h4>
        <div className="flex gap-2">
          <input
            placeholder="Add Tech"
            className="p-2 border rounded-lg flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {form.techStack?.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black text-white rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Folder Builder */}
      <FolderBuilder
        value={form.folderStructure || []}
        onChange={(folders) => handleChange("folderStructure", folders)}
      />

      {/* Featured Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isFeatured || false}
          onChange={(e) => handleChange("isFeatured", e.target.checked)}
        />
        <label className="font-medium">Mark as Featured</label>
      </div>

      <button
        onClick={() => onSubmit(form)}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition">
        Save Project
      </button>
    </div>
  );
}
