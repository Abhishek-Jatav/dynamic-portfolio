import { BACKEND_URL } from "../../env";

export interface GithubProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  profileUrl: string;
  joinedAt: string;
}

export async function getGithubProfile(): Promise<GithubProfile> {
  const res = await fetch(`${BACKEND_URL}/github/profile`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  return res.json();
}
