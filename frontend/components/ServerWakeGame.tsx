"use client";

import { useBackendWake } from "@/hooks/useBackendWake";
import { useReactionGame } from "@/hooks/useReactionGame";
import GameUI from "./GameUI";

export default function ServerWakeGame() {
  const serverAwake = useBackendWake();

  const { gameState, reactionTime, bestScore, streak, handleClick } =
    useReactionGame(serverAwake);

  return (
    <GameUI
      serverAwake={serverAwake}
      gameState={gameState}
      reactionTime={reactionTime}
      bestScore={bestScore}
      streak={streak}
      onClick={handleClick}
    />
  );
}
