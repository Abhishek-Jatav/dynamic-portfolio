"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../lib/env";

export function useBackendWake() {
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    if (!BACKEND_URL) return;

    const checkBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/ping`);
        setServerAwake(res.ok);
      } catch {
        setServerAwake(false);
      }
    };

    // Check immediately
    checkBackend();

    // Keep polling every 3 seconds (never stops)
    const interval = setInterval(checkBackend, 3000);

    return () => clearInterval(interval);
  }, []);

  return serverAwake;
}
