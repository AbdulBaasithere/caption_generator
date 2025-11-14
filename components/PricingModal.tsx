import React, { useState } from 'react';
import { CheckIcon, CloseIcon } from './IconComponents';

interface PricingModalProps {
  onClose: () => void;
  onUpgrade: () => void;
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

export const PricingModal: React.FC<PricingModalProps> = ({ onClose, onUpgrade }) => {
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleUpgradePayment = () => {
    // A real app would first create an order on the server-side
    // and get an order_id. For this frontend-only demo, we'll
    // proceed directly to checkout.

    const options = {
      key: "rzp_live_RdWBpYKVK4ZLR6", // Public Key
      amount: "39900", // Amount in paise (399 INR)
      currency: "INR",
      name: "CaptionStudio AI",
      description: "Pro Plan Upgrade",
      handler: function (response: any) {
        // This function is called on a successful payment.
        // In a real app, you'd send the payment_id to your server for verification.
        console.log('Payment ID:', response.razorpay_payment_id);
        setPaymentInitiated(true); // Show the success screen
      },
      prefill: {
        name: "Valued Customer",
        email: "customer@captionstudio.ai",
        contact: "9000000000"
      },
      notes: {
        plan: "Pro Plan",
      },
      theme: {
        color: "#6366F1" // Brand primary color
      }
    };
    
    // Check if Razorpay script is loaded
    if (!(window as any).Razorpay) {
      alert("Error: Payment gateway is not loaded. Please check your internet connection and try again.");
      return;
    }

    const rzp1 = new (window as any).Razorpay(options);

    rzp1.on('payment.failed', function (response: any){
      // In a real app, you'd log this info.
      console.error('Payment failed:', response.error);
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp1.open();
  };
    
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10" aria-label="Close pricing modal">
          <CloseIcon className="w-6 h-6" />
        </button>

        {paymentInitiated ? (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Payment Successful!
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Thank you for your payment. Click the button below to unlock your Pro account and all its amazing features.
            </p>
            <button
                onClick={onUpgrade}
                className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-dark transition-transform transform hover:scale-105"
            >
                Activate My Pro Account
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                    Choose Your Plan
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Unlock powerful features and generate unlimited content to supercharge your social media.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
                <PricingTier
                    tier="Free"
                    price="$0"
                    description="For individuals starting out."
                    features={[
                        '3 captions/day',
                        'Basic templates',
                        'Standard hashtags',
                        'Watermarked content',
                    ]}
                    ctaText="Current Plan"
                    ctaDisabled={true}
                />
                <PricingTier
                    tier="Pro"
                    price="₹399"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
