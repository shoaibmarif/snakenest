import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { openExternalUrl, SOCIAL_LINKS } from '../utils/navigation.js';

interface PopupFooterProps {
  theme: 'dark' | 'light';
}

export const PopupFooter: React.FC<PopupFooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full mt-auto px-3 py-2.5 border-t text-[11px] select-none transition-colors duration-200 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-400'
          : 'bg-slate-100/90 border-slate-200 text-slate-600'
      }`}
    >
      <div className="flex items-center justify-center gap-2.5">
        {/* GitHub Link */}
        <button
          type="button"
          onClick={() => openExternalUrl(SOCIAL_LINKS.github)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shadow-2xs border group ${
            isDark
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title="View Developer on GitHub (shoaibmarif)"
        >
          <Github className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          <span>GitHub</span>
        </button>

        {/* LinkedIn Link */}
        <button
          type="button"
          onClick={() => openExternalUrl(SOCIAL_LINKS.linkedin)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shadow-2xs border group ${
            isDark
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-white'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white'
          }`}
          title="Connect on LinkedIn (shoaibmarif)"
        >
          <Linkedin className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          <span>LinkedIn</span>
        </button>
      </div>
    </footer>
  );
};

