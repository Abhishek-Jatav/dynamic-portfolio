export async function pingBackend(): Promise<boolean> {
  const controller = new AbortController();

  // ✅ Increased timeout (Render cold start fix)
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://dynamic-portfolio-backend-d6lt.onrender.com");

  if (!BACKEND_URL) {
    throw new Error("Backend URL not defined in env");
  }

  try {
    const res = await fetch(`${BACKEND_URL}/ping`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,

      // ❌ REMOVED (causing CORS issues)
      // credentials: "include",
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
