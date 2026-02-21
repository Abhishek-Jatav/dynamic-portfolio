"use client";

import { useState } from "react";
import { getProjectById } from "../../../lib/api/projects/getProjectById";
import type { Project } from "../../../lib/types/project";

export default function GetProjectById() {
  const [id, setId] = useState("");
  const [project, setProject] = useState<Project | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch {
      alert("Project not found");
    }
  };

  return (
    <div className="space-y-3 border p-4 rounded">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Project ID"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-600 text-white rounded">
        Search
      </button>

      {project && (
        <div className="mt-3">
          <h3 className="font-bold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
}
