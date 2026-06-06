"use client";

import { useEffect, useState } from "react";
import { getGithubProfile, GithubProfile } from "../../lib/api/github/github";
import { Github } from "lucide-react";

export default function GithubStats() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getGithubProfile();
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return (
    <PlatformCard>
      <div className="animate-pulse space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full" style={{ background: "var(--border-card)" }} />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-28 rounded-lg" style={{ background: "var(--border-card)" }} />
            <div className="h-3 w-36 rounded-lg" style={{ background: "var(--border-card)" }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map(i => (
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

  if (!profile) return null;

  const stats = [
    { label: "Repos", value: profile.publicRepos, color: "var(--accent)" },
    { label: "Followers", value: profile.followers, color: "#10b981" },
    { label: "Following", value: profile.following, color: "#f59e0b" },
  ];

  return (
    <PlatformCard>
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-14 h-14 rounded-2xl object-cover"
            style={{ border: "2px solid var(--border-card)" }}
          />
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#1f2937", border: "1px solid var(--border-card)" }}
          >
            <Github size={10} style={{ color: "white" }} />
          </div>
        </div>
        <div className="min-w-0">
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            GitHub
          </h2>
          <p
            className="text-sm truncate"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            @{profile.username}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-3 text-center"
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
              className="text-lg font-bold"
              style={{ color: s.color, fontFamily: "var(--font-display)" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <a
        href={profile.profileUrl}
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
