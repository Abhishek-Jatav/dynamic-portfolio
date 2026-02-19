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
      <PremiumCard>
        <div className="animate-pulse space-y-5">
          <div className="h-5 w-32 rounded bg-white/10" />
          <div className="h-3 w-44 rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
          </div>
          <div className="h-3 w-40 rounded bg-white/10" />
        </div>
      </PremiumCard>
    );

  if (error)
    return (
      <PremiumCard>
        <p className="text-red-400 text-sm break-words">Error: {error}</p>
      </PremiumCard>
    );

  if (!data) return null;

  return (
    <PremiumCard>
      <div className="flex items-start justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            LeetCode
          </h2>
          <p className="text-sm text-white/60 mt-1 truncate">
            @{data.username}
          </p>
        </div>

        <div className="shrink-0 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 border border-white/10">
          Stats
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Total" value={data.totalSolved} />
        <StatBox label="Easy" value={data.easySolved} tone="green" />
        <StatBox label="Medium" value={data.mediumSolved} tone="yellow" />
        <StatBox label="Hard" value={data.hardSolved} tone="red" />
      </div>

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-white hover:text-white/80 transition">
          View Profile →
        </a>

        <p className="text-xs text-white/50 break-words">
          Updated: {new Date(data.lastUpdated).toLocaleString()}
        </p>
      </div>
    </PremiumCard>
  );
}

function PremiumCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      {children}
    </div>
  );
}

function StatBox({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "green" | "yellow" | "red";
}) {
  const toneMap: Record<string, string> = {
    neutral: "bg-white/5 border-white/10",
    green: "bg-emerald-500/10 border-emerald-400/20",
    yellow: "bg-yellow-500/10 border-yellow-400/20",
    red: "bg-red-500/10 border-red-400/20",
  };

  return (
    <div
      className={`rounded-xl border p-4 text-center ${toneMap[tone]} transition overflow-hidden`}>
      <p className="text-xs sm:text-sm text-white/60 truncate">{label}</p>
      <p className="text-lg sm:text-xl font-semibold text-white mt-1 truncate">
        {value}
      </p>
    </div>
  );
}
