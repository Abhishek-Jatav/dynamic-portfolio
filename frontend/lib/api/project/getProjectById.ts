import { BACKEND_URL } from "../../env";

export async function getProjectById(id: string) {
  const res = await fetch(`${BACKEND_URL}/projects/by-id/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
