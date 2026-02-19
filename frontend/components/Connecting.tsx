"use client";

import { useEffect, useState } from "react";
import TruckLoader from "./common/TruckLoader";
import ServerWakeGame from "./ServerWakeGame";

export default function Connecting({ error }: { error: string | null }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5 px-4">
      {/* Game */}
      <ServerWakeGame />


      {/* Connecting text
      <div className="text-[18px] font-medium text-white text-center">
        🔌 Connecting to backend
        <span className="inline-block w-[24px]">{dots}</span>
      </div>

      <div className="text-[14px] text-white/70 text-center max-w-sm">
        Backend is on Render so usually it takes 10–15 seconds
      </div> */}

      {/* Error */}
      {error && (
        <div className="text-[13px] text-red-300 text-center">{error}</div>
      )}
    </div>
  );
}
