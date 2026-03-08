// lib/leetcode.ts

import { BACKEND_URL } from "../../env";

/* =============================
   DSA TYPES
============================= */

export interface LeetcodeDSAStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastUpdated: string;
}

/* =============================
   SQL TYPES
============================= */

export interface LeetcodeSQLStats {
  username: string;
  sqlSolved: number;
  lastUpdated: string;
}

/* =============================
   FETCH DSA STATS
============================= */

export async function fetchLeetcodeDSA(): Promise<LeetcodeDSAStats> {
  try {
    const res = await fetch(`${BACKEND_URL}/leetcode/dsa`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch LeetCode DSA stats");
    }

    return await res.json();
  } catch (error) {
    console.error("LeetCode DSA API Error:", error);
    throw error;
  }
}

/* =============================
   FETCH SQL STATS
============================= */

export async function fetchLeetcodeSQL(): Promise<LeetcodeSQLStats> {
  try {
    const res = await fetch(`${BACKEND_URL}/leetcode/sql`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch LeetCode SQL stats");
    }

    return await res.json();
  } catch (error) {
    console.error("LeetCode SQL API Error:", error);
    throw error;
  }
}
