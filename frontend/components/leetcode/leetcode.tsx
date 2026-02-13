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
      <div className="p-4 border rounded-lg shadow-md">
        <p>Loading LeetCode stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg shadow-md text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">
        LeetCode Stats ({data.username})
      </h2>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-2xl font-bold">{data.totalSolved}</p>
        </div>

        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <p className="text-lg font-semibold">Easy</p>
          <p className="text-2xl font-bold">{data.easySolved}</p>
        </div>

        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <p className="text-lg font-semibold">Medium</p>
          <p className="text-2xl font-bold">{data.mediumSolved}</p>
        </div>

        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <p className="text-lg font-semibold">Hard</p>
          <p className="text-2xl font-bold">{data.hardSolved}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
