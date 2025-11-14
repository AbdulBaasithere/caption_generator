import React from 'react';
import { CloseIcon } from './IconComponents';

interface AffiliateModalProps {
  onClose: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="affiliate-modal-title"
    >
      <div
        className="bg-slate-50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-10 relative animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10" aria-label="Close modal">
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
            <h2 id="affiliate-modal-title" className="text-3xl font-extrabold text-slate-900 mt-4 mb-3">
                Join the CaptionStudio Affiliate Program
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
                Partner with us and earn rewards for spreading the word about the future of content creation.
            </p>
        </div>

        <div className="mt-8 space-y-6 text-left">
            <div>
                <h3 className="text-xl font-bold text-slate-800">Earn Generous Commissions</h3>
                <p className="text-slate-600 mt-1">Receive a <span className="font-bold text-brand-dark">30% recurring commission</span> for every customer you refer to our Pro and Agency plans. As long as they're a customer, you're getting paid.</p>
            </div>
             <div>
                <h3 className="text-xl font-bold text-slate-800">Who is it for?</h3>
                <p className="text-slate-600 mt-1">Our program is perfect for content creators, marketers, agencies, and anyone with an audience that could benefit from AI-powered content tools.</p>
            </div>
        </div>

        <div className="mt-10 text-center">
             <a
                href="mailto:affiliates@captionstudio.ai?subject=Affiliate Program Inquiry"
                className="w-full sm:w-auto inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-dark transition-transform transform hover:scale-105"
            >
                Become an Affiliate
            </a>
        </div>
      </div>
    </div>
  );
};
