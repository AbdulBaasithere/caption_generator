import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CaptionGeneratorForm } from './components/CaptionGeneratorForm';
import { CaptionCard } from './components/CaptionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PricingModal } from './components/PricingModal';
import { GenerationHistory } from './components/GenerationHistory';
import { Platform, Tone, GeneratedContent, HistoryEntry } from './types';
import { generateCaptionsAndHashtags } from './services/geminiService';
import { SparkleIcon } from './components/IconComponents';
import { Testimonials } from './components/Testimonials';

const App: React.FC = () => {
  const FREE_GENERATION_LIMIT = 3;

  const [topic, setTopic] = useState<string>('');
  const [audience, setAudience] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.CASUAL);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [language, setLanguage] = useState<string>('English');
  const [brandVoice, setBrandVoice] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [generationHistory, setGenerationHistory] = useState<HistoryEntry[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);

  const [generationCount, setGenerationCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('captionStudio-generationCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [isProUser, setIsProUser] = useState<boolean>(() => {
    return localStorage.getItem('captionStudio-isProUser') === 'true';
  });
  
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<boolean>(false);


  React.useEffect(() => {
    localStorage.setItem('captionStudio-generationCount', generationCount.toString());
  }, [generationCount]);

  React.useEffect(() => {
    localStorage.setItem('captionStudio-isProUser', isProUser.toString());
    if (isProUser) {
      setShowUpgradePrompt(false);
    }
  }, [isProUser]);

  const handleGenerate = useCallback(async () => {
    if (!isProUser && generationCount >= FREE_GENERATION_LIMIT) {
      setShowUpgradePrompt(true);
      return;
    }

    if (!topic) {
      setError('Please enter a topic to generate captions.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowUpgradePrompt(false);
    setGeneratedContent(null);

    try {
      const result = await generateCaptionsAndHashtags({ topic, audience, tone, platform, language, brandVoice }, isProUser);
      setGeneratedContent(result);
      
      if (!isProUser) {
        setGenerationCount(prev => prev + 1);
      }
      
      const newEntry: HistoryEntry = {
        id: Date.now(),
        topic: topic,
        timestamp: new Date(),
        content: result,
      };
      setGenerationHistory(prev => [newEntry, ...prev]);
      setSelectedHistoryId(newEntry.id);

    } catch (err) {
      console.error(err);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, audience, tone, platform, language, brandVoice, isProUser, generationCount]);
  
  const handleTogglePricingModal = () => setIsPricingModalOpen(prev => !prev);

  const handleUpgrade = () => {
    setIsProUser(true);
    setIsPricingModalOpen(false);
  };

  const handleSelectHistoryItem = useCallback((entry: HistoryEntry) => {
    setGeneratedContent(entry.content);
    setSelectedHistoryId(entry.id);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onUpgradeClick={handleTogglePricingModal} 
        isProUser={isProUser} 
        generationCount={generationCount}
        generationLimit={FREE_GENERATION_LIMIT}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
              Generate Viral Captions in Seconds
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our AI helps you create engaging captions for posts and videos in any language, helping you stop the scroll.
            </p>
          </div>

          <Testimonials />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-slate-200">
            <div className="lg:col-span-2">
              <CaptionGeneratorForm
                topic={topic}
                setTopic={setTopic}
                audience={audience}
                setAudience={setAudience}
                tone={tone}
                setTone={setTone}
                platform={platform}
                setPlatform={setPlatform}
                language={language}
                setLanguage={setLanguage}
                brandVoice={brandVoice}
                setBrandVoice={setBrandVoice}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                isProUser={isProUser}
                onUpgradeClick={handleTogglePricingModal}
              />
              
              {showUpgradePrompt && (
                <div className="mt-8 bg-brand-light border border-brand-primary text-brand-dark px-4 py-4 rounded-lg animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4" role="status">
                  <p className="font-semibold text-center sm:text-left">You've reached your limit! Upgrade for Unlimited Captions 🚀</p>
                  <button 
                    onClick={handleTogglePricingModal}
                    className="bg-brand-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex-shrink-0"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate-fade-in" role="alert">
                  <strong className="font-bold">Oops! </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {isLoading && <LoadingSpinner />}

              {generatedContent && (
                <div className="mt-12 animate-slide-in-up">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <SparkleIcon className="w-6 h-6 text-brand-primary" />
                      AI-Generated Captions
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {generatedContent.captions.map((caption, index) => (
                        <CaptionCard key={index} text={caption} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Suggested Hashtags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag, index) => (
                        <span key={index} className="bg-brand-light text-brand-dark text-sm font-medium px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {generatedContent.insights && (
                    <div className="animate-slide-in-up">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <SparkleIcon className="w-5 h-5 text-brand-primary" />
                        AI-Powered Insights
                      </h3>
                      <ul className="space-y-3">
                        {generatedContent.insights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-3 p-4 bg-slate-100/80 rounded-xl border border-slate-200">
                            <span className="text-lg text-brand-primary pt-0.5">💡</span>
                            <p className="text-slate-800">{insight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              {generationHistory.length > 0 && (
                <GenerationHistory
                  history={generationHistory}
                  selectedId={selectedHistoryId}
                  onSelectItem={handleSelectHistoryItem}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer isProUser={isProUser} />
      {isPricingModalOpen && <PricingModal onClose={handleTogglePricingModal} onUpgrade={handleUpgrade} />}
    </div>
  );
};

export default App;
