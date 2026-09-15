import React from 'react';
import type { Direction, GameStatus } from '@project/core';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';
import { soundManager } from '../utils/audio.js';

interface GameControlsProps {
  status: GameStatus;
  onDirectionChange: (dir: Direction) => void;
  onTogglePause: () => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  status,
  onDirectionChange,
  onTogglePause,
  onRestart
}) => {
  const handleDirectionPress = (dir: Direction) => {
    soundManager.playClick();
    onDirectionChange(dir);
  };

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto flex flex-col items-center gap-4 select-none">
      {/* Action Buttons Bar */}
      <div className="w-full flex items-center justify-between gap-3 px-2">
        <button
          onClick={onTogglePause}
          disabled={status !== 'playing' && status !== 'paused'}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 px-4 text-xs font-semibold text-slate-200 hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
          title="Pause or Resume (Spacebar)"
        >
          {status === 'paused' ? (
            <>
              <Play className="h-4 w-4 fill-emerald-400 text-emerald-400" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="h-4 w-4 text-blue-400" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 px-4 text-xs font-semibold text-slate-200 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
          title="Restart Game (Enter)"
        >
          <RotateCcw className="h-4 w-4 text-amber-400" />
          <span>Restart</span>
        </button>
      </div>

      {/* On-screen D-Pad for Touch and Mobile Devices */}
      <div className="flex flex-col items-center gap-1.5 py-1 sm:hidden">
        {/* UP Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('UP')}
          className="h-14 w-14 rounded-2xl bg-slate-800/90 border border-slate-700/80 active:bg-emerald-600 active:scale-90 flex items-center justify-center text-slate-100 shadow-md transition-all touch-manipulation"
          aria-label="Move Up"
        >
          <ArrowUp className="h-6 w-6" />
        </button>

        {/* LEFT, CENTER, RIGHT Row */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleDirectionPress('LEFT')}
            className="h-14 w-14 rounded-2xl bg-slate-800/90 border border-slate-700/80 active:bg-emerald-600 active:scale-90 flex items-center justify-center text-slate-100 shadow-md transition-all touch-manipulation"
            aria-label="Move Left"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="h-10 w-10 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-600 text-xs font-mono font-bold">
            DPAD
          </div>

          <button
            type="button"
            onClick={() => handleDirectionPress('RIGHT')}
            className="h-14 w-14 rounded-2xl bg-slate-800/90 border border-slate-700/80 active:bg-emerald-600 active:scale-90 flex items-center justify-center text-slate-100 shadow-md transition-all touch-manipulation"
            aria-label="Move Right"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* DOWN Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('DOWN')}
          className="h-14 w-14 rounded-2xl bg-slate-800/90 border border-slate-700/80 active:bg-emerald-600 active:scale-90 flex items-center justify-center text-slate-100 shadow-md transition-all touch-manipulation"
          aria-label="Move Down"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

