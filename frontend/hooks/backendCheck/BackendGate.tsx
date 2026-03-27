"use client";

import { ReactNode, useEffect, useState } from "react";
import { useBackendWake } from "./useBackendWake";
import Connecting from "../backendCheck/Connecting";
import ReactionTestGame from "../backendCheck/game/reactionTest/reactionTestGame";

export default function BackendGate({ children }: { children: ReactNode }) {
  const serverAwake = useBackendWake();
  const [hasConnectedOnce, setHasConnectedOnce] = useState(false);

  useEffect(() => {
    if (serverAwake) {
      setHasConnectedOnce(true);
    }
  }, [serverAwake]);

  // 🚫 Block ONLY before first successful connection
  if (!serverAwake && !hasConnectedOnce) {
    return (
      <div className="fixed inset-0 w-full h-full bg-[#020617] text-white z-[9999] flex flex-col">
        {/* 🔝 Connecting */}
        <div className="h-[20vh] w-full">
          <Connecting error={null} />
        </div>

        {/* 🎮 Game */}
        <div className="h-[80vh] w-full flex justify-center items-center">
          <ReactionTestGame />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
