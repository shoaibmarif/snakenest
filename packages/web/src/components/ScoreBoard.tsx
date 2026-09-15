import React from 'react';
import type { GameState, GameSettings } from '@project/core';
import { Trophy, Apple, Flame, Clock, Award } from 'lucide-react';

interface ScoreBoardProps {
  gameState: GameState;
  settings: GameSettings;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState, settings }) => {
  const isTimeChallenge = settings.gameMode === 'time-challenge';
  const isDark = settings.theme === 'dark';

  const cardBg = isDark
    ? 'bg-slate-900/80 border-slate-800 text-white'
    : 'bg-white border-slate-200 text-slate-900 shadow-sm';

  const labelColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-3">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Current Score */}
        <div className={`rounded-xl border p-3 text-center backdrop-blur-sm transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-center gap-1 text-[11px] font-medium mb-0.5 ${labelColor}`}>
            <Award className="h-3.5 w-3.5 text-blue-500" />
            <span>Score</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight font-mono">
            {gameState.score}
          </div>
        </div>

        {/* High Score */}
        <div className={`rounded-xl border p-3 text-center backdrop-blur-sm relative overflow-hidden transition-colors ${cardBg}`}>
          {gameState.isNewHighScore && gameState.score > 0 && (
            <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          )}
          <div className={`flex items-center justify-center gap-1 text-[11px] font-medium mb-0.5 ${labelColor}`}>
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>Best</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-amber-500 font-mono">
            {gameState.highScore}
          </div>
        </div>

        {/* Food Count or Timer */}
        {isTimeChallenge ? (
          <div className={`rounded-xl border p-3 text-center backdrop-blur-sm transition-colors ${
            isDark ? 'border-rose-900/40 bg-rose-950/20' : 'border-rose-200 bg-rose-50 shadow-sm'
          }`}>
            <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-rose-500 mb-0.5">
              <Clock className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
              <span>Time Left</span>
            </div>
            <div className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${gameState.timeRemainingSeconds <= 10 ? 'text-rose-600 animate-bounce' : 'text-rose-500'}`}>
              {gameState.timeRemainingSeconds}s
            </div>
          </div>
        ) : (
          <div className={`rounded-xl border p-3 text-center backdrop-blur-sm transition-colors ${cardBg}`}>
            <div className={`flex items-center justify-center gap-1 text-[11px] font-medium mb-0.5 ${labelColor}`}>
              <Apple className="h-3.5 w-3.5 text-emerald-500" />
              <span>Apples</span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-500 font-mono">
              {gameState.foodCount}
            </div>
          </div>
        )}
      </div>

      {/* Sub-bar: Level & Difficulty */}
      <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs transition-colors ${
        isDark ? 'bg-slate-900/40 border-slate-800/60 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
      }`}>
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          <span>Level <strong className={`font-mono ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{gameState.level}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`capitalize font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {settings.difficulty} ({settings.gameMode})
          </span>
        </div>
      </div>
    </div>
  );
};
