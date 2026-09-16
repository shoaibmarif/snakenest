import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Settings } from 'lucide-react';
import type { GameSettings } from '@project/core';

interface HeaderProps {
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSound,
  onToggleTheme,
  onOpenSettings,
  onNavigateHome
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200 ${
      isDark
        ? 'border-white/10 bg-[#090e17]/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
        : 'border-slate-200/90 bg-white/85 shadow-[0_4px_20px_rgba(15,23,42,0.03)]'
    }`}>
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Branding & Logo with Favicon Vector Snake */}
        <div
          onClick={onNavigateHome}
          className={`flex items-center gap-2.5 sm:gap-3 ${onNavigateHome ? 'cursor-pointer select-none group' : ''}`}
          role={onNavigateHome ? 'button' : undefined}
          tabIndex={onNavigateHome ? 0 : undefined}
          onKeyDown={(e) => {
            if (onNavigateHome && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
        >
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#090d16] shadow-[0_0_20px_-2px_rgba(16,185,129,0.4)]">
            <svg
              viewBox="0 0 64 64"
              className="h-full w-full p-1"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="headerSnakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              {/* Snake Body */}
              <path
                d="M14 42 Q 14 50 22 50 Q 30 50 30 42 L 30 22 Q 30 14 38 14 Q 46 14 46 22 L 46 30"
                fill="none"
                stroke="url(#headerSnakeGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Apple Food */}
              <circle cx="20" cy="20" r="7" fill="#ef4444" />
              <path
                d="M20 13 Q 22 10 24 12"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`font-heading font-black tracking-tight text-base sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Snake<span className="text-emerald-500">Nest</span>
              </span>
      
            </div>
            <p className={`text-[10px] sm:text-[11px] font-normal hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Classic Retro Gaming • Web Audio Engine
            </p>
          </div>
        </div>

        {/* Action Controls: Sound, Theme, Settings */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
            title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            aria-label={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-blue-600" />
            )}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
            title="Open Game Settings"
            aria-label="Open Game Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
