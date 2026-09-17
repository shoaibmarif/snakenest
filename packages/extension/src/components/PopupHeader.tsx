import React from 'react';
import { Volume2, VolumeX, Moon, Sun, ExternalLink, Github, Linkedin } from 'lucide-react';
import type { GameSettings } from '@project/core';
import { openExternalUrl, SOCIAL_LINKS } from '../utils/navigation.js';

interface PopupHeaderProps {
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

export const EXTENSION_VERSION = '1.0.0';

const getExtensionVersion = (): string => {
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
      return chrome.runtime.getManifest().version;
    }
  } catch {
    // Fallback if accessed in web or test environment
  }
  return '1.0.0';
  return EXTENSION_VERSION;
};

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  settings,
  onToggleSound,
  onToggleTheme
}) => {
  const isDark = settings.theme === 'dark';
  const version = getExtensionVersion();

  return (
    <header
      className={`w-full px-3.5 py-2.5 flex items-center justify-between select-none transition-colors ${
        isDark ? 'bg-slate-950' : 'bg-white'
      }`}
    >
      {/* Left: Branding, Logo & Version Badge */}
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden border border-emerald-500/30 bg-[#090d16] shadow-sm shrink-0">
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

        <div className="flex items-center gap-1.5">
          <span className={`font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Snake<span className="text-emerald-500">Nest</span>
          </span>
          <span
            className={`font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded-md border tracking-tight ${
              isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title={`SnakeNest v${version}`}
          >
            v{version}
          </span>
        </div>
      </div>

      {/* Right: Actions (Web App, GitHub, LinkedIn, Audio, Theme) */}
      <div className="flex items-center gap-1.5">
        {/* Open Web App Button */}
        <button
          type="button"
          onClick={() => openExternalUrl(SOCIAL_LINKS.webApp)}
          className={`flex h-8 items-center gap-1.5 px-2.5 rounded-lg border text-[11px] font-semibold transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:text-white'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
          title="Play Fullscreen on Web App (snakenest.netlify.app)"
          aria-label="Play Fullscreen on Web App"
        >
          <span>Web App</span>
          <ExternalLink size={12} className="shrink-0" />
        </button>

        {/* GitHub Link */}
        <button
          type="button"
          onClick={() => openExternalUrl(SOCIAL_LINKS.github)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
          }`}
          title="View Developer on GitHub (shoaibmarif)"
          aria-label="GitHub Profile"
        >
          <Github size={16} className="shrink-0" />
        </button>

        {/* LinkedIn Link */}
        <button
          type="button"
          onClick={() => openExternalUrl(SOCIAL_LINKS.linkedin)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-blue-400 hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-100 shadow-2xs'
          }`}
          title="Connect on LinkedIn (shoaibmarif)"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={16} className="shrink-0" />
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
          }`}
          title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          aria-label={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
        >
          {settings.soundEnabled ? (
            <Volume2 size={16} className="text-emerald-500 shrink-0" />
          ) : (
            <VolumeX size={16} className="text-slate-400 shrink-0" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? (
            <Sun size={16} className="text-amber-400 shrink-0" />
          ) : (
            <Moon size={16} className="text-blue-600 shrink-0" />
          )}
        </button>
      </div>
    </header>
  );
};
