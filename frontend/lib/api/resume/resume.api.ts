// lib/getResumeUrl.ts

export function getResumeUrl(): string {
  const url = process.env.NEXT_PUBLIC_RESUME_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_RESUME_URL is not defined in environment variables",
    );
  }

  return url;
}
