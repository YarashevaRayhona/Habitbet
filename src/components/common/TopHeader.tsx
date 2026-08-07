import React from 'react';
import { Flame, Wallet, Bell, Sparkles, Globe, Smartphone } from 'lucide-react';
import { User, ViewTab } from '../../types';
import { triggerHaptic } from '../../utils/haptics';
import { formatCurrency, getCurrencyConfig } from '../../utils/currency';

interface TopHeaderProps {
  user: User;
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onOpenCurrencySelector?: () => void;
  onOpenPandaPicker?: () => void;
  onOpenApkModal?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  onNavigate,
  onOpenNotifications,
  unreadCount,
  onOpenCurrencySelector,
  onOpenPandaPicker,
  onOpenApkModal,
}) => {
  const currencyInfo = getCurrencyConfig(user.currency || 'UZS');

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-4 py-2.5 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
      {/* Left: Cute Panda Avatar & Streak */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            triggerHaptic('medium');
            if (onOpenPandaPicker) {
              onOpenPandaPicker();
            } else {
              onNavigate('profile');
            }
          }}
          className="relative group focus:outline-none"
          title="Change Cute Panda Avatar (30 Styles)"
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#7C3AED]/60 group-hover:ring-[#00E5FF] transition-all bg-white/5"
          />
          <span className="absolute -bottom-1 -right-1 bg-[#7C3AED] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-[#0B0F19]">
            🐼
          </span>
        </button>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-300">@{user.username}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
              {user.streak}d
            </span>
          </div>
          <h1 className="text-xs font-black text-white tracking-wider flex items-center gap-1">
            HABIT<span className="text-[#00E5FF]">BET</span>
            <span className="text-[9px] bg-emerald-500/20 text-[#22C55E] border border-emerald-500/30 px-1 py-0.2 rounded font-mono">
              {user.currency || 'UZS'}
            </span>
          </h1>
        </div>
      </div>

      {/* Right: APK Download, Currency Selector, Wallet Balance & Notifications */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* APK Download Button */}
        {onOpenApkModal && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              onOpenApkModal();
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 text-[11px] font-black text-emerald-300 hover:border-emerald-300 transition-all active:scale-95 shadow-sm"
            title="Download Android APK (Free $0)"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">APK</span>
          </button>
        )}

        {/* Currency Switcher Pill */}
        {onOpenCurrencySelector && (
          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenCurrencySelector();
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-[#141A2B] border border-emerald-500/30 text-[11px] font-black text-emerald-400 hover:border-emerald-400 transition-all active:scale-95"
            title="Switch Currency (UZS, USD, JPY, KRW...)"
          >
            <span className="text-xs">{currencyInfo.flag}</span>
            <span className="hidden xs:inline">{currencyInfo.code}</span>
          </button>
        )}

        {/* AI Coach Quick Launch */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onNavigate('ai_coach');
          }}
          className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#7C3AED]/20 to-[#00E5FF]/20 border border-[#7C3AED]/40 hover:border-[#00E5FF] text-xs font-bold text-cyan-300 transition-all active:scale-95"
          title="AI Coach"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI Coach</span>
        </button>

        {/* Wallet Balance (Formatted in User's Currency) */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onNavigate('wallet');
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#141A2B] border border-white/10 hover:border-[#22C55E]/50 text-xs font-black text-emerald-400 transition-all active:scale-95"
        >
          <Wallet className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>{formatCurrency(user.walletBalance, user.currency || 'UZS')}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onOpenNotifications();
          }}
          className="relative p-2 rounded-2xl bg-[#141A2B] border border-white/10 hover:border-white/20 text-gray-300 transition-all active:scale-95"
        >
          <Bell className="w-4 h-4 text-gray-200" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-[10px] font-extrabold text-white flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
