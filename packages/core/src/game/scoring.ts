import type { Difficulty, FoodType } from './types.js';
import { FOOD_CONFIG, DIFFICULTY_MULTIPLIERS } from './constants.js';

/**
 * Calculates score points earned for eating a food item given current difficulty.
 */
export function calculatePointsEarned(foodType: FoodType, difficulty: Difficulty): number {
  const basePoints = FOOD_CONFIG[foodType].points;
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  return Math.round(basePoints * multiplier);
}

/**
 * Determines current level based on total score. Level increases every 100 points.
 */
export function calculateLevel(score: number): number {
  return Math.floor(score / 100) + 1;
}

/**
 * Calculates adjusted speed (ms per tick) as player levels up (gradual 2% increase per level, capped).
 */
export function calculateTickInterval(baseInterval: number, level: number): number {
  const levelSpeedBonus = Math.min(level - 1, 10) * 0.02; // max 20% speedup
  return Math.max(40, Math.round(baseInterval * (1 - levelSpeedBonus)));
}

