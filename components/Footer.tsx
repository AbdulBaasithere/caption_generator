import React from 'react';

interface FooterProps {
  isProUser: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isProUser }) => {
  const supportEmail = isProUser ? 'neurasphereteam@gmail.com' : 'support@captionstudio.ai';
  const supportSubject = isProUser ? 'Priority Support Inquiry' : 'Support Inquiry';

  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} CaptionStudio AI. All rights reserved.</p>
        <p className="mt-2 text-sm">
          <a href={`mailto:${supportEmail}?subject=${encodeURIComponent(supportSubject)}`} className="hover:text-brand-primary hover:underline">
            {isProUser ? 'Priority Support' : 'Contact Support'}
          </a>
        </p>
      </div>
    </footer>
  );
};
