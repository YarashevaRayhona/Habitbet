import React, { useState } from 'react';
import { Flame, Trophy, Award, ShieldCheck, DollarSign, Target, Settings, Zap, ChevronRight, Lock, Sparkles, Coins, Smartphone, Download } from 'lucide-react';
import { User, Badge } from '../../types';
import { triggerHaptic } from '../../utils/haptics';
import { formatCurrency, getCurrencyConfig } from '../../utils/currency';

interface ProfileViewProps {
  user: User;
  badges: Badge[];
  onOpenSettings: () => void;
  onOpenPandaPicker?: () => void;
  onOpenCurrencySelector?: () => void;
  onOpenApkModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  badges,
  onOpenSettings,
  onOpenPandaPicker,
  onOpenCurrencySelector,
  onOpenApkModal,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'badges' | 'history'>('stats');
  const currencyInfo = getCurrencyConfig(user.currency || 'UZS');

  // Heatmap calendar mock (30 days)
  const heatmapDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i % 7 === 0 ? 'failed' : i % 3 === 0 ? 'partial' : 'completed'
  }));

  return (
    <div className="space-y-4 pb-24">
      {/* Profile Header Card */}
      <div className="glass-card p-5 border border-white/10 bg-gradient-to-b from-[#141A2B] via-[#141A2B] to-[#7C3AED]/20 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="relative cursor-pointer group"
              onClick={() => {
                triggerHaptic('medium');
                if (onOpenPandaPicker) onOpenPandaPicker();
              }}
              title="Click to select from 30 Cute Panda Avatars!"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-16 h-16 rounded-[22px] object-cover ring-2 ring-[#7C3AED] group-hover:ring-[#00E5FF] transition-all bg-white/5"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#7C3AED] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-[#0B0F19] flex items-center gap-1">
                🐼 Edit
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-1.5">
                <span>@{user.username}</span>
                <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              </h2>
              <p className="text-xs text-gray-400">{user.country} • {user.timezone}</p>
              <span className="text-[10px] text-[#00E5FF] font-bold mt-0.5 block">{user.bio}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCurrencySelector && (
              <button
                onClick={() => {
                  triggerHaptic('light');
                  onOpenCurrencySelector();
                }}
                className="px-2.5 py-1.5 rounded-2xl bg-[#0B0F19] border border-emerald-500/30 hover:border-emerald-400 text-xs font-black text-emerald-400 flex items-center gap-1"
                title="Change Currency (UZS)"
              >
                <span>{currencyInfo.flag}</span>
                <span>{currencyInfo.code}</span>
              </button>
            )}

            <button
              onClick={() => {
                triggerHaptic('light');
                onOpenSettings();
              }}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Change Panda Banner */}
        <button
          onClick={() => {
            triggerHaptic('medium');
            if (onOpenPandaPicker) onOpenPandaPicker();
          }}
          className="w-full py-2 px-3 rounded-2xl bg-gradient-to-r from-[#7C3AED]/30 to-[#00E5FF]/30 border border-[#00E5FF]/40 hover:border-[#00E5FF] text-xs font-black text-cyan-200 flex items-center justify-between transition-all"
        >
          <span className="flex items-center gap-2">
            <span>🐼</span>
            <span>Switch Mascot Avatar (30 Cute Panda Styles)</span>
          </span>
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
        </button>

        {/* Android APK Download Banner */}
        {onOpenApkModal && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              onOpenApkModal();
            }}
            className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-[#141A2B] to-cyan-500/20 border border-emerald-400/50 hover:border-emerald-300 text-xs font-black text-emerald-300 flex items-center justify-between transition-all active:scale-98 shadow-md"
          >
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Download Android APK / App ($0 Free)</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
              <Download className="w-3 h-3" /> APK / PWA
            </span>
          </button>
        )}

        {/* Level & XP Progress */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-xs font-bold text-gray-300">
            <span>Level {user.level} Veteran</span>
            <span className="text-[#00E5FF]">{user.xp} / {user.nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] transition-all duration-500"
            />
          </div>
        </div>

        {/* Quick Social & Win Stats */}
        <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-white/10">
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Win Rate</span>
            <span className="text-sm font-black text-[#22C55E]">{user.winRate}%</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Earnings</span>
            <span className="text-xs font-black text-white">{formatCurrency(user.totalEarnings, user.currency || 'UZS')}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Followers</span>
            <span className="text-sm font-black text-white">{user.followersCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Coins</span>
            <span className="text-sm font-black text-amber-400">🪙 {user.coins}</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex rounded-2xl bg-[#141A2B] p-1 border border-white/10">
        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('stats');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
            activeTab === 'stats' ? 'bg-[#7C3AED] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Heatmap & Stats
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('badges');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
            activeTab === 'badges' ? 'bg-[#7C3AED] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Badges ({badges.filter(b => b.unlocked).length})
        </button>
      </div>

      {/* TAB 1: HEATMAP & DETAILED STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          {/* 30-Day Heatmap Calendar */}
          <div className="glass-card p-4 space-y-3 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">30-Day Consistency Grid</span>
              <span className="text-[10px] text-gray-400">Unbroken Streak: {user.streak}d</span>
            </div>

            <div className="grid grid-cols-6 gap-2 pt-1">
              {heatmapDays.map((d) => (
                <div
                  key={d.day}
                  className={`h-8 rounded-xl flex items-center justify-center text-[11px] font-bold border transition-all ${
                    d.status === 'completed'
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40'
                      : d.status === 'partial'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-red-500/20 text-[#EF4444] border-red-500/40'
                  }`}
                >
                  Day {d.day}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-md bg-[#22C55E]" /> Verified</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-md bg-amber-500" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-md bg-[#EF4444]" /> Failed</span>
            </div>
          </div>

          {/* Goals List */}
          <div className="glass-card p-4 space-y-2 border border-white/10">
            <span className="text-xs font-black text-white block">Active Goal Targets</span>
            <div className="space-y-2">
              {(user?.goals || []).map((goal, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#0B0F19] border border-white/5 flex items-center justify-between text-xs font-bold text-gray-200">
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#00E5FF]" />
                    {goal}
                  </span>
                  <span className="text-[10px] text-[#22C55E]">Active Stake</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BADGES & ACHIEVEMENTS */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 gap-3">
          {(badges || []).map((badge) => (
            <div
              key={badge.id}
              className={`glass-card p-4 space-y-2 border text-center transition-all ${
                badge.unlocked
                  ? 'border-[#00E5FF]/40 bg-gradient-to-b from-[#7C3AED]/20 to-[#141A2B]'
                  : 'border-white/5 opacity-50 bg-[#141A2B]'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0B0F19] border border-white/10 flex items-center justify-center text-xl">
                {badge.unlocked ? '🏆' : '🔒'}
              </div>
              <h4 className="text-xs font-black text-white">{badge.name}</h4>
              <p className="text-[10px] text-gray-400 line-clamp-2">{badge.description}</p>
              {badge.unlocked ? (
                <span className="text-[9px] font-extrabold uppercase text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full inline-block">
                  Unlocked
                </span>
              ) : (
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${badge.progressPercent}%` }} className="h-full bg-[#00E5FF]" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
