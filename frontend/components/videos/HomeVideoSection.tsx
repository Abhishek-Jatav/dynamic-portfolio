"use client";

import { useEffect, useState } from "react";

interface Props {
  youtubeId: string;
}

export default function HomeVideoSection({ youtubeId }: Props) {
  const [open, setOpen] = useState(false);

  // ✅ Lock background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* 🔵 PREMIUM CIRCULAR VIDEO RING */}
      <div className="flex flex-col items-center gap-2 select-none">
        <div
          onClick={() => setOpen(true)}
          className="
            relative cursor-pointer group
            w-20 h-20
            sm:w-28 sm:h-28
            lg:w-40 lg:h-40
          ">
          {/* Outer Gradient Ring */}
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              {/* Preview Video */}
              <iframe
                className="w-full h-full pointer-events-none scale-150"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0`}
                title="Preview"
                allow="autoplay"
              />
            </div>
          </div>

          {/* Premium Glow */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-red-500/30 opacity-60 group-hover:opacity-100 transition duration-300" />

          {/* Hover scale */}
          <div className="absolute inset-0 rounded-full group-hover:scale-105 transition-transform duration-300" />

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
              <span className="text-white text-lg sm:text-xl lg:text-2xl pl-[2px]">
                ▶
              </span>
            </div> */}
          </div>
        </div>

        {/* Label */}
        <p className="text-[11px] sm:text-xs text-white/70 tracking-wide">
          Watch Intro
        </p>
      </div>

      {/* 🎬 MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="
              fixed top-5 right-5 z-[10000]
              bg-white/10 hover:bg-white/20
              border border-white/20
              text-white w-11 h-11 sm:w-12 sm:h-12
              rounded-full text-2xl font-bold
              flex items-center justify-center
              shadow-xl transition
            ">
            ✕
          </button>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                key={youtubeId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&loop=1&playlist=${youtubeId}&rel=0`}
                title="Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="mt-4 text-center">
              <p className="text-sm text-white/60">
                YouTube ID:{" "}
                <span className="font-mono text-white">{youtubeId}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
