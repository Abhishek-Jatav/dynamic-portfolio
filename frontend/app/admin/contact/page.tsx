"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/context/AuthContext";
import AdminContactList from "../../../components/contact/AdminContactList";
import toast from "react-hot-toast";

export default function AdminContactPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  const [token, setToken] = useState("");

  /* ================= GET TOKEN ================= */
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  /* ================= AUTO REDIRECT IF LOGGED OUT ================= */
  useEffect(() => {
    if (!admin) {
      toast.error("Session expired. Please login again.");
      router.replace("/admin"); // redirect to login page
    }
  }, [admin, router]);

  // Prevent UI flash while redirecting
  if (!admin) return null;

  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-black dark:via-neutral-950 dark:to-neutral-900 px-4 sm:px-6 lg:px-12 py-6 sm:py-10 transition-all duration-500">
      {/* ===== PREMIUM ADMIN INFO HEADER ===== */}
      <div className="rounded-3xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all duration-500 hover:shadow-2xl">
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

          <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 capitalize">
            {admin.role}
          </span>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              toast.success("Returning to dashboard...");
              router.push("/admin");
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300">
            Back to Admin
          </button>

          <button
            onClick={() => {
              toast.loading("Logging out...", { id: "logout-contact" });
              logout();
              toast.success("Logged out successfully", {
                id: "logout-contact",
              });
              router.replace("/admin"); // 🔥 redirect after logout
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300">
            Logout
          </button>
        </div>
      </div>

      {/* Contact List */}
      {!token ? (
        <p className="text-sm text-gray-500">Loading token...</p>
      ) : (
        <AdminContactList token={token} />
      )}
    </div>
  );
}
