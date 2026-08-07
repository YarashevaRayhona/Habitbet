import React, { useState } from 'react';
import { Quote, RefreshCw, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

export const MotivationalQuote: React.FC = () => {
  const quotes = [
    { text: "Consistency isn't about perfection. It's about showing up when excuses are easy.", author: "HabitBet Mindset" },
    { text: "The highest return on investment is the daily discipline you put into your health and focus.", author: "High-Output Strategy" },
    { text: "Don't let your future self pay for today's hesitation. Lock in your bets.", author: "Alex Apex" },
    { text: "Procrastination is just paying interest on a debt you haven't even taken yet.", author: "Naval Ravikant" }
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNextQuote = () => {
    triggerHaptic('light');
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="glass-card p-4 border border-[#00E5FF]/20 bg-gradient-to-r from-[#141A2B] via-[#141A2B] to-[#00E5FF]/10 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] mt-0.5">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs italic text-gray-200 font-medium leading-relaxed">
              "{quotes[quoteIndex].text}"
            </p>
            <span className="text-[10px] font-extrabold text-[#00E5FF] mt-1 block">
              — {quotes[quoteIndex].author}
            </span>
          </div>
        </div>

        <button
          onClick={handleNextQuote}
          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex-shrink-0"
          title="New Quote"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
