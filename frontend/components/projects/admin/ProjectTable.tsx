"use client";

import type { Project } from "../../../lib/types/project";

type Props = {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
};

export default function ProjectTable({
  projects,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800">
      <h3 className="text-xl font-semibold mb-6">All Projects</h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-md transition">
              <div>
                <p className="font-medium">{p.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.isFeatured
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-200 text-gray-600 dark:bg-neutral-700 dark:text-gray-300"
                  }`}>
                  {p.isFeatured ? "Featured" : "Normal"}
                </span>
              </div>

              <div className="flex gap-4 text-sm">
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
