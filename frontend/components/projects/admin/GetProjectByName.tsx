"use client";

import { useState } from "react";
import { getProjectByName } from "../../../lib/api/projects/getProjectByName";
import { deleteProjectByName } from "../../../lib/api/projects/deleteProjectByName";
import type { Project } from "../../../lib/types/project";

export default function GetProjectByName() {
  const [name, setName] = useState("");
  const [project, setProject] = useState<Project | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getProjectByName(name);
      setProject(data);
    } catch {
      alert("Project not found");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteProjectByName(name);
      alert("Deleted successfully");
      setProject(null);
      setName("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-3 border p-4 rounded">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Project Name"
        className="border p-2 w-full rounded"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded">
          Search
        </button>

        {project && (
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        )}
      </div>

      {project && (
        <div>
          <h3 className="font-bold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
}
