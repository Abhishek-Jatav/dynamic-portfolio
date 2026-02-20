"use client";

import { useEffect, useState } from "react";
import { getGithubProfile, GithubProfile } from "../../lib/api/github/github";

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

  if (loading)
    return (
      <PremiumCard>
        <div className="animate-pulse space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-3 w-44 rounded bg-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-14 rounded-xl bg-white/10" />
            <div className="h-14 rounded-xl bg-white/10" />
            <div className="h-14 rounded-xl bg-white/10" />
          </div>
        </div>
      </PremiumCard>
    );

  if (error)
    return (
      <PremiumCard>
        <p className="text-red-400 text-sm break-words">Error: {error}</p>
      </PremiumCard>
    );

  if (!profile) return null;

  return (
    <PremiumCard>
      <div className="flex items-center gap-5 min-w-0">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border border-white/10 object-cover"
        />

        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            GitHub
          </h2>
          <p className="text-sm text-white/60 truncate">@{profile.username}</p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <MiniStat label="Repos" value={profile.publicRepos} />
        <MiniStat label="Followers" value={profile.followers} />
        <MiniStat label="Following" value={profile.following} />
      </div>

      <div className="mt-7">
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-white hover:text-white/80 transition">
          View Profile →
        </a>
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

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center overflow-hidden">
      <p className="text-xs text-white/60 truncate">{label}</p>
      <p className="text-lg font-semibold text-white mt-1 truncate">{value}</p>
    </div>
  );
}
