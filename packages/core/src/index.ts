export * from './models/types.js';
export * from './algorithms/formatter.js';

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
