"use client";

import { useEffect, useState } from "react";
import ReactionTestGame from "./game/reactionTest/reactionTestGame";

export default function Connecting({ error }: { error: string | null }) {
  const [dots, setDots] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const maxTime = 60;

  // Dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Timer countdown (auto extend +10 sec)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 10; // reset to +10 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress calculation
  const progress = Math.pow(Math.min(timeLeft, maxTime) / maxTime, 3);

  // ✅ Convert to percentage (0–100)
  const percentage = Math.round((Math.min(timeLeft, maxTime) / maxTime) * 100);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020617] text-white overflow-hidden z-[9999]">
      {/* Game */}
      <div className="flex justify-center items-center h-full w-full">
        <ReactionTestGame />
        {/* <DinoGame/> */}
      </div>

      {/* Floating Card */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 md:px-8 flex justify-center">
        <div className="w-full bg-[#0b1220]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.9)] p-6 relative">
          {/* Grid */}
          <div className="grid grid-cols-[1fr_auto] gap-6 items-center">
            {/* Text Section */}
            <div>
              <div className="font-bold text-base flex items-center gap-2 text-white">
                🔌 Connecting to server
                <span className="animate-pulse text-blue-400">{dots}</span>
              </div>

              <div className="text-white text-sm mt-2 leading-relaxed font-medium">
                This app is hosted on a free server, so it may take a moment to
                wake up.{" "}
                <span className="font-semibold text-white ml-2">
                  Sorry for the wait 🙏
                </span>
              </div>
            </div>

            {/* ✅ Percentage instead of seconds */}
            <div className="row-span-2 flex flex-col items-center justify-center min-w-[100px]">
              <div className="text-5xl font-extrabold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {percentage}%
              </div>
              <div className="text-xs text-white/70 uppercase tracking-wide mt-1">
                loading
              </div>
            </div>

            {/* Progress Bar */}
            <div className="col-start-1 mt-1">
              <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm mt-3 text-center font-semibold">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
