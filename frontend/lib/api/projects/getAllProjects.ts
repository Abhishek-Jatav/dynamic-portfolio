import { apiRequest } from "@/lib/api/http";
import { Project } from "@/lib/types/project";

export async function getAllProjects() {
  return apiRequest<Project[]>("/projects", {
    method: "GET",
    auth: false, // public
  });
}
