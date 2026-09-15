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
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-2">
      <div className={`text-xs font-medium px-1 flex items-center justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <span>Game Mode</span>
        <span className="text-[11px] font-mono opacity-75">4 Unique Modes</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GAME_MODES.map((mode) => {
          const Icon = ICON_MAP[mode.id];
          const isActive = currentMode === mode.id;

          let btnClass = '';
          if (isActive) {
            btnClass = isDark
              ? 'border-emerald-500/80 bg-emerald-950/20 text-emerald-400 shadow-md shadow-emerald-500/10 font-semibold'
              : 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm font-semibold';
          } else {
            btnClass = isDark
              ? 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-sm';
          }

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${btnClass} disabled:opacity-50`}
            >
              <Icon className={`h-5 w-5 mb-1.5 ${isActive ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400' : 'text-slate-500')}`} />
              <div className="text-xs">{mode.name}</div>
              <div className={`text-[10px] mt-0.5 line-clamp-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{mode.shortDesc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
