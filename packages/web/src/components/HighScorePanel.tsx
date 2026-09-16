import React from 'react';
import type { GameStatistics } from '@project/core';
import { Trophy,  ShieldAlert, Infinity, Timer, Boxes } from 'lucide-react';

interface HighScorePanelProps {
  statistics: GameStatistics;
  theme?: 'dark' | 'light';
}

export const HighScorePanel: React.FC<HighScorePanelProps> = ({ statistics, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const modeScores = [
    { label: 'Classic', score: statistics.bestScores.classic || 0, icon: ShieldAlert, color: isDark ? 'text-emerald-400' : 'text-emerald-600' },
    { label: 'Endless', score: statistics.bestScores.endless || 0, icon: Infinity, color: isDark ? 'text-blue-400' : 'text-blue-600' },
    { label: 'Time Challenge', score: statistics.bestScores['time-challenge'] || 0, icon: Timer, color: isDark ? 'text-rose-400' : 'text-rose-600' },
    { label: 'Obstacles', score: statistics.bestScores.obstacles || 0, icon: Boxes, color: isDark ? 'text-amber-400' : 'text-amber-600' }
  ];

  return (
    <div className={`w-full mx-auto rounded-2xl border p-5 sm:p-6 backdrop-blur-sm space-y-5 transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-sm'
    }`}>
      <div className={`flex items-center justify-between border-b pb-3.5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`rounded-xl p-2 border ${
            isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}>
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h2 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Leaderboard & Lifetime Records
            </h2>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Stored locally in your browser</p>
          </div>
        </div>
      </div>

      {/* Mode Best Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-2.5">
        {modeScores.map((item) => {
          return (
            <div
              key={item.label}
              className={`rounded-xl border p-2.5 sm:p-3 text-center flex flex-col items-center justify-center transition-colors ${
                isDark ? 'border-slate-800/80 bg-slate-950/60 shadow-inner' : 'border-slate-200 bg-slate-50 shadow-sm'
              }`}
            >
              <div className={`text-[11px] font-medium line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.label}</div>
              <div className={`text-base sm:text-lg font-black font-mono mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.score}</div>
              <div className={`text-[9px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Best Score</div>
            </div>
          );
        })}
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
        <div className={`flex items-center gap-2.5 rounded-xl border p-2.5 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className="min-w-0">
            <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Runs</div>
            <div className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.totalGamesPlayed}</div>
          </div>
        </div>

        <div className={`flex items-center gap-2.5 rounded-xl border p-2.5 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className="min-w-0">
            <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Food Eaten</div>
            <div className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.totalFoodCollected}</div>
          </div>
        </div>

        <div className={`flex items-center gap-2.5 rounded-xl border p-2.5 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className="min-w-0">
            <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Longest Snake</div>
            <div className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.longestSnakeLength} units</div>
          </div>
        </div>
      </div>
    </div>
  );
};
