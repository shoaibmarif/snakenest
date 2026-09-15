import React, { useState, useEffect } from 'react';
import { slugify, fastHash, CORE_VERSION } from '@project/core';

export const Popup: React.FC = () => {
  const [input, setInput] = useState('Chrome Extension v3 Quick Test');
  const [activeTabUrl, setActiveTabUrl] = useState<string>('Loading...');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setActiveTabUrl(tabs[0].url);
        } else {
          setActiveTabUrl('No active tab URL detected');
        }
      });
    } else {
      setActiveTabUrl('Running in standalone / dev preview mode');
    }
  }, []);

  const slug = slugify(input);
  const hash = fastHash(input);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-[360px] min-h-[460px] bg-slate-950 text-slate-100 flex flex-col p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
            PX
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight text-white">Project Extension</h1>
            <p className="text-[10px] text-slate-400">Manifest V3 • Shared Engine</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono text-blue-400 border border-blue-500/20">
          core v{CORE_VERSION}
        </span>
      </div>

      {/* Active Tab Info */}
      <div className="mt-3 rounded-lg bg-slate-900/80 p-2.5 border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Active Context:</span>
          <span className="text-emerald-400 font-medium">activeTab granted</span>
        </div>
        <div className="truncate text-slate-300 font-mono text-[11px]" title={activeTabUrl}>
          {activeTabUrl}
        </div>
      </div>

      {/* Input / Transformer */}
      <div className="mt-4 space-y-3 flex-1">
        <div>
          <label className="block text-[11px] font-medium text-slate-300 mb-1">
            Input for Core Algorithms:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Slug Output */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Slug:</span>
            <button
              onClick={() => copyToClipboard(slug, 'slug')}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-[10px]"
            >
              {copied === 'slug' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="text-xs font-mono text-emerald-400 break-all bg-slate-950/60 p-1.5 rounded border border-slate-800/60">
            {slug || '<empty>'}
          </div>
        </div>

        {/* Hash Output */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>FNV-1a Hash:</span>
            <button
              onClick={() => copyToClipboard(hash, 'hash')}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-[10px]"
            >
              {copied === 'hash' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="text-xs font-mono text-indigo-400 break-all bg-slate-950/60 p-1.5 rounded border border-slate-800/60">
            0x{hash}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
        <span>Chrome Extension Manifest V3</span>
        <span>Service Worker Ready</span>
      </div>
    </div>
  );
};
