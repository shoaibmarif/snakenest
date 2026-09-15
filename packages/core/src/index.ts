export * from './models/types.js';
export * from './algorithms/formatter.js';

// Game Engine Exports
export * from './game/types.js';
export * from './game/constants.js';
export * from './game/collision.js';
export * from './game/food.js';
export * from './game/scoring.js';
export * from './game/gameModes.js';
export * from './game/gameEngine.js';

export const CORE_VERSION = '0.1.0';

export function createDefaultWorkspace(name = 'Modern Monorepo'): import('./models/types.js').WorkspaceMetadata {
  return {
    id: 'ws_' + Math.random().toString(36).substring(2, 9),
    name,
    version: CORE_VERSION,
    createdAt: Date.now(),
    environment: 'development'
  };
}
