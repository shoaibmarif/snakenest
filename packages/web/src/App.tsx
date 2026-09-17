import React, { useState, useEffect } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame.js';
import { useKeyboardControls } from './hooks/useKeyboardControls.js';
import { Header } from './components/Header.js';
import { GameBoard } from './components/GameBoard.js';
import { ScoreBoard } from './components/ScoreBoard.js';
import { GameOverlay } from './components/GameOverlay.js';
import { GameControls } from './components/GameControls.js';
import { GameModeSelector } from './components/GameModeSelector.js';
import { DifficultySelector } from './components/DifficultySelector.js';
import { HighScorePanel } from './components/HighScorePanel.js';
import { SettingsPanel } from './components/SettingsPanel.js';
import { Instructions } from './components/Instructions.js';
import { Footer } from './components/Footer.js';
import { PrivacyPolicy } from './components/PrivacyPolicy.js';
import { NotFoundPage } from './components/NotFoundPage.js';
import { usePageSEO } from './hooks/usePageSEO.js';

export const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Client-side lightweight routing
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const {
    gameState,
    settings,
    statistics,
    changeDirection,
    startGame,
    togglePause,
    restartGame,
    setGameMode,
    setDifficulty,
    toggleSound,
    toggleTheme,
    updateSetting,
    resetData
  } = useSnakeGame();

  const isHomeRoute = currentPath === '/' || currentPath === '/index.html';
  const isPrivacyRoute = currentPath === '/privacy-policy' || currentPath === '/privacy-policy/' || currentPath === '/privacy';
  const isNotFound = !isHomeRoute && !isPrivacyRoute;

  // Dynamic Route SEO Management
  const seoConfig = isPrivacyRoute
    ? {
        title: 'Privacy Policy – SnakeNest Snake Game',
        description:
          'SnakeNest privacy policy: 100% client-side, zero personal data tracking, private local-storage high score persistence, and offline Web Audio architecture.',
        canonicalUrl: 'https://snakenest.netlify.app/privacy-policy',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      }
    : isNotFound
    ? {
        title: '404 - Page Not Found | SnakeNest Snake Game',
        description:
          'The requested coordinate or game route does not exist. Return to SnakeNest to play the classic Snake Game.',
        canonicalUrl: 'https://snakenest.netlify.app/',
        robots: 'noindex, nofollow'
      }
    : {
        title: 'Snake Game Online – Play Classic Snake Game Free',
        description:
          'Play Snake Game online for free. Enjoy classic Snake gameplay with multiple modes, difficulty levels, high scores, keyboard controls, and mobile touch support.',
        canonicalUrl: 'https://snakenest.netlify.app/',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      };

  usePageSEO(seoConfig);

  // Bind Keyboard Controls only when on game view
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onStartOrRestart: () => {
      if (gameState.status === 'ready' || gameState.status === 'game-over') {
        startGame();
      }
    },
    isEnabled: !isSettingsOpen && isHomeRoute
  });

  // Apply dark/light class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [settings.theme]);

  const isDark = settings.theme === 'dark';

  return (
    <div className={`min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-200 selection:bg-emerald-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <Header
        settings={settings}
        onToggleSound={toggleSound}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onNavigateHome={() => navigateTo('/')}
      />

      {/* 1. Privacy Policy Page Route */}
      {isPrivacyRoute && (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrivacyPolicy
            theme={settings.theme}
            onNavigateHome={() => navigateTo('/')}
          />
        </main>
      )}

      {/* 2. 404 Page Not Found Route */}
      {isNotFound && (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <NotFoundPage
            theme={settings.theme}
            onNavigateHome={() => navigateTo('/')}
          />
        </main>
      )}

      {/* 3. Main Game Workbench Area (Home Route) */}
      {isHomeRoute && (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
          {/* SEO Main Heading with Generous Breathing Spacing */}
          <div className="text-center space-y-2 pt-2 sm:pt-4">
            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Snake Game Online
            </h1>
            <p className={`text-xs sm:text-sm max-w-lg mx-auto leading-relaxed transition-colors ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Navigate the arena, consume glowing fruit, and shatter high-score records across 4 unique battle modes.
            </p>
          </div>

          {/* Unified Game Stage: Side-by-Side on Desktop (Arena + Controls/Selectors), Single-Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left Column: Game Board Arena & Score HUD */}
            <section className="relative flex flex-col items-center gap-5 sm:gap-6 w-full max-w-full">
              {/* Score Board */}
              <ScoreBoard gameState={gameState} settings={settings} />

              {/* Interactive Game Board with Overlay */}
              <div className="relative w-full max-w-[min(100%,460px)] lg:max-w-none">
                <div className="arcade-ambient-glow" />
                <GameBoard
                  gameState={gameState}
                  settings={settings}
                  onDirectionChange={changeDirection}
                  onTogglePause={togglePause}
                  onStartOrRestart={startGame}
                />
                <GameOverlay
                  gameState={gameState}
                  settings={settings}
                  onStart={startGame}
                  onResume={togglePause}
                  onRestart={restartGame}
                  onOpenModesModal={() => {
                    const el = document.getElementById('mode-selector-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* Touch D-pad & Action Buttons */}
              <GameControls
                status={gameState.status}
                theme={settings.theme}
                onDirectionChange={changeDirection}
                onTogglePause={togglePause}
                onRestart={restartGame}
              />
            </section>

            {/* Right Column: Mode Selector, Difficulty Selector & Quick Stats - visible in the same screen on desktop */}
            <aside className="w-full space-y-6 sm:space-y-7">
              {/* Mode and Difficulty Selectors */}
              <section id="mode-selector-section" className="space-y-5">
                <GameModeSelector
                  currentMode={settings.gameMode}
                  theme={settings.theme}
                  onSelectMode={setGameMode}
                  disabled={gameState.status === 'playing'}
                />

                <DifficultySelector
                  currentDifficulty={settings.difficulty}
                  theme={settings.theme}
                  onSelectDifficulty={setDifficulty}
                  disabled={gameState.status === 'playing'}
                />
              </section>

              {/* Local Leaderboard & High Score Panel */}
              <section id="leaderboard">
                <HighScorePanel statistics={statistics} theme={settings.theme} />
              </section>
            </aside>
          </div>

          {/* Comprehensive SEO Content & FAQ below the unified game stage */}
          <section id="how-to-play" className="pt-8 sm:pt-12 border-t border-slate-200/60 dark:border-slate-800/60">
            <Instructions theme={settings.theme} />
          </section>
        </main>
      )}

      {/* Settings Modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
        onResetData={resetData}
      />

      {/* Footer */}
      <Footer
        theme={settings.theme}
        onNavigateHome={() => navigateTo('/')}
        onNavigatePrivacy={() => navigateTo('/privacy-policy')}
      />
    </div>
  );
};

export default App;
