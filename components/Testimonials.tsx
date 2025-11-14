import React from 'react';

const testimonials = [
  {
    quote: "CaptionStudio AI has been a game-changer for our social media. Our engagement has skyrocketed!",
    name: "Sarah K.",
    title: "Social Media Manager, Stellar Co.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote: "I save hours every week. The quality of captions is top-notch, and the ideas are always fresh.",
    name: "David L.",
    title: "Fitness Influencer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    quote: "The best AI caption generator I've used. It understands my brand voice perfectly. Highly recommend!",
    name: "Jessica P.",
    title: "Founder, Bloom Boutique",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
];

const TestimonialCard: React.FC<typeof testimonials[0]> = ({ quote, name, title, avatar }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col h-full">
        <p className="text-slate-600 mb-4 flex-grow">"{quote}"</p>
        <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={avatar} alt={name} loading="lazy" />
            <div>
                <p className="font-bold text-slate-800">{name}</p>
                <p className="text-sm text-slate-500">{title}</p>
            </div>
        </div>
    </div>
);


export const Testimonials: React.FC = () => {
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Loved by Marketers & Creators
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};
