import React from 'react';
import { GameMode, Difficulty } from '@project/core';

interface PopupControlsProps {
  gameMode: GameMode;
  difficulty: Difficulty;
  theme: 'dark' | 'light';
  onSetGameMode: (mode: GameMode) => void;
  onSetDifficulty: (diff: Difficulty) => void;
}

const MODES: { id: GameMode; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'endless', label: 'Endless' },
  { id: 'time-challenge', label: 'Timed' },
  { id: 'obstacles', label: 'Obstacles' }
];

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'normal', label: 'Normal' },
  { id: 'hard', label: 'Hard' },
  { id: 'expert', label: 'Expert' }
];

export const PopupControls: React.FC<PopupControlsProps> = ({
  gameMode,
  difficulty,
  theme,
  onSetGameMode,
  onSetDifficulty
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full flex flex-col gap-2 px-3 py-1 select-none">
      {/* Modes & Difficulties Selectors */}
      <div className="flex flex-col gap-1.5 text-xs">
        {/* Mode Selector */}
        <div
          className={`flex items-center justify-between p-1 rounded-lg border transition-colors ${
            isDark
              ? 'bg-slate-900/70 border-slate-800/80'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          {MODES.map((mode) => {
            const active = gameMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSetGameMode(mode.id)}
                className={`flex-1 py-1 px-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer text-center ${
                  active
                    ? 'bg-emerald-500 text-white shadow-sm font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Difficulty Selector */}
        <div
          className={`flex items-center justify-between p-1 rounded-lg border transition-colors ${
            isDark
              ? 'bg-slate-900/70 border-slate-800/80'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          {DIFFICULTIES.map((diff) => {
            const active = difficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => onSetDifficulty(diff.id)}
                className={`flex-1 py-1 px-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer text-center ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
