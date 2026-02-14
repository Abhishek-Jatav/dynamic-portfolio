"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../lib/env";

interface LeetcodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastUpdated: string;
  profileUrl?: string;
}

export default function LeetcodeStats() {
  const [data, setData] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${BACKEND_URL}/leetcode/stats`, {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        const json = await res.json();

        // Ensure the URL is complete
        json.profileUrl =
          json.profileUrl || `https://leetcode.com/u/abhidel44/`;

        setData(json);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 border rounded-xl shadow-md">
        Loading LeetCode stats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border rounded-xl shadow-md text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold">LeetCode</h2>
      <p className="text-gray-500 mb-2">@{data.username}</p>

      {/* One Row Layout */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-semibold">Total</p>
          <p className="text-xl font-bold">{data.totalSolved}</p>
        </div>

        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <p className="text-sm font-semibold">Easy</p>
          <p className="text-xl font-bold">{data.easySolved}</p>
        </div>

        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <p className="text-sm font-semibold">Medium</p>
          <p className="text-xl font-bold">{data.mediumSolved}</p>
        </div>

        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <p className="text-sm font-semibold">Hard</p>
          <p className="text-xl font-bold">{data.hardSolved}</p>
        </div>
      </div>

      {/* View LeetCode Profile - style matches GitHub link */}
      <a
        href={data.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 text-blue-600 hover:underline text-sm">
        View LeetCode Profile
      </a>

      <p className="text-xs text-gray-500 mt-3">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
