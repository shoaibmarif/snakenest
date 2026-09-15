import React, { useState } from 'react';
import { Header } from './components/Header.js';
import { Workbench } from './components/Workbench.js';
import { CommandPalette } from './components/CommandPalette.js';
import { Footer } from './components/Footer.js';

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <div className="flex-1">
        <Workbench />
      </div>
      <Footer />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default App;
