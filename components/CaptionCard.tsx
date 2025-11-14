
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './IconComponents';

interface CaptionCardProps {
  text: string;
}

export const CaptionCard: React.FC<CaptionCardProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 flex items-start gap-4 transition-shadow hover:shadow-lg animate-fade-in">
      <p className="flex-grow text-slate-700 whitespace-pre-wrap">{text}</p>
      <button
        onClick={handleCopy}
        className={`flex-shrink-0 p-2 rounded-md transition-colors ${
          isCopied
            ? 'bg-green-100 text-green-600'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
        aria-label="Copy caption"
      >
        {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};
