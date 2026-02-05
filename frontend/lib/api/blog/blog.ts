import { BACKEND_URL } from "../../env";
import { Blog } from "../../types/blog";

const BASE = `${BACKEND_URL}/blogs`;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAllBlogsAdmin = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE}/admin/all`, {
    headers: authHeader(),
  });
  return res.json();
};

export const createBlog = async (data: Partial<Blog>) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateBlog = async (id: string, data: Partial<Blog>) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteBlog = async (id: string) => {
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};
