"use client";

import { useState } from "react";
import { Project } from "@/lib/types/project";
import ProjectForm from "./ProjectForm";

type Props = {
  project: Project;
  onUpdate: (id: string, data: Partial<Project>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function ProjectCard({ project, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <ProjectForm
        initialData={project}
        submitLabel="Update Project"
        onSubmit={async (data) => {
          await onUpdate(project._id, data);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <div className="border p-4 rounded space-y-2">
      {Object.entries(project).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value) ? value.join(", ") : String(value)}
        </p>
      ))}

      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setEditing(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded">
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-600 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
