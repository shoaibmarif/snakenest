import React from 'react';
import type { GameMode } from '@project/core';
import { GAME_MODES } from '@project/core';
import { ShieldAlert, Infinity, Timer, Boxes } from 'lucide-react';

interface GameModeSelectorProps {
  currentMode: GameMode;
  theme?: 'dark' | 'light';
  onSelectMode: (mode: GameMode) => void;
  disabled?: boolean;
}

const ICON_MAP = {
  classic: ShieldAlert,
  endless: Infinity,
  'time-challenge': Timer,
  obstacles: Boxes
};

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  currentMode,
  theme = 'dark',
  onSelectMode,
  disabled
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none mx-auto space-y-2.5">
      <div className={`text-xs font-semibold tracking-wide uppercase px-1 flex items-center justify-between ${
        isDark ? 'text-slate-400' : 'text-slate-500'
      }`}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Game Mode
        </span>
        <span className="text-[10px] font-mono font-medium opacity-75">4 Battle Modes</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {GAME_MODES.map((mode) => {
          const Icon = ICON_MAP[mode.id];
          const isActive = currentMode === mode.id;

          let btnClass = '';
          if (isActive) {
            btnClass = isDark
              ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_20px_-4px_rgba(16,185,129,0.35),inset_0_1px_0_0_rgba(16,185,129,0.3)] font-bold'
              : 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md font-bold';
          } else {
            btnClass = isDark
              ? 'border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/20 hover:text-slate-200 hover:bg-slate-900/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
              : 'border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.03)]';
          }

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border text-center transition-all duration-150 active:scale-95 cursor-pointer ${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={`p-1.5 sm:p-2 rounded-xl mb-1 sm:mb-1.5 transition-colors ${
                isActive
                  ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
                  : (isDark ? 'bg-slate-800/80 text-slate-400' : 'bg-slate-100 text-slate-500')
              }`}>
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className="text-[11px] sm:text-xs font-semibold">{mode.name}</div>
              <div className={`text-[9px] sm:text-[10px] mt-0.5 line-clamp-1 font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {mode.shortDesc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
