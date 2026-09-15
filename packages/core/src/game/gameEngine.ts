import type {
  Direction,
  GameMode,
  Difficulty,
  Food,
  GameState
} from './types.js';
import { DIRECTION_VECTORS, OPPOSITE_DIRECTIONS } from './constants.js';
import {
  getNextHeadPosition,
  checkSelfCollision,
  checkObstacleCollision,
  isSamePosition
} from './collision.js';
import { spawnFood, pruneExpiredFood } from './food.js';
import { calculatePointsEarned, calculateLevel } from './scoring.js';
import { TIME_CHALLENGE_FOOD_BONUS_SECONDS } from './constants.js';

export interface TickEvent {
  ateFood?: Food;
  levelUp?: boolean;
  gameOver?: boolean;
  reason?: 'wall' | 'self' | 'obstacle' | 'timeout';
  isNewHighScore?: boolean;
}

export interface TickResult {
  nextState: GameState;
  event: TickEvent;
}

/**
 * Validates if next direction is legal (prevents 180-degree self reversals).
 */
export function isValidDirectionChange(current: Direction, requested: Direction): boolean {
  return OPPOSITE_DIRECTIONS[current] !== requested;
}

/**
 * Pure state transition function for one game step.
 */
export function processGameTick(
  state: GameState,
  gridSize: number,
  mode: GameMode,
  difficulty: Difficulty,
  currentTime: number = Date.now()
): TickResult {
  if (state.status !== 'playing') {
    return { nextState: state, event: {} };
  }

  // 1. Time Challenge mode countdown check
  if (mode === 'time-challenge' && state.timeRemainingSeconds <= 0) {
    return {
      nextState: {
        ...state,
        status: 'game-over'
      },
      event: { gameOver: true, reason: 'timeout' }
    };
  }

  // 2. Commit validated direction
  const activeDirection = isValidDirectionChange(state.direction, state.nextDirection)
    ? state.nextDirection
    : state.direction;

  const delta = DIRECTION_VECTORS[activeDirection];
  const head = state.snake[0];

  // 3. Calculate next head position
  const { position: nextHead, hitWall } = getNextHeadPosition(head, delta, gridSize, mode);

  if (hitWall) {
    return {
      nextState: {
        ...state,
        direction: activeDirection,
        status: 'game-over'
      },
      event: { gameOver: true, reason: 'wall' }
    };
  }

  // 4. Check obstacle collision
  if (checkObstacleCollision(nextHead, state.obstacles)) {
    return {
      nextState: {
        ...state,
        direction: activeDirection,
        status: 'game-over'
      },
      event: { gameOver: true, reason: 'obstacle' }
    };
  }

  // 5. Check food collision
  let activeFoodList = pruneExpiredFood(state.food, currentTime);
  const eatenFoodIndex = activeFoodList.findIndex((f) => isSamePosition(nextHead, f.position));
  const isGrowing = eatenFoodIndex !== -1;

  // 6. Check self-collision
  if (checkSelfCollision(nextHead, state.snake, isGrowing)) {
    return {
      nextState: {
        ...state,
        direction: activeDirection,
        status: 'game-over'
      },
      event: { gameOver: true, reason: 'self' }
    };
  }

  // 7. Update snake body
  const newSnake = [nextHead, ...state.snake];
  if (!isGrowing) {
    newSnake.pop();
  }

  // 8. Handle food consumption and score
  let newScore = state.score;
  let newFoodCount = state.foodCount;
  let newTimeRemaining = state.timeRemainingSeconds;
  let ateFoodItem: Food | undefined;
  let levelUp = false;

  if (isGrowing) {
    ateFoodItem = activeFoodList[eatenFoodIndex];
    activeFoodList.splice(eatenFoodIndex, 1);

    const pointsEarned = calculatePointsEarned(ateFoodItem.type, difficulty);
    newScore += pointsEarned;
    newFoodCount += 1;

    if (mode === 'time-challenge') {
      newTimeRemaining += TIME_CHALLENGE_FOOD_BONUS_SECONDS;
    }

    const prevLevel = state.level;
    const currentLevel = calculateLevel(newScore);
    if (currentLevel > prevLevel) {
      levelUp = true;
    }

    // Always ensure at least one normal food exists
    const hasNormalFood = activeFoodList.some((f) => f.type === 'normal');
    if (!hasNormalFood) {
      const normalFood = spawnFood(gridSize, newSnake, state.obstacles, activeFoodList, 'normal', currentTime);
      if (normalFood) activeFoodList.push(normalFood);
    }

    // Chance to spawn bonus or special food on eating
    const roll = Math.random();
    if (roll < 0.15 && !activeFoodList.some((f) => f.type === 'bonus')) {
      const bonus = spawnFood(gridSize, newSnake, state.obstacles, activeFoodList, 'bonus', currentTime);
      if (bonus) activeFoodList.push(bonus);
    } else if (roll < 0.05 && !activeFoodList.some((f) => f.type === 'special')) {
      const special = spawnFood(gridSize, newSnake, state.obstacles, activeFoodList, 'special', currentTime);
      if (special) activeFoodList.push(special);
    }
  }

  const isNewHighScore = newScore > state.highScore;
  const newHighScore = Math.max(newScore, state.highScore);

  return {
    nextState: {
      ...state,
      snake: newSnake,
      direction: activeDirection,
      food: activeFoodList,
      score: newScore,
      highScore: newHighScore,
      level: calculateLevel(newScore),
      foodCount: newFoodCount,
      timeRemainingSeconds: newTimeRemaining,
      isNewHighScore: isNewHighScore || state.isNewHighScore
    },
    event: {
      ateFood: ateFoodItem,
      levelUp,
      isNewHighScore
    }
  };
}
