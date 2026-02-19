"use client";

import { ReactNode } from "react";
import { useBackendStatus } from "@/hooks/useBackendStatus";
import Connecting from "./Connecting";

export default function BackendGate({ children }: { children: ReactNode }) {
  const { connected, error } = useBackendStatus();

  if (!connected) {
    return <Connecting error={error} />;
  }

  return <>{children}</>;
}
