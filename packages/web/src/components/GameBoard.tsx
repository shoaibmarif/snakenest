import React, { useEffect, useRef, useCallback } from 'react';
import type { GameState, GameSettings, Direction, Position } from '@project/core';
import { useSwipeControls } from '../hooks/useSwipeControls.js';

interface GameBoardProps {
  gameState: GameState;
  settings: GameSettings;
  onDirectionChange: (dir: Direction) => void;
  onTogglePause: () => void;
  onStartOrRestart: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  settings,
  onDirectionChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Bind swipe controls directly to the container element
  useSwipeControls(containerRef, {
    onDirectionChange,
    isEnabled: settings.swipeEnabled && gameState.status === 'playing'
  });

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Set internal canvas resolution to high-DPI
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const isDark = settings.theme === 'dark';
    const gridSize = settings.gridSize;
    const cellSize = width / gridSize;

    // 1. Draw Canvas Background
    ctx.fillStyle = isDark ? '#090d16' : '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Subtle Grid Lines (if enabled)
    if (settings.showGridLines) {
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= gridSize; i++) {
        const pos = i * cellSize;
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, height);
        ctx.moveTo(0, pos);
        ctx.lineTo(width, pos);
      }
      ctx.stroke();
    }

    // 3. Draw Obstacles (Obstacles Mode)
    if (gameState.obstacles.length > 0) {
      for (const obs of gameState.obstacles) {
        const x = obs.x * cellSize;
        const y = obs.y * cellSize;
        const pad = cellSize * 0.08;
        const size = cellSize - pad * 2;

        ctx.fillStyle = isDark ? '#334155' : '#94a3b8';
        ctx.beginPath();
        ctx.roundRect(x + pad, y + pad, size, size, cellSize * 0.2);
        ctx.fill();

        // Inner hazard accent
        ctx.strokeStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // 4. Draw Food Items with Pulsing Glow
    const now = Date.now();
    for (const item of gameState.food) {
      const centerX = (item.position.x + 0.5) * cellSize;
      const centerY = (item.position.y + 0.5) * cellSize;
      const radius = (cellSize * 0.4);

      // Pulse animation effect (unless reduced motion is enabled)
      const pulse = settings.reducedMotion ? 1 : 1 + Math.sin(now / 200) * 0.08;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(pulse, pulse);

      if (item.type === 'normal') {
        // Red Apple with subtle stem
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // Little leaf/stem
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(0, -radius * 0.9, radius * 0.25, radius * 0.45, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'bonus') {
        // Golden Star Fruit
        ctx.shadowColor = 'rgba(234, 179, 8, 0.7)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.fill();

        // Inner diamond
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.roundRect(-radius * 0.4, -radius * 0.4, radius * 0.8, radius * 0.8, 2);
        ctx.fill();
      } else if (item.type === 'special') {
        // Purple Cosmic Gem
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f3e8ff';
        ctx.beginPath();
        ctx.arc(-radius * 0.2, -radius * 0.2, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 5. Draw Snake Body and Head
    const snake = gameState.snake;
    if (snake.length > 0) {
      // Draw Body Segments with smooth gradient connection
      for (let i = snake.length - 1; i >= 1; i--) {
        const seg = snake[i];
        const segX = seg.x * cellSize;
        const segY = seg.y * cellSize;
        const pad = cellSize * 0.08;
        const size = cellSize - pad * 2;

        // Gradient from tail to head
        const ratio = 1 - i / snake.length;
        ctx.fillStyle = isDark
          ? `rgba(34, 197, 94, ${0.45 + ratio * 0.45})`
          : `rgba(22, 163, 74, ${0.5 + ratio * 0.45})`;

        ctx.beginPath();
        ctx.roundRect(segX + pad, segY + pad, size, size, cellSize * 0.3);
        ctx.fill();
      }

      // Draw Snake Head
      const head = snake[0];
      const headX = head.x * cellSize;
      const headY = head.y * cellSize;
      const headPad = cellSize * 0.05;
      const headSize = cellSize - headPad * 2;

      ctx.fillStyle = isDark ? '#4ade80' : '#16a34a';
      ctx.shadowColor = 'rgba(74, 222, 128, 0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(headX + headPad, headY + headPad, headSize, headSize, cellSize * 0.35);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw cute animated eyes facing active direction
      const drawEyes = (dir: Direction, hPos: Position) => {
        const hx = hPos.x * cellSize;
        const hy = hPos.y * cellSize;
        const eyeRadius = cellSize * 0.12;
        const pupilRadius = cellSize * 0.06;

        let eye1 = { x: 0, y: 0 };
        let eye2 = { x: 0, y: 0 };

        if (dir === 'RIGHT') {
          eye1 = { x: hx + cellSize * 0.7, y: hy + cellSize * 0.3 };
          eye2 = { x: hx + cellSize * 0.7, y: hy + cellSize * 0.7 };
        } else if (dir === 'LEFT') {
          eye1 = { x: hx + cellSize * 0.3, y: hy + cellSize * 0.3 };
          eye2 = { x: hx + cellSize * 0.3, y: hy + cellSize * 0.7 };
        } else if (dir === 'UP') {
          eye1 = { x: hx + cellSize * 0.3, y: hy + cellSize * 0.3 };
          eye2 = { x: hx + cellSize * 0.7, y: hy + cellSize * 0.3 };
        } else if (dir === 'DOWN') {
          eye1 = { x: hx + cellSize * 0.3, y: hy + cellSize * 0.7 };
          eye2 = { x: hx + cellSize * 0.7, y: hy + cellSize * 0.7 };
        }

        // White of eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eye1.x, eye1.y, eyeRadius, 0, Math.PI * 2);
        ctx.arc(eye2.x, eye2.y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Dark pupils
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(eye1.x, eye1.y, pupilRadius, 0, Math.PI * 2);
        ctx.arc(eye2.x, eye2.y, pupilRadius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawEyes(gameState.direction, head);
    }

    ctx.restore();
  }, [gameState, settings]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[440px] sm:max-w-[480px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-800 dark:border-slate-800/80 shadow-2xl bg-slate-950 touch-none select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        aria-label="Snake Game interactive canvas board"
        role="img"
      >
        Your browser does not support HTML5 Canvas. Please update to a modern browser to play Snake Game.
      </canvas>
    </div>
  );
};

