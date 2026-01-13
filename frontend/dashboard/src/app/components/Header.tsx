import React from 'react';
import { Zap, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = ['Workspace', 'Projects'];

  return (
    <header className="h-16 border-b border-zinc-800/50 bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Zap className="w-5 h-5 text-black" fill="currentColor" />
        </div>
        <span className="font-semibold tracking-tight text-base">FLASH</span>
      </div>

      {/* Center Tabs */}
      <nav className="flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1 border border-zinc-800/50">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab
                ? 'text-white bg-zinc-800 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[9px] w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>
        ))}
      </nav>

      {/* Right Side - Credits & Profile */}
      <div className="flex items-center gap-4 min-w-[160px] justify-end">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer group">
          <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:shadow-sm group-hover:shadow-amber-500/50 transition-shadow"></div>
          <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">1,250</span>
        </div>
        
        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105 active:scale-95">
          <User className="w-4.5 h-4.5 text-black" />
        </button>
      </div>
    </header>
  );
}