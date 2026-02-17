"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../../lib/api/videos/videos";
import { Video } from "../../lib/types/video";

export default function HomeVideoSection() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadVideo() {
      try {
        const videos = await getAllVideos();
        if (videos.length > 0) {
          setVideo(videos[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, []);

  if (loading || !video) return null;

  return (
    <>
      {/* 🔵 STATIC BEAUTIFUL CIRCULAR VIDEO RING */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 cursor-pointer group">
        {/* Gradient Ring */}
        <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 shadow-xl">
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <iframe
              className="w-full h-full pointer-events-none scale-150"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=0&modestbranding=1`}
              title="Preview"
              allow="autoplay"
            />
          </div>
        </div>

        {/* Soft Glow Effect */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-red-500/30 opacity-70 group-hover:opacity-100 transition duration-300"></div>

        {/* Hover Scale */}
        <div className="absolute inset-0 rounded-full group-hover:scale-105 transition-transform duration-300"></div>
      </div>

      {/* 🎬 MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          {/* 🔴 RED CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="fixed top-5 right-5 z-[10000] 
                       bg-red-600 hover:bg-red-700 
                       text-white w-12 h-12 
                       rounded-full text-2xl font-bold 
                       flex items-center justify-center 
                       shadow-lg transition">
            ✕
          </button>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                key={video.youtubeId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${video.youtubeId}`}
                title={video.title}
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
