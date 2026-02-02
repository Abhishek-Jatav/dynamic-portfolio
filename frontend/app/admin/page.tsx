"use client";

import { useAuth } from "@/lib/context/AuthContext";
import Login from "@/components/AdminLogin";
import CreateProject from "@/components/projects/CreateProject";
import ProjectList from "@/components/projects/ProjectList";
import { useState } from "react";

export default function AdminPage() {
  const { admin, logout } = useAuth();
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
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* SECTION 1 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
        <CreateProject onCreated={() => setRefresh((r) => r + 1)} />
      </section>

      {/* SECTION 2 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
        {/* <ProjectList key={refresh} /> */}
      </section>
    </div>
  );
}
