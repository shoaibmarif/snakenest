import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Settings } from 'lucide-react';
import type { GameSettings } from '@project/core';

interface HeaderProps {
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSound,
  onToggleTheme,
  onOpenSettings
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Branding & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/20 text-lg">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                Snake Game Online
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 hidden sm:inline">
                Arcade Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Classic Retro Gaming • 100% Offline</p>
          </div>
        </div>

        {/* Action Controls: Sound, Theme, Settings */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            aria-label={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            title={`Switch to ${settings.theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label={`Switch to ${settings.theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {settings.theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-blue-400" />
            )}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
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
