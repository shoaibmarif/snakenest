import React from 'react';
import {
  GameMode,
  Difficulty,
  Direction,
  GameState
} from '@project/core';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface PopupControlsProps {
  gameState: GameState;
  gameMode: GameMode;
  difficulty: Difficulty;
  onDirectionChange: (dir: Direction) => void;
  onSetGameMode: (mode: GameMode) => void;
  onSetDifficulty: (diff: Difficulty) => void;
  onStartGame: () => void;
  onTogglePause: () => void;
  onRestartGame: () => void;
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
  gameState,
  gameMode,
  difficulty,
  onDirectionChange,
  onSetGameMode,
  onSetDifficulty,
  onStartGame,
  onTogglePause,
  onRestartGame
}) => {
  const isPlaying = gameState.status === 'playing';
  const isPaused = gameState.status === 'paused';
  const isGameOver = gameState.status === 'game-over';
  const isReady = gameState.status === 'ready';

  const handleCenterAction = () => {
    if (isReady) {
      onStartGame();
    } else if (isPlaying) {
      onTogglePause();
    } else if (isPaused) {
      onTogglePause();
    } else if (isGameOver) {
      onRestartGame();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2.5 px-3 py-1 select-none">
      {/* Modes & Difficulties Row */}
      <div className="flex flex-col gap-1.5 text-xs">
        {/* Mode Selector */}
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
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
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
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
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
                }`}
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tactile D-Pad & Action Controls */}
      <div className="flex items-center justify-center pt-0.5 pb-1">
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-[140px] h-[100px] items-center justify-center">
          {/* Top empty cell */}
          <div />

          {/* UP button */}
          <button
            type="button"
            onClick={() => onDirectionChange('UP')}
            aria-label="Move Up"
            className="w-10 h-8 rounded-lg bg-slate-200 dark:bg-slate-700/80 hover:bg-emerald-500 hover:text-white active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer mx-auto border border-slate-300/80 dark:border-slate-600"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Top right empty cell */}
          <div />

          {/* LEFT button */}
          <button
            type="button"
            onClick={() => onDirectionChange('LEFT')}
            aria-label="Move Left"
            className="w-10 h-8 rounded-lg bg-slate-200 dark:bg-slate-700/80 hover:bg-emerald-500 hover:text-white active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer mx-auto border border-slate-300/80 dark:border-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* CENTER action button (Play / Pause / Restart) */}
          <button
            type="button"
            onClick={handleCenterAction}
            aria-label={isPlaying ? 'Pause' : isPaused ? 'Resume' : isGameOver ? 'Restart' : 'Start'}
            title={isPlaying ? 'Pause (Space)' : isPaused ? 'Resume (Space)' : isGameOver ? 'Play Again (Enter)' : 'Start Game (Enter)'}
            className={`w-10 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer mx-auto ${
              isGameOver
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
            }`}
          >
            {isGameOver ? (
              <RotateCcw className="w-4 h-4" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* RIGHT button */}
          <button
            type="button"
            onClick={() => onDirectionChange('RIGHT')}
            aria-label="Move Right"
            className="w-10 h-8 rounded-lg bg-slate-200 dark:bg-slate-700/80 hover:bg-emerald-500 hover:text-white active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer mx-auto border border-slate-300/80 dark:border-slate-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom left empty cell */}
          <div />

          {/* DOWN button */}
          <button
            type="button"
            onClick={() => onDirectionChange('DOWN')}
            aria-label="Move Down"
            className="w-10 h-8 rounded-lg bg-slate-200 dark:bg-slate-700/80 hover:bg-emerald-500 hover:text-white active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer mx-auto border border-slate-300/80 dark:border-slate-600"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          {/* Bottom right empty cell */}
          <div />
        </div>
      </div>
    </div>
  );
};
