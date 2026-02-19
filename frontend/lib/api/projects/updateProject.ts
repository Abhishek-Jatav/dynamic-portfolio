import { BACKEND_URL } from "../../env";
import type { Project } from "../../types/project";
import type { UpdateProjectDto } from "../../types/project.dto";

export async function updateProject(
  id: string,
  dto: UpdateProjectDto,
  token: string,
): Promise<Project> {
  const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return res.json();
}
