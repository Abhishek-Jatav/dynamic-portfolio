"use client";

import Image from "next/image";
import { HeroImage } from "../../lib/types/hero-image";

type Props = {
  items: HeroImage[];
  onEdit: (item: HeroImage) => void;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function HeroImagesTable({
  items,
  onEdit,
  onToggle,
  onDelete,
}: Props) {
  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-5">
        <p>No hero images found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-2xl shadow p-5 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3">Preview</th>
            <th>Title</th>
            <th>Order</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((img) => (
            <tr key={img._id} className="border-b last:border-none">
              <td className="py-3">
                <div className="relative w-[120px] h-[60px] rounded-xl overflow-hidden border">
                  <Image
                    src={img.imageUrl}
                    alt={img.title || "Hero image"}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>

              <td>
                <div className="font-medium">{img.title || "-"}</div>
                <div className="text-gray-500">{img.subtitle || ""}</div>
              </td>

              <td>{img.order}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded-lg text-xs ${
                    img.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                  {img.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="text-right space-x-2">
                <button
                  onClick={() => onEdit(img)}
                  className="px-3 py-1 rounded-lg border">
                  Edit
                </button>

                <button
                  onClick={() => onToggle(img._id)}
                  className="px-3 py-1 rounded-lg border">
                  Toggle
                </button>

                <button
                  onClick={() => onDelete(img._id)}
                  className="px-3 py-1 rounded-lg border text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
