"use client";

import { useEffect, useRef, useState } from "react";
import { pingBackend } from "@/lib/api/ping";

const RETRY_DELAY = 5000; // check every 5 seconds

export function useBackendStatus() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>("Checking backend...");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkBackend = async () => {
    try {
      await pingBackend();
      setConnected(true);
      setError(null);
    } catch {
      setConnected(false);
      setError("Backend not reachable");
    }

    timeoutRef.current = setTimeout(checkBackend, RETRY_DELAY);
  };

  useEffect(() => {
    checkBackend();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { connected, error };
}
