"use client";

import { useEffect, useRef, useState } from "react";
import { pingBackend } from "@/lib/api/ping";

const RETRY_DELAY = 2000; // 2 seconds between checks

export function useBackendStatus() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>("Checking backend...");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);

  const scheduleNextCheck = (delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      checkBackend();
    }, delay);
  };

  const checkBackend = async () => {
    if (isCheckingRef.current) return; // prevent overlapping calls
    isCheckingRef.current = true;

    try {
      await pingBackend();

      // backend is alive
      setConnected(true);
      setError(null);

      // schedule next check after 2 seconds
      scheduleNextCheck(RETRY_DELAY);
    } catch {
      // backend is down
      setConnected(false);
      setError("Backend not reachable, retrying...");

      // retry after 2 seconds
      scheduleNextCheck(RETRY_DELAY);
    } finally {
      isCheckingRef.current = false;
    }
  };

  useEffect(() => {
    checkBackend(); // first check immediately

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { connected, error };
}
