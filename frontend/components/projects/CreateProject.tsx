"use client";

import ProjectForm from "./ProjectForm";
import { createProject } from "@/lib/api/projects/create-project";

export default function CreateProject({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token")! : "";

  return (
    <ProjectForm
      submitLabel="Create Project"
      onSubmit={async (data) => {
        await createProject(data, token);
        onCreated();
      }}
    />
  );
}
