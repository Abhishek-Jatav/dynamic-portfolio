import { BACKEND_URL } from "../../env";
import { HeroImage } from "../../types/hero-image";

export async function toggleHeroImage(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/hero-images/admin/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to toggle hero image");

  const data: HeroImage = await res.json();
  return data;
}
