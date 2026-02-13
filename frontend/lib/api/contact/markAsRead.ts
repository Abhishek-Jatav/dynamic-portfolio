import { BACKEND_URL } from "../../env";

export async function markAsRead(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/contact/admin/${id}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update message");
  }

  return res.json();
}
