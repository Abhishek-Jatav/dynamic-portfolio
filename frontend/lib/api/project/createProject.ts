import { BACKEND_URL } from "../../env";
import { Project } from "../../types/project"; // adjust path if needed

export async function createProject(data: Partial<Project>, token: string) {
  const res = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}
