"use client";

import { useEffect, useState } from "react";
import { pingBackend } from "./ping"; // adjust path if needed

export function useBackendWake() {
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkBackend = async () => {
      try {
        await pingBackend();
        setServerAwake(true);
        clearInterval(interval); // stop polling once awake
      } catch {
        setServerAwake(false);
      }
    };

    // Initial check
    checkBackend();

    // Poll every 3 sec until awake
    interval = setInterval(checkBackend, 3000);

    return () => clearInterval(interval);
  }, []);

  return serverAwake;
}
