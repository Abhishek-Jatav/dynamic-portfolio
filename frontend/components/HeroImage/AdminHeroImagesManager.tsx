"use client";

import toast from "react-hot-toast";
import { mutate } from "swr";
import { useState } from "react";

import HeroImageForm from "./HeroImageForm";
import HeroImagesTable from "./HeroImagesTable";

import { HeroImage } from "@/lib/types/hero-image";
import { CreateHeroImageDto } from "@/lib/types/hero-image";

import { useHeroImages } from "../../lib/api/hero-images/hook/useHeroImages";

import { createHeroImage } from "../../lib/api/hero-images/createHeroImage";
import { updateHeroImage } from "../../lib/api/hero-images/updateHeroImage";
import { toggleHeroImage } from "../../lib/api/hero-images/toggleHeroImage";
import { deleteHeroImage } from "../../lib/api/hero-images/deleteHeroImage";

export default function AdminHeroImagesManager() {
  const { data: items = [], isLoading } = useHeroImages();
  const [editing, setEditing] = useState<HeroImage | null>(null);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired");
      throw new Error("No token");
    }
    return token;
  };

  const refresh = async () => {
    await mutate("hero-images"); // 🔥 global refresh
  };

  const handleCreate = async (payload: CreateHeroImageDto) => {
    try {
      await createHeroImage(payload, getToken());
      toast.success("Created");
      refresh();
    } catch {
      toast.error("Create failed");
    }
  };

  const handleUpdate = async (payload: CreateHeroImageDto) => {
    if (!editing) return;

    try {
      await updateHeroImage(editing._id, payload, getToken());
      toast.success("Updated");
      setEditing(null);
      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleHeroImage(id, getToken());
      toast.success("Toggled");
      refresh();
    } catch {
      toast.error("Toggle failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHeroImage(id, getToken());
      toast.success("Deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <HeroImageForm
        initial={editing || undefined}
        submitText={editing ? "Update" : "Create"}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancelEdit={() => setEditing(null)}
      />

      {isLoading ? (
        <p>Loading...</p>
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
