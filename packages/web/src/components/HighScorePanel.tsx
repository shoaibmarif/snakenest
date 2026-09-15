import React from 'react';
import type { GameStatistics } from '@project/core';
import { Trophy, Apple, Gamepad2, Ruler, ShieldAlert, Infinity, Timer, Boxes } from 'lucide-react';

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
    <div className={`w-full max-w-4xl mx-auto rounded-2xl border p-6 backdrop-blur-sm space-y-6 transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-sm'
    }`}>
      <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`rounded-xl p-2 border ${
            isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}>
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Leaderboard & Lifetime Records
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Stored locally in your browser</p>
          </div>
        </div>
      </div>

      {/* Mode Best Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {modeScores.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`rounded-xl border p-3.5 text-center flex flex-col items-center justify-center transition-colors ${
                isDark ? 'border-slate-800/80 bg-slate-950/60 shadow-inner' : 'border-slate-200 bg-slate-50 shadow-sm'
              }`}
            >
              <Icon className={`h-4 w-4 mb-1 ${item.color}`} />
              <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.label}</div>
              <div className={`text-xl font-black font-mono mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.score}</div>
              <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Personal Best</div>
            </div>
          );
        })}
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className={`rounded-lg p-2 ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <Gamepad2 className="h-4 w-4" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Runs</div>
            <div className={`text-base font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.totalGamesPlayed}</div>
          </div>
        </div>

        <div className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className={`rounded-lg p-2 ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
            <Apple className="h-4 w-4" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Food Eaten</div>
            <div className={`text-base font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.totalFoodCollected}</div>
          </div>
        </div>

        <div className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          <div className={`rounded-lg p-2 ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
            <Ruler className="h-4 w-4" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Longest Snake</div>
            <div className={`text-base font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{statistics.longestSnakeLength} units</div>
          </div>
        </div>
      </div>
    </div>
  );
};
