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

  const actionBtnClass = `flex-1 flex items-center justify-center gap-2 rounded-xl border py-2.5 px-4 text-xs font-semibold active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm ${
    isDark
      ? 'border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800'
      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300'
  }`;

  const dpadBtnClass = `h-14 w-14 rounded-2xl border active:bg-emerald-600 active:text-white active:scale-90 flex items-center justify-center shadow-md transition-all touch-manipulation ${
    isDark
      ? 'bg-slate-800/90 border-slate-700/80 text-slate-100'
      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
  }`;

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto flex flex-col items-center gap-4 select-none">
      {/* Action Buttons Bar */}
      <div className="w-full flex items-center justify-between gap-3 px-2">
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

      {/* On-screen D-Pad for Touch and Mobile Devices */}
      <div className="flex flex-col items-center gap-1.5 py-1 sm:hidden">
        {/* UP Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('UP')}
          className={dpadBtnClass}
          aria-label="Move Up"
        >
          <ArrowUp className="h-6 w-6" />
        </button>

        {/* LEFT, CENTER, RIGHT Row */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleDirectionPress('LEFT')}
            className={dpadBtnClass}
            aria-label="Move Left"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className={`h-10 w-10 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-600' : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            DPAD
          </div>

          <button
            type="button"
            onClick={() => handleDirectionPress('RIGHT')}
            className={dpadBtnClass}
            aria-label="Move Right"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* DOWN Button */}
        <button
          type="button"
          onClick={() => handleDirectionPress('DOWN')}
          className={dpadBtnClass}
          aria-label="Move Down"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
