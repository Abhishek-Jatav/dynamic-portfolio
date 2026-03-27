"use client";

import { useEffect, useRef, useState } from "react";
import { pingBackend } from "./ping";

export function useBackendWake() {
  const [serverAwake, setServerAwake] = useState(false);

  const isMounted = useRef(true);
  const isPinging = useRef(false);
  const failCount = useRef(0);

  useEffect(() => {
    isMounted.current = true;

    const checkBackend = async () => {
      // 🚫 prevent overlapping calls
      if (isPinging.current) return;

      isPinging.current = true;

      try {
        const ok = await pingBackend();

        if (!isMounted.current) return;

        if (ok) {
          failCount.current = 0;
          setServerAwake(true);
        } else {
          failCount.current++;
        }
      } catch {
        if (!isMounted.current) return;
        failCount.current++;
      } finally {
        // ❗ only mark down after 2 consecutive failures
        if (failCount.current >= 2 && isMounted.current) {
          setServerAwake(false);
        }

        isPinging.current = false;
      }
    };

    // 🚀 initial call
    checkBackend();

    // 🔁 run every 3 seconds
    const interval = setInterval(checkBackend, 3000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return serverAwake;
}
