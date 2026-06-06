"use client";

import { useEffect, useState } from "react";
import { fetchLeetcodeDSA, LeetcodeDSAStats } from "../../lib/api/leetcode/leetcode";
import { Code } from "lucide-react";

export default function LeetcodeStats() {
  const [data, setData] = useState<LeetcodeDSAStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await fetchLeetcodeDSA();
        setData(stats);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return (
    <PlatformCard>
      <div className="animate-pulse space-y-5">
        <div className="h-5 w-28 rounded-lg" style={{ background: "var(--border-card)" }} />
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-16 rounded-2xl" style={{ background: "var(--border-card)" }} />
          ))}
        </div>
      </div>
    </PlatformCard>
  );

  if (error) return (
    <PlatformCard>
      <p className="text-red-400 text-sm">{error}</p>
    </PlatformCard>
  );

  if (!data) return null;

  const statBoxes = [
    { label: "Total", value: data.totalSolved, color: "var(--accent)" },
    { label: "Easy", value: data.easySolved, color: "#10b981" },
    { label: "Medium", value: data.mediumSolved, color: "#f59e0b" },
    { label: "Hard", value: data.hardSolved, color: "#ef4444" },
  ];

  // Solve rate for total
  const maxKnown = 3000;
  const percent = Math.min(Math.round((data.totalSolved / maxKnown) * 100), 100);

  return (
    <PlatformCard>
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{
              background: "rgba(234,179,8,0.15)",
              border: "1px solid rgba(234,179,8,0.3)",
            }}
          >
            <Code size={18} style={{ color: "#eab308" }} />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              LeetCode
            </h2>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              @{data.username}
            </p>
          </div>
        </div>

        <span
          className="px-3 py-1 rounded-full text-[10px] font-semibold"
          style={{
            background: "rgba(234,179,8,0.1)",
            border: "1px solid rgba(234,179,8,0.3)",
            color: "#eab308",
            fontFamily: "var(--font-mono)",
          }}
        >
          DSA
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <span>Solved {data.totalSolved}+ problems</span>
          <span>{percent}%</span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border-card)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percent}%`,
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {statBoxes.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p
              className="text-xs mb-1"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {s.label}
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: s.color, fontFamily: "var(--font-display)" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <a
        href={`https://leetcode.com/u/${data.username}/`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
        style={{ color: "var(--accent)" }}
      >
        View Profile <span>→</span>
      </a>
    </PlatformCard>
  );
}

function PlatformCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-full w-full glass-card rounded-3xl p-6 sm:p-7 stat-card-border-top"
      style={{ background: "var(--bg-card)" }}
    >
      {children}
    </div>
  );
}
