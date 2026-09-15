import React from 'react';
import type { Difficulty } from '@project/core';
import { Zap } from 'lucide-react';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  theme?: 'dark' | 'light';
  onSelectDifficulty: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string; speedDesc: string }[] = [
  { id: 'easy', label: 'Easy', speedDesc: '6 moves/s' },
  { id: 'normal', label: 'Normal', speedDesc: '9 moves/s' },
  { id: 'hard', label: 'Hard', speedDesc: '13 moves/s' },
  { id: 'expert', label: 'Expert', speedDesc: '17 moves/s' }
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  theme = 'dark',
  onSelectDifficulty,
  disabled
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-2">
      <div className={`flex items-center justify-between text-xs font-medium px-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Difficulty & Speed</span>
        </div>
        <span className="text-[11px] font-mono opacity-75">Affects Score Multiplier</span>
      </div>

      <div className={`grid grid-cols-4 gap-1.5 p-1 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-100 border-slate-200 shadow-inner'
      }`}>
        {DIFFICULTIES.map((diff) => {
          const isActive = currentDifficulty === diff.id;
          let btnClass = '';
          if (isActive) {
            btnClass = 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20';
          } else {
            btnClass = isDark
              ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/80';
          }

          return (
            <button
              key={diff.id}
              onClick={() => onSelectDifficulty(diff.id)}
              disabled={disabled}
              className={`rounded-lg py-2 px-1 text-center transition-all ${btnClass} disabled:opacity-50`}
            >
              <div className="text-xs">{diff.label}</div>
              <div className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>
                {diff.speedDesc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
