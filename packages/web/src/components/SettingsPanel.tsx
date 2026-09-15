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

  const isDark = settings.theme === 'dark';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const labelColor = isDark ? 'text-slate-200' : 'text-slate-800';
  const subTextColor = isDark ? 'text-slate-500' : 'text-slate-500';
  const dividerColor = isDark ? 'border-slate-800/60' : 'border-slate-200';

  const handleConfirmReset = () => {
    onResetData();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className={`text-base font-bold flex items-center gap-2 ${headingColor}`}>
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className={`rounded-lg p-1.5 transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
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
                <Volume2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <VolumeX className="h-4 w-4 text-slate-400" />
              )}
              <div>
                <div className={`text-xs font-medium ${labelColor}`}>Sound Effects</div>
                <div className={`text-[10px] ${subTextColor}`}>Audio synthesizers for actions & events</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('soundEnabled', !settings.soundEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.soundEnabled ? 'bg-emerald-600' : (isDark ? 'bg-slate-700' : 'bg-slate-300')
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
          <div className={`flex items-center justify-between py-1 border-t pt-3 ${dividerColor}`}>
            <div className="flex items-center gap-2.5">
              {isDark ? (
                <Moon className="h-4 w-4 text-blue-400" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500" />
              )}
              <div>
                <div className={`text-xs font-medium ${labelColor}`}>Visual Theme</div>
                <div className={`text-[10px] ${subTextColor}`}>Toggle dark or light mode</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('theme', isDark ? 'light' : 'dark')}
              className={`text-xs px-3 py-1.5 rounded-lg border capitalize font-semibold transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {settings.theme} Mode
            </button>
          </div>

          {/* Grid Size */}
          <div className={`py-1 border-t pt-3 ${dividerColor}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-xs font-medium ${labelColor}`}>Grid Dimensions</div>
              <div className="text-[11px] font-mono text-emerald-500 font-bold">{settings.gridSize} × {settings.gridSize}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 25].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateSetting('gridSize', size)}
                  className={`py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    settings.gridSize === size
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-sm'
                      : isDark
                        ? 'border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {size} × {size}
                </button>
              ))}
            </div>
          </div>

          {/* Show Grid Lines */}
          <div className={`flex items-center justify-between py-1 border-t pt-3 ${dividerColor}`}>
            <div className="flex items-center gap-2.5">
              <Grid className="h-4 w-4 opacity-75" />
              <div>
                <div className={`text-xs font-medium ${labelColor}`}>Show Grid Lines</div>
                <div className={`text-[10px] ${subTextColor}`}>Render subtle cell guides on canvas</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('showGridLines', !settings.showGridLines)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.showGridLines ? 'bg-blue-600' : (isDark ? 'bg-slate-700' : 'bg-slate-300')
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
          <div className={`flex items-center justify-between py-1 border-t pt-3 ${dividerColor}`}>
            <div className="flex items-center gap-2.5">
              <Touchpad className="h-4 w-4 opacity-75" />
              <div>
                <div className={`text-xs font-medium ${labelColor}`}>Touch Swipes</div>
                <div className={`text-[10px] ${subTextColor}`}>Swipe on canvas to direct snake</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('swipeEnabled', !settings.swipeEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.swipeEnabled ? 'bg-blue-600' : (isDark ? 'bg-slate-700' : 'bg-slate-300')
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
          <div className={`flex items-center justify-between py-1 border-t pt-3 ${dividerColor}`}>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 opacity-75" />
              <div>
                <div className={`text-xs font-medium ${labelColor}`}>Reduce Motion</div>
                <div className={`text-[10px] ${subTextColor}`}>Disable pulsing food animations</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSetting('reducedMotion', !settings.reducedMotion)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-blue-600' : (isDark ? 'bg-slate-700' : 'bg-slate-300')
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
          <div className={`border-t pt-4 ${dividerColor}`}>
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border py-2.5 px-4 text-xs font-semibold transition-colors ${
                  isDark
                    ? 'border-rose-500/30 bg-rose-950/20 text-rose-400 hover:bg-rose-950/40'
                    : 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset All High Scores & Data</span>
              </button>
            ) : (
              <div className={`rounded-xl border p-3.5 space-y-3 ${
                isDark ? 'border-rose-500/50 bg-rose-950/30' : 'border-rose-200 bg-rose-50'
              }`}>
                <div className={`flex items-start gap-2.5 text-xs ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
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
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
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
