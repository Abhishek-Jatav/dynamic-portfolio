import { BACKEND_URL } from "../../env";

export async function deleteHeroImage(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/hero-images/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete hero image");
}
