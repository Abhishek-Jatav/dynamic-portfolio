import { BACKEND_URL } from "../../env";
import { Contact } from "../../types/contact";

/* ---------- helpers ---------- */
function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

/* ---------- APIs ---------- */

export async function fetchAllContacts(): Promise<Contact[]> {
  const res = await fetch(`${BACKEND_URL}/contact/admin/all`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function markContactAsRead(id: string): Promise<Contact> {
  const res = await fetch(`${BACKEND_URL}/contact/admin/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to update message");
  return res.json();
}

export async function deleteContact(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${BACKEND_URL}/contact/admin/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete message");
  return res.json();
}
