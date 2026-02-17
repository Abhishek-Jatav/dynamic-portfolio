"use client";

import { useEffect, useState } from "react";
import { CreateHeroImageDto } from "../../lib/types/hero-image";

type Props = {
  initial?: CreateHeroImageDto;
  submitText: string;
  onSubmit: (payload: CreateHeroImageDto) => Promise<void>;
  onCancelEdit?: () => void;
};

export default function HeroImageForm({
  initial,
  submitText,
  onSubmit,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState<CreateHeroImageDto>({
    imageUrl: "",
    title: "",
    subtitle: "",
    order: 0,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // when selecting edit item
  useEffect(() => {
    if (initial) {
      setForm({
        imageUrl: initial.imageUrl || "",
        title: initial.title || "",
        subtitle: initial.subtitle || "",
        order: initial.order ?? 0,
        isActive: initial.isActive ?? true,
      });
    }
  }, [initial]);

  const handleChange = (key: keyof CreateHeroImageDto, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.imageUrl.trim()) {
      alert("Image URL is required");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);

      // reset only if not editing
      if (!initial) {
        setForm({
          imageUrl: "",
          title: "",
          subtitle: "",
          order: 0,
          isActive: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black rounded-2xl shadow p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {initial ? "Edit Hero Image" : "Add Hero Image"}
        </h2>

        {initial && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm underline">
            Cancel
          </button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Image URL *</label>
        <input
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
          placeholder="Paste Cloudinary image URL"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
          placeholder="Optional title"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Subtitle</label>
        <input
          value={form.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
          placeholder="Optional subtitle"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => handleChange("order", Number(e.target.value))}
            className="w-full border rounded-xl px-3 py-2 mt-1"
          />
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => handleChange("isActive", e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </div>
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-xl border border-white disabled:opacity-60">
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
