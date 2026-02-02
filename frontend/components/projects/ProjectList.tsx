"use client";

import { useEffect, useState } from "react";
import { Project } from "@/lib/types/project";
import { getProjects } from "../../lib/api/projects/get-all-projects";
import { updateProject } from "@/lib/api/projects/update-project";
import { deleteProject } from "@/lib/api/projects/delete-project";
import ProjectCard from "./ProjectCard";
import { useAuth } from "@/lib/context/AuthContext";

export default function ProjectList() {
  const { admin } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token")! : "";

  const [projects, setProjects] = useState<Project[]>([]);

  const load = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          project={p}
          onUpdate={async (id, data) => {
            await updateProject(id, data, token);
            load();
          }}
          onDelete={async (id) => {
            await deleteProject(id, token);
            load();
          }}
        />
      ))}
    </div>
  );
}
