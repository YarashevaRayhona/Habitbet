import React, { useState } from 'react';
import { Bot, Send, Zap, Sparkles, Brain, Flame, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { User, Challenge } from '../../types';
import { askAICoach } from '../../services/geminiService';
import { triggerHaptic } from '../../utils/haptics';

interface AICoachViewProps {
  user: User;
  challenges: Challenge[];
}

export const AICoachView: React.FC<AICoachViewProps> = ({ user, challenges }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Greetings @${user.username}! I am your AI Habit Coach. Based on your 94% win rate and 14-day streak, you are in prime condition for higher stakes! How can I assist your goals today?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    triggerHaptic('light');
    const userMsg = input;
    setInput('');
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: timeNow }]);
    setLoading(true);

    try {
      const coachRes = await askAICoach(userMsg, {
        username: user.username,
        streak: user.streak,
        moneyWon: user.totalEarnings
      });
      const response = coachRes.response;
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      triggerHaptic('success');
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'I am calibrating your momentum data. Stay focused on your morning gym routine!', time: 'Now' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* AI Coach Banner */}
      <div className="glass-card p-5 border border-[#7C3AED]/40 bg-gradient-to-r from-[#141A2B] via-[#141A2B] to-[#7C3AED]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#7C3AED]/20 text-[#00E5FF] border border-[#7C3AED]/40">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">
                Gemini AI Habit Sentinel
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              </h2>
              <p className="text-xs text-gray-300">Personalized Habit Intelligence & Anti-Burnout Monitor</p>
            </div>
          </div>
        </div>

        {/* Burnout & Win Probability Meter */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#0B0F19] border border-white/5 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
              <span>Burnout Risk</span>
              <span className="text-[#22C55E]">Low (12%)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="w-[12%] h-full bg-[#22C55E]" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0B0F19] border border-white/5 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
              <span>Streak Win Probability</span>
              <span className="text-[#00E5FF]">96% High</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="w-[96%] h-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions from AI */}
      <div className="glass-card p-4 space-y-2 border border-white/10">
        <span className="text-xs font-black uppercase text-gray-400 tracking-wider block">AI Strategic Recommendations</span>
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-[#0B0F19] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs text-white font-bold">Increase Stake on 6AM Gym by +$10</span>
            </div>
            <span className="text-[10px] font-black text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-lg">+18% Success</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B0F19] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-xs text-white font-bold">Set Evening Wind-down Alarm at 10:30 PM</span>
            </div>
            <span className="text-[10px] font-black text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-1 rounded-lg">Optimal Rest</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-card p-4 space-y-3 min-h-[260px] max-h-[380px] overflow-y-auto border border-white/10">
        {(messages || []).map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-1 ${
                m.sender === 'user'
                  ? 'bg-[#7C3AED] text-white rounded-br-none'
                  : 'bg-[#141A2B] text-slate-200 border border-white/10 rounded-bl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-[9px] opacity-70">
                <span className="font-extrabold">{m.sender === 'user' ? 'You' : 'AI Sentinel'}</span>
                <span>{m.time}</span>
              </div>
              <p className="leading-relaxed font-semibold">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl bg-[#141A2B] border border-white/10 text-xs text-gray-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" />
              <span>Analyzing performance metrics...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Coach (e.g. How to prevent snooze, optimal stakes?)"
          className="flex-1 glass-input py-3 px-4 text-xs"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-[#7C3AED] text-white font-black text-xs hover:bg-[#6366F1] transition-all flex items-center justify-center gap-1 shadow-lg shadow-[#7C3AED]/20 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
