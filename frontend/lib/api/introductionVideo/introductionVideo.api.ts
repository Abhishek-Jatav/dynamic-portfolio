// lib/getIntroductionVideoUrl.ts

export function getIntroductionVideoUrl(): string {
  const url = process.env.NEXT_PUBLIC_INTRODUCTION_VIDEO_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_INTRODUCTION_VIDEO_URL is not defined in environment variables",
    );
  }

  return url;
}
