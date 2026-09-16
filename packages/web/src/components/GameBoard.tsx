import React, { useEffect, useRef, useCallback } from 'react';
import type { GameState, GameSettings, Direction } from '@project/core';
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
    const now = performance.now();

    // 1. Draw Arena Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (isDark) {
      bgGrad.addColorStop(0, '#090e17');
      bgGrad.addColorStop(1, '#0e1524');
    } else {
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#f8fafc');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Sleek Grid Pattern (Matrix Dots & Fine Coordinates)
    if (settings.showGridLines) {
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.09)';
      const dotRadius = Math.max(0.75, cellSize * 0.04);
      for (let x = 1; x < gridSize; x++) {
        for (let y = 1; y < gridSize; y++) {
          ctx.beginPath();
          ctx.arc(x * cellSize, y * cellSize, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Very faint coordinate grid
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.03)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);
    }

    // 3. Draw Obstacles (Obstacles Mode)
    if (gameState.obstacles.length > 0) {
      for (const obs of gameState.obstacles) {
        const x = obs.x * cellSize;
        const y = obs.y * cellSize;
        const pad = cellSize * 0.08;
        const size = cellSize - pad * 2;

        ctx.save();
        // Cyber obstacle block
        ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
        ctx.strokeStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x + pad, y + pad, size, size, cellSize * 0.25);
        ctx.fill();
        ctx.stroke();

        // Inner hazard cross
        ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(217, 119, 6, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + pad + size * 0.3, y + pad + size * 0.3);
        ctx.lineTo(x + pad + size * 0.7, y + pad + size * 0.7);
        ctx.moveTo(x + pad + size * 0.7, y + pad + size * 0.3);
        ctx.lineTo(x + pad + size * 0.3, y + pad + size * 0.7);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 4. Draw Food Items with Glossy 3D Arcade Visuals
    for (const item of gameState.food) {
      const centerX = (item.position.x + 0.5) * cellSize;
      const centerY = (item.position.y + 0.5) * cellSize;
      const baseRadius = cellSize * 0.38;

      // Smooth pulsing effect
      const pulse = settings.reducedMotion ? 1 : 1 + Math.sin(now / 220) * 0.09;
      const radius = baseRadius * pulse;

      ctx.save();
      ctx.translate(centerX, centerY);

      if (item.type === 'normal') {
        // === JUICY 3D RUBY APPLE ===
        // Ambient Drop Glow
        ctx.shadowColor = 'rgba(239, 68, 68, 0.55)';
        ctx.shadowBlur = isDark ? 16 : 8;

        // Apple Sphere Body with Radial 3D Light
        const appleGrad = ctx.createRadialGradient(
          -radius * 0.3,
          -radius * 0.3,
          radius * 0.1,
          0,
          0,
          radius * 1.1
        );
        appleGrad.addColorStop(0, '#ff7675');
        appleGrad.addColorStop(0.5, '#ef4444');
        appleGrad.addColorStop(1, '#b91c1c');

        ctx.fillStyle = appleGrad;
        ctx.beginPath();
        ctx.arc(0, radius * 0.1, radius * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Glossy Specular Reflection Gleam
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.beginPath();
        ctx.ellipse(-radius * 0.32, -radius * 0.25, radius * 0.28, radius * 0.15, Math.PI / 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Stem & Emerald Leaf
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = cellSize * 0.08;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -radius * 0.7);
        ctx.quadraticCurveTo(radius * 0.15, -radius * 1.1, radius * 0.3, -radius * 1.05);
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.ellipse(radius * 0.35, -radius * 0.9, radius * 0.35, radius * 0.18, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'bonus') {
        // === RADIANT CELESTIAL STAR FRUIT ===
        const rot = settings.reducedMotion ? 0 : now / 800;
        ctx.rotate(rot);

        ctx.shadowColor = 'rgba(234, 179, 8, 0.8)';
        ctx.shadowBlur = isDark ? 20 : 12;

        // Draw 5-Pointed Golden Star
        const spikes = 5;
        const outerR = radius * 1.15;
        const innerR = radius * 0.55;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        for (let s = 0; s < spikes * 2; s++) {
          const r = s % 2 === 0 ? outerR : innerR;
          const angle = (s * Math.PI) / spikes - Math.PI / 2;
          const sx = Math.cos(angle) * r;
          const sy = Math.sin(angle) * r;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();

        // Inner glowing core
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, innerR * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'special') {
        // === COSMIC AMETHYST CRYSTAL GEM ===
        const rot = settings.reducedMotion ? 0 : -now / 1000;
        ctx.rotate(rot);

        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        ctx.shadowBlur = isDark ? 22 : 14;

        // Draw Hexagonal Crystal Facet
        const sides = 6;
        const r = radius * 1.15;
        ctx.beginPath();
        for (let s = 0; s < sides; s++) {
          const angle = (s * Math.PI * 2) / sides;
          const sx = Math.cos(angle) * r;
          const sy = Math.sin(angle) * r;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();

        const gemGrad = ctx.createLinearGradient(-r, -r, r, r);
        gemGrad.addColorStop(0, '#c084fc');
        gemGrad.addColorStop(0.5, '#a855f7');
        gemGrad.addColorStop(1, '#6b21a8');
        ctx.fillStyle = gemGrad;
        ctx.fill();

        // Facet reflection lines
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.8);
        ctx.lineTo(r * 0.7, 0);
        ctx.lineTo(0, r * 0.8);
        ctx.lineTo(-r * 0.7, 0);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    }

    // 5. Draw Organic Cyber-Snake
    const snake = gameState.snake;
    if (snake.length > 0) {
      // Step A: Draw continuous smooth rounded body connections
      const bodyWidth = cellSize * 0.78;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = bodyWidth;

      for (let i = snake.length - 1; i >= 1; i--) {
        const curr = snake[i];
        const next = snake[i - 1];

        // Skip connection if wrapping around border in endless mode
        const isWrapping =
          Math.abs(curr.x - next.x) > 1 || Math.abs(curr.y - next.y) > 1;

        const x1 = (curr.x + 0.5) * cellSize;
        const y1 = (curr.y + 0.5) * cellSize;
        const x2 = (next.x + 0.5) * cellSize;
        const y2 = (next.y + 0.5) * cellSize;

        // Progressive gradient ratio along snake length
        const progress = 1 - i / snake.length;

        // Color interpolation for smooth gradient
        ctx.strokeStyle = isDark
          ? `rgba(16, 185, 129, ${0.45 + progress * 0.5})`
          : `rgba(22, 163, 74, ${0.65 + progress * 0.35})`;

        if (!isWrapping) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        } else {
          // Just draw individual segment circle if wrapping
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(x1, y1, bodyWidth * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Step B: Draw individual segment highlight nodes for 3D depth
      for (let i = 1; i < snake.length; i++) {
        const seg = snake[i];
        const sx = (seg.x + 0.5) * cellSize;
        const sy = (seg.y + 0.5) * cellSize;
        const progress = 1 - i / snake.length;

        ctx.fillStyle = isDark
          ? `rgba(52, 211, 153, ${0.5 + progress * 0.45})`
          : `rgba(34, 197, 94, ${0.7 + progress * 0.3})`;

        ctx.beginPath();
        ctx.arc(sx, sy, cellSize * 0.36, 0, Math.PI * 2);
        ctx.fill();

        // Subtle specular gloss node on segments
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(sx - cellSize * 0.08, sy - cellSize * 0.08, cellSize * 0.12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Step C: Draw Snake Head
      const head = snake[0];
      const hx = (head.x + 0.5) * cellSize;
      const hy = (head.y + 0.5) * cellSize;
      const headRadius = cellSize * 0.42;

      ctx.save();
      ctx.translate(hx, hy);

      // Rotate head canvas to active direction
      let angle = 0;
      if (gameState.direction === 'DOWN') angle = Math.PI / 2;
      else if (gameState.direction === 'LEFT') angle = Math.PI;
      else if (gameState.direction === 'UP') angle = -Math.PI / 2;
      ctx.rotate(angle);

      // Head Glowing Aura
      ctx.shadowColor = isDark ? 'rgba(16, 185, 129, 0.8)' : 'rgba(22, 163, 74, 0.5)';
      ctx.shadowBlur = isDark ? 16 : 8;

      // Head Capsule Contour
      const headGrad = ctx.createLinearGradient(-headRadius, 0, headRadius, 0);
      headGrad.addColorStop(0, isDark ? '#10b981' : '#15803d');
      headGrad.addColorStop(1, isDark ? '#34d399' : '#22c55e');

      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.roundRect(-headRadius * 0.85, -headRadius, headRadius * 1.85, headRadius * 2, headRadius * 0.7);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cute tongue flick animation (every 3 seconds for 250ms)
      const tongueCycle = now % 3000;
      if (gameState.status === 'playing' && tongueCycle < 250) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = cellSize * 0.08;
        ctx.lineCap = 'round';
        const tongueLength = headRadius * 0.8;
        ctx.beginPath();
        ctx.moveTo(headRadius, 0);
        ctx.lineTo(headRadius + tongueLength, 0);
        // Forked tongue tip
        ctx.lineTo(headRadius + tongueLength + cellSize * 0.1, -cellSize * 0.08);
        ctx.moveTo(headRadius + tongueLength, 0);
        ctx.lineTo(headRadius + tongueLength + cellSize * 0.1, cellSize * 0.08);
        ctx.stroke();
      }

      // Expressive Visor Eyes
      const eyeOffsetX = headRadius * 0.25;
      const eyeOffsetY = headRadius * 0.52;
      const eyeR = cellSize * 0.14;
      const pupilR = cellSize * 0.07;

      // Sclera (Whites of eyes)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeOffsetX, -eyeOffsetY, eyeR, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX, eyeOffsetY, eyeR, 0, Math.PI * 2);
      ctx.fill();

      // Irises / Pupils tracking forward
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.arc(eyeOffsetX + eyeR * 0.35, -eyeOffsetY, pupilR, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX + eyeR * 0.35, eyeOffsetY, pupilR, 0, Math.PI * 2);
      ctx.fill();

      // Specular Light Sparkle in Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeOffsetX + eyeR * 0.45, -eyeOffsetY - pupilR * 0.3, pupilR * 0.45, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX + eyeR * 0.45, eyeOffsetY - pupilR * 0.3, pupilR * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();
    }

    ctx.restore();
  }, [gameState, settings]);

  // Dynamically re-render whenever the container element changes dimensions or device orientation changes
  useEffect(() => {
    render();

    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const triggerResize = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        render();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      triggerResize();
    });

    resizeObserver.observe(container);
    window.addEventListener('resize', triggerResize);
    window.addEventListener('orientationchange', triggerResize);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', triggerResize);
      window.removeEventListener('orientationchange', triggerResize);
    };
  }, [render]);

  const isDark = settings.theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[440px] sm:max-w-[480px] mx-auto rounded-3xl overflow-hidden border-2 touch-none select-none transition-all duration-300 ${
        isDark
          ? 'border-emerald-500/30 bg-[#090e17] shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]'
          : 'border-slate-300 bg-white shadow-[0_15px_35px_-5px_rgba(15,23,42,0.1)]'
      }`}
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
