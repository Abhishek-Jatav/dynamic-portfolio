"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getHeroImages } from "../../lib/api/hero-images/getHeroImages";
import { HeroImage } from "../../lib/types/hero-image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type HeroCarouselProps = {
  autoPlayDelay?: number;
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
      <div className="w-full h-[260px] sm:h-[380px] lg:h-[520px] rounded-3xl bg-gray-200 dark:bg-white/10 animate-pulse" />
    );
  }

  if (!hasImages) {
    return (
      <div className="w-full h-[260px] sm:h-[380px] lg:h-[520px] rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500">
        No hero images available
      </div>
    );
  }

 return (
   <div className="w-full rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 bg-black">
     <Swiper
       modules={[Autoplay, Pagination]}
       autoplay={{
         delay: autoPlayDelay,
         disableOnInteraction: false,
       }}
       pagination={{ clickable: true }}
       loop={images.length > 1}
       className="w-full h-[240px] sm:h-[360px] lg:h-[520px]">
       {images.map((img) => (
         <SwiperSlide key={img._id}>
           <div className="relative w-full h-full">
             <Image
               src={img.imageUrl}
               alt={img.title || "Hero Image"}
               fill
               sizes="100vw"
               className="object-cover object-center"
               priority
             />

             {/* Premium overlay */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 flex items-center">
               <div className="px-6 sm:px-12 lg:px-20 max-w-3xl">
                 {img.title && (
                   <h2 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-xl">
                     {img.title}
                   </h2>
                 )}

                 {img.subtitle && (
                   <p className="text-white/80 mt-3 text-sm sm:text-lg lg:text-xl leading-relaxed">
                     {img.subtitle}
                   </p>
                 )}
               </div>
             </div>

             {/* Subtle bottom fade */}
             <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
           </div>
         </SwiperSlide>
       ))}
     </Swiper>
   </div>
 );

}
