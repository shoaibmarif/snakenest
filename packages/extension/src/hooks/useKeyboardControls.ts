import { useEffect } from 'react';
import type { Direction } from '@project/core';

interface KeyboardControlsOptions {
  onDirectionChange: (direction: Direction) => void;
  onTogglePause: () => void;
  onStartOrRestart: () => void;
  isEnabled: boolean;
}

export function useKeyboardControls({
  onDirectionChange,
  onTogglePause,
  onStartOrRestart,
  isEnabled
}: KeyboardControlsOptions) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar'];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          onDirectionChange('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          onDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onDirectionChange('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onDirectionChange('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          onTogglePause();
          break;
        case 'Escape':
          e.preventDefault();
          onTogglePause();
          break;
        case 'Enter':
          e.preventDefault();
          onStartOrRestart();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onDirectionChange, onTogglePause, onStartOrRestart]);
}

