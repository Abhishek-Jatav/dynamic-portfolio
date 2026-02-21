import { apiClient } from "../apiClient";

export async function deleteProject(id: string) {
  return apiClient(`/projects/${id}`, {
    method: "DELETE",
  });
}
