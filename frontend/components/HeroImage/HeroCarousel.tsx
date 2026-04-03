"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useHeroImages } from "../../lib/api/hero-images/hook/useHeroImages";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel({ autoPlayDelay = 3000 }) {
  const { data = [], isLoading } = useHeroImages();

  const images = useMemo(
    () => data.filter((img) => img.isActive).sort((a, b) => a.order - b.order),
    [data],
  );

  if (isLoading) {
    return (
      <div className="w-full h-[260px] sm:h-[380px] lg:h-[520px] rounded-3xl bg-gray-200 dark:bg-white/10 animate-pulse" />
    );
  }

  if (!images.length) {
    return (
      <div className="w-full h-[260px] sm:h-[380px] lg:h-[520px] flex items-center justify-center">
        No hero images available
      </div>
    );
  }

  return (
    <div className="w-full rounded-[28px] overflow-hidden shadow-2xl bg-black">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: autoPlayDelay, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={images.length > 1}>
        {images.map((img) => (
          <SwiperSlide key={img._id}>
            <div className="relative w-full h-[300px]">
              <Image
                src={img.imageUrl}
                alt={img.title || ""}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
