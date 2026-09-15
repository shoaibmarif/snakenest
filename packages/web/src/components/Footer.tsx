import React from 'react';
import { Github, CheckCircle, ShieldCheck } from 'lucide-react';
import { CORE_VERSION } from '@project/core';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Production-Grade TypeScript Template • v{CORE_VERSION}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-slate-400">
            <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
            <span>npm workspaces linked</span>
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
