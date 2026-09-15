import {
  GameSettings,
  GameStatistics,
  DEFAULT_GAME_SETTINGS,
  DEFAULT_GAME_STATISTICS
} from '@project/core';

const STORAGE_SETTINGS_KEY = 'snake-game-settings-v1';
const STORAGE_STATISTICS_KEY = 'snake-game-statistics-v1';

export function loadStoredSettings(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_GAME_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (!raw) return DEFAULT_GAME_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_GAME_SETTINGS,
      ...parsed
    };
  } catch (err) {
    console.warn('Failed to parse stored game settings, falling back to defaults:', err);
    return DEFAULT_GAME_SETTINGS;
  }
}

export function saveStoredSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to persist game settings:', err);
  }
}

export function loadStoredStatistics(): GameStatistics {
  if (typeof window === 'undefined') return DEFAULT_GAME_STATISTICS;
  try {
    const raw = localStorage.getItem(STORAGE_STATISTICS_KEY);
    if (!raw) return DEFAULT_GAME_STATISTICS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_GAME_STATISTICS,
      ...parsed,
      bestScores: {
        ...DEFAULT_GAME_STATISTICS.bestScores,
        ...(parsed.bestScores || {})
      },
      bestByDifficulty: {
        ...DEFAULT_GAME_STATISTICS.bestByDifficulty,
        ...(parsed.bestByDifficulty || {})
      }
    };
  } catch (err) {
    console.warn('Failed to parse stored game statistics, falling back to defaults:', err);
    return DEFAULT_GAME_STATISTICS;
  }
}

export function saveStoredStatistics(stats: GameStatistics): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_STATISTICS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.warn('Failed to persist game statistics:', err);
  }
}

export function resetStoredData(): { settings: GameSettings; statistics: GameStatistics } {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_SETTINGS_KEY);
      localStorage.removeItem(STORAGE_STATISTICS_KEY);
    } catch (err) {
      console.warn('Failed to clear stored game data:', err);
    }
  }
  return {
    settings: DEFAULT_GAME_SETTINGS,
    statistics: DEFAULT_GAME_STATISTICS
  };
}

