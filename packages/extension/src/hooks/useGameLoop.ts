import { useEffect, useRef } from 'react';

interface UseGameLoopOptions {
  isActive: boolean;
  tickIntervalMs: number;
  onTick: (currentTime: number) => void;
  onRender?: () => void;
}

export function useGameLoop({
  isActive,
  tickIntervalMs,
  onTick,
  onRender
}: UseGameLoopOptions) {
  const onTickRef = useRef(onTick);
  const onRenderRef = useRef(onRender);
  const intervalRef = useRef(tickIntervalMs);

  useEffect(() => {
    onTickRef.current = onTick;
    onRenderRef.current = onRender;
    intervalRef.current = tickIntervalMs;
  });

  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let accumulator = 0;

    const loop = (currentTime: number) => {
      let delta = currentTime - lastTime;
      lastTime = currentTime;

      // Cap delta if tab or popup was suspended
      if (delta > 250) {
        delta = 250;
      }

      accumulator += delta;
      const interval = intervalRef.current;

      while (accumulator >= interval) {
        onTickRef.current(currentTime);
        accumulator -= interval;
      }

      if (onRenderRef.current) {
        onRenderRef.current();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);
}

