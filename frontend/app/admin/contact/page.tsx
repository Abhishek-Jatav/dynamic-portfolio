"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/context/AuthContext";
import AdminContactList from "../../../components/contact/AdminContactList";

export default function AdminContactPage() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  if (!admin) {
    return <p>Please login first</p>;
  }

  return (
    <div className="space-y-6">
      {/* Admin Info Header */}
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
            onClick={() => router.push("/admin")}
            className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Back to Admin
          </button>

          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
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
