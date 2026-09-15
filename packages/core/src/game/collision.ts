import type { Position, GameMode } from './types.js';

export function isSamePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function isPositionInList(pos: Position, list: Position[]): boolean {
  return list.some((item) => isSamePosition(pos, item));
}

/**
 * Computes next head position accounting for game mode (wall collision vs wrap around).
 */
export function getNextHeadPosition(
  currentHead: Position,
  delta: { x: number; y: number },
  gridSize: number,
  mode: GameMode
): { position: Position; hitWall: boolean } {
  let nextX = currentHead.x + delta.x;
  let nextY = currentHead.y + delta.y;

  if (mode === 'endless') {
    // Wrap around borders seamlessly
    if (nextX < 0) nextX = gridSize - 1;
    else if (nextX >= gridSize) nextX = 0;

    if (nextY < 0) nextY = gridSize - 1;
    else if (nextY >= gridSize) nextY = 0;

    return { position: { x: nextX, y: nextY }, hitWall: false };
  }

  // Classic, Obstacles, Time Challenge modes: hitting wall causes game over
  const hitWall = nextX < 0 || nextX >= gridSize || nextY < 0 || nextY >= gridSize;
  return { position: { x: nextX, y: nextY }, hitWall };
}

/**
 * Checks if snake head collided with its body.
 * In a standard move where the snake is not growing, the tail moves away, but collision check
 * should check against body segments up to body.length - 1 (or full body if growing).
 */
export function checkSelfCollision(head: Position, body: Position[], isGrowing: boolean): boolean {
  const segmentsToCheck = isGrowing ? body : body.slice(0, -1);
  return isPositionInList(head, segmentsToCheck);
}

/**
 * Checks if snake collided with any static obstacles on the board.
 */
export function checkObstacleCollision(head: Position, obstacles: Position[]): boolean {
  return isPositionInList(head, obstacles);
}

