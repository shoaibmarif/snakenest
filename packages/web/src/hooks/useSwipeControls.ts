import { useEffect, useRef } from 'react';
import type { Direction } from '@project/core';

interface UseSwipeControlsOptions {
  onDirectionChange: (direction: Direction) => void;
  isEnabled: boolean;
  minSwipeDistancePx?: number;
}

export function useSwipeControls(
  elementRef: React.RefObject<HTMLElement | null>,
  {
    onDirectionChange,
    isEnabled,
    minSwipeDistancePx = 30
  }: UseSwipeControlsOptions
) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !isEnabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      // Prevent browser default gesture (pull-to-refresh or scrolling)
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touchEnd = e.changedTouches[0];
      const deltaX = touchEnd.clientX - touchStartRef.current.x;
      const deltaY = touchEnd.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) < minSwipeDistancePx) {
        return; // Ignore tiny movements / taps
      }

      if (absX > absY) {
        // Horizontal swipe
        onDirectionChange(deltaX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        // Vertical swipe
        onDirectionChange(deltaY > 0 ? 'DOWN' : 'UP');
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, isEnabled, onDirectionChange, minSwipeDistancePx]);
}

