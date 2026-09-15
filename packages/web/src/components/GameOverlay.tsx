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

  const handleShare = async () => {
    const res = await shareGameScore(gameState.score, settings.gameMode);
    setShareFeedback(res.message);
    setTimeout(() => setShareFeedback(null), 3500);
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl animate-in fade-in duration-200">
      {/* 1. READY SCREEN */}
      {gameState.status === 'ready' && (
        <div className="text-center max-w-xs sm:max-w-sm space-y-5">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 shadow-xl shadow-emerald-500/20 text-white mx-auto">
            <span className="text-3xl">🐍</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ready to Slither?
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Use Arrow keys, WASD, or swipe to guide the snake. Collect apples and avoid collisions.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/90 py-1.5 px-3 rounded-lg border border-slate-800">
            <span className="capitalize text-emerald-400">{settings.gameMode}</span>
            <span>•</span>
            <span className="capitalize text-blue-400">{settings.difficulty} speed</span>
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
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Clock className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Game Paused</h2>
            <p className="text-xs text-slate-400 mt-1">Take a breath, your game is safe.</p>
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
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
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
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NEW HIGH SCORE!</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
              <span>GAME OVER</span>
            </div>
          )}

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
              Score: {gameState.score}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mode: <span className="capitalize text-slate-200">{settings.gameMode}</span> • Level {gameState.level}
            </p>
          </div>

          {/* Detailed Run Stats Grid */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center">
              <div className="flex items-center justify-center text-amber-400 mb-0.5">
                <Trophy className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-bold text-white font-mono">{gameState.highScore}</div>
              <div className="text-[10px] text-slate-500">Best</div>
            </div>

            <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center">
              <div className="flex items-center justify-center text-emerald-400 mb-0.5">
                <Apple className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-bold text-white font-mono">{gameState.foodCount}</div>
              <div className="text-[10px] text-slate-500">Apples</div>
            </div>

            <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center">
              <div className="flex items-center justify-center text-blue-400 mb-0.5">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-bold text-white font-mono">{Math.round(gameState.elapsedTimeSeconds)}s</div>
              <div className="text-[10px] text-slate-500">Duration</div>
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
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-all"
              >
                <Share2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Share Score</span>
              </button>

              <button
                onClick={onOpenModesModal}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-all"
              >
                <Layers className="h-3.5 w-3.5 text-purple-400" />
                <span>Change Mode</span>
              </button>
            </div>

            {shareFeedback && (
              <div className="text-[11px] text-emerald-400 font-medium animate-in fade-in">
                {shareFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

