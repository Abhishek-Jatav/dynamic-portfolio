"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/context/AuthContext";
import Login from "@/components/login/AdminLogin";
import CreateProjectForm from "../../components/projects/CreateProjectForm";
import AdminProjectManager from "@/components/projects/AdminProjectManager";

export default function AdminPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);

  // 🔐 If not logged in → show login
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
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/contact")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            CHECK RESPONSE
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>

      {/* ================= PROJECT SECTION ================= */}
      <div>
        <CreateProjectForm
          key={refresh}
          onSuccess={() => setRefresh((prev) => prev + 1)}
        />
        <AdminProjectManager />
      </div>
    </div>
  );
}
