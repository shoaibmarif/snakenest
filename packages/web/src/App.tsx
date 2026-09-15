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

export const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  // Bind Keyboard Controls
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onStartOrRestart: () => {
      if (gameState.status === 'ready' || gameState.status === 'game-over') {
        startGame();
      }
    },
    isEnabled: !isSettingsOpen
  });

  // Apply dark/light class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        settings={settings}
        onToggleSound={toggleSound}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Game Workbench Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* SEO Main Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Snake Game Online
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Play the classic arcade game online for free. Navigate, grow your snake, and score high!
          </p>
        </div>

        {/* Game Arena Container */}
        <section className="flex flex-col items-center gap-4">
          {/* Score Board */}
          <ScoreBoard gameState={gameState} settings={settings} />

          {/* Interactive Game Board with Overlay */}
          <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
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
            onDirectionChange={changeDirection}
            onTogglePause={togglePause}
            onRestart={restartGame}
          />
        </section>

        {/* Mode and Difficulty Selectors */}
        <section id="mode-selector-section" className="space-y-6 pt-2">
          <GameModeSelector
            currentMode={settings.gameMode}
            onSelectMode={setGameMode}
            disabled={gameState.status === 'playing'}
          />

          <DifficultySelector
            currentDifficulty={settings.difficulty}
            onSelectDifficulty={setDifficulty}
            disabled={gameState.status === 'playing'}
          />
        </section>

        {/* Local Leaderboard & High Score Panel */}
        <HighScorePanel statistics={statistics} />

        {/* Comprehensive SEO Content & FAQ */}
        <Instructions />
      </main>

      {/* Settings Modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
        onResetData={resetData}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
