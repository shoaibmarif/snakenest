import React from 'react';
import type { GameMode } from '@project/core';
import { GAME_MODES } from '@project/core';
import { ShieldAlert, Infinity, Timer, Boxes } from 'lucide-react';

interface GameModeSelectorProps {
  currentMode: GameMode;
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
  onSelectMode,
  disabled
}) => {
  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-2">
      <div className="text-xs text-slate-400 font-medium px-1 flex items-center justify-between">
        <span>Game Mode</span>
        <span className="text-[11px] font-mono text-slate-500">4 Unique Modes</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GAME_MODES.map((mode) => {
          const Icon = ICON_MAP[mode.id];
          const isActive = currentMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                isActive
                  ? 'border-emerald-500/80 bg-emerald-950/20 text-emerald-400 shadow-md shadow-emerald-500/10 font-semibold'
                  : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              } disabled:opacity-50`}
            >
              <Icon className={`h-5 w-5 mb-1.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <div className="text-xs">{mode.name}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{mode.shortDesc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

