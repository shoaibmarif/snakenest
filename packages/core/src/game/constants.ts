import type { Difficulty, GameSettings, GameStatistics, Direction } from './types.js';

export const DEFAULT_GRID_SIZE = 20;

export const SPEED_MAP: Record<Difficulty, number> = {
  easy: 1000 / 6,      // ~166.7ms (6 moves/sec)
  normal: 1000 / 9,    // ~111.1ms (9 moves/sec)
  hard: 1000 / 13,     // ~76.9ms  (13 moves/sec)
  expert: 1000 / 17    // ~58.8ms  (17 moves/sec)
};

export const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  easy: 1.0,
  normal: 1.25,
  hard: 1.5,
  expert: 2.0
};

export const FOOD_CONFIG = {
  normal: {
    points: 10,
    color: '#ef4444', // Red apple
    glow: 'rgba(239, 68, 68, 0.4)'
  },
  bonus: {
    points: 25,
    durationMs: 7000,
    color: '#eab308', // Golden fruit
    glow: 'rgba(234, 179, 8, 0.6)'
  },
  special: {
    points: 50,
    durationMs: 5000,
    color: '#a855f7', // Purple gem
    glow: 'rgba(168, 85, 247, 0.8)'
  }
} as const;

export const TIME_CHALLENGE_DEFAULT_SECONDS = 60;
export const TIME_CHALLENGE_FOOD_BONUS_SECONDS = 3;

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};

export const DIRECTION_VECTORS: Record<Direction, { x: number; y: number }> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  theme: 'dark',
  soundEnabled: true,
  difficulty: 'normal',
  gameMode: 'classic',
  gridSize: DEFAULT_GRID_SIZE,
  showGridLines: true,
  swipeEnabled: true,
  reducedMotion: false
};

export const DEFAULT_GAME_STATISTICS: GameStatistics = {
  totalGamesPlayed: 0,
  totalFoodCollected: 0,
  longestSnakeLength: 3,
  totalTimePlayedSeconds: 0,
  bestScores: {
    classic: 0,
    endless: 0,
    'time-challenge': 0,
    obstacles: 0
  },
  bestByDifficulty: {
    easy: 0,
    normal: 0,
    hard: 0,
    expert: 0
  }
};

