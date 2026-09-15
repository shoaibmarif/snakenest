import { describe, it, expect } from 'vitest';
import {
  isValidDirectionChange,
  getNextHeadPosition,
  checkSelfCollision,
  checkObstacleCollision,
  spawnFood,
  pruneExpiredFood,
  calculatePointsEarned,
  calculateLevel,
  createInitialSnake,
  processGameTick,
  GameState
} from '../src/index.js';

describe('Snake Game Engine', () => {
  describe('isValidDirectionChange', () => {
    it('disallows immediate 180 degree reversals', () => {
      expect(isValidDirectionChange('UP', 'DOWN')).toBe(false);
      expect(isValidDirectionChange('DOWN', 'UP')).toBe(false);
      expect(isValidDirectionChange('LEFT', 'RIGHT')).toBe(false);
      expect(isValidDirectionChange('RIGHT', 'LEFT')).toBe(false);
    });

    it('allows legal 90 degree turns and same direction', () => {
      expect(isValidDirectionChange('UP', 'LEFT')).toBe(true);
      expect(isValidDirectionChange('UP', 'RIGHT')).toBe(true);
      expect(isValidDirectionChange('LEFT', 'UP')).toBe(true);
      expect(isValidDirectionChange('RIGHT', 'DOWN')).toBe(true);
      expect(isValidDirectionChange('UP', 'UP')).toBe(true);
    });
  });

  describe('getNextHeadPosition & Collision', () => {
    it('detects wall collision in classic mode', () => {
      const head = { x: 0, y: 0 };
      const { position, hitWall } = getNextHeadPosition(head, { x: -1, y: 0 }, 20, 'classic');
      expect(hitWall).toBe(true);
      expect(position.x).toBe(-1);
    });

    it('wraps borders seamlessly in endless mode', () => {
      const headLeft = { x: 0, y: 5 };
      const resLeft = getNextHeadPosition(headLeft, { x: -1, y: 0 }, 20, 'endless');
      expect(resLeft.hitWall).toBe(false);
      expect(resLeft.position.x).toBe(19);

      const headRight = { x: 19, y: 5 };
      const resRight = getNextHeadPosition(headRight, { x: 1, y: 0 }, 20, 'endless');
      expect(resRight.hitWall).toBe(false);
      expect(resRight.position.x).toBe(0);
    });

    it('detects self collision', () => {
      const body = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 6, y: 5 }];
      // Head colliding with segment (5, 6)
      expect(checkSelfCollision({ x: 5, y: 6 }, body, false)).toBe(true);
      // Head moving to empty space (5, 4)
      expect(checkSelfCollision({ x: 5, y: 4 }, body, false)).toBe(false);
    });

    it('detects obstacle collision', () => {
      const obstacles = [{ x: 3, y: 3 }, { x: 4, y: 3 }];
      expect(checkObstacleCollision({ x: 3, y: 3 }, obstacles)).toBe(true);
      expect(checkObstacleCollision({ x: 3, y: 4 }, obstacles)).toBe(false);
    });
  });

  describe('Food Spawning & Expiration', () => {
    it('never spawns food on occupied positions', () => {
      const snake = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
      const obstacles = [{ x: 2, y: 0 }];
      const existing = [{ position: { x: 3, y: 0 }, type: 'normal' as const, points: 10, createdAt: 1000 }];

      for (let i = 0; i < 20; i++) {
        const food = spawnFood(5, snake, obstacles, existing, 'normal', 1000);
        expect(food).not.toBeNull();
        if (food) {
          expect(snake.some((s) => s.x === food.position.x && s.y === food.position.y)).toBe(false);
          expect(obstacles.some((o) => o.x === food.position.x && o.y === food.position.y)).toBe(false);
          expect(existing.some((e) => e.position.x === food.position.x && e.position.y === food.position.y)).toBe(false);
        }
      }
    });

    it('prunes expired bonus food while preserving normal food', () => {
      const now = 10000;
      const foods = [
        { position: { x: 1, y: 1 }, type: 'normal' as const, points: 10, createdAt: 5000 },
        { position: { x: 2, y: 2 }, type: 'bonus' as const, points: 25, createdAt: 5000, expiresAt: 9000 }, // Expired
        { position: { x: 3, y: 3 }, type: 'special' as const, points: 50, createdAt: 5000, expiresAt: 15000 } // Active
      ];

      const active = pruneExpiredFood(foods, now);
      expect(active.length).toBe(2);
      expect(active.some((f) => f.type === 'bonus')).toBe(false);
      expect(active.some((f) => f.type === 'special')).toBe(true);
      expect(active.some((f) => f.type === 'normal')).toBe(true);
    });
  });

  describe('Scoring & Progression', () => {
    it('applies difficulty multipliers correctly', () => {
      expect(calculatePointsEarned('normal', 'easy')).toBe(10);
      expect(calculatePointsEarned('normal', 'normal')).toBe(13); // 10 * 1.25 rounded
      expect(calculatePointsEarned('normal', 'hard')).toBe(15);   // 10 * 1.5
      expect(calculatePointsEarned('normal', 'expert')).toBe(20); // 10 * 2.0
    });

    it('advances levels every 100 points', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(99)).toBe(1);
      expect(calculateLevel(100)).toBe(2);
      expect(calculateLevel(250)).toBe(3);
    });
  });

  describe('processGameTick', () => {
    it('moves snake forward and updates head', () => {
      const initialSnake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
      const state: GameState = {
        snake: initialSnake,
        direction: 'RIGHT',
        nextDirection: 'RIGHT',
        food: [{ position: { x: 10, y: 10 }, type: 'normal', points: 10, createdAt: 1000 }],
        obstacles: [],
        score: 0,
        highScore: 100,
        level: 1,
        foodCount: 0,
        status: 'playing',
        timeRemainingSeconds: 60,
        elapsedTimeSeconds: 0,
        isNewHighScore: false
      };

      const { nextState } = processGameTick(state, 20, 'classic', 'normal', 1000);
      expect(nextState.snake[0]).toEqual({ x: 6, y: 5 });
      expect(nextState.snake.length).toBe(3);
      expect(nextState.status).toBe('playing');
    });

    it('grows snake and increases score when food is eaten', () => {
      const initialSnake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
      const foodPosition = { x: 6, y: 5 }; // directly in path
      const state: GameState = {
        snake: initialSnake,
        direction: 'RIGHT',
        nextDirection: 'RIGHT',
        food: [{ position: foodPosition, type: 'normal', points: 10, createdAt: 1000 }],
        obstacles: [],
        score: 0,
        highScore: 100,
        level: 1,
        foodCount: 0,
        status: 'playing',
        timeRemainingSeconds: 60,
        elapsedTimeSeconds: 0,
        isNewHighScore: false
      };

      const { nextState, event } = processGameTick(state, 20, 'classic', 'easy', 1000);
      expect(nextState.snake[0]).toEqual(foodPosition);
      expect(nextState.snake.length).toBe(4); // grew by 1
      expect(nextState.score).toBe(10);
      expect(nextState.foodCount).toBe(1);
      expect(event.ateFood).toBeDefined();
    });

    it('triggers game over on wall hit in classic mode', () => {
      const initialSnake = [{ x: 19, y: 5 }, { x: 18, y: 5 }, { x: 17, y: 5 }];
      const state: GameState = {
        snake: initialSnake,
        direction: 'RIGHT',
        nextDirection: 'RIGHT',
        food: [{ position: { x: 10, y: 10 }, type: 'normal', points: 10, createdAt: 1000 }],
        obstacles: [],
        score: 50,
        highScore: 100,
        level: 1,
        foodCount: 5,
        status: 'playing',
        timeRemainingSeconds: 60,
        elapsedTimeSeconds: 0,
        isNewHighScore: false
      };

      const { nextState, event } = processGameTick(state, 20, 'classic', 'normal', 1000);
      expect(nextState.status).toBe('game-over');
      expect(event.gameOver).toBe(true);
      expect(event.reason).toBe('wall');
    });
  });
});

