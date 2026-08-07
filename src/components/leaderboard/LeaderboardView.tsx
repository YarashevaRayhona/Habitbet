import React, { useState } from 'react';
import { Trophy, Award, Flame, ArrowUp, ArrowDown, Minus, ShieldCheck, Globe, Users } from 'lucide-react';
import { LeaderboardUser } from '../../types';
import { triggerHaptic } from '../../utils/haptics';
import { formatCurrency } from '../../utils/currency';

import { INITIAL_LEADERBOARD } from '../../data/mockData';

interface LeaderboardViewProps {
  users?: LeaderboardUser[];
  user?: any;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ users, user }) => {
  const [scope, setScope] = useState<'global' | 'country' | 'friends'>('global');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('monthly');

  const safeUsers = users && users.length > 0 ? users : INITIAL_LEADERBOARD;
  const userCurrency = user?.currency || 'UZS';

  return (
    <div className="space-y-4 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#00E5FF]">Hall of Champions</span>
          <h2 className="text-xl font-black text-white">HabitBet Leaderboard</h2>
        </div>
        <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/10 border border-amber-500/40 text-amber-400">
          <Trophy className="w-5 h-5" />
        </div>
      </div>

      {/* Scope Filter */}
      <div className="flex gap-2 bg-[#141A2B] p-1 rounded-2xl border border-white/10">
        {(['global', 'country', 'friends'] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              triggerHaptic('light');
              setScope(s);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
              scope === s ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 pt-2 items-end">
        {/* Rank 2 */}
        {safeUsers[1] && (
          <div className="glass-card p-3 text-center space-y-1 border border-slate-400/30 bg-gradient-to-b from-slate-400/10 to-[#141A2B]">
            <span className="text-lg">🥈</span>
            <img src={safeUsers[1].avatar} alt={safeUsers[1].name} className="w-10 h-10 mx-auto rounded-full object-cover ring-2 ring-slate-400 bg-white/5" />
            <span className="text-[11px] font-bold text-white block truncate">{safeUsers[1].name.split(' ')[0]}</span>
            <span className="text-[10px] sm:text-xs font-black text-[#22C55E] block truncate">
              {formatCurrency(safeUsers[1].earnings, userCurrency)}
            </span>
          </div>
        )}

        {/* Rank 1 (Tallest) */}
        {safeUsers[0] && (
          <div className="glass-card p-4 text-center space-y-1 border border-amber-400/50 bg-gradient-to-b from-amber-400/20 to-[#141A2B] relative -top-2 glow-purple">
            <span className="text-2xl animate-bounce">🥇</span>
            <img src={safeUsers[0].avatar} alt={safeUsers[0].name} className="w-12 h-12 mx-auto rounded-full object-cover ring-2 ring-amber-400 bg-white/5" />
            <span className="text-xs font-black text-white block truncate">{safeUsers[0].name.split(' ')[0]}</span>
            <span className="text-xs sm:text-sm font-black text-[#22C55E] block truncate">
              {formatCurrency(safeUsers[0].earnings, userCurrency)}
            </span>
          </div>
        )}

        {/* Rank 3 */}
        {safeUsers[2] && (
          <div className="glass-card p-3 text-center space-y-1 border border-amber-700/30 bg-gradient-to-b from-amber-700/10 to-[#141A2B]">
            <span className="text-lg">🥉</span>
            <img src={safeUsers[2].avatar} alt={safeUsers[2].name} className="w-10 h-10 mx-auto rounded-full object-cover ring-2 ring-amber-700 bg-white/5" />
            <span className="text-[11px] font-bold text-white block truncate">{safeUsers[2].name.split(' ')[0]}</span>
            <span className="text-[10px] sm:text-xs font-black text-[#22C55E] block truncate">
              {formatCurrency(safeUsers[2].earnings, userCurrency)}
            </span>
          </div>
        )}
      </div>

      {/* Rankings List */}
      <div className="space-y-2 pt-2">
        {safeUsers.map((userItem) => {
          const isMe = userItem.id === 'usr_me' || userItem.id === 'lb_3';
          return (
            <div
              key={userItem.id}
              className={`glass-card p-3.5 flex items-center justify-between border transition-all ${
                isMe
                  ? 'border-[#00E5FF] bg-[#7C3AED]/20 shadow-lg'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-400 w-5 text-center">#{userItem.rank}</span>
                <img src={userItem.avatar} alt={userItem.name} className="w-10 h-10 rounded-2xl object-cover bg-white/5" />
                <div>
                  <h3 className="text-xs font-black text-white flex items-center gap-1">
                    <span>{userItem.name}</span>
                    {isMe && <span className="text-[9px] bg-[#00E5FF] text-black font-extrabold px-1.5 py-0.5 rounded-md">YOU</span>}
                  </h3>
                  <span className="text-[10px] text-gray-400">{userItem.country} • {userItem.winRate}% Win Rate</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-sm font-black text-[#22C55E] block">
                  {formatCurrency(userItem.earnings, userCurrency)}
                </span>
                <span className="text-[10px] font-bold text-orange-400 inline-flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {userItem.streak}d streak
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
