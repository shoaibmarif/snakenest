import React from 'react';
import type { GameState, GameSettings } from '@project/core';
import { Award, Trophy, Apple, Timer } from 'lucide-react';

interface PopupScoreBarProps {
  gameState: GameState;
  settings: GameSettings;
}

export const PopupScoreBar: React.FC<PopupScoreBarProps> = ({
  gameState,
  settings
}) => {
  const isDark = settings.theme === 'dark';
  const isTimeChallenge = settings.gameMode === 'time-challenge';

  const cardBase = isDark
    ? 'border-slate-800/80 bg-slate-900/60 text-slate-100'
    : 'border-slate-200 bg-white text-slate-900 shadow-sm';

  const subText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="w-full px-3 py-1.5 space-y-1.5 select-none">
      <div className="grid grid-cols-3 gap-2">
        {/* Current Score */}
        <div className={`rounded-xl border p-2 text-center transition-all ${cardBase}`}>
          <div className={`flex items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-wider ${subText}`}>
            <Award className="h-3 w-3 text-blue-500" />
            <span>Score</span>
          </div>
          <div className="text-lg font-black font-mono tracking-tight">
            {gameState.score}
          </div>
        </div>

        {/* High Score */}
        <div className={`rounded-xl border p-2 text-center relative transition-all ${cardBase}`}>
          {gameState.isNewHighScore && gameState.score > 0 && (
            <div className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
          )}
          <div className={`flex items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-wider ${subText}`}>
            <Trophy className="h-3 w-3 text-amber-500" />
            <span>Best</span>
          </div>
          <div className="text-lg font-black font-mono tracking-tight text-amber-500">
            {gameState.highScore}
          </div>
        </div>

        {/* Third Metric: Time Remaining or Apples */}
        <div className={`rounded-xl border p-2 text-center transition-all ${cardBase}`}>
          {isTimeChallenge ? (
            <>
              <div className="flex items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-rose-500">
                <Timer className="h-3 w-3 text-rose-500" />
                <span>Timer</span>
              </div>
              <div className="text-lg font-black font-mono tracking-tight text-rose-500">
                {gameState.timeRemainingSeconds}s
              </div>
            </>
          ) : (
            <>
              <div className={`flex items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-wider ${subText}`}>
                <Apple className="h-3 w-3 text-emerald-500" />
                <span>Apples</span>
              </div>
              <div className="text-lg font-black font-mono tracking-tight text-emerald-500">
                {gameState.foodCount}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mode & Difficulty Pill */}
      <div className="flex items-center justify-between px-1 text-[10px]">
        <div className="flex items-center gap-1 font-mono">
          <span className="capitalize font-bold text-emerald-500">{settings.gameMode}</span>
          <span className="opacity-40">•</span>
          <span className="capitalize font-medium text-blue-400">{settings.difficulty}</span>
        </div>
        <div className="text-slate-400 font-mono text-[9px]">
          Level {gameState.level}
        </div>
      </div>
    </div>
  );
};
