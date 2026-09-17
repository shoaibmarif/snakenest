import React from 'react';
import { Volume2, VolumeX, Moon, Sun, ExternalLink } from 'lucide-react';
import type { GameSettings } from '@project/core';
import { openExternalUrl, SOCIAL_LINKS } from '../utils/navigation.js';

interface PopupHeaderProps {
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  settings,
  onToggleSound,
  onToggleTheme
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <header className={`w-full border-b px-3.5 py-2.5 flex items-center justify-between transition-colors ${
      isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white/90 shadow-sm'
    }`}>
      {/* Branding & Logo */}
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden border border-emerald-500/30 bg-[#090d16] shadow-sm">
          <svg
            viewBox="0 0 64 64"
            className="h-full w-full p-0.5"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="extSnakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <path
              d="M14 42 Q 14 50 22 50 Q 30 50 30 42 L 30 22 Q 30 14 38 14 Q 46 14 46 22 L 46 30"
              fill="none"
              stroke="url(#extSnakeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="7" fill="#ef4444" />
            <path
              d="M20 13 Q 22 10 24 12"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className={`font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Snake<span className="text-emerald-500">Nest</span>
            </span>
            <span className="rounded px-1 py-0.2 text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              POPUP
            </span>
          </div>
          <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Arcade Chrome Edition
          </p>
        </div>
      </div>

      {/* Actions: Web App Fullscreen, Audio, Theme */}
      <div className="flex items-center gap-1.5">
        {/* Open Web App Button */}
        <button
          onClick={() => openExternalUrl(SOCIAL_LINKS.webApp)}
          className={`flex h-8 items-center gap-1 px-2 rounded-lg border text-[11px] font-medium transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:text-white'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
          title="Play Fullscreen on Web App"
          aria-label="Play Fullscreen on Web App"
        >
          <span>Web App</span>
          <ExternalLink className="h-3 w-3" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          aria-label={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
        >
          {settings.soundEnabled ? (
            <Volume2 className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 text-slate-400" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-blue-600" />
          )}
        </button>
      </div>
    </header>
  );
};
