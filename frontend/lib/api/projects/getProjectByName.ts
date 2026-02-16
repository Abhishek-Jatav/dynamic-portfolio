import { apiRequest } from "@/lib/api/http";
import { Project } from "@/lib/types/project";

export async function getProjectByName(name: string) {
  const encodedName = encodeURIComponent(name);

  return apiRequest<Project>(`/projects/name/${encodedName}`, {
    method: "GET",
    auth: false, // public
  });
}
