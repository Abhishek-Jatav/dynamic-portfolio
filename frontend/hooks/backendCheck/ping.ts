export async function pingBackend(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BACKEND_URL) {
    throw new Error("Backend URL not defined in env");
  }

  try {
    const res = await fetch(`${BACKEND_URL}/ping`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Ping failed: ${res.status}`);
    }

    return true;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Backend timeout");
    }

    throw new Error("Backend unreachable");
  } finally {
    clearTimeout(timeoutId);
  }
}
