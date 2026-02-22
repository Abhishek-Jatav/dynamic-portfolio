"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import HeroImageForm from "./HeroImageForm";
import HeroImagesTable from "./HeroImagesTable";

import { HeroImage } from "@/lib/types/hero-image";
import { CreateHeroImageDto, UpdateHeroImageDto } from "@/lib/types/hero-image";

import { getHeroImages } from "@/lib/api/hero-images/getHeroImages";
import { createHeroImage } from "../../lib/api/hero-images/createHeroImage";
import { updateHeroImage } from "../../lib/api/hero-images/updateHeroImage";
import { toggleHeroImage } from "../../lib/api/hero-images/toggleHeroImage";
import { deleteHeroImage } from "../../lib/api/hero-images/deleteHeroImage";

export default function AdminHeroImagesManager() {
  const [items, setItems] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeroImage | null>(null);

  const fetchHeroImages = async () => {
    setLoading(true);
    try {
      const data = await getHeroImages();
      setItems(data);
    } catch (err) {
      toast.error("Failed to fetch hero images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please login again.");
      throw new Error("Token missing");
    }
    return token;
  };

  const handleCreate = async (payload: CreateHeroImageDto) => {
    try {
      const token = getToken();
      await createHeroImage(payload, token);
      toast.success("Hero image created");
      await fetchHeroImages();
    } catch {
      toast.error("Failed to create hero image");
    }
  };

  const handleUpdate = async (payload: CreateHeroImageDto) => {
    if (!editing) return;

    try {
      const token = getToken();
      await updateHeroImage(editing._id, payload, token);
      toast.success("Hero image updated");
      setEditing(null);
      await fetchHeroImages();
    } catch {
      toast.error("Failed to update hero image");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const token = getToken();
      await toggleHeroImage(id, token);
      toast.success("Status updated");
      await fetchHeroImages();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span>Delete this hero image?</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const token = getToken();
                await deleteHeroImage(id, token);
                toast.success("Deleted successfully");
                await fetchHeroImages();
              } catch {
                toast.error("Delete failed");
              }
            }}>
            Yes
          </button>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      <HeroImageForm
        initial={
          editing
            ? {
                imageUrl: editing.imageUrl,
                title: editing.title,
                subtitle: editing.subtitle,
                order: editing.order,
                isActive: editing.isActive,
              }
            : undefined
        }
        submitText={editing ? "Update Hero Image" : "Add Hero Image"}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancelEdit={() => setEditing(null)}
      />

      {loading ? (
        <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <p className="animate-pulse">Loading hero images...</p>
        </div>
      ) : (
        <HeroImagesTable
          items={items}
          onEdit={(item) => setEditing(item)}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
