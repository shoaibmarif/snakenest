import React from 'react';
import { Globe, Github, Linkedin, Heart, ExternalLink } from 'lucide-react';
import { openExternalUrl, SOCIAL_LINKS } from '../utils/navigation.js';

export const PopupFooter: React.FC = () => {
  return (
    <footer className="w-full mt-auto px-3 py-2 bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 select-none">
      <div className="flex flex-col gap-1.5 items-center">
        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-2">
          {/* Web App Link */}
          <button
            type="button"
            onClick={() => openExternalUrl(SOCIAL_LINKS.webApp)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-[11px] font-medium cursor-pointer shadow-2xs border border-emerald-500/30 group"
            title="Visit Live Web App (snakenest.netlify.app)"
          >
            <Globe className="w-3 h-3 transition-transform group-hover:scale-110" />
            <span>Live Web App</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </button>

          {/* GitHub Link */}
          <button
            type="button"
            onClick={() => openExternalUrl(SOCIAL_LINKS.github)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition-all text-[11px] font-medium cursor-pointer shadow-2xs border border-slate-300/60 dark:border-slate-700 group"
            title="View Developer on GitHub (shoaibmarif)"
          >
            <Github className="w-3 h-3 transition-transform group-hover:scale-110" />
            <span>GitHub</span>
          </button>

          {/* LinkedIn Link */}
          <button
            type="button"
            onClick={() => openExternalUrl(SOCIAL_LINKS.linkedin)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-[11px] font-medium cursor-pointer shadow-2xs border border-blue-500/30 group"
            title="Connect on LinkedIn (shoaibmarif)"
          >
            <Linkedin className="w-3 h-3 transition-transform group-hover:scale-110" />
            <span>LinkedIn</span>
          </button>
        </div>

        {/* Creator Attribution */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-2.5 h-2.5 text-rose-500 fill-current animate-pulse" />
          <span>by</span>
          <button
            type="button"
            onClick={() => openExternalUrl(SOCIAL_LINKS.webApp)}
            className="font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer underline underline-offset-2"
          >
            Shoaib M. Arif
          </button>
        </div>
      </div>
    </footer>
  );
};
