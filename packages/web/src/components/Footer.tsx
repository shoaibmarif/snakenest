import React from 'react';
import { ShieldCheck, Heart, Github } from 'lucide-react';
import { CORE_VERSION } from '@project/core';

interface FooterProps {
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`w-full border-t py-8 px-4 sm:px-6 lg:px-8 mt-12 transition-colors ${
      isDark ? 'border-slate-800/80 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-white text-slate-600 shadow-sm'
    }`}>
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Production Snake Game SPA • Core Engine v{CORE_VERSION}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>using React 19, TypeScript & Canvas</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className={isDark ? 'text-slate-400 hover:text-white transition-colors' : 'text-slate-600 hover:text-slate-900 transition-colors'}
          >
            Sitemap
          </a>
          <a
            href="https://github.com/shoaibmarif/snakenest"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Github className="h-3.5 w-3.5" />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
