import React, { useState } from 'react';
import {
  Code2,
  Box,
  Cpu,
  Chrome,
  CheckCircle2,
  Copy,
  Hash,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  slugify,
  analyzeText,
  createDefaultWorkspace,
  CORE_VERSION
} from '@project/core';

export const Workbench: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Modern TypeScript Monorepo Architecture with React 19 and Chrome Extension V3'
  );
  const [copied, setCopied] = useState(false);

  // Direct consumption of @project/core pure algorithms
  const slug = slugify(inputText);
  const metrics = analyzeText(inputText);
  const sampleWorkspace = createDefaultWorkspace('Production Cluster');

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Hero Section */}
      <section className="text-center sm:text-left space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Production-Ready TypeScript Monorepo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Modular Workspace Architecture
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-400">
          Configured with npm workspaces, direct source imports, Vitest unit testing, React 19,
          Tailwind CSS v4, and dual-target Chrome Extension bundling.
        </p>
      </section>

      {/* Package Grid Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Package */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-white">@project/core</h2>
              <span className="text-xs font-mono text-blue-400">v{CORE_VERSION} • Zero UI Deps</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Pure TypeScript business logic, models, and shared algorithms with modern source exports.
          </p>
          <div className="rounded-lg bg-slate-950/80 p-3 text-xs font-mono text-slate-300 border border-slate-800/80">
            <div className="text-slate-500 mb-1">// package.json source export</div>
            <div className="text-emerald-400">"exports": {"{ \".\": \"./src/index.ts\" }"}</div>
          </div>
        </div>

        {/* Web Package */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-white">@project/web</h2>
              <span className="text-xs font-mono text-cyan-400">React 19 • Vite • Tailwind v4</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            High-performance SPA with full SEO metadata, Schema.org JSON-LD, PWA manifest, and Netlify CI/CD.
          </p>
          <div className="rounded-lg bg-slate-950/80 p-3 text-xs font-mono text-slate-300 border border-slate-800/80">
            <div className="text-slate-500 mb-1">// netlify.toml</div>
            <div className="text-cyan-400">publish = "packages/web/dist"</div>
          </div>
        </div>

        {/* Extension Package */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20">
              <Chrome className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-white">@project/extension</h2>
              <span className="text-xs font-mono text-amber-400">Manifest V3 • Multi-Input</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Dual-target Rollup bundling both popup.html and background.js service worker with unhashed root filenames.
          </p>
          <div className="rounded-lg bg-slate-950/80 p-3 text-xs font-mono text-slate-300 border border-slate-800/80">
            <div className="text-slate-500 mb-1">// vite.config.ts</div>
            <div className="text-amber-400">dist/background.js & dist/popup.html</div>
          </div>
        </div>
      </section>

      {/* Interactive Core Engine Workbench */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-400" />
              Shared Logic Live Workbench
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Test algorithms imported in real-time from <code className="text-blue-300">@project/core</code>.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Workspace: {sampleWorkspace.name}</span>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Input String for Core Algorithm Processing:
            </label>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slug Generation Card */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">slugify(text) Output:</span>
                <button
                  onClick={copySlug}
                  className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 break-all">
                {slug || '<empty>'}
              </div>
            </div>

            {/* FastHash Card */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">fastHash(text) Output:</span>
                <span className="text-[11px] font-mono text-slate-500">FNV-1a 32-bit</span>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-indigo-400 border border-slate-800 flex items-center justify-between">
                <span>0x{metrics.hash}</span>
                <span className="text-[10px] text-slate-500">Computed via @project/core</span>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
              <div className="flex items-center justify-center text-slate-500 mb-1">
                <FileText className="h-4 w-4" />
              </div>
              <div className="text-lg font-bold text-white">{metrics.charCount}</div>
              <div className="text-[11px] text-slate-400">Characters</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
              <div className="flex items-center justify-center text-slate-500 mb-1">
                <Hash className="h-4 w-4" />
              </div>
              <div className="text-lg font-bold text-white">{metrics.wordCount}</div>
              <div className="text-[11px] text-slate-400">Words</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
              <div className="flex items-center justify-center text-slate-500 mb-1">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-lg font-bold text-white">{metrics.readingTimeMinutes} min</div>
              <div className="text-[11px] text-slate-400">Read Time</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

