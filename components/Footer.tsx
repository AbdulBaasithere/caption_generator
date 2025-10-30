import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <div className="flex justify-center gap-6 mb-4 text-sm">
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-primary">Chrome Extension</a>
            <a href="https://zapier.com/apps" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-primary">Integrations</a>
            <a href="mailto:support@captionstudio.ai" className="transition-colors hover:text-brand-primary">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} CaptionStudio AI. All rights reserved.</p>
      </div>
    </footer>
  );
};