import { BACKEND_URL } from "../../env";
import { HeroImage, UpdateHeroImageDto } from "../../types/hero-image";

export async function updateHeroImage(
  id: string,
  payload: UpdateHeroImageDto,
  token: string,
) {
  const res = await fetch(`${BACKEND_URL}/hero-images/admin/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update hero image");

  const data: HeroImage = await res.json();
  return data;
}
