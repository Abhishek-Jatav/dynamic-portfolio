"use client";

import { useEffect, useState } from "react";
import ReactionTestGame from "./game/reactionTest/reactionTestGame";

export default function Connecting({ error }: { error: string | null }) {
  const [dots, setDots] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(50);

  // Dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Timer countdown (fixed)
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Status Box */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl shadow-xl z-50 w-[260px]">
        <div className="font-semibold text-sm">
          🔌 Connecting to server
          <span className="inline-block w-[18px]">{dots}</span>
        </div>

        {/* Apology + explanation */}
        <div className="text-white/70 text-[11px] mt-2 leading-snug">
          This app is hosted on a free server, so it may take a moment to wake
          up.
          <br />
          <span className="text-white/90">Sorry for the wait 🙏</span>
        </div>

        {/* Timer */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span>Waking server...</span>
            <span className="font-mono">{timeLeft}s</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 50) * 100}%` }}
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-[10px] mt-2">{error}</div>}
      </div>

      {/* Center Game */}
      <div className="flex justify-center items-center min-h-screen">
        <ReactionTestGame />
      </div>
    </div>
  );
}
