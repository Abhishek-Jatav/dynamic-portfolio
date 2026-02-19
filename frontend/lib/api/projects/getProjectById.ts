import { BACKEND_URL } from "../../env";
import type { Project } from "../../types/project";

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${BACKEND_URL}/projects/by-id/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
