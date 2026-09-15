import React, { useState } from 'react';
import type { GameSettings } from '@project/core';
import {
  X,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Grid,
  Touchpad,
  Sparkles,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
  onResetData: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSetting,
  onResetData
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleConfirmReset = () => {
    onResetData();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              {settings.soundEnabled ? (
                <Volume2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <VolumeX className="h-4 w-4 text-slate-500" />
              )}
              <div>
                <div className="text-xs font-medium text-slate-200">Sound Effects</div>
                <div className="text-[10px] text-slate-500">Audio synthesizers for actions & events</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('soundEnabled', !settings.soundEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between py-1 border-t border-slate-800/60 pt-3">
            <div className="flex items-center gap-2.5">
              {settings.theme === 'dark' ? (
                <Moon className="h-4 w-4 text-blue-400" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" />
              )}
              <div>
                <div className="text-xs font-medium text-slate-200">Visual Theme</div>
                <div className="text-[10px] text-slate-500">Toggle dark or light mode</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark')}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 capitalize font-medium"
            >
              {settings.theme} Mode
            </button>
          </div>

          {/* Grid Size */}
          <div className="py-1 border-t border-slate-800/60 pt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-slate-200">Grid Dimensions</div>
              <div className="text-[11px] font-mono text-emerald-400">{settings.gridSize} × {settings.gridSize}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 25].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateSetting('gridSize', size)}
                  className={`py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    settings.gridSize === size
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 font-bold'
                      : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {size} × {size}
                </button>
              ))}
            </div>
          </div>

          {/* Show Grid Lines */}
          <div className="flex items-center justify-between py-1 border-t border-slate-800/60 pt-3">
            <div className="flex items-center gap-2.5">
              <Grid className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs font-medium text-slate-200">Show Grid Lines</div>
                <div className="text-[10px] text-slate-500">Render subtle cell guides on canvas</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('showGridLines', !settings.showGridLines)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.showGridLines ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.showGridLines ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Swipe Gestures */}
          <div className="flex items-center justify-between py-1 border-t border-slate-800/60 pt-3">
            <div className="flex items-center gap-2.5">
              <Touchpad className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs font-medium text-slate-200">Touch Swipes</div>
                <div className="text-[10px] text-slate-500">Swipe on canvas to direct snake</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('swipeEnabled', !settings.swipeEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.swipeEnabled ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.swipeEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between py-1 border-t border-slate-800/60 pt-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs font-medium text-slate-200">Reduce Motion</div>
                <div className="text-[10px] text-slate-500">Disable pulsing food animations</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('reducedMotion', !settings.reducedMotion)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Stored Data */}
          <div className="border-t border-slate-800/60 pt-4">
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/20 py-2.5 px-4 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset All High Scores & Data</span>
              </button>
            ) : (
              <div className="rounded-xl border border-rose-500/50 bg-rose-950/30 p-3.5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-rose-300">
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Are you sure? This will delete all high scores, best runs, and personal records permanently.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleConfirmReset}
                    className="flex-1 rounded-lg bg-rose-600 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

