import useSWR from "swr";
import { getHeroImages } from "../getHeroImages";
import { HeroImage } from "../../../types/hero-image";

const fetcher = async (): Promise<HeroImage[]> => {
  const data = await getHeroImages();

  return data.sort((a, b) => a.order - b.order);
};

export function useHeroImages() {
  return useSWR("hero-images", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });
}
