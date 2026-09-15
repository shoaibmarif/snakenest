import { useState, useRef, useCallback, useEffect } from 'react';
import {
  GameState,
  GameSettings,
  GameStatistics,
  Direction,
  GameMode,
  Difficulty,
  SPEED_MAP,
  TIME_CHALLENGE_DEFAULT_SECONDS,
  createInitialSnake,
  generateObstacles,
  spawnFood,
  processGameTick,
  isValidDirectionChange,
  calculateTickInterval
} from '@project/core';
import {
  loadStoredSettings,
  saveStoredSettings,
  loadStoredStatistics,
  saveStoredStatistics,
  resetStoredData
} from '../utils/storage.js';
import { soundManager } from '../utils/audio.js';
import { useGameLoop } from './useGameLoop.js';

export function useSnakeGame() {
  const [settings, setSettings] = useState<GameSettings>(() => loadStoredSettings());
  const [statistics, setStatistics] = useState<GameStatistics>(() => loadStoredStatistics());

  // Initialize sound manager with persisted setting
  useEffect(() => {
    soundManager.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Save settings whenever they change
  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  // Save statistics whenever they change
  useEffect(() => {
    saveStoredStatistics(statistics);
  }, [statistics]);

  // Game state initializer helper
  const createFreshGameState = useCallback((
    mode: GameMode,
    gridSize: number,
    highScoreVal: number
  ): GameState => {
    const snake = createInitialSnake(gridSize);
    const obstacles = generateObstacles(gridSize, mode);
    const initialFood = spawnFood(gridSize, snake, obstacles, [], 'normal', Date.now());

    return {
      snake,
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      food: initialFood ? [initialFood] : [],
      obstacles,
      score: 0,
      highScore: highScoreVal,
      level: 1,
      foodCount: 0,
      status: 'ready',
      timeRemainingSeconds: TIME_CHALLENGE_DEFAULT_SECONDS,
      elapsedTimeSeconds: 0,
      isNewHighScore: false
    };
  }, []);

  const [gameState, setGameState] = useState<GameState>(() => {
    const initialStats = loadStoredStatistics();
    const initialSets = loadStoredSettings();
    const bestScore = initialStats.bestScores[initialSets.gameMode] || 0;
    return createFreshGameState(initialSets.gameMode, initialSets.gridSize, bestScore);
  });

  // Direction queue to smoothly buffer rapid inputs (e.g., DOWN then LEFT before next tick)
  const directionQueueRef = useRef<Direction[]>([]);
  const lastTickTimeRef = useRef<number>(Date.now());
  const secondTimerAccumulatorRef = useRef<number>(0);

  // Synchronize state ref for high-frequency game loop
  const stateRef = useRef(gameState);
  stateRef.current = gameState;

  // Sound triggers helper
  const handleGameEvents = useCallback((event: ReturnType<typeof processGameTick>['event']) => {
    if (event.gameOver) {
      soundManager.playGameOver();
    } else if (event.levelUp) {
      soundManager.playLevelUp();
    } else if (event.ateFood) {
      if (event.ateFood.type === 'bonus' || event.ateFood.type === 'special') {
        soundManager.playBonus();
      } else {
        soundManager.playEat();
      }
    }
  }, []);

  // Update statistics on game over
  const updateStatsOnGameOver = useCallback((finalState: GameState) => {
    setStatistics((prev) => {
      const mode = settings.gameMode;
      const diff = settings.difficulty;
      const currentBestMode = prev.bestScores[mode] || 0;
      const currentBestDiff = prev.bestByDifficulty[diff] || 0;

      return {
        ...prev,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        totalFoodCollected: prev.totalFoodCollected + finalState.foodCount,
        longestSnakeLength: Math.max(prev.longestSnakeLength, finalState.snake.length),
        totalTimePlayedSeconds: prev.totalTimePlayedSeconds + Math.round(finalState.elapsedTimeSeconds),
        bestScores: {
          ...prev.bestScores,
          [mode]: Math.max(currentBestMode, finalState.score)
        },
        bestByDifficulty: {
          ...prev.bestByDifficulty,
          [diff]: Math.max(currentBestDiff, finalState.score)
        }
      };
    });
  }, [settings.gameMode, settings.difficulty]);

  // Main Tick callback invoked by game loop
  const onTick = useCallback((currentTime: number) => {
    const current = stateRef.current;
    if (current.status !== 'playing') return;

    // Calculate delta time in seconds for elapsed/countdown timers
    const deltaMs = currentTime - lastTickTimeRef.current;
    lastTickTimeRef.current = currentTime;
    secondTimerAccumulatorRef.current += deltaMs;

    let updatedTimeRemaining = current.timeRemainingSeconds;
    let updatedElapsed = current.elapsedTimeSeconds;

    if (secondTimerAccumulatorRef.current >= 1000) {
      const secondsPassed = Math.floor(secondTimerAccumulatorRef.current / 1000);
      secondTimerAccumulatorRef.current %= 1000;
      updatedElapsed += secondsPassed;

      if (settings.gameMode === 'time-challenge') {
        updatedTimeRemaining = Math.max(0, updatedTimeRemaining - secondsPassed);
      }
    }

    // Pull next direction from buffer if available
    let nextDir = current.nextDirection;
    while (directionQueueRef.current.length > 0) {
      const queued = directionQueueRef.current.shift()!;
      if (isValidDirectionChange(current.direction, queued)) {
        nextDir = queued;
        break;
      }
    }

    const stateWithTimers: GameState = {
      ...current,
      nextDirection: nextDir,
      timeRemainingSeconds: updatedTimeRemaining,
      elapsedTimeSeconds: updatedElapsed
    };

    const { nextState, event } = processGameTick(
      stateWithTimers,
      settings.gridSize,
      settings.gameMode,
      settings.difficulty,
      currentTime
    );

    if (event.gameOver) {
      updateStatsOnGameOver(nextState);
    }

    handleGameEvents(event);
    setGameState(nextState);
  }, [settings.gridSize, settings.gameMode, settings.difficulty, handleGameEvents, updateStatsOnGameOver]);

  // Dynamic tick speed calculation
  const baseSpeed = SPEED_MAP[settings.difficulty];
  const activeInterval = calculateTickInterval(baseSpeed, gameState.level);

  // Delta-time game loop
  useGameLoop({
    isActive: gameState.status === 'playing',
    tickIntervalMs: activeInterval,
    onTick
  });

  // User Action Handlers
  const changeDirection = useCallback((dir: Direction) => {
    const current = stateRef.current;
    if (current.status !== 'playing') return;

    // Check against the last queued direction or active direction
    const lastTarget = directionQueueRef.current.length > 0
      ? directionQueueRef.current[directionQueueRef.current.length - 1]
      : current.direction;

    if (isValidDirectionChange(lastTarget, dir)) {
      // Limit queue buffer to 2 inputs
      if (directionQueueRef.current.length < 2) {
        directionQueueRef.current.push(dir);
      }
    }
  }, []);

  const startGame = useCallback(() => {
    soundManager.playStart();
    directionQueueRef.current = [];
    lastTickTimeRef.current = performance.now();
    secondTimerAccumulatorRef.current = 0;

    const bestScore = statistics.bestScores[settings.gameMode] || 0;
    const fresh = createFreshGameState(settings.gameMode, settings.gridSize, bestScore);
    setGameState({
      ...fresh,
      status: 'playing'
    });
  }, [statistics.bestScores, settings.gameMode, settings.gridSize, createFreshGameState]);

  const togglePause = useCallback(() => {
    const current = stateRef.current;
    if (current.status === 'playing') {
      soundManager.playPause();
      setGameState((prev) => ({ ...prev, status: 'paused' }));
    } else if (current.status === 'paused') {
      soundManager.playClick();
      lastTickTimeRef.current = performance.now();
      directionQueueRef.current = [];
      setGameState((prev) => ({ ...prev, status: 'playing' }));
    }
  }, []);

  const restartGame = useCallback(() => {
    soundManager.playClick();
    directionQueueRef.current = [];
    lastTickTimeRef.current = performance.now();
    secondTimerAccumulatorRef.current = 0;

    const bestScore = statistics.bestScores[settings.gameMode] || 0;
    const fresh = createFreshGameState(settings.gameMode, settings.gridSize, bestScore);
    setGameState({
      ...fresh,
      status: 'playing'
    });
  }, [statistics.bestScores, settings.gameMode, settings.gridSize, createFreshGameState]);

  const setGameMode = useCallback((newMode: GameMode) => {
    soundManager.playClick();
    setSettings((prev) => ({ ...prev, gameMode: newMode }));
    const bestScore = statistics.bestScores[newMode] || 0;
    setGameState(createFreshGameState(newMode, settings.gridSize, bestScore));
  }, [statistics.bestScores, settings.gridSize, createFreshGameState]);

  const setDifficulty = useCallback((newDiff: Difficulty) => {
    soundManager.playClick();
    setSettings((prev) => ({ ...prev, difficulty: newDiff }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettings((prev) => {
      const next = !prev.soundEnabled;
      soundManager.setEnabled(next);
      if (next) soundManager.playClick();
      return { ...prev, soundEnabled: next };
    });
  }, []);

  const toggleTheme = useCallback(() => {
    soundManager.playClick();
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  }, []);

  const updateSetting = useCallback(<K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleResetData = useCallback(() => {
    soundManager.playClick();
    const { settings: defSettings, statistics: defStats } = resetStoredData();
    setSettings(defSettings);
    setStatistics(defStats);
    setGameState(createFreshGameState(defSettings.gameMode, defSettings.gridSize, 0));
  }, [createFreshGameState]);

  return {
    gameState,
    settings,
    statistics,
    changeDirection,
    startGame,
    togglePause,
    restartGame,
    setGameMode,
    setDifficulty,
    toggleSound,
    toggleTheme,
    updateSetting,
    resetData: handleResetData
  };
}
