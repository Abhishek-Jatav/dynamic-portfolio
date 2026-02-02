import { BACKEND_URL } from "../../env";

export const getProjects = async () => {
  const res = await fetch(`${BACKEND_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};
