"use client";

import { useBackendWake } from "@/hooks/backendCheck/useBackendWake";
import { useReactionGame } from "@/hooks/backendCheck/game/reactionTest/useReactionGame";
import GameUI from "./GameUI";

export default function ReactionTestGame() {
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
