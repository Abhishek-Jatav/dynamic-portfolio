"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../lib/context/AuthContext";
import Login from "../../components/login/AdminLogin";

import CreateProject from "../../components/projects/CreateProject";
import ProjectList from "../../components/projects/ProjectList";
import BlogForm from "../../components/blog/BlogForm";
import BlogList from "../../components/blog/BlogList";

export default function AdminPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);

  if (!admin) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center mb-5">Admin Login</h1>
        <Login />
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/contact")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            CHECK RESPONSE
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* SECTION 1: PROJECTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
        <CreateProject onCreated={() => setRefresh((r) => r + 1)} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
        <ProjectList key={refresh} />
      </section>

      {/* SECTION 2: BLOGS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Create Blog</h2>
        <BlogForm onSuccess={() => setRefresh((r) => r + 1)} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
        <BlogList key={refresh} />
      </section>
    </div>
  );
}
