"use client";

import { useEffect, useRef, useState } from "react";

type GameState = "waiting" | "ready" | "clicked" | "tooSoon";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ServerWakeGame() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [serverAwake, setServerAwake] = useState(false);

  const [secondsPlayed, setSecondsPlayed] = useState(0);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔊 Load click sound
  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    );
  }, []);

  // 🏆 Load best score
  useEffect(() => {
    const saved = localStorage.getItem("bestReaction");
    if (saved) setBestScore(Number(saved));
  }, []);

  // ⏱ Track how long user is playing
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsPlayed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔌 Ping backend every 5 sec until awake
  useEffect(() => {
    if (!BACKEND_URL) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/health`);
        if (res.ok) {
          setServerAwake(true);
          clearInterval(interval);
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    if (serverAwake) return;

    setReactionTime(null);
    setGameState("waiting");

    const delay = Math.random() * 3000 + 2000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("ready");
    }, delay);
  };

  const handleClick = () => {
    if (serverAwake) return;

    if (gameState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("tooSoon");
      setStreak(0);
      return;
    }

    if (gameState === "ready") {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState("clicked");

      audioRef.current?.play();

      if (!bestScore || time < bestScore) {
        setBestScore(time);
        localStorage.setItem("bestReaction", String(time));
      }

      setStreak((prev) => prev + 1);
    }
  };

  // Auto restart game after each round
  useEffect(() => {
    if (serverAwake) return;

    if (gameState === "clicked" || gameState === "tooSoon") {
      const restart = setTimeout(() => {
        startGame();
      }, 1200);

      return () => clearTimeout(restart);
    }
  }, [gameState, serverAwake]);

  useEffect(() => {
    startGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getBackground = () => {
    if (serverAwake) return "bg-gradient-to-br from-teal-500 to-emerald-700";

    switch (gameState) {
      case "waiting":
        return "bg-gradient-to-br from-gray-900 to-gray-700";
      case "ready":
        return "bg-gradient-to-br from-green-500 to-emerald-700";
      case "tooSoon":
        return "bg-gradient-to-br from-red-500 to-rose-700";
      case "clicked":
        return "bg-gradient-to-br from-indigo-600 to-purple-800";
      default:
        return "";
    }
  };

  const getMessage = () => {
    if (serverAwake) return "🚀 Server is Awake!";

    switch (gameState) {
      case "waiting":
        return "Wait for green...";
      case "ready":
        return "CLICK NOW!";
      case "tooSoon":
        return "Too soon! 😅";
      case "clicked":
        return `${reactionTime} ms`;
      default:
        return "";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${getBackground()}
      flex flex-col items-center justify-center
      w-full min-h-screen text-white text-center
      px-4 transition-all duration-300 cursor-pointer`}>
      {/* ⏱ PLAY TIME TOP LEFT */}
      {/* <div className="absolute top-4 left-4 text-lg font-semibold bg-black/30 px-4 py-2 rounded-xl backdrop-blur">
        ⏱ {secondsPlayed}s
      </div> */}

      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold">
          ⚡ Reaction Speed Test
        </h1>

        {gameState === "waiting" && !serverAwake && (
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 animate-pulse" />
        )}

        <p className="text-lg sm:text-2xl font-medium">{getMessage()}</p>

        {bestScore && (
          <p className="text-sm sm:text-base text-gray-200">
            🏆 Best: {bestScore} ms
          </p>
        )}

        <p className="text-sm text-gray-300">🎮 Streak: {streak}</p>
      </div>
    </div>
  );
}
