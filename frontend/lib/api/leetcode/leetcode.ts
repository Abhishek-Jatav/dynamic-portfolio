// lib/leetcode.ts

import { BACKEND_URL } from "../../env";

export interface LeetcodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastUpdated: string;
}

export async function getLeetcodeStats(): Promise<LeetcodeStats> {
  try {
    const res = await fetch(`${BACKEND_URL}/leetcode/stats`, {
      method: "GET",
      cache: "no-store", // always fetch fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch LeetCode stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("LeetCode API Error:", error);
    throw error;
  }
}
