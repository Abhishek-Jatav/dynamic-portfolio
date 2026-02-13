import { BACKEND_URL } from "../../env";
import { HeroImage } from "../../types/hero-image";

export async function getHeroImages() {
  const res = await fetch(`${BACKEND_URL}/hero-images`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch hero images");

  const data: HeroImage[] = await res.json();
  return data;
}
