"use client";

import { useState } from "react";
import { Blog } from "../../lib/types/blog";
import { createBlog, updateBlog } from "../../lib/api/blog/blog";
import { useAuth } from "../../lib/context/AuthContext";

type Props = {
  initialData?: Blog;
  onSuccess?: () => void;
};

export default function BlogForm({ initialData, onSuccess }: Props) {
  const { admin } = useAuth();

  const [form, setForm] = useState({
    projectId: initialData?.projectId ?? "",
    title: initialData?.title ?? "",
    summary: initialData?.summary ?? "",
    content: initialData?.content ?? "",
    tags: initialData?.tags?.join(", ") ?? "",
    isPublished: initialData?.isPublished ?? false,
  });

  const isEdit = Boolean(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!admin) return;

    const payload = {
      projectId: form.projectId,
      title: form.title,
      summary: form.summary,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isPublished: form.isPublished,
      author: {
        name: admin.name,
        role: admin.role,
      },
    };

    if (isEdit && initialData) {
      await updateBlog(initialData._id, payload);
    } else {
      await createBlog(payload);
    }

    onSuccess?.();
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-bold text-lg">
        {isEdit ? "Edit Blog" : "Create Blog"}
      </h2>

      <input
        name="projectId"
        placeholder="Project ID"
        value={form.projectId}
        onChange={handleChange}
        className="input"
      />

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="input"
      />

      <textarea
        name="summary"
        placeholder="Summary"
        value={form.summary}
        onChange={handleChange}
        className="input"
      />

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        className="input h-40"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="input"
      />

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        Published
      </label>

      <button onClick={handleSubmit} className="btn-primary">
        {isEdit ? "Update" : "Create"}
      </button>
    </div>
  );
}
