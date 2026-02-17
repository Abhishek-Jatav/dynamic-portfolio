"use client";

import { useEffect, useState } from "react";

import HeroImageForm from "./HeroImageForm";
import HeroImagesTable from "./HeroImagesTable";

import { HeroImage } from "@/lib/types/hero-image";
import { CreateHeroImageDto, UpdateHeroImageDto } from "@/lib/types/hero-image";

// ✅ Your API functions
import { getHeroImages } from "@/lib/api/hero-images/getHeroImages";
import { createHeroImage } from "../../lib/api/hero-images/createHeroImage";
import { updateHeroImage } from "../../lib/api/hero-images/updateHeroImage";
import { toggleHeroImage } from "../../lib/api/hero-images/toggleHeroImage";
import { deleteHeroImage } from "../../lib/api/hero-images/deleteHeroImage";

export default function AdminHeroImagesManager() {
  const [items, setItems] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<HeroImage | null>(null);

  // ================= FETCH =================
  const fetchHeroImages = async () => {
    setLoading(true);
    try {
      const data = await getHeroImages();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch hero images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  // Helper: token
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token missing. Please login again.");
      throw new Error("Token missing");
    }
    return token;
  };

  // ================= CREATE =================
  const handleCreate = async (payload: CreateHeroImageDto) => {
    try {
      const token = getToken();
      await createHeroImage(payload, token);
      await fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (payload: CreateHeroImageDto) => {
    if (!editing) return;

    const updatePayload: UpdateHeroImageDto = payload;

    try {
      const token = getToken();
      await updateHeroImage(editing._id, updatePayload, token);
      setEditing(null);
      await fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= TOGGLE =================
  const handleToggle = async (id: string) => {
    try {
      const token = getToken();
      await toggleHeroImage(id, token);
      await fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const ok = confirm("Are you sure you want to delete this hero image?");
    if (!ok) return;

    try {
      const token = getToken();
      await deleteHeroImage(id, token);
      await fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* FORM */}
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

      {/* TABLE */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow p-5">
          <p>Loading hero images...</p>
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
