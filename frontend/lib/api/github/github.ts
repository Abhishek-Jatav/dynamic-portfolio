import { NextResponse } from "next/server";
import { BACKEND_URL } from "../../env";

export async function GET() {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${BACKEND_URL}/github/profile`, { cache: "no-store" }),
      fetch(`${BACKEND_URL}/github/repos`, { cache: "no-store" }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 500 },
      );
    }

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    return NextResponse.json({
      profile,
      repos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while fetching GitHub data" },
      { status: 500 },
    );
  }
}
