import { apiRequest } from "@/lib/api/http";

export async function deleteProject(id: string) {
  return apiRequest<{ message: string; deletedProject: any }>(
    `/projects/${id}`,
    {
      method: "DELETE",
      auth: true, // ✅ admin only
    },
  );
}
