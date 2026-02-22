"use client";

import { useState } from "react";
import { getProjectByName } from "../../../lib/api/projects/getProjectByName";
import { deleteProjectByName } from "../../../lib/api/projects/deleteProjectByName";
import type { Project } from "../../../lib/types/project";
import toast from "react-hot-toast";

export default function GetProjectByName() {
  const [name, setName] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!name.trim()) return toast.error("Please enter project name");

    try {
      setLoading(true);
      const data = await getProjectByName(name);
      setProject(data);
      toast.success("Project found 🎉");
    } catch {
      toast.error("Project not found");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;

    try {
      await deleteProjectByName(name);
      toast.success("Deleted successfully 🗑️");
      setProject(null);
      setName("");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border dark:border-neutral-800 transition-all">
      <h2 className="text-2xl font-bold mb-5 text-center">🔍 Search Project</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Project Name"
          className="flex-1 px-4 py-3 rounded-xl border bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 outline-none transition"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {project && (
        <div className="mt-6 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700 space-y-3 transition">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
