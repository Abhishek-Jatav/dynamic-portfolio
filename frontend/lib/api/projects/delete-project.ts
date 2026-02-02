import { BACKEND_URL } from "../../env";

export const deleteProject = async (id: string, token: string) => {
  const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};
