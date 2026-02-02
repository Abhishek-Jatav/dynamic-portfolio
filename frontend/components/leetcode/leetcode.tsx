"use client";

import { useEffect, useState } from "react";

type LeetcodeStats = {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastUpdated: string;
};

export default function LeetcodeStats() {
  const [stats, setStats] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError("Unable to load LeetCode stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading LeetCode stats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return null;

  return (
    <div className="rounded-xl border p-4 shadow-sm max-w-sm">
      <h2 className="text-lg font-semibold mb-2">
        LeetCode Stats — {stats.username}
      </h2>

      <ul className="space-y-1 text-sm">
        <li>✅ Total Solved: {stats.totalSolved}</li>
        <li className="text-green-600">🟢 Easy: {stats.easySolved}</li>
        <li className="text-yellow-600">🟡 Medium: {stats.mediumSolved}</li>
        <li className="text-red-600">🔴 Hard: {stats.hardSolved}</li>
      </ul>

      <p className="text-xs text-gray-500 mt-3">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
