import React from 'react';
import type { GameStatistics } from '@project/core';
import { Trophy, Apple, Gamepad2, Ruler, ShieldAlert, Infinity, Timer, Boxes } from 'lucide-react';

interface HighScorePanelProps {
  statistics: GameStatistics;
}

export const HighScorePanel: React.FC<HighScorePanelProps> = ({ statistics }) => {
  const modeScores = [
    { label: 'Classic', score: statistics.bestScores.classic || 0, icon: ShieldAlert, color: 'text-emerald-400' },
    { label: 'Endless', score: statistics.bestScores.endless || 0, icon: Infinity, color: 'text-blue-400' },
    { label: 'Time Challenge', score: statistics.bestScores['time-challenge'] || 0, icon: Timer, color: 'text-rose-400' },
    { label: 'Obstacles', score: statistics.bestScores.obstacles || 0, icon: Boxes, color: 'text-amber-400' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400 border border-amber-500/20">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Leaderboard & Lifetime Records</h2>
            <p className="text-xs text-slate-400">Stored locally in your browser</p>
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
              className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-center flex flex-col items-center justify-center shadow-inner"
            >
              <Icon className={`h-4 w-4 mb-1 ${item.color}`} />
              <div className="text-xs text-slate-400 font-medium">{item.label}</div>
              <div className="text-xl font-black text-white font-mono mt-1">{item.score}</div>
              <div className="text-[10px] text-slate-500">Personal Best</div>
            </div>
          );
        })}
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <Gamepad2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Runs</div>
            <div className="text-base font-bold text-white font-mono">{statistics.totalGamesPlayed}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
            <Apple className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Food Eaten</div>
            <div className="text-base font-bold text-white font-mono">{statistics.totalFoodCollected}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
            <Ruler className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Longest Snake</div>
            <div className="text-base font-bold text-white font-mono">{statistics.longestSnakeLength} units</div>
          </div>
        </div>
      </div>
    </div>
  );
};

