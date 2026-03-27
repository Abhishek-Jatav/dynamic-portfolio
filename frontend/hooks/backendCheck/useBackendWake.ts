"use client";

import { useEffect, useState } from "react";
import { pingBackend } from "./ping";

export function useBackendWake() {
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkBackend = async () => {
      try {
        await pingBackend();
        if (isMounted) setServerAwake(true);
      } catch {
        if (isMounted) setServerAwake(false);
      }
    };

    // Initial check
    checkBackend();

    // ✅ Slower interval (better for Render cold start)
    const interval = setInterval(checkBackend, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return serverAwake;
}
