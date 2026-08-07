import React from 'react';
import { DollarSign, Flame, ShieldAlert, Award, ArrowUpRight, ArrowDownRight, Lock } from 'lucide-react';
import { User } from '../../types';

interface StatsOverviewProps {
  user: User;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Money Won */}
      <div className="glass-card p-3.5 border border-[#22C55E]/30 bg-gradient-to-br from-[#141A2B] to-[#22C55E]/10">
        <div className="flex items-center justify-between text-gray-400 mb-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Money Won</span>
          <div className="p-1 rounded-lg bg-[#22C55E]/20 text-[#22C55E]">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-black text-[#22C55E]">${user.totalEarnings.toLocaleString()}</div>
        <span className="text-[10px] text-gray-400 mt-1 block">Payouts + Loser Pots</span>
      </div>

      {/* Money Lost */}
      <div className="glass-card p-3.5 border border-[#EF4444]/30 bg-gradient-to-br from-[#141A2B] to-[#EF4444]/10">
        <div className="flex items-center justify-between text-gray-400 mb-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Money Lost</span>
          <div className="p-1 rounded-lg bg-[#EF4444]/20 text-[#EF4444]">
            <ArrowDownRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-black text-[#EF4444]">${user.totalLosses.toLocaleString()}</div>
        <span className="text-[10px] text-gray-400 mt-1 block">Penalty Forfeits</span>
      </div>

      {/* Streak */}
      <div className="glass-card p-3.5 border border-orange-500/30 bg-gradient-to-br from-[#141A2B] to-orange-500/10">
        <div className="flex items-center justify-between text-gray-400 mb-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Current Streak</span>
          <div className="p-1 rounded-lg bg-orange-500/20 text-orange-400">
            <Flame className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-black text-orange-400">{user.streak} Days</div>
        <span className="text-[10px] text-gray-400 mt-1 block">Best: {user.longestStreak}d</span>
      </div>

      {/* Escrow Locked */}
      <div className="glass-card p-3.5 border border-[#00E5FF]/30 bg-gradient-to-br from-[#141A2B] to-[#00E5FF]/10">
        <div className="flex items-center justify-between text-gray-400 mb-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Escrow</span>
          <div className="p-1 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF]">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-black text-[#00E5FF]">${user.escrowBalance.toLocaleString()}</div>
        <span className="text-[10px] text-gray-400 mt-1 block">Locked in 3 Bets</span>
      </div>
    </div>
  );
};
