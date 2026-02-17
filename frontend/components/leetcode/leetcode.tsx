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

        if (!res.ok) throw new Error("Failed to fetch stats");

        const json = await res.json();

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

  if (loading)
    return (
      <div className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-gray-900 animate-pulse">
        Loading LeetCode stats...
      </div>
    );

  if (error)
    return (
      <div className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );

  if (!data) return null;

  return (
    <div className="p-6 rounded-2xl shadow-lg border bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">LeetCode</h2>
        <p className="text-gray-500 text-sm mb-6">@{data.username}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <StatBox
            label="Total"
            value={data.totalSolved}
            bg="bg-gray-100 dark:bg-gray-800"
          />
          <StatBox
            label="Easy"
            value={data.easySolved}
            bg="bg-green-100 dark:bg-green-900"
          />
          <StatBox
            label="Medium"
            value={data.mediumSolved}
            bg="bg-yellow-100 dark:bg-yellow-900"
          />
          <StatBox
            label="Hard"
            value={data.hardSolved}
            bg="bg-red-100 dark:bg-red-900"
          />
        </div>
      </div>

      <div className="mt-6">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition">
          View LeetCode Profile →
        </a>

        <p className="text-xs text-gray-500 mt-3">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function StatBox({ label, value, bg }: any) {
  return (
    <div className={`p-4 rounded-xl ${bg}`}>
      <p className="text-xs sm:text-sm font-medium">{label}</p>
      <p className="text-lg sm:text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
