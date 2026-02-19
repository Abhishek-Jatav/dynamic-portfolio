import { BACKEND_URL } from "../../env";
import type { Project } from "../../types/project";

export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BACKEND_URL}/projects`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}
