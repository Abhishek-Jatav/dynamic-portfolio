"use client";

import { useState } from "react";
import { Blog } from "../../lib/types/blog";
import BlogForm from "./BlogForm";
import DeleteBlogButton from "./DeleteBlogButton";

export default function BlogItem({
  blog,
  refresh,
}: {
  blog: Blog;
  refresh: () => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <BlogForm
        initialData={blog}
        onSuccess={() => {
          setEditing(false);
          refresh();
        }}
      />
    );
  }

  return (
    <div className="border p-3 rounded flex justify-between">
      <div>
        <h3 className="font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-500">{blog.slug}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setEditing(true)}>Edit</button>
        <DeleteBlogButton id={blog._id} onDeleted={refresh} />
      </div>
    </div>
  );
}
