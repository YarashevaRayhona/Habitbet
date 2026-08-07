import React, { useState } from 'react';
import { Home, Users, Plus, Trophy, Wallet, User, Camera, AlarmClock, Sparkles, ShieldAlert, X } from 'lucide-react';
import { ViewTab } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface BottomNavProps {
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  onOpenCreateChallenge: () => void;
  onOpenSubmitProof: () => void;
  onOpenSmartAlarm: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  onOpenCreateChallenge,
  onOpenSubmitProof,
  onOpenSmartAlarm,
}) => {
  const [showFabMenu, setShowFabMenu] = useState(false);

  const navItems = [
    { id: 'home' as ViewTab, label: 'Home', icon: Home },
    { id: 'social' as ViewTab, label: 'Social', icon: Users },
    { id: 'fab' as any, label: '', icon: Plus, isFab: true },
    { id: 'leaderboard' as ViewTab, label: 'Ranks', icon: Trophy },
    { id: 'wallet' as ViewTab, label: 'Wallet', icon: Wallet },
  ];

  return (
    <>
      {/* Floating Action Quick Menu Overlay */}
      {showFabMenu && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end p-4 animate-fadeIn">
          <div className="glass-card p-5 max-w-md w-full mx-auto space-y-3 mb-16 border border-[#7C3AED]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Quick Actions</span>
              <button
                onClick={() => setShowFabMenu(false)}
                className="p-1 rounded-full bg-white/10 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setShowFabMenu(false);
                  onOpenSubmitProof();
                }}
                className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/10 border border-[#7C3AED]/40 hover:border-[#7C3AED] transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#7C3AED] text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">Submit Proof</span>
                  <span className="text-[10px] text-gray-400">AI camera verification</span>
                </div>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setShowFabMenu(false);
                  onOpenCreateChallenge();
                }}
                className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/10 border border-[#00E5FF]/40 hover:border-[#00E5FF] transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#00E5FF] text-[#0B0F19] shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">Create Bet</span>
                  <span className="text-[10px] text-gray-400">Bet against friends</span>
                </div>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setShowFabMenu(false);
                  onOpenSmartAlarm();
                }}
                className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 border border-amber-500/40 hover:border-amber-500 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-black shadow-lg group-hover:scale-110 transition-transform">
                  <AlarmClock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">Smart Alarm</span>
                  <span className="text-[10px] text-gray-400">Anti-snooze wake up</span>
                </div>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setShowFabMenu(false);
                  onNavigate('ai_coach');
                }}
                className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/40 hover:border-emerald-500 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#22C55E] text-black shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">AI Coach</span>
                  <span className="text-[10px] text-gray-400">Burnout & habits guide</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2 max-w-lg mx-auto">
        <div className="flex items-center justify-around relative">
          {navItems.map((item) => {
            if (item.isFab) {
              return (
                <div key="fab-btn" className="relative -top-5">
                  <button
                    onClick={() => {
                      triggerHaptic('heavy');
                      setShowFabMenu(!showFabMenu);
                    }}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#5B21B6] to-[#00E5FF] text-white p-0.5 shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center glow-purple"
                  >
                    <div className="w-full h-full rounded-full bg-[#141A2B]/40 backdrop-blur-sm flex items-center justify-center">
                      <Plus className={`w-7 h-7 text-white transition-transform ${showFabMenu ? 'rotate-45' : ''}`} />
                    </div>
                  </button>
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  triggerHaptic('light');
                  onNavigate(item.id);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
                  isActive
                    ? 'text-[#00E5FF] font-bold scale-105'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-[#00E5FF]' : ''}`} />
                <span className="text-[10px]">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
