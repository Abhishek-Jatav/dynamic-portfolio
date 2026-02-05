import { BACKEND_URL } from "../../env";

export async function markContactRead(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/contact/admin/${id}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to mark as read");
}
