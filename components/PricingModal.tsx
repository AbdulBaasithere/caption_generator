import React from 'react';
import { CheckIcon, CloseIcon } from './IconComponents';

interface PricingModalProps {
  onClose: () => void;
}

const PricingTier: React.FC<{
  tier: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isRecommended?: boolean;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
}> = ({ tier, price, description, features, ctaText, isRecommended = false, onCtaClick, ctaDisabled = false }) => (
  <div className={`border rounded-xl p-6 flex flex-col ${isRecommended ? 'border-brand-primary bg-brand-light/20 relative' : 'border-slate-300 bg-white'}`}>
    {isRecommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold text-slate-900 mt-4">{tier}</h3>
    <p className="text-slate-500 mt-2 mb-4">{description}</p>
    <div className="text-4xl font-extrabold text-slate-900 mb-6">
      {price}
      {price !== 'Free' && !price.startsWith('$0') && <span className="text-lg font-medium text-slate-500"> / month</span>}
    </div>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-slate-700">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onCtaClick}
      disabled={ctaDisabled}
      className={`w-full font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 ${
        isRecommended
          ? 'bg-brand-primary text-white hover:bg-brand-dark'
          : 'bg-slate-200 text-slate-800'
      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
    >
      {ctaText}
    </button>
  </div>
);

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleUpgradePayment = () => {
    const paymentLink = 'https://razorpay.me/@abdulbaasitmohajamshaikh';
    // Open the payment link in a new tab to not navigate away from the app
    window.open(paymentLink, '_blank', 'noopener,noreferrer');
  };
    
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-50 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10" aria-label="Close pricing modal">
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                Choose Your Plan
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Unlock powerful features and generate unlimited content to supercharge your social media.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <PricingTier
                tier="Free"
                price="$0"
                description="For individuals starting out."
                features={[
                    '10 captions/day',
                    'Basic templates',
                    'Standard hashtags',
                    'Watermarked content',
                ]}
                ctaText="Current Plan"
                ctaDisabled={true}
            />
            <PricingTier
                tier="Pro"
                price="₹2600"
                description="For creators & small businesses."
                features={[
                    'Unlimited captions',
                    'Advanced AI models',
                    'Video caption generation',
                    'Multi-language support',
                    'Custom brand voice',
                    'Basic analytics & insights',
                    'No watermarks',
                    'Priority support',
                ]}
                ctaText="Upgrade to Pro"
                isRecommended={true}
                onCtaClick={handleUpgradePayment}
            />
            <PricingTier
                tier="Agency"
                price="₹10000"
                description="For teams and large agencies."
                features={[
                    'All features in Pro',
                    'Multiple brand profiles',
                    'Team collaboration',
                    'Advanced analytics dashboard',
                    'Exclusive Chrome Extension',
                    'Zapier integrations',
                    'API access',
                ]}
                ctaText="Contact Sales"
                onCtaClick={() => window.location.href = 'mailto:sales@captionstudio.ai'}
            />
        </div>
      </div>
    </div>
  );
};