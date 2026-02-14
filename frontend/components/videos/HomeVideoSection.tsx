"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../../lib/api/videos/videos";
import { Video } from "../../lib/types/video";
import VideoPlayer from "./VideoPlayer";

export default function HomeVideoSection() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadVideo() {
      try {
        const videos = await getAllVideos();

        if (videos.length > 0) {
          setVideo(videos[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, []);

  if (loading || error || !video) return null;

  return (
    <>
      {/* Click Button */}
      <div className="w-full flex justify-center py-10">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition">
          ▶ Watch Featured Video
        </button>
      </div>

      {/* Floating Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          {/* Close Button ALWAYS TOP */}
          <button
            onClick={() => setOpen(false)}
            className="fixed top-5 right-5 z-[10000] bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full text-xl font-bold flex items-center justify-center shadow-lg">
            ✕
          </button>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="w-full aspect-video">
              <VideoPlayer videoId={video._id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
