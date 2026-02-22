"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getProjectById } from "../../../lib/api/projects/getProjectById";
import type { Project } from "../../../lib/types/project";

export default function GetProjectById() {
  const [id, setId] = useState("");
  const [project, setProject] = useState<Project | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getProjectById(id);
      setProject(data);
      toast.success("Project found");
    } catch {
      toast.error("Project not found");
    }
  };

  return (
    <div className="space-y-4 p-6 rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl border border-white/20">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Project ID"
        className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-xl px-3 py-2"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-4 py-2 rounded-xl">
        Search
      </button>

      {project && (
        <div>
          <h3 className="font-bold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
}
