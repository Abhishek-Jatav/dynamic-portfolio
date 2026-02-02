import { BACKEND_URL } from "../../env";

export const getProjectById = async (id: string, token?: string) => {
  const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
  });

  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
};
