"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../lib/env";

export function useBackendWake() {
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    if (!BACKEND_URL) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/ping`);
        if (res.ok) {
          setServerAwake(true);
          clearInterval(interval);
        }
      } catch {
        // ignore errors
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return serverAwake;
}
