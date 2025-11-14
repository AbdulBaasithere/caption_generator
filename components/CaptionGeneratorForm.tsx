import React from 'react';
import type { Platform, Tone } from '../types';
import { PLATFORM_OPTIONS, TONE_OPTIONS } from '../constants';
import { SparkleIcon } from './IconComponents';
import { SearchableSelect } from './SearchableSelect';

interface CaptionGeneratorFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  audience: string;
  setAudience: (audience: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  language: string;
  setLanguage: (language: string) => void;
  brandVoice: string;
  setBrandVoice: (brandVoice: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isProUser: boolean;
  onUpgradeClick: () => void;
}

const LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Dutch', 'Russian', 'Japanese', 'Chinese', 'Korean', 'Arabic', 'Hindi'
];


export const CaptionGeneratorForm: React.FC<CaptionGeneratorFormProps> = ({
  topic,
  setTopic,
  audience,
  setAudience,
  tone,
  setTone,
  platform,
  setPlatform,
  language,
  setLanguage,
  brandVoice,
  setBrandVoice,
  onGenerate,
  isLoading,
  isProUser,
  onUpgradeClick,
}) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2">
            Topic / Product / Idea
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., a new AI-powered coffee machine"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
          />
        </div>
        <div>
          <label htmlFor="audience" className="block text-sm font-semibold text-slate-700 mb-2">
            Target Audience (Optional)
          </label>
          <input
            type="text"
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g., tech enthusiasts and coffee lovers"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
          />
        </div>
      </div>

      {isProUser && (
        <div className="mb-6 animate-fade-in">
            <label htmlFor="brand-voice" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                Custom Brand Voice
                <span className="text-xs font-bold uppercase bg-brand-secondary text-white px-2 py-0.5 rounded-full">Pro</span>
            </label>
            <input
                type="text"
                id="brand-voice"
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value)}
                placeholder="e.g., witty, academic, bold and direct"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
            />
        </div>
      )}

      <div className="mb-6" onClick={() => !isProUser && onUpgradeClick()} title={!isProUser ? "Upgrade to Pro to unlock multi-language support" : ""}>
        <label htmlFor="language" className={`flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 ${!isProUser ? 'cursor-pointer' : ''}`}>
            Language
            {!isProUser && <span className="text-xs font-bold uppercase bg-brand-secondary text-white px-2 py-0.5 rounded-full">Pro</span>}
        </label>
        <SearchableSelect
            id="language"
            options={LANGUAGES}
            value={language}
            onChange={setLanguage}
            disabled={!isProUser}
        />
     </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Tone of Voice</label>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                tone === option.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Social Platform</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PLATFORM_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setPlatform(option.value)}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                platform === option.value
                  ? 'border-brand-primary bg-brand-light/50 text-brand-dark'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <option.icon className="w-6 h-6" />
              <span className="text-sm font-semibold">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparkleIcon className="w-5 h-5" />
            Generate Captions
          </>
        )}
      </button>
    </div>
  );
};
