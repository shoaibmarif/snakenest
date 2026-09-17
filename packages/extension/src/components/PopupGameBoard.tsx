import React, { useEffect, useRef, useCallback } from 'react';
import type { GameState, GameSettings } from '@project/core';
import { Play, RotateCcw, Sparkles, Gamepad2 } from 'lucide-react';

interface PopupGameBoardProps {
  gameState: GameState;
  settings: GameSettings;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export const PopupGameBoard: React.FC<PopupGameBoardProps> = ({
  gameState,
  settings,
  onStart,
  onResume,
  onRestart
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

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

    // 2. Draw Subtle Grid Pattern
    if (settings.showGridLines) {
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)';
      const dotRadius = Math.max(0.75, cellSize * 0.04);
      for (let x = 1; x < gridSize; x++) {
        for (let y = 1; y < gridSize; y++) {
          ctx.beginPath();
          ctx.arc(x * cellSize, y * cellSize, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 3. Draw Obstacles
    if (gameState.obstacles.length > 0) {
      for (const obs of gameState.obstacles) {
        const x = obs.x * cellSize;
        const y = obs.y * cellSize;
        const pad = cellSize * 0.08;
        const size = cellSize - pad * 2;

        ctx.save();
        ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
        ctx.strokeStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x + pad, y + pad, size, size, cellSize * 0.25);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    // 4. Draw Food Items
    for (const item of gameState.food) {
      const centerX = (item.position.x + 0.5) * cellSize;
      const centerY = (item.position.y + 0.5) * cellSize;
      const baseRadius = cellSize * 0.38;
      const pulse = settings.reducedMotion ? 1 : 1 + Math.sin(now / 220) * 0.08;
      const radius = baseRadius * pulse;

      ctx.save();
      ctx.translate(centerX, centerY);

      if (item.type === 'normal') {
        // Red Apple
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.shadowBlur = isDark ? 12 : 6;
        const appleGrad = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, radius * 0.1, 0, 0, radius * 1.1);
        appleGrad.addColorStop(0, '#ff7675');
        appleGrad.addColorStop(0.5, '#ef4444');
        appleGrad.addColorStop(1, '#b91c1c');

        ctx.fillStyle = appleGrad;
        ctx.beginPath();
        ctx.arc(0, radius * 0.1, radius * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Gleam & Stem
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(-radius * 0.3, -radius * 0.25, radius * 0.25, radius * 0.12, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = cellSize * 0.08;
        ctx.beginPath();
        ctx.moveTo(0, -radius * 0.7);
        ctx.quadraticCurveTo(radius * 0.1, -radius * 1.1, radius * 0.25, -radius * 1.0);
        ctx.stroke();
      } else if (item.type === 'bonus') {
        // Star Fruit
        ctx.shadowColor = 'rgba(234, 179, 8, 0.8)';
        ctx.shadowBlur = isDark ? 16 : 8;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'special') {
        // Amethyst Gem
        ctx.shadowColor = 'rgba(168, 85, 247, 0.85)';
        ctx.shadowBlur = isDark ? 16 : 8;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 5. Draw Snake
    const snake = gameState.snake;
    if (snake.length > 0) {
      const bodyWidth = cellSize * 0.76;

      // Draw connected body
      // Draw connected body segments
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.strokeStyle = isDark ? '#10b981' : '#059669';
      ctx.lineWidth = bodyWidth;
      ctx.beginPath();
      snake.forEach((segment, idx) => {
        const sx = (segment.x + 0.5) * cellSize;
        const sy = (segment.y + 0.5) * cellSize;
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();

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

        if (!isWrapping) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        } else {
          // Draw separate rounded cap if wrapping across border
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(x1, y1, bodyWidth * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw segment nodes for smooth joints
      for (let i = 1; i < snake.length; i++) {
        const seg = snake[i];
        const sx = (seg.x + 0.5) * cellSize;
        const sy = (seg.y + 0.5) * cellSize;
        ctx.fillStyle = isDark ? '#10b981' : '#059669';
        ctx.beginPath();
        ctx.arc(sx, sy, bodyWidth * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snake Head with Eyes
      const head = snake[0];
      const hx = (head.x + 0.5) * cellSize;
      const hy = (head.y + 0.5) * cellSize;

      ctx.save();
      ctx.translate(hx, hy);
      ctx.fillStyle = isDark ? '#34d399' : '#10b981';
      ctx.beginPath();
      ctx.arc(0, 0, cellSize * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Eyes orientation based on direction
      let eyeOffsetX = 0;
      let eyeOffsetY = 0;
      let eyeSpreadX = cellSize * 0.18;
      let eyeSpreadY = 0;

      if (gameState.direction === 'UP') {
        eyeOffsetY = -cellSize * 0.16;
        eyeSpreadX = cellSize * 0.18;
        eyeSpreadY = 0;
      } else if (gameState.direction === 'DOWN') {
        eyeOffsetY = cellSize * 0.16;
        eyeSpreadX = cellSize * 0.18;
        eyeSpreadY = 0;
      } else if (gameState.direction === 'LEFT') {
        eyeOffsetX = -cellSize * 0.16;
        eyeSpreadX = 0;
        eyeSpreadY = cellSize * 0.18;
      } else {
        eyeOffsetX = cellSize * 0.16;
        eyeSpreadX = 0;
        eyeSpreadY = cellSize * 0.18;
      }

      // Left Eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeOffsetX - eyeSpreadX, eyeOffsetY - eyeSpreadY, cellSize * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(eyeOffsetX - eyeSpreadX, eyeOffsetY - eyeSpreadY, cellSize * 0.05, 0, Math.PI * 2);
      ctx.fill();

      // Right Eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeOffsetX + eyeSpreadX, eyeOffsetY + eyeSpreadY, cellSize * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(eyeOffsetX + eyeSpreadX, eyeOffsetY + eyeSpreadY, cellSize * 0.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }, [gameState, settings]);

  useEffect(() => {
    let animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [render]);

  const isDark = settings.theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[365px] mx-auto rounded-2xl overflow-hidden shadow-xl select-none ${
        isDark ? 'bg-[#090e17]' : 'bg-slate-50'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        aria-label="Snake Game Arena"
      />

      {/* OVERLAYS */}
      {/* 1. READY OVERLAY */}
      {gameState.status === 'ready' && (
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center backdrop-blur-md ${
          isDark ? 'bg-slate-950/80 text-white' : 'bg-white/85 text-slate-900'
        }`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-md mb-2">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <h2 className="text-base font-black tracking-tight">Ready to Slither?</h2>
          <p className="text-[11px] text-slate-400 mt-0.5 mb-3 max-w-[220px]">
            Use Arrow Keys or WASD to steer. Collect fruit to grow!
          </p>
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Launch Game</span>
          </button>
        </div>
      )}

      {/* 2. PAUSED OVERLAY */}
      {gameState.status === 'paused' && (
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center backdrop-blur-md ${
          isDark ? 'bg-slate-950/80 text-white' : 'bg-white/85 text-slate-900'
        }`}>
          <h2 className="text-base font-black tracking-tight text-blue-400 mb-1">Game Paused</h2>
          <p className="text-[11px] text-slate-400 mb-3">Press Space to resume</p>
          <div className="flex gap-2">
            <button
              onClick={onResume}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Resume</span>
            </button>
            <button
              onClick={onRestart}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. GAME OVER OVERLAY */}
      {gameState.status === 'game-over' && (
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center backdrop-blur-md ${
          isDark ? 'bg-slate-950/85 text-white' : 'bg-white/90 text-slate-900'
        }`}>
          {gameState.isNewHighScore ? (
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="h-3 w-3" />
              <span>NEW HIGH SCORE!</span>
            </div>
          ) : (
            <div className="text-[10px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full mb-1">
              GAME OVER
            </div>
          )}
          <div className="text-3xl font-black font-mono tracking-tight my-1">
            {gameState.score}
          </div>
          <p className="text-[10px] text-slate-400 mb-3">
            High Score: <strong className="text-amber-400">{gameState.highScore}</strong>
          </p>
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

