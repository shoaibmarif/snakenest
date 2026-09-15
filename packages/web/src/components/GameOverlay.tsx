import React, { useState } from 'react';
import type { GameState, GameSettings } from '@project/core';
import {
  Play,
  RotateCcw,
  Trophy,
  Share2,
  Clock,
  Apple,
  Sparkles,
  Layers
} from 'lucide-react';
import { shareGameScore } from '../utils/share.js';

interface GameOverlayProps {
  gameState: GameState;
  settings: GameSettings;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
  onOpenModesModal: () => void;
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
    ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm';

  return (
    <div className={`absolute inset-0 z-30 flex items-center justify-center p-4 backdrop-blur-md rounded-2xl animate-in fade-in duration-200 transition-colors ${
      isDark ? 'bg-slate-950/80' : 'bg-white/92'
    }`}>
      {/* 1. READY SCREEN */}
      {gameState.status === 'ready' && (
        <div className="text-center max-w-xs sm:max-w-sm space-y-5">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 shadow-xl shadow-emerald-500/20 text-white mx-auto">
            <span className="text-3xl">🐍</span>
          </div>

          <div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${headingColor}`}>
              Ready to Slither?
            </h2>
            <p className={`text-xs mt-1.5 leading-relaxed ${subTextColor}`}>
              Use Arrow keys, WASD, or swipe to guide the snake. Collect apples and avoid collisions.
            </p>
          </div>

          <div className={`flex items-center justify-center gap-2 text-xs font-mono py-1.5 px-3 rounded-lg border ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            <span className="capitalize text-emerald-600 font-semibold">{settings.gameMode}</span>
            <span>•</span>
            <span className="capitalize text-blue-600 font-semibold">{settings.difficulty} speed</span>
          </div>

          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-green-500 transition-all transform active:scale-95"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Start Game</span>
          </button>
        </div>
      )}

      {/* 2. PAUSED SCREEN */}
      {gameState.status === 'paused' && (
        <div className="text-center max-w-xs space-y-4">
          <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mx-auto ${
            isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Clock className="h-6 w-6" />
          </div>

          <div>
            <h2 className={`text-2xl font-bold ${headingColor}`}>Game Paused</h2>
            <p className={`text-xs mt-1 ${subTextColor}`}>Take a breath, your game is safe.</p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={onResume}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Resume Game</span>
            </button>

            <button
              onClick={onRestart}
              className={`w-full flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-medium transition-all ${secondaryBtnClass}`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Run</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. GAME OVER SCREEN */}
      {gameState.status === 'game-over' && (
        <div className="text-center max-w-xs sm:max-w-sm space-y-4">
          {gameState.isNewHighScore ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NEW HIGH SCORE!</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500">
              <span>GAME OVER</span>
            </div>
          )}

          <div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${headingColor}`}>
              Score: {gameState.score}
            </h2>
            <p className={`text-xs mt-1 ${subTextColor}`}>
              Mode: <span className="capitalize font-semibold text-emerald-600">{settings.gameMode}</span> • Level {gameState.level}
            </p>
          </div>

          {/* Detailed Run Stats Grid */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className={`rounded-lg border p-2 text-center ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center text-amber-500 mb-0.5">
                <Trophy className="h-3.5 w-3.5" />
              </div>
              <div className={`text-xs font-bold font-mono ${headingColor}`}>{gameState.highScore}</div>
              <div className={`text-[10px] ${subTextColor}`}>Best</div>
            </div>

            <div className={`rounded-lg border p-2 text-center ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center text-emerald-500 mb-0.5">
                <Apple className="h-3.5 w-3.5" />
              </div>
              <div className={`text-xs font-bold font-mono ${headingColor}`}>{gameState.foodCount}</div>
              <div className={`text-[10px] ${subTextColor}`}>Apples</div>
            </div>

            <div className={`rounded-lg border p-2 text-center ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center text-blue-500 mb-0.5">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div className={`text-xs font-bold font-mono ${headingColor}`}>{Math.round(gameState.elapsedTimeSeconds)}s</div>
              <div className={`text-[10px] ${subTextColor}`}>Duration</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-green-500 transition-all active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Play Again</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleShare}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${secondaryBtnClass}`}
              >
                <Share2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Share Score</span>
              </button>

              <button
                onClick={onOpenModesModal}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${secondaryBtnClass}`}
              >
                <Layers className="h-3.5 w-3.5 text-purple-500" />
                <span>Change Mode</span>
              </button>
            </div>

            {shareFeedback && (
              <div className="text-[11px] text-emerald-600 font-medium animate-in fade-in">
                {shareFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
