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
      <div className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-gray-900 animate-pulse">
        Loading GitHub data...
      </div>
    );

  if (error)
    return (
      <div className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );

  if (!profile) return null;

  return (
    <div className="p-6 rounded-2xl shadow-lg border bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-xl sm:text-2xl font-bold">GitHub</h2>
          <p className="text-gray-500 text-sm">@{profile.username}</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm">
            <span>⭐ {profile.publicRepos} Repos</span>
            <span>👥 {profile.followers} Followers</span>
            <span>➡ {profile.following} Following</span>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm transition">
            View GitHub Profile →
          </a>
        </div>
      </div>
    </div>
  );
}
