import React, { useState } from 'react';
import type { GameState, GameSettings } from '@project/core';
import {
  Play,
  RotateCcw,
  Trophy,
  Clock,
  Apple,
  Sparkles,
  Gamepad2,
  Share2,
  Layers
} from 'lucide-react';
import { shareGameScore } from '../utils/share.js';

interface GameOverlayProps {
  gameState: GameState;
  settings: GameSettings;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
  onOpenModesModal?: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameState,
  settings,
  onStart,
  onResume,
  onRestart,
  onOpenModesModal
}) => {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  if (gameState.status === 'playing') return null;

  const isDark = settings.theme === 'dark';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-600';

  const handleShare = async () => {
    const res = await shareGameScore(gameState.score, settings.gameMode);
    setShareFeedback(res.message);
    setTimeout(() => setShareFeedback(null), 3500);
  };

  const secondaryBtnClass = isDark
    ? 'border-white/10 bg-slate-900/80 text-slate-200 hover:bg-slate-800 shadow-sm'
    : 'border-slate-200/90 bg-white text-slate-800 hover:bg-slate-50 shadow-sm';

  return (
    <div className={`absolute inset-0 z-30 flex items-center justify-center p-5 backdrop-blur-xl rounded-3xl animate-in fade-in duration-200 transition-all ${
      isDark ? 'bg-[#090e17]/85' : 'bg-white/90'
    }`}>
      {/* 1. READY SCREEN */}
      {gameState.status === 'ready' && (
        <div className="text-center max-w-xs sm:max-w-sm space-y-3 sm:space-y-5">
          {/* Glowing Retro Badge */}
          <div className="relative inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] text-white mx-auto">
            <Gamepad2 className="h-8 w-8 sm:h-10 sm:w-10 drop-shadow-md" />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-amber-400 text-[10px] sm:text-[11px] font-bold text-slate-950 shadow-md">
              ⚡
            </div>
          </div>

          <div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${headingColor}`}>
              Ready to Play?
            </h2>
            <p className={`text-[11px] sm:text-xs mt-1 sm:mt-1.5 leading-relaxed font-normal ${subTextColor}`}>
              Direct the snake using Arrow keys, WASD, or swipe. Collect apples, avoid walls, and beat your best run.
            </p>
          </div>

          <div className={`flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl border ${
            isDark
              ? 'bg-slate-900/80 border-white/10 text-slate-300'
              : 'bg-slate-100/90 border-slate-200 text-slate-700'
          }`}>
            <span className="capitalize text-emerald-500 font-bold">{settings.gameMode}</span>
            <span>•</span>
            <span className="capitalize text-blue-500 font-semibold">{settings.difficulty} speed</span>
          </div>

          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-wide text-white shadow-[0_12px_24px_-4px_rgba(16,185,129,0.4)] hover:brightness-110 transition-all transform active:scale-95 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Launch Game</span>
          </button>
        </div>
      )}

      {/* 2. PAUSED SCREEN */}
      {gameState.status === 'paused' && (
        <div className="text-center max-w-xs space-y-5">
          <div className={`h-16 w-16 rounded-3xl border flex items-center justify-center mx-auto shadow-md ${
            isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Clock className="h-8 w-8 animate-pulse" />
          </div>

          <div>
            <h2 className={`text-2xl font-black tracking-tight ${headingColor}`}>Game Paused</h2>
            <p className={`text-xs mt-1 font-normal ${subTextColor}`}>Take a breath, your score is locked.</p>
          </div>

          <div className="space-y-2.5 pt-1">
            <button
              onClick={onResume}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_20px_-4px_rgba(37,99,235,0.4)] hover:brightness-110 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Resume Action</span>
            </button>

            <button
              onClick={onRestart}
              className={`w-full flex items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${secondaryBtnClass}`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Run</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. GAME OVER SCREEN */}
      {gameState.status === 'game-over' && (
        <div className="text-center max-w-xs sm:max-w-sm space-y-2.5 sm:space-y-4">
          {gameState.isNewHighScore ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-amber-500 animate-pulse shadow-sm">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>NEW HIGH SCORE!</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-rose-500">
              <span>GAME OVER</span>
            </div>
          )}

          <div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight font-mono ${headingColor}`}>
              {gameState.score}
            </div>
            <div className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 ${subTextColor}`}>
              Final Score in <span className="capitalize font-bold text-emerald-500">{settings.gameMode}</span> (Level {gameState.level})
            </div>
          </div>

          {/* Detailed Run Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-0.5 sm:py-1">
            <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-2.5 text-center ${
              isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-center text-amber-500 mb-0.5">
                <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className={`text-xs sm:text-sm font-black font-mono ${headingColor}`}>{gameState.highScore}</div>
              <div className={`text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider ${subTextColor}`}>Record</div>
            </div>

            <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-2.5 text-center ${
              isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-center text-emerald-500 mb-0.5">
                <Apple className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className={`text-xs sm:text-sm font-black font-mono ${headingColor}`}>{gameState.foodCount}</div>
              <div className={`text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider ${subTextColor}`}>Apples</div>
            </div>

            <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-2.5 text-center ${
              isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-center text-blue-500 mb-0.5">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className={`text-xs sm:text-sm font-black font-mono ${headingColor}`}>{Math.round(gameState.elapsedTimeSeconds)}s</div>
              <div className={`text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider ${subTextColor}`}>Time</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-0.5 sm:pt-1">
            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_20px_-4px_rgba(16,185,129,0.4)] hover:brightness-110 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Play Again</span>
            </button>





            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleShare}
                className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2 sm:py-2.5 px-2.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${secondaryBtnClass}`}
              >
                <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" />
                <span>Share Run</span>
              </button>

              {onOpenModesModal && (
                <button
                  onClick={onOpenModesModal}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2 sm:py-2.5 px-2.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${secondaryBtnClass}`}
                >
                  <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-500" />
                  <span>Modes</span>
                </button>
              )}
            </div>

            {shareFeedback && (
              <div className="text-[10px] sm:text-[11px] text-emerald-500 font-semibold animate-in fade-in">
                {shareFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
