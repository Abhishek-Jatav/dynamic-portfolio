"use client";

import { ReactNode } from "react";
import { useBackendWake } from "@/hooks/backendCheck/useBackendWake";
import Connecting from "../backendCheck/Connecting";

export default function BackendGate({ children }: { children: ReactNode }) {
  const serverAwake = useBackendWake();

  if (!serverAwake) {
    return <Connecting error={null} />;
  }

  return <>{children}</>;
}
