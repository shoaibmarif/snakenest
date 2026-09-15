import React from 'react';
import type { Difficulty } from '@project/core';
import { Zap } from 'lucide-react';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
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
  onSelectDifficulty,
  disabled
}) => {
  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Difficulty & Speed</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Affects Score Multiplier</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80">
        {DIFFICULTIES.map((diff) => {
          const isActive = currentDifficulty === diff.id;
          return (
            <button
              key={diff.id}
              onClick={() => onSelectDifficulty(diff.id)}
              disabled={disabled}
              className={`rounded-lg py-2 px-1 text-center transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              } disabled:opacity-50`}
            >
              <div className="text-xs">{diff.label}</div>
              <div className={`text-[10px] font-mono ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                {diff.speedDesc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

