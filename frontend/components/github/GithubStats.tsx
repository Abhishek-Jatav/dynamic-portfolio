"use client";

import { useEffect, useState } from "react";
import {
  getGithubProfile,
  getGithubRepos,
  GithubProfile,
  GithubRepo,
} from "../../lib/api/github/github";

export default function GithubStats() {
  // ✅ FIXED
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileData, reposData] = await Promise.all([
          getGithubProfile(),
          getGithubRepos(),
        ]);

        setProfile(profileData);
        setRepos(reposData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 border rounded-xl shadow-md">
        Loading GitHub data...
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

  if (!profile) return null;

  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white dark:bg-gray-900 space-y-6">
      {/* Profile Section */}
      <div className="flex items-center gap-6">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-24 h-24 rounded-full border"
        />

        <div>
          <h2 className="text-2xl font-bold">GitHub</h2>
          <p className="text-gray-500">@{profile.username}</p>

          <div className="flex gap-4 mt-3 text-sm">
            <span>⭐ {profile.publicRepos} Repos</span>
            <span>👥 {profile.followers} Followers</span>
            <span>➡ {profile.following} Following</span>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline text-sm">
            View GitHub Profile
          </a>
        </div>
      </div>

    </div>
  );
}
