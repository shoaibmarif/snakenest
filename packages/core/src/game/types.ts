export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export type GameMode = 'classic' | 'endless' | 'time-challenge' | 'obstacles';

export type Difficulty = 'easy' | 'normal' | 'hard' | 'expert';

export type FoodType = 'normal' | 'bonus' | 'special';

export interface Food {
  position: Position;
  type: FoodType;
  points: number;
  expiresAt?: number; // Timestamp when bonus/special food despawns
  createdAt: number;
}

export type GameStatus = 'ready' | 'playing' | 'paused' | 'game-over' | 'victory';

export interface GameSettings {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  difficulty: Difficulty;
  gameMode: GameMode;
  gridSize: number;
  showGridLines: boolean;
  swipeEnabled: boolean;
  reducedMotion: boolean;
}

export interface GameStatistics {
  totalGamesPlayed: number;
  totalFoodCollected: number;
  longestSnakeLength: number;
  totalTimePlayedSeconds: number;
  bestScores: Record<GameMode, number>;
  bestByDifficulty: Record<Difficulty, number>;
}

export interface GameState {
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  food: Food[];
  obstacles: Position[];
  score: number;
  highScore: number;
  level: number;
  foodCount: number;
  status: GameStatus;
  timeRemainingSeconds: number; // For time-challenge mode
  elapsedTimeSeconds: number;
  isNewHighScore: boolean;
}

