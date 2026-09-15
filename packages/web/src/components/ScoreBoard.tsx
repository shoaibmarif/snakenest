import React from 'react';
import type { GameState, GameSettings } from '@project/core';
import { Trophy, Apple, Flame, Clock, Award } from 'lucide-react';

interface ScoreBoardProps {
  gameState: GameState;
  settings: GameSettings;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState, settings }) => {
  const isTimeChallenge = settings.gameMode === 'time-challenge';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-3">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Current Score */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-slate-400 mb-0.5">
            <Award className="h-3.5 w-3.5 text-blue-400" />
            <span>Score</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
            {gameState.score}
          </div>
        </div>

        {/* High Score */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center backdrop-blur-sm shadow-sm relative overflow-hidden">
          {gameState.isNewHighScore && gameState.score > 0 && (
            <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          )}
          <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-slate-400 mb-0.5">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Best</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-amber-400 font-mono">
            {gameState.highScore}
          </div>
        </div>

        {/* Food Count or Timer */}
        {isTimeChallenge ? (
          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-3 text-center backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-rose-400 mb-0.5">
              <Clock className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
              <span>Time Left</span>
            </div>
            <div className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${gameState.timeRemainingSeconds <= 10 ? 'text-rose-500 animate-bounce' : 'text-rose-400'}`}>
              {gameState.timeRemainingSeconds}s
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-slate-400 mb-0.5">
              <Apple className="h-3.5 w-3.5 text-emerald-400" />
              <span>Apples</span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-400 font-mono">
              {gameState.foodCount}
            </div>
          </div>
        )}
      </div>

      {/* Sub-bar: Level & Difficulty */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span>Level <strong className="text-slate-200 font-mono">{gameState.level}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="capitalize font-medium text-slate-300">
            {settings.difficulty} ({settings.gameMode})
          </span>
        </div>
      </div>
    </div>
  );
};

