import React, { useEffect, useState, useRef } from 'react';
import { Search, Terminal, Zap, Puzzle, Globe, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or shortcut
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    {
      id: 'core-test',
      title: 'Run @project/core unit tests (Vitest)',
      category: 'Core Engine',
      icon: Zap,
      action: () => {
        alert('Run command: npm run test');
        onClose();
      }
    },
    {
      id: 'web-build',
      title: 'Build @project/web SPA bundle',
      category: 'Web Application',
      icon: Globe,
      action: () => {
        alert('Run command: npm run build:web');
        onClose();
      }
    },
    {
      id: 'ext-build',
      title: 'Build @project/extension (Manifest V3)',
      category: 'Chrome Extension',
      icon: Puzzle,
      action: () => {
        alert('Run command: npm run build:ext');
        onClose();
      }
    },
    {
      id: 'monorepo-build',
      title: 'Build all packages (--workspaces)',
      category: 'Monorepo Pipeline',
      icon: Terminal,
      action: () => {
        alert('Run command: npm run build');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search workspace..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-slate-800/70 text-slate-200 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-800 p-1.5 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{cmd.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{cmd.category}</span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching commands found.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/40 px-4 py-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[10px] text-slate-400">↑</kbd>
            <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[10px] text-slate-400">↓</kbd>
            <span>Select:</span>
            <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[10px] text-slate-400">↵</kbd>
          </div>
          <div>
            <span>Close:</span>
            <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[10px] text-slate-400 ml-1">ESC</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

