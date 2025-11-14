import React from 'react';
import { LogoIcon } from './IconComponents';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

interface HeaderProps {
  onUpgradeClick: () => void;
  isProUser: boolean;
  generationCount?: number;
  generationLimit?: number;
}

export const Header: React.FC<HeaderProps> = ({ onUpgradeClick, isProUser, generationCount, generationLimit }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-slate-800">CaptionStudio AI</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {isProUser ? (
                <span className="hidden sm:inline-block bg-brand-light text-brand-dark font-bold text-sm px-3 py-1 rounded-full">PRO MEMBER</span>
            ) : (
                <>
                    {typeof generationCount === 'number' && typeof generationLimit === 'number' && (
                         <span className="hidden sm:inline-block text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                             {Math.max(0, generationLimit - generationCount)}/{generationLimit} left
                         </span>
                    )}
                    <button
                        onClick={onUpgradeClick}
                        className="hidden sm:inline-block bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
                    >
                        Upgrade to Pro
                    </button>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
