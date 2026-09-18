import React from 'react';
import { Github, Linkedin, Chrome } from 'lucide-react';

interface FooterProps {
  theme?: 'dark' | 'light';
  onNavigateHome?: () => void;
  onNavigatePrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark', onNavigateHome, onNavigatePrivacy }) => {
  const isDark = theme === 'dark';

  const pillBtnClass = `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-150 active:scale-95 shadow-sm ${
    isDark
      ? 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800'
      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
  }`;

  const extensionPillClass = `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-150 active:scale-95 shadow-sm ${
    isDark
      ? 'border-indigo-500/30 bg-indigo-950/40 text-indigo-300 hover:border-indigo-500/50 hover:bg-indigo-900/50'
      : 'border-indigo-200 bg-indigo-50/80 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-100/80'
  }`;

  return (
    <footer className={`w-full border-t py-8 sm:py-10 mt-12 transition-colors duration-200 ${
      isDark ? 'border-white/10 bg-[#090e17]/60 text-slate-400' : 'border-slate-200 bg-white text-slate-600 shadow-sm'
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: App Logo, Title & Tagline */}
        <div className="space-y-1.5 max-w-md">
          <div
            onClick={onNavigateHome}
            className={`flex items-center gap-2.5 ${onNavigateHome ? 'cursor-pointer select-none group' : ''}`}
            role={onNavigateHome ? 'button' : undefined}
            tabIndex={onNavigateHome ? 0 : undefined}
          >
            {/* Favicon Vector Logo */}
            <div className="relative flex h-7 w-7 items-center justify-center rounded-xl overflow-hidden border border-emerald-500/30 bg-[#090d16] shadow-sm">
              <svg
                viewBox="0 0 64 64"
                className="h-full w-full p-0.5"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="footerSnakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                <path
                  d="M14 42 Q 14 50 22 50 Q 30 50 30 42 L 30 22 Q 30 14 38 14 Q 46 14 46 22 L 46 30"
                  fill="none"
                  stroke="url(#footerSnakeGrad)"
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

            <span className={`font-heading text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Snake<span className="text-emerald-500">Nest</span>
            </span>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Free, instant, 100% private in-browser Snake Game. Zero data leaves your device.
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px]">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                if (onNavigatePrivacy) {
                  e.preventDefault();
                  onNavigatePrivacy();
                }
              }}
              className={`hover:underline transition-colors cursor-pointer ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}
            >
              Privacy Policy
            </a>
            <span className="opacity-40">•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className={`hover:underline transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Right: Creator Credit & Pill Action Buttons */}
        <div className="flex flex-col items-start md:items-end gap-3 self-stretch md:self-auto">
          <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Created by <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Shoaib M. Arif</strong>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* GitHub Pill */}
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noreferrer"
              className={pillBtnClass}
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn Pill */}
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noreferrer"
              className={pillBtnClass}
            >
              <Linkedin className="h-3.5 w-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            {/* Chrome Extension Pill */}
            <a
              href="https://chromewebstore.google.com/detail/snakenest-%E2%80%93-classic-retro/kccmemenobofeaoedlojngldeehjbjgg"
              target="_blank"
              rel="noopener noreferrer"
              className={extensionPillClass}
              title="Get SnakeNest on Chrome Web Store"
            >
              <Chrome className="h-3.5 w-3.5 text-indigo-500" />
              <span>Chrome Extension</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

