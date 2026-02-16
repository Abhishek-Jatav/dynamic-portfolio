import { BACKEND_URL } from "@/lib/env";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  method: HttpMethod;
  body?: any;
  auth?: boolean; // ✅ if true, attach token
};

function getTokenFromLocalStorage() {
  // ⚠️ localStorage only exists in browser
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions,
): Promise<T> {
  const token = options.auth ? getTokenFromLocalStorage() : null;

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "Request failed";

    try {
      const data = await res.json();
      message = data.message || JSON.stringify(data);
    } catch {
      message = await res.text();
    }

    throw new Error(message);
  }

  return res.json();
}
