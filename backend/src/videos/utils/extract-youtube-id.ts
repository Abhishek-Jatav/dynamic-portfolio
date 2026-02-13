export function extractYoutubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^&\n?#]+)/;

  const match = url.match(regex);
  return match ? match[1] : null;
}
