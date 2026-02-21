import { apiClient } from "../apiClient";
import type { Project } from "../../types/project";
import type { UpdateProjectDto } from "../../types/project.dto";

export async function updateProject(
  id: string,
  dto: UpdateProjectDto,
): Promise<Project> {
  return apiClient(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
