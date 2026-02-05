import { BACKEND_URL } from "../../env";

export async function deleteContact(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/contact/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete");
}
