import { apiRequest } from "@/lib/api/http";
import { CreateProjectPayload, Project } from "@/lib/types/project";

export async function createProject(payload: CreateProjectPayload) {
  return apiRequest<Project>("/projects", {
    method: "POST",
    auth: true, // ✅ admin only
    body: payload,
  });
}
