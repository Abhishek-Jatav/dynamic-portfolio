"use client";

import { useEffect, useState } from "react";
import ReactionTestGame from "./game/reactionTest/reactionTestGame";

export default function Connecting({ error }: { error: string | null }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Status Box */}
      <div className="absolute top-3 left-3 bg-black border border-white-700 text-white text-[11px] px-3 py-2 rounded-lg shadow-lg z-50 max-w-[220px]">
        <div className="font-medium">
          🔌 Connecting to server
          <span className="inline-block w-[18px]">{dots}</span>
        </div>

        <div className="text-white/70 text-[8px] mt-1 leading-tight">
          Backend is on Render. Usually takes 10–15 seconds.
        </div>
      </div>

      {/* Mini Game While Waiting */}
      <div className="flex justify-center items-center min-h-screen">
        <ReactionTestGame />
      </div>
    </div>
  );
}
