import { BACKEND_URL } from "../../env";

export async function getProjectByName(name: string) {
  const res = await fetch(`${BACKEND_URL}/projects/by-name/${name}`);

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
