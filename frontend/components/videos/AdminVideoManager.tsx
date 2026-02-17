"use client";

import { useEffect, useState } from "react";
import { getAllVideos, createVideo, deleteVideo } from "../../lib/api/videos/videos";
import { Video } from "../../lib/types/video";

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadVideos() {
    try {
      setLoading(true);
      const data = await getAllVideos();
      setVideos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleAddVideo() {
    try {
      if (!title || !youtubeUrl) {
        setError("Title and YouTube URL are required");
        return;
      }

      await createVideo({ title, youtubeUrl, description });

      setTitle("");
      setYoutubeUrl("");
      setDescription("");
      setError(null);

      loadVideos();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    await deleteVideo(id);
    loadVideos();
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Admin Video Manager</h1> */}

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* Add Form */}
      <div className="space-y-3 mb-8">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddVideo}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Video
        </button>
      </div>

      {/* Video List */}
      {loading ? (
        <div className="text-gray-500">Loading videos...</div>
      ) : (
        <div className="grid gap-4">
          {videos.map((video) => {
            const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

            return (
              <div
                key={video._id}
                className="border rounded p-4 flex gap-4 items-center">
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-32 rounded"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{video.title}</h2>
                  <p className="text-sm text-gray-500">{video.description}</p>
                </div>

                <button
                  onClick={() => handleDelete(video._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
