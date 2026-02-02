import { BACKEND_URL } from "../env";

export async function pingBackend() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds

  try {
    const res = await fetch(`${BACKEND_URL}/ping`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      signal: controller.signal, // important!
    });

    if (!res.ok) throw new Error("Ping failed");
    return true;
  } finally {
    clearTimeout(timeoutId);
  }
}
