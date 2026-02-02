import { BACKEND_URL } from "../../env";

export const updateProject = async (
  id: string,
  project: any,
  token: string,
) => {
  const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
};
