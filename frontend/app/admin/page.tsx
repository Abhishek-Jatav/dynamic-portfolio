"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

import Login from "@/components/login/AdminLogin";
import AdminHeroImagesManager from "@/components/HeroImage/AdminHeroImagesManager";
import AdminVideoManager from "@/components/videos/AdminVideoManager";
import AdminProjects from "../../components/projects/admin/AdminProjects";

export default function AdminPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-black">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <Login />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-950 dark:to-black p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ===== HEADER CARD ===== */}
        <div className="rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/20 shadow-xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {admin.name} 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {admin.email}
            </p>
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              {admin.role}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/admin/contact")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-md hover:scale-105 transition">
              View Responses
            </button>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium shadow-md hover:scale-105 transition">
              Logout
            </button>
          </div>
        </div>

        {/* ===== SECTIONS ===== */}
        <Section title="Hero Images">
          <AdminHeroImagesManager />
        </Section>

        <Section title="Projects">
          <AdminProjects />
        </Section>

        <Section title="Videos">
          <AdminVideoManager />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <section className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
