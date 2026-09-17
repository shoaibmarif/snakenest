import React, { useEffect } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame.js';
import { useKeyboardControls } from '../hooks/useKeyboardControls.js';
import { PopupHeader } from '../components/PopupHeader.js';
import { PopupScoreBar } from '../components/PopupScoreBar.js';
import { PopupGameBoard } from '../components/PopupGameBoard.js';
import { PopupControls } from '../components/PopupControls.js';
import { PopupFooter } from '../components/PopupFooter.js';

export const Popup: React.FC = () => {
  const {
    gameState,
    settings,
    changeDirection,
    startGame,
    togglePause,
    restartGame,
    setGameMode,
    setDifficulty,
    toggleSound,
    toggleTheme
  } = useSnakeGame();

  // Keyboard navigation
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onStartOrRestart: () => {
      if (gameState.status === 'ready') {
        startGame();
      } else if (gameState.status === 'game-over') {
        restartGame();
      }
    },
    isEnabled: true
  });

  // Sync document theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  return (
    <div className={`w-[380px] min-h-[590px] flex flex-col justify-between select-none transition-colors duration-200 ${
      settings.theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Navigation & Header */}
        <PopupHeader
          settings={settings}
          onToggleTheme={toggleTheme}
          onToggleSound={toggleSound}
        />

        {/* Live HUD Score Bar */}
        <PopupScoreBar
          gameState={gameState}
          settings={settings}
        />

        {/* Arcade Canvas Game Board */}
        <div className="flex justify-center items-center py-1.5 px-3">
          <PopupGameBoard
            gameState={gameState}
            settings={settings}
            onStart={startGame}
            onResume={togglePause}
            onRestart={restartGame}
          />
        </div>

        {/* Arcade Controls & D-Pad */}
        <PopupControls
          gameState={gameState}
          gameMode={settings.gameMode}
          difficulty={settings.difficulty}
          onDirectionChange={changeDirection}
          onSetGameMode={setGameMode}
          onSetDifficulty={setDifficulty}
          onStartGame={startGame}
          onTogglePause={togglePause}
          onRestartGame={restartGame}
        />
      </div>

      {/* Social Links & Web App Links Footer */}
      <PopupFooter />
    </div>
  );
};
