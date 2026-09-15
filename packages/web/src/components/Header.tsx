import React from 'react';
import { Layers, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { CORE_VERSION } from '@project/core';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white sm:text-lg">Project Monorepo</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
                v{CORE_VERSION}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Modern TypeScript Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors shadow-inner"
            title="Open Command Palette (Cmd+K or Ctrl+K)"
          >
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">Command Palette</span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">Documentation</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
};
