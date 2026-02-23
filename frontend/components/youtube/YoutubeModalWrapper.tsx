"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  videoUrl: string;
  children: React.ReactNode;
}

export default function YoutubeModalWrapper({ videoUrl, children }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function extractYouTubeId(url: string) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  const youtubeId = extractYouTubeId(videoUrl);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const modal = open ? (
    <div
      onClick={() => setOpen(false)}
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        bg-black/90 backdrop-blur-md
        p-10 sm:p-6 md:p-10
      ">
      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        className="
          absolute top-4 right-4
          sm:top-6 sm:right-6
          text-white text-2xl sm:text-3xl
          font-bold
          bg-red-500 hover:bg-green-500
          w-10 h-10 sm:w-12 sm:h-12
          rounded-full flex items-center justify-center
          transition
        ">
        ✕
      </button>

      {/* Video Container */}
      <div
        className="
          w-full
          max-w-full
          sm:max-w-2xl
          md:max-w-3xl
          lg:max-w-5xl
          xl:max-w-6xl
        "
        onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
          <iframe
            key={youtubeId}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
