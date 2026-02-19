import { BACKEND_URL } from "../../env";

export async function deleteProjectByName(name: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/projects/by-name/${name}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }

  return res.json();
}
