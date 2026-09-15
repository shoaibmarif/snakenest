import type { Position, GameMode } from './types.js';

export interface GameModeInfo {
  id: GameMode;
  name: string;
  shortDesc: string;
  description: string;
  icon: string;
}

export const GAME_MODES: GameModeInfo[] = [
  {
    id: 'classic',
    name: 'Classic Mode',
    shortDesc: 'Walls & Body Collide',
    description: 'The definitive snake experience. Avoid walls and your own growing tail.',
    icon: 'ShieldAlert'
  },
  {
    id: 'endless',
    name: 'Endless Mode',
    shortDesc: 'Wrap-Around Borders',
    description: 'Borders wrap seamlessly. Traverse the screen edges freely while avoiding your tail.',
    icon: 'Infinity'
  },
  {
    id: 'time-challenge',
    name: 'Time Challenge',
    shortDesc: '60-Second Countdown',
    description: 'Race against the clock! Collect food to earn +3s bonus time and max points.',
    icon: 'Timer'
  },
  {
    id: 'obstacles',
    name: 'Obstacles Mode',
    shortDesc: 'Static Maze Barriers',
    description: 'Navigate around static barrier blocks scattered across the arena.',
    icon: 'Boxes'
  }
];

/**
 * Generates symmetric and fair obstacle layouts for the grid while leaving the center safe.
 */
export function generateObstacles(gridSize: number, mode: GameMode): Position[] {
  if (mode !== 'obstacles') return [];

  const obstacles: Position[] = [];
  const mid = Math.floor(gridSize / 2);
  const safeRadius = 3;

  // Four corner quadrants with small L-shaped or cross barriers
  const offset = Math.floor(gridSize / 4);

  const barrierAnchors = [
    { x: offset, y: offset },
    { x: gridSize - 1 - offset, y: offset },
    { x: offset, y: gridSize - 1 - offset },
    { x: gridSize - 1 - offset, y: gridSize - 1 - offset }
  ];

  for (const anchor of barrierAnchors) {
    // 3-cell corner barriers
    obstacles.push({ x: anchor.x, y: anchor.y });
    obstacles.push({ x: anchor.x + 1, y: anchor.y });
    obstacles.push({ x: anchor.x, y: anchor.y + 1 });
  }

  // Filter out any barrier within safe center starting zone
  return obstacles.filter(
    (pos) => Math.abs(pos.x - mid) > safeRadius || Math.abs(pos.y - mid) > safeRadius
  );
}

/**
 * Creates initial snake positioned in the center moving RIGHT.
 */
export function createInitialSnake(gridSize: number): Position[] {
  const midX = Math.floor(gridSize / 2);
  const midY = Math.floor(gridSize / 2);

  return [
    { x: midX, y: midY },       // Head
    { x: midX - 1, y: midY },   // Body segment
    { x: midX - 2, y: midY }    // Tail
  ];
}

