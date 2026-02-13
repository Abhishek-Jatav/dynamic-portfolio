"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../../lib/api/videos/videos";
import { Video } from "../../lib/types/video";
import VideoPlayer from "./VideoPlayer";

export default function HomeVideoSection() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideo() {
      try {
        const videos = await getAllVideos();

        if (videos.length > 0) {
          setVideo(videos[0]); // show latest video
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14 text-center text-gray-500">
        Loading featured video...
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 sm:px-8 lg:px-16 py-14 text-center text-red-500">
        Error: {error}
      </section>
    );
  }

  if (!video) return null;

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-14">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Video 🎬</h2>
      </div>

      <VideoPlayer videoId={video._id} />
    </section>
  );
}
