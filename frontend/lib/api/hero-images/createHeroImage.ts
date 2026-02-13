import { BACKEND_URL } from "../../env";
import { CreateHeroImageDto, HeroImage } from "../../types/hero-image";

export async function createHeroImage(
  payload: CreateHeroImageDto,
  token: string,
) {
  const res = await fetch(`${BACKEND_URL}/hero-images/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create hero image");

  const data: HeroImage = await res.json();
  return data;
}
