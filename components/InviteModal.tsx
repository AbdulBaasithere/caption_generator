import React, { useState } from 'react';
import { CloseIcon, CopyIcon, CheckIcon, GiftIcon } from './IconComponents';

interface InviteModalProps {
  onClose: () => void;
  referralCode: string;
}

export const InviteModal: React.FC<InviteModalProps> = ({ onClose, referralCode }) => {
  const referralLink = `https://captionstudio.ai?ref=${referralCode}`;
  const [isCopied, setIsCopied] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
    >
      <div
        className="bg-slate-50 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 md:p-10 relative animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10" aria-label="Close modal">
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-light">
                <GiftIcon className="h-6 w-6 text-brand-primary" />
            </div>
            <h2 id="invite-modal-title" className="text-3xl font-extrabold text-slate-900 mt-4 mb-2">
                Invite Friends, Give Credits!
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
                Share your unique link with friends. When they sign up using your link, they'll get <span className="font-bold text-brand-dark">50 extra caption generations</span> for free!
            </p>

            <div className="mt-8">
                <label htmlFor="referral-link" className="text-sm font-semibold text-slate-700 text-left block mb-2">Your referral link</label>
                <div className="flex">
                    <input
                        id="referral-link"
                        type="text"
                        readOnly
                        value={referralLink}
                        className="w-full px-4 py-2 border border-r-0 border-slate-300 rounded-l-lg bg-white focus:outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className={`w-28 flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-lg text-white transition-colors ${isCopied ? 'bg-green-600' : 'bg-brand-primary hover:bg-brand-dark'}`}
                    >
                        {isCopied ? <><CheckIcon className="w-5 h-5 mr-2"/> Copied</> : <><CopyIcon className="w-5 h-5 mr-2"/> Copy</>}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};