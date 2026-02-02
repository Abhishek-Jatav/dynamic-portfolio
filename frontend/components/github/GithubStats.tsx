"use client";

import { useEffect, useState } from "react";

type GithubProfile = {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  profileUrl: string;
  joinedAt: string;
};

type GithubRepo = {
  name: string;
  description: string;
  stars: number;
  language: string;
  repoUrl: string;
};

export default function GithubStats() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch GitHub data");

        const data = await res.json();
        setProfile(data.profile);
        setRepos(data.repos);
      } catch {
        setError("Unable to load GitHub stats");
      } finally {
        setLoading(false);
      }
    };

    fetchGithub();
  }, []);

  if (loading) return <p>Loading GitHub data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <div className="space-y-4 max-w-xl">
      {/* Profile Card */}
      <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500">@{profile.username}</p>
          <p className="text-sm mt-1">{profile.bio}</p>

          <div className="text-xs text-gray-600 mt-2 space-x-3">
            <span>👥 {profile.followers} followers</span>
            <span>➡️ {profile.following} following</span>
            <span>📦 {profile.publicRepos} repos</span>
          </div>
        </div>
      </div>

      {/* Top Repos */}
      <div>
        <h3 className="font-semibold mb-2">⭐ Top Repositories</h3>

        <div className="grid gap-3">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.repoUrl}
              target="_blank"
              className="block p-3 border rounded-lg hover:shadow transition">
              <div className="flex justify-between">
                <span className="font-medium">{repo.name}</span>
                <span className="text-sm">⭐ {repo.stars}</span>
              </div>

              <p className="text-sm text-gray-600 mt-1">{repo.description}</p>

              {repo.language && (
                <p className="text-xs text-gray-500 mt-1">🧠 {repo.language}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
