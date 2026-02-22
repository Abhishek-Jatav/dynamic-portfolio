"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
      toast.error("Image URL is required");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);

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
      className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
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

      {["imageUrl", "title", "subtitle"].map((field) => (
        <div key={field}>
          <label className="text-sm font-medium capitalize">
            {field === "imageUrl" ? "Image URL *" : field}
          </label>
          <input
            value={(form as any)[field]}
            onChange={(e) => handleChange(field as any, e.target.value)}
            className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => handleChange("order", Number(e.target.value))}
            className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-60">
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
