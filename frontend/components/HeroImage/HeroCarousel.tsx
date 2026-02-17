"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getHeroImages } from "../../lib/api/hero-images/getHeroImages";
import { HeroImage } from "../../lib/types/hero-image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

type HeroCarouselProps = {
  autoPlayDelay?: number; // milliseconds
};

export default function HeroCarousel({
  autoPlayDelay = 3000,
}: HeroCarouselProps) {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getHeroImages();

        // Only active + sort by order
        const cleaned = data
          .filter((img) => img.isActive)
          .sort((a, b) => a.order - b.order);

        setImages(cleaned);
      } catch (err) {
        console.error("Hero Images Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const hasImages = useMemo(() => images.length > 0, [images]);

  if (loading) {
    return (
      <div className="w-full h-[220px] sm:h-[320px] lg:h-[450px] rounded-2xl bg-gray-200 animate-pulse" />
    );
  }

  if (!hasImages) {
    return (
      <div className="w-full h-[220px] sm:h-[320px] lg:h-[450px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
        No hero images available
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-xl relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={images.length > 1}
        className="w-full aspect-[16/9] md:aspect-[21/9]">
        {images.map((img) => (
          <SwiperSlide key={img._id}>
            <div className="relative w-full h-full">
              {/* Image */}
              <Image
                src={img.imageUrl}
                alt={img.title || "Hero Image"}
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 flex items-center">
                <div className="px-6 sm:px-12 lg:px-20 max-w-3xl">
                  {img.title && (
                    <h2 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                      {img.title}
                    </h2>
                  )}

                  {img.subtitle && (
                    <p className="text-white/90 mt-3 text-sm sm:text-lg lg:text-xl leading-relaxed">
                      {img.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
