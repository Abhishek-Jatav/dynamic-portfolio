"use client";

import { useEffect, useState } from "react";
import { getVideoById } from "@/lib/api/videos/videos";
import { Video } from "../../lib/types/video";

interface Props {
  videoId: string;
}

export default function VideoPlayer({ videoId }: Props) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const data = await getVideoById(videoId);
        setVideo(data);
      } catch (err: any) {
        setError(err.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
      <div className="text-center p-10 text-gray-500">Loading video...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">Error: {error}</div>;
  }

  if (!video) {
    return <div className="p-10 text-center">Video not found</div>;
  }

  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

      <div className="aspect-video relative cursor-pointer">
        {!play ? (
          <div onClick={() => setPlay(true)} className="relative group">
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 text-white rounded-full p-4 text-2xl group-hover:scale-110 transition">
                ▶
              </div>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {video.description && (
        <p className="mt-4 text-gray-600">{video.description}</p>
      )}
    </div>
  );
}
