"use client";

import { ReactNode } from "react";
import { useBackendStatus } from "@/hooks/useBackendStatus";
import Connecting from "./Connecting";

export default function BackendGate({ children }: { children: ReactNode }) {
  const { connected } = useBackendStatus();

  if (!connected) {
    return <Connecting />;
  }

  return <>{children}</>;
}
