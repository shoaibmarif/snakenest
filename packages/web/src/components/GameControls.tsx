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
  theme?: 'dark' | 'light';
  onDirectionChange: (dir: Direction) => void;
  onTogglePause: () => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  status,
  theme = 'dark',
  onDirectionChange,
  onTogglePause,
  onRestart
}) => {
  const isDark = theme === 'dark';

  const handleDirectionPress = (dir: Direction) => {
    soundManager.playClick();
    onDirectionChange(dir);
  };

  const actionBtnClass = `flex-1 flex items-center justify-center gap-2 rounded-2xl border py-3 px-4 text-xs font-semibold tracking-wide transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
    isDark
      ? 'border-white/10 bg-slate-900/80 text-slate-200 hover:bg-slate-800/90 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
      : 'border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50 shadow-[0_4px_12px_rgba(15,23,42,0.04),inset_0_1px_0_0_#ffffff]'
  }`;

  const dpadBtnClass = `h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border flex items-center justify-center transition-all duration-150 active:scale-90 active:bg-emerald-500 active:text-white touch-manipulation select-none ${
    isDark
      ? 'bg-slate-900/90 border-white/10 text-slate-100 hover:border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-[0_6px_16px_rgba(15,23,42,0.06),inset_0_1px_0_0_#ffffff]'
  }`;

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto flex flex-col items-center gap-4 sm:gap-5 select-none pt-1">
      {/* Top Action Bar (Pause / Restart) */}
      <div className="w-full flex items-center justify-between gap-3 px-1">
        <button
          onClick={onTogglePause}
          disabled={status !== 'playing' && status !== 'paused'}
          className={actionBtnClass}
          title="Pause or Resume (Spacebar)"
        >
          {status === 'paused' ? (
            <>
              <Play className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="h-4 w-4 text-blue-500" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onRestart}
          className={actionBtnClass}
          title="Restart Game (Enter)"
        >
          <RotateCcw className="h-4 w-4 text-amber-500" />
          <span>Restart</span>
        </button>
      </div>

      {/* Tactile On-screen D-Pad for Mobile & Touch */}
      <div className="flex flex-col items-center gap-2 sm:gap-2.5 py-1 sm:hidden">
        {/* UP Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('UP')}
          className={dpadBtnClass}
          aria-label="Move Up"
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* LEFT, CENTER, RIGHT Row */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => handleDirectionPress('LEFT')}
            className={dpadBtnClass}
            aria-label="Move Left"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className={`h-9 w-9 sm:h-11 sm:w-11 rounded-full border flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-black tracking-widest ${
            isDark
              ? 'bg-slate-950/80 border-white/5 text-slate-600'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            DPAD
          </div>

          <button
            type="button"
            onClick={() => handleDirectionPress('RIGHT')}
            className={dpadBtnClass}
            aria-label="Move Right"
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* DOWN Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('DOWN')}
          className={dpadBtnClass}
          aria-label="Move Down"
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
};
