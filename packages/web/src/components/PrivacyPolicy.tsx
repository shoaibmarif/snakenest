import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Server, RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyProps {
  theme?: 'dark' | 'light';
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  theme = 'dark',
  onNavigateHome
}) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy – SnakeNest Snake Game';
  }, []);

  const cardBg = isDark
    ? 'border-white/10 bg-slate-900/70 text-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
    : 'border-slate-200 bg-white text-slate-900 shadow-sm';

  const sectionBg = isDark
    ? 'border-slate-800 bg-slate-950/50 text-slate-300'
    : 'border-slate-200 bg-slate-50 text-slate-700';

  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      {/* Back Button */}
      <button
        onClick={onNavigateHome}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer ${
          isDark
            ? 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-slate-800'
            : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-slate-50 shadow-sm'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Game</span>
      </button>

      {/* Main Privacy Card */}
      <article className={`rounded-3xl border p-6 sm:p-10 backdrop-blur-xl space-y-8 ${cardBg}`}>
        <header className="space-y-3 border-b border-slate-200/50 dark:border-white/10 pb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Client-Side & Privacy-First</span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Privacy Policy
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            Effective Date: September 2026 • Last updated: September 16, 2026
          </p>
        </header>

        {/* Highlight Banner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 flex items-start gap-3.5">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className={`font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
              Your privacy is fundamentally guaranteed:
            </strong>{' '}
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              SnakeNest does not collect, store, or sell any personal identifying information. All gameplay state, custom preferences, and high score records remain strictly on your local device.
            </span>
          </div>
        </div>

        {/* Section 1: Data Storage */}
        <section className="space-y-3">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Lock className="h-5 w-5 text-emerald-500" />
            <span>1. Local Data Storage & Browser Memory</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            When you play SnakeNest, the game uses standard browser <code className="font-mono text-emerald-500 font-semibold">localStorage</code> exclusively to persist:
          </p>
          <div className={`rounded-xl border p-4 space-y-2 text-xs sm:text-sm ${sectionBg}`}>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>High scores and record achievements across all 4 game modes.</li>
              <li>Player statistics (games played, food consumed, lifetime records).</li>
              <li>User interface preferences (dark/light theme, audio mute state, swipe controls).</li>
            </ul>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            This data never leaves your browser and is never sent to our servers. You can clear it anytime from the in-game Settings panel or by clearing your browser cache.
          </p>
        </section>

        {/* Section 2: Audio & Native APIs */}
        <section className="space-y-3">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Server className="h-5 w-5 text-blue-500" />
            <span>2. Sound Synthesis & Offline Architecture</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            Audio sound effects in SnakeNest are synthesized natively using the standard browser Web Audio API in real time. We do not download remote sound packages or track audio usage. Once loaded, the game functions completely offline.
          </p>
        </section>

        {/* Section 3: Third-Party Analytics */}
        <section className="space-y-3">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Eye className="h-5 w-5 text-amber-500" />
            <span>3. Analytics & Aggregated Performance</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            To understand technical performance, device compatibility, and site stability, SnakeNest utilizes Google Analytics with anonymized traffic data. This helps us ensure compatibility with various browser canvas renderers and mobile touch configurations. No personal identity is ever correlated with gameplay runs.
          </p>
        </section>

        {/* Section 4: Contact */}
        <section className="space-y-3 pt-2">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <RefreshCw className="h-5 w-5 text-purple-500" />
            <span>4. Questions & Open Source Inquiries</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
            SnakeNest is open source under the MIT license. For questions regarding the code or privacy architecture, visit the official{' '}
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline font-semibold"
            >
              GitHub repository
            </a>{' '}
            or contact us via{' '}
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              LinkedIn
            </a>.
          </p>
        </section>
      </article>
    </div>
  );
};

