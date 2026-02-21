import { apiClient } from "../apiClient";

export async function deleteProjectByName(name: string) {
  return apiClient(`/projects/by-name/${name}`, {
    method: "DELETE",
  });
}
