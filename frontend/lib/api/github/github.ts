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
  try {
    const res = await fetch(`${BACKEND_URL}/github/profile`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", errorText);
      throw new Error(`Backend error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw new Error("Failed to fetch GitHub profile");
  }
}
