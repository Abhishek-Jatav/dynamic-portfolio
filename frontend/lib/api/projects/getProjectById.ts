import { apiRequest } from "@/lib/api/http";
import { Project } from "@/lib/types/project";

export async function getProjectById(id: string) {
  return apiRequest<Project>(`/projects/id/${id}`, {
    method: "GET",
    auth: false, // public
  });
}
