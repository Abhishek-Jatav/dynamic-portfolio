import { BACKEND_URL } from "../../env";
import type { Project } from "../../types/project";

export async function getProjectByName(name: string): Promise<Project> {
  const res = await fetch(`${BACKEND_URL}/projects/by-name/${name}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
