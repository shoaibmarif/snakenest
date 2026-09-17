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

  const cardBaseClass = isDark
    ? 'bg-slate-900/70 border-white/10 text-white shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
    : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-[0_8px_16px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_#ffffff]';

  const labelColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none mx-auto space-y-3">
      {/* Top Floating HUD Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {/* Score Card */}
        <div className={`rounded-2xl border p-3.5 sm:p-4 text-center backdrop-blur-md transition-all ${cardBaseClass}`}>
          <div className={`flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mb-0.5 ${labelColor}`}>
            <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>
            <span>Score</span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-mono">
            {gameState.score}
          </div>
        </div>

        {/* Best / High Score Card */}
        <div className={`rounded-2xl border p-3.5 sm:p-4 text-center backdrop-blur-md relative overflow-hidden transition-all ${cardBaseClass}`}>
          {gameState.isNewHighScore && gameState.score > 0 && (
            <div className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
          )}
          <div className={`flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mb-0.5 ${labelColor}`}>
            <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <Trophy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>
            <span>Record</span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-amber-500 font-mono">
            {gameState.highScore}
          </div>
        </div>

        {/* Food Count or Countdown Timer */}
        {isTimeChallenge ? (
          <div className={`rounded-2xl border p-3.5 sm:p-4 text-center backdrop-blur-md transition-all ${
            isDark
              ? 'border-rose-500/30 bg-rose-950/25 shadow-[0_8px_16px_-6px_rgba(244,63,94,0.2),inset_0_1px_0_0_rgba(244,63,94,0.2)]'
              : 'border-rose-200 bg-rose-50/90 shadow-sm'
          }`}>
            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-rose-500 mb-0.5">
              <Clock className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 animate-pulse" />
              <span>Time Left</span>
            </div>
            <div className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-mono ${
              gameState.timeRemainingSeconds <= 10 ? 'text-rose-600 animate-pulse' : 'text-rose-500'
            }`}>
              {gameState.timeRemainingSeconds}s
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl border p-3.5 sm:p-4 text-center backdrop-blur-md transition-all ${cardBaseClass}`}>
            <div className={`flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mb-0.5 ${labelColor}`}>
              <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Apple className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
              <span>Apples</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-500 font-mono">
              {gameState.foodCount}
            </div>
          </div>
        )}
      </div>

      {/* Sub-bar: Level & Game Mode */}
      <div className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-medium backdrop-blur-md transition-all ${
        isDark
          ? 'bg-slate-900/40 border-white/5 text-slate-400'
          : 'bg-white/80 border-slate-200/80 text-slate-600 shadow-sm'
      }`}>
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Flame className="h-3 w-3" />
          </div>
          <span>Level <strong className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{gameState.level}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${gameState.status === 'playing' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
          <span className={`capitalize font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {settings.difficulty} • {settings.gameMode}
          </span>
        </div>
      </div>
    </div>
  );
};
