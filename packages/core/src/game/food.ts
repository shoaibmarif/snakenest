import type { Position, Food, FoodType } from './types.js';
import { FOOD_CONFIG } from './constants.js';
import { isPositionInList } from './collision.js';

/**
 * Returns all available empty cells on the grid.
 */
export function getAvailableCells(
  gridSize: number,
  occupiedPositions: Position[]
): Position[] {
  const available: Position[] = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const pos = { x, y };
      if (!isPositionInList(pos, occupiedPositions)) {
        available.push(pos);
      }
    }
  }
  return available;
}

/**
 * Spawns a food item on a random unoccupied cell.
 */
export function spawnFood(
  gridSize: number,
  snake: Position[],
  obstacles: Position[],
  existingFood: Food[],
  type: FoodType = 'normal',
  currentTime: number = Date.now()
): Food | null {
  const occupied = [
    ...snake,
    ...obstacles,
    ...existingFood.map((f) => f.position)
  ];

  const available = getAvailableCells(gridSize, occupied);
  if (available.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * available.length);
  const position = available[randomIndex];

  const config = FOOD_CONFIG[type];
  const durationMs = 'durationMs' in config ? config.durationMs : undefined;

  return {
    position,
    type,
    points: config.points,
    createdAt: currentTime,
    expiresAt: durationMs ? currentTime + durationMs : undefined
  };
}

/**
 * Filters out expired bonus/special food items.
 */
export function pruneExpiredFood(foodList: Food[], currentTime: number = Date.now()): Food[] {
  return foodList.filter((food) => {
    if (!food.expiresAt) return true; // Normal food never expires
    return food.expiresAt > currentTime;
  });
}

