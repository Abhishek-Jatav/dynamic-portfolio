import { BACKEND_URL } from "../../env";

export async function getAllContacts(token: string) {
  const res = await fetch(`${BACKEND_URL}/contact/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}
