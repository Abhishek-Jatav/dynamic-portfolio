"use client";

import { deleteBlog } from "../../lib/api/blog/blog";

export default function DeleteBlogButton({
  id,
  onDeleted,
}: {
  id: string;
  onDeleted: () => void;
}) {
  const handleDelete = async () => {
    if (!confirm("Delete this blog?")) return;
    await deleteBlog(id);
    onDeleted();
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
