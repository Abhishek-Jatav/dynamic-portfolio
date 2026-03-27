export async function pingBackend(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BACKEND_URL) {
    console.error("❌ Backend URL missing");
    return false;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/ping`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("❌ Ping failed:", res.status);
      return false;
    }

    return true;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("⏱ Backend timeout");
    } else {
      console.error("❌ Backend unreachable");
    }

    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
