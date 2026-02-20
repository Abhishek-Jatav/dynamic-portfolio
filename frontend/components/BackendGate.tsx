"use client";

import { ReactNode } from "react";
import { useBackendWake } from "@/hooks/useBackendWake";
import Connecting from "./Connecting";

export default function BackendGate({ children }: { children: ReactNode }) {
  const serverAwake = useBackendWake();

  if (!serverAwake) {
    return <Connecting error={null} />;
  }

  return <>{children}</>;
}
