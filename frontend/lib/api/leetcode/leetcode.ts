import { NextResponse } from "next/server";
import { BACKEND_URL } from "../../env";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/leetcode/stats`, {
      method: "GET",
      cache: "no-store", // avoid Next.js caching
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch LeetCode stats" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while fetching LeetCode stats" },
      { status: 500 },
    );
  }
}
