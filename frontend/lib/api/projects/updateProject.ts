import { apiRequest } from "@/lib/api/http";
import { Project, UpdateProjectPayload } from "@/lib/types/project";

export async function updateProject(id: string, payload: UpdateProjectPayload) {
  return apiRequest<Project>(`/projects/${id}`, {
    method: "PATCH",
    auth: true, // ✅ admin only
    body: payload,
  });
}
