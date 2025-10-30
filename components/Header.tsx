import React from 'react';
import { LogoIcon } from './IconComponents';

interface HeaderProps {
  onUpgradeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onUpgradeClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-slate-800">CaptionStudio AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onUpgradeClick}
              className="hidden sm:inline-block text-slate-600 font-semibold text-sm hover:text-brand-primary transition-colors"
              title="Upgrade to access the Analytics Dashboard"
            >
              Analytics
            </button>
            <button
              onClick={onUpgradeClick}
              className="hidden sm:inline-block bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};