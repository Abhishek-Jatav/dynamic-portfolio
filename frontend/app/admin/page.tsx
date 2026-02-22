"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

import Login from "@/components/login/AdminLogin";
import AdminHeroImagesManager from "@/components/HeroImage/AdminHeroImagesManager";
import AdminVideoManager from "@/components/videos/AdminVideoManager";
import AdminProjectsPanel from "@/components/projects/admin/AdminProjectsPanel";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  /* ================= LOGIN UI ================= */
  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-black dark:via-neutral-950 dark:to-neutral-900 px-4 sm:px-6">
        <div className="w-full max-w-md backdrop-blur-2xl bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-3xl p-8 sm:p-10 transition-all duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
              Secure access to dashboard
            </p>
          </div>

          <Login />
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-black dark:via-neutral-950 dark:to-neutral-900 px-4 sm:px-6 lg:px-12 py-6 sm:py-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ===== HEADER CARD ===== */}
        <div className="rounded-3xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition hover:shadow-2xl">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {admin.name}
              </span>{" "}
              👋
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {admin.email}
            </p>

            <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
              {admin.role}
            </span>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                toast.success("Opening responses...");
                router.push("/admin/contact");
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300">
              View Responses
            </button>

            <button
              onClick={() => {
                toast.loading("Logging out...", { id: "logout" });
                logout();
                toast.success("Logged out successfully", { id: "logout" });
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300">
              Logout
            </button>
          </div>
        </div>

        {/* ===== SECTIONS ===== */}
        <Section title="Hero Images">
          <AdminHeroImagesManager />
        </Section>

        <Section title="Projects">
          <AdminProjectsPanel />
        </Section>

        {/* Future Ready */}
        {/*
        <Section title="Videos">
          <AdminVideoManager />
        </Section>
        */}
      </div>
    </div>
  );
}

/* ================= SECTION COMPONENT ================= */

function Section({ title, children }: any) {
  return (
    <section className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)] rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-500 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
      </div>

      <div className="pt-2">{children}</div>
    </section>
  );
}
