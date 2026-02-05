"use client";

import { useEffect, useState } from "react";
import { Blog } from "../../lib/types/blog";
import { getAllBlogsAdmin } from "../../lib/api/blog/blog";
import BlogItem from "./BlogItem";

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const load = async () => {
    const data = await getAllBlogsAdmin();
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      {blogs.map((b) => (
        <BlogItem key={b._id} blog={b} refresh={load} />
      ))}
    </div>
  );
}
