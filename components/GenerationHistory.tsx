import React from 'react';
import type { HistoryEntry } from '../types';
import { HistoryIcon } from './IconComponents';

interface GenerationHistoryProps {
  history: HistoryEntry[];
  selectedId: number | null;
  onSelectItem: (entry: HistoryEntry) => void;
}

const HistoryItem: React.FC<{
    entry: HistoryEntry;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ entry, isSelected, onSelect }) => {
    const timeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <button
            onClick={onSelect}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
                isSelected
                    ? 'bg-brand-primary/10 border-brand-primary'
                    : 'bg-white hover:bg-slate-50 border-transparent'
            } border`}
        >
            <p className="font-semibold text-slate-800 truncate">{entry.topic}</p>
            <p className="text-sm text-slate-500">{timeAgo(entry.timestamp)}</p>
        </button>
    );
};


export const GenerationHistory: React.FC<GenerationHistoryProps> = ({ history, selectedId, onSelectItem }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 animate-fade-in h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <HistoryIcon className="w-6 h-6 text-slate-600" />
        Generation History
      </h2>
      {history.length === 0 ? (
        <p className="text-slate-500 text-center py-8">
            Your generated captions will appear here.
        </p>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {history.map((entry) => (
            <HistoryItem
                key={entry.id}
                entry={entry}
                isSelected={entry.id === selectedId}
                onSelect={() => onSelectItem(entry)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
