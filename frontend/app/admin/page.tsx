"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/context/AuthContext";
import Login from "@/components/login/AdminLogin";
import ProjectSection from "@/components/projects/ProjectSection";
import AdminHeroImagesManager from "../../components/HeroImage/AdminHeroImagesManager";

// ✅ VIDEO MANAGER IMPORT
import AdminVideoManager from "../../components/videos/AdminVideoManager";

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
      {/* ================= ADMIN INFO HEADER ================= */}
      <div className="flex items-center justify-between rounded-lg border bg-dark shadow-sm p-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Welcome, {admin.name}
          </h2>
          <p className="text-sm text-white">{admin.email}</p>
          <p className="text-xs text-white capitalize">Role: {admin.role}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/contact")}
            className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            CHECK RESPONSE
          </button>

          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>

      {/* ================= HERO IMAGES SECTION ================= */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Hero Images</h2>
        <AdminHeroImagesManager />
      </div>

      {/* ================= PROJECT SECTION ================= */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Projects</h2>

        <ProjectSection />
      </div>

      {/* ================= VIDEOS SECTION ================= */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Videos</h2>
        <AdminVideoManager />
      </div>
    </div>
  );
}
