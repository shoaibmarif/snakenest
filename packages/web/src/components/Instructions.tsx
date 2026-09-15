import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Keyboard, Gamepad2, Sparkles, BookOpen } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I control the snake on desktop and mobile?',
    answer: 'On desktop, use the Arrow keys or W, A, S, D to steer. Use the Spacebar to pause or resume, and Enter to start or restart. On mobile and touch devices, use either the on-screen tactile D-pad or swipe directly in any direction on the game board.'
  },
  {
    question: 'What are the differences between the game modes?',
    answer: 'Classic Mode ends if you hit the arena walls or your own tail. Endless Mode enables border wrapping so you seamlessly re-enter from the opposite side. Time Challenge gives you a 60-second timer where each food eaten rewards +3 bonus seconds. Obstacles Mode places static barrier blocks across the board.'
  },
  {
    question: 'How are points and score multipliers calculated?',
    answer: 'Normal red apples award 10 base points. Bonus golden fruits award 25 points. Special purple cosmic gems award 50 points. Difficulty multipliers scale your points: Easy (1.0×), Normal (1.25×), Hard (1.5×), and Expert (2.0×).'
  },
  {
    question: 'Does this game store my personal data or require an account?',
    answer: 'No! Snake Game is 100% client-side and privacy-friendly. All personal bests, high scores, and preferences are stored exclusively on your device via browser LocalStorage. No server, database, or account is ever required.'
  },
  {
    question: 'Can I play this Snake Game completely offline?',
    answer: 'Yes. Once loaded, the game relies entirely on client-side HTML5 Canvas and native Web Audio API synthesis without external API dependencies, allowing full offline play.'
  }
];

export const Instructions: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-4xl mx-auto space-y-8 pt-4">
      {/* Introduction & SEO Headings */}
      <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Classic Arcade Reimagined</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            How to Play Snake Game Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Welcome to the modern, high-performance edition of the legendary 1970s arcade classic.
            Maneuver your snake across the arena, consume food to grow your length, and compete for
            record-breaking high scores across four distinct game modes.
          </p>
        </header>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Keyboard className="h-4 w-4 text-blue-400" />
              <span>Keyboard Controls</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center justify-between">
                <span>Steer Snake:</span>
                <span className="font-mono text-slate-300">Arrow Keys or W, A, S, D</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Pause / Resume:</span>
                <span className="font-mono text-slate-300">Spacebar or Esc</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Start / Restart:</span>
                <span className="font-mono text-slate-300">Enter</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Gamepad2 className="h-4 w-4 text-emerald-400" />
              <span>Touch & Mobile Controls</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center justify-between">
                <span>Touch Swiping:</span>
                <span className="font-mono text-slate-300">Swipe anywhere on board</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tactile D-Pad:</span>
                <span className="font-mono text-slate-300">On-screen 4-way arrow pad</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Single-Handed Play:</span>
                <span className="font-mono text-slate-300">Optimized ergonomics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Game Rules & Scoring Overview */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span>Food Types & Scoring Table</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-rose-950/60 bg-rose-950/20 p-3 flex items-start gap-3">
              <div className="h-4 w-4 rounded-full bg-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-300">Normal Apple</div>
                <div className="text-[11px] text-slate-400 mt-0.5">+10 base points. Always spawns in empty cells.</div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-950/60 bg-amber-950/20 p-3 flex items-start gap-3">
              <div className="h-4 w-4 rounded-full bg-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-300">Bonus Golden Fruit</div>
                <div className="text-[11px] text-slate-400 mt-0.5">+25 base points. Appears temporarily for 7 seconds.</div>
              </div>
            </div>

            <div className="rounded-xl border border-purple-950/60 bg-purple-950/20 p-3 flex items-start gap-3">
              <div className="h-4 w-4 rounded-full bg-purple-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-purple-300">Special Cosmic Gem</div>
                <div className="text-[11px] text-slate-400 mt-0.5">+50 base points. Rare spawn available for 5 seconds.</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Frequently Asked Questions Accordion */}
      <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-4">
        <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-800/80 bg-slate-950/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};

