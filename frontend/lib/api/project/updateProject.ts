import { BACKEND_URL } from "../../env";
import { Project } from "../../types/project";

export async function updateProject(
  id: string,
  data: Partial<Project>,
  token: string,
) {
  const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return res.json();
}
