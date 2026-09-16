import React from 'react';
import type { Difficulty } from '@project/core';
import { Zap } from 'lucide-react';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  theme?: 'dark' | 'light';
  onSelectDifficulty: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string; speedDesc: string; multiplier: string }[] = [
  { id: 'easy', label: 'Easy', speedDesc: '6 m/s', multiplier: '1.0×' },
  { id: 'normal', label: 'Normal', speedDesc: '9 m/s', multiplier: '1.25×' },
  { id: 'hard', label: 'Hard', speedDesc: '13 m/s', multiplier: '1.5×' },
  { id: 'expert', label: 'Expert', speedDesc: '17 m/s', multiplier: '2.0×' }
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  theme = 'dark',
  onSelectDifficulty,
  disabled
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none mx-auto space-y-2.5">
      <div className={`flex items-center justify-between text-xs font-semibold tracking-wide uppercase px-1 ${
        isDark ? 'text-slate-400' : 'text-slate-500'
      }`}>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Difficulty & Speed</span>
        </div>
        <span className="text-[10px] font-mono font-medium opacity-75">Score Multipliers</span>
      </div>

      <div className={`grid grid-cols-4 gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl border transition-all ${
        isDark
          ? 'bg-slate-900/60 border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
          : 'bg-slate-100/90 border-slate-200/90 shadow-inner'
      }`}>
        {DIFFICULTIES.map((diff) => {
          const isActive = currentDifficulty === diff.id;
          let btnClass = '';
          if (isActive) {
            btnClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-[0_4px_12px_rgba(37,99,235,0.4)]';
          } else {
            btnClass = isDark
              ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/80';
          }

          return (
            <button
              key={diff.id}
              onClick={() => onSelectDifficulty(diff.id)}
              disabled={disabled}
              className={`rounded-xl py-1.5 sm:py-2 px-1 text-center transition-all duration-150 cursor-pointer active:scale-95 ${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-[11px] sm:text-xs tracking-tight">{diff.label}</div>
              <div className={`text-[9px] sm:text-[10px] mt-0.5 ${
                isActive ? 'text-blue-100' : (isDark ? 'text-slate-500' : 'text-slate-400')
              }`}>
                {diff.multiplier}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
