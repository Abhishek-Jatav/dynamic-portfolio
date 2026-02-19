import { BACKEND_URL } from "../../env";
import type { Project } from "../../types/project";
import type { CreateProjectDto } from "../../types/project.dto";

export async function createProject(
  dto: CreateProjectDto,
  token: string,
): Promise<Project> {
  const res = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}
