import React, { useEffect } from 'react';
import { Ghost, Home, Gamepad2, Compass } from 'lucide-react';

interface NotFoundPageProps {
  theme?: 'dark' | 'light';
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  theme = 'dark',
  onNavigateHome
}) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = '404 Page Not Found – SnakeNest Snake Game';
  }, []);

  const cardBg = isDark
    ? 'border-white/10 bg-slate-900/70 text-slate-100 shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
    : 'border-slate-200 bg-white text-slate-900 shadow-sm';

  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-200">
      <div className={`w-full rounded-3xl border p-8 sm:p-12 backdrop-blur-xl space-y-6 ${cardBg}`}>
        {/* Glowing 404 Visual */}
        <div className="relative inline-flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-[0_0_35px_-5px_rgba(16,185,129,0.5)] text-white mx-auto">
          <Ghost className="h-12 w-12 sm:h-14 sm:w-14 animate-bounce" />
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white shadow-md">
            404
          </div>
        </div>

        {/* Heading & Notice */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide border border-rose-500/20 bg-rose-500/10 text-rose-500">
            <Compass className="h-3.5 w-3.5" />
            <span>Off-Grid Coordinates</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Page Not Found
          </h1>
          <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${subTextColor}`}>
            Your snake navigated beyond the arena perimeter! The coordinate you requested does not exist or has slithered away.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-white shadow-[0_10px_20px_-4px_rgba(16,185,129,0.4)] hover:brightness-110 transition-all transform active:scale-95 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Arena</span>
          </button>

          <button
            onClick={() => {
              onNavigateHome();
              // Small delay to ensure route renders home before scrolling
              setTimeout(() => {
                const el = document.getElementById('how-to-play');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/10 bg-slate-900/80 text-slate-200 hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Gamepad2 className="h-4 w-4 text-emerald-500" />
            <span>Game Guide & FAQ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

