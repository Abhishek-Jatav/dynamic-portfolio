"use client";

import { useEffect, useState } from "react";

interface Props {
  youtubeUrl: string;
}

export default function HomeVideoSection({ youtubeUrl }: Props) {
  const [open, setOpen] = useState(false);

  // Extract YouTube ID from any valid URL
  function extractYouTubeId(url: string) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  const youtubeId = extractYouTubeId(youtubeUrl);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Click Ring */}
      <div className="flex flex-col items-center gap-2 select-none">
        <div
          onClick={() => setOpen(true)}
          className="relative cursor-pointer group w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40">
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <iframe
                className="w-full h-full pointer-events-none scale-150"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0`}
                allow="autoplay"
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-white/70 tracking-wide">
          Watch Intro
        </p>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <button
            onClick={() => setOpen(false)}
            className="fixed top-5 right-5 z-[10000] bg-white/10 hover:bg-white/20 border border-white/20 text-white w-11 h-11 rounded-full text-2xl font-bold flex items-center justify-center">
            ✕
          </button>

          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
