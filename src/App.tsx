import React, { useState, useEffect } from 'react';
import {
  Flame, Trophy, Wallet as WalletIcon, Users, User as UserIcon, Bot,
  ShieldAlert, Settings, Plus, Bell, Clock, ShieldCheck, Check, Sparkles, Zap,
  CheckCircle, ArrowUpRight
} from 'lucide-react';

import { User, Challenge, ProofItem, Transaction, NotificationItem } from './types';
import {
  INITIAL_USER,
  INITIAL_CHALLENGES,
  INITIAL_PROOFS,
  INITIAL_TRANSACTIONS,
  INITIAL_BADGES
} from './data/mockData';

import { TopHeader } from './components/common/TopHeader';
import { BottomNav } from './components/common/BottomNav';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

import { TodayChallengeHero } from './components/dashboard/TodayChallengeHero';
import { StatsOverview } from './components/dashboard/StatsOverview';
import { DailyProgressRing } from './components/dashboard/DailyProgressRing';
import { WeeklyChart } from './components/dashboard/WeeklyChart';
import { FriendsOnlineTicker } from './components/dashboard/FriendsOnlineTicker';
import { MotivationalQuote } from './components/dashboard/MotivationalQuote';

import { SocialFeedView } from './components/social/SocialFeedView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { WalletView } from './components/wallet/WalletView';
import { ProfileView } from './components/profile/ProfileView';
import { AICoachView } from './components/aicoach/AICoachView';
import { AdminPanelView } from './components/admin/AdminPanelView';
import { SettingsView } from './components/settings/SettingsView';

import { CreateChallengeModal } from './components/challenges/CreateChallengeModal';
import { ProofSubmissionModal } from './components/proof/ProofSubmissionModal';
import { AntiSnoozeAlarmModal } from './components/alarm/AntiSnoozeAlarmModal';

import { PandaAvatarPickerModal } from './components/profile/PandaAvatarPickerModal';
import { CurrencySelectorModal } from './components/common/CurrencySelectorModal';
import { ApkDownloadModal } from './components/common/ApkDownloadModal';

import { triggerHaptic } from './utils/haptics';
import { fireCashRain } from './utils/confetti';

export function App() {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('habitbet_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('habitbet_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [proofs, setProofs] = useState<ProofItem[]>(() => {
    const saved = localStorage.getItem('habitbet_proofs');
    return saved ? JSON.parse(saved) : (INITIAL_PROOFS as unknown as ProofItem[]);
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('habitbet_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Proof Verified!',
      message: 'Your 5:00 AM Wake Up selfie was verified by AI. $10 reward credited.',
      timestamp: '5m ago',
      type: 'proof_verified',
      read: false,
    },
    {
      id: 'notif-[#',
      title: 'Friend Nudge',
      message: '@sarah_fits nudged you to submit your gym proof.',
      timestamp: '1h ago',
      type: 'nudge',
      read: false,
    }
  ]);
  const [badges, setBadges] = useState(INITIAL_BADGES);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChallengeForProof, setSelectedChallengeForProof] = useState<Challenge | null>(null);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [showPandaPickerModal, setShowPandaPickerModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);
  const [activeAlarmChallenge, setActiveAlarmChallenge] = useState<Challenge | null>(null);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('habitbet_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('habitbet_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('habitbet_proofs', JSON.stringify(proofs));
  }, [proofs]);

  useEffect(() => {
    localStorage.setItem('habitbet_txs', JSON.stringify(transactions));
  }, [transactions]);

  // Handlers
  const handleOnboardingComplete = (data: { goals: string[]; timezone: string }) => {
    triggerHaptic('success');
    fireCashRain();
    setUser((prev) => ({
      ...prev,
      onboarded: true,
      goals: data.goals,
      timezone: data.timezone,
      walletBalance: prev.walletBalance + 25, // $25 welcome bonus
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        amount: 25,
        type: 'BONUS',
        note: 'Welcome Onboarding Bonus',
        date: 'Just now',
        method: 'HabitBet Credit'
      },
      ...prev
    ]);
  };

  const handleCreateChallenge = (newChallengeData: any) => {
    triggerHaptic('success');
    const newChallenge: Challenge = {
      id: `c-${Date.now()}`,
      title: newChallengeData.title,
      description: newChallengeData.description,
      category: newChallengeData.category,
      stakeAmount: newChallengeData.stakeAmount,
      currency: 'USD',
      frequency: newChallengeData.frequency,
      timeOfDay: newChallengeData.timeOfDay,
      deadlineTime: newChallengeData.deadlineTime,
      proofType: newChallengeData.proofType,
      verificationMethod: newChallengeData.verificationMethod,
      totalPool: newChallengeData.stakeAmount * 4,
      participantsCount: 4,
      currentStreak: 1,
      totalDays: 30,
      completedDays: 0,
      status: 'active',
      antiCheatStrictness: newChallengeData.antiCheatStrictness,
      snoozePenaltyAmount: newChallengeData.snoozePenaltyAmount,
    };

    setChallenges((prev) => [newChallenge, ...prev]);

    // Update wallet and escrow
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - newChallengeData.stakeAmount,
      escrowBalance: prev.escrowBalance + newChallengeData.stakeAmount,
    }));

    // Record transaction
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        amount: -newChallengeData.stakeAmount,
        type: 'STAKE',
        note: `Escrow stake for ${newChallenge.title}`,
        date: 'Just now',
        method: 'Wallet Escrow'
      },
      ...prev
    ]);

    setShowCreateModal(false);
  };

  const handleSubmitProof = (proofData: { image: string; note: string; location: string }) => {
    triggerHaptic('success');
    fireCashRain();

    if (!selectedChallengeForProof) return;

    const newProofItem: ProofItem = {
      id: `proof-${Date.now()}`,
      challengeId: selectedChallengeForProof.id,
      challengeTitle: selectedChallengeForProof.title,
      username: user.username,
      avatar: user.avatar,
      imageUrl: proofData.image,
      timestamp: 'Just now',
      status: 'PENDING',
      userNote: proofData.note,
      locationName: proofData.location || 'Gym Center GPS',
      stakeAmount: selectedChallengeForProof.stakeAmount,
      aiFraudScore: 4,
      gpsStatus: 'VERIFIED'
    };

    setProofs((prev) => [newProofItem, ...prev]);

    // Update challenge streak & progress
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === selectedChallengeForProof.id
          ? { ...c, completedDays: c.completedDays + 1, currentStreak: c.currentStreak + 1 }
          : c
      )
    );

    // Update user stats
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + 150,
      streak: prev.streak + 1,
      completedChallenges: prev.completedChallenges + 1
    }));

    setSelectedChallengeForProof(null);
  };

  const handleDeposit = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        amount,
        type: 'DEPOSIT',
        note: 'Wallet Deposit',
        date: 'Just now',
        method: 'Apple Pay'
      },
      ...prev
    ]);
  };

  const handleWithdraw = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - amount
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        amount: -amount,
        type: 'WITHDRAWAL',
        note: 'Withdrawal to Bank',
        date: 'Just now',
        method: 'Bank Payout'
      },
      ...prev
    ]);
  };

  const handleVerifyProofAdmin = (proofId: string, approved: boolean) => {
    setProofs((prev) =>
      prev.map((p) => (p.id === proofId ? { ...p, status: approved ? 'VERIFIED' : 'REJECTED' } : p))
    );

    if (approved) {
      fireCashRain();
      setUser((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + 10, // Reward bonus for winning proof
        totalEarnings: prev.totalEarnings + 10
      }));
    }
  };

  const handleSnoozePenalty = (penaltyAmt: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - penaltyAmt)
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        amount: -penaltyAmt,
        type: 'PENALTY',
        note: 'Anti-Snooze Alarm Penalty Forfeit',
        date: 'Just now',
        method: 'Auto-Deducted'
      },
      ...prev
    ]);
    setShowAlarmModal(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      {/* Onboarding Flow if needed */}
      {!user.onboarded && (
        <OnboardingFlow user={user} onComplete={handleOnboardingComplete} />
      )}

      {/* Main Container - Responsive Sidebar layout for desktop & bottom nav for mobile */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto overflow-hidden">
        {/* DESKTOP SIDEBAR NAVIGATION (Hidden on small mobile screens) */}
        <aside className="hidden md:flex w-20 border-r border-white/5 bg-[#0B0F19] flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col gap-6 items-center">
            {/* Logo */}
            <div
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('dashboard');
              }}
              className="w-12 h-12 rounded-[14px] bg-gradient-to-tr from-[#7C3AED] to-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20 cursor-pointer hover:scale-105 transition-all"
            >
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-4">
              {[
                { id: 'dashboard', icon: Flame, label: 'Today' },
                { id: 'social', icon: Users, label: 'Social' },
                { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
                { id: 'wallet', icon: WalletIcon, label: 'Wallet' },
                { id: 'aicoach', icon: Bot, label: 'AI Coach' },
                { id: 'admin', icon: ShieldAlert, label: 'Anti-Cheat' },
                { id: 'profile', icon: UserIcon, label: 'Profile' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      triggerHaptic('light');
                      setActiveTab(item.id);
                    }}
                    className={`p-3 rounded-2xl transition-all relative group flex items-center justify-center ${
                      isActive
                        ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="absolute left-16 bg-[#141A2B] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings & Avatar at bottom */}
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('settings');
              }}
              className={`p-3 rounded-2xl transition-all ${
                activeTab === 'settings' ? 'bg-[#7C3AED] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>

            <div
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('profile');
              }}
              className="w-10 h-10 rounded-full border-2 border-[#7C3AED]/50 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00E5FF] transition-all"
            >
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto px-4 md:px-8 py-4 space-y-4 max-w-5xl mx-auto">
          {/* Top Header Bar */}
          <TopHeader
            user={user}
            currentTab={activeTab as any}
            unreadCount={unreadCount}
            onNavigate={(tab) => {
              triggerHaptic('light');
              setActiveTab(tab);
            }}
            onOpenNotifications={() => {
              triggerHaptic('light');
              setShowNotifDrawer(true);
            }}
            onOpenCurrencySelector={() => {
              triggerHaptic('light');
              setShowCurrencyModal(true);
            }}
            onOpenPandaPicker={() => {
              triggerHaptic('medium');
              setShowPandaPickerModal(true);
            }}
            onOpenApkModal={() => {
              triggerHaptic('medium');
              setShowApkModal(true);
            }}
          />

          {/* VIEW SWITCHER */}

          {/* VIEW 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5 pb-24">
              {/* Today's High Stakes Hero Challenge */}
              {challenges[0] && (
                <TodayChallengeHero
                  challenge={challenges[0]}
                  onSubmitProof={() => {
                    triggerHaptic('medium');
                    setSelectedChallengeForProof(challenges[0]);
                  }}
                  onTriggerAlarm={() => {
                    triggerHaptic('heavy');
                    setActiveAlarmChallenge(challenges[0]);
                    setShowAlarmModal(true);
                  }}
                />
              )}

              {/* Stats Overview */}
              <StatsOverview user={user} />

              {/* Grid: Daily Progress Ring & Weekly Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DailyProgressRing completedCount={challenges[0]?.completedDays || 2} totalCount={challenges[0]?.totalDays || 5} />
                <WeeklyChart />
              </div>

              {/* Secondary Habits Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Other Active Stakes</h3>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-[11px] font-bold text-[#00E5FF] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> New Challenge
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenges.slice(1).map((ch) => (
                    <div
                      key={ch.id}
                      className="glass-card p-4 space-y-3 border border-white/10 hover:border-[#7C3AED]/50 transition-all flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#7C3AED]">
                            {ch.category}
                          </span>
                          <h4 className="text-sm font-black text-white mt-1">{ch.title}</h4>
                        </div>
                        <span className="text-xs font-black text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-xl">
                          ${ch.stakeAmount} Pool
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                          <span>Streak: 🔥 {ch.currentStreak}d</span>
                          <span>{ch.completedDays} / {ch.totalDays} Days</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${(ch.completedDays / ch.totalDays) * 100}%` }}
                            className="h-full bg-[#00E5FF]"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          triggerHaptic('medium');
                          setSelectedChallengeForProof(ch);
                        }}
                        className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>Submit Proof</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Friends Online Ticker & Quote */}
              <FriendsOnlineTicker />
              <MotivationalQuote />
            </div>
          )}

          {/* VIEW 2: SOCIAL */}
          {activeTab === 'social' && (
            <SocialFeedView
              user={user}
              proofs={proofs}
              onVerifyProof={(proofId, approved) => {
                handleVerifyProofAdmin(proofId, approved);
              }}
            />
          )}

          {/* VIEW 3: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <LeaderboardView user={user} />
          )}

          {/* VIEW 4: WALLET */}
          {activeTab === 'wallet' && (
            <WalletView
              user={user}
              transactions={transactions}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
              onOpenCurrencySelector={() => setShowCurrencyModal(true)}
            />
          )}

          {/* VIEW 5: PROFILE */}
          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              badges={badges}
              onOpenSettings={() => setActiveTab('settings')}
              onOpenPandaPicker={() => setShowPandaPickerModal(true)}
              onOpenCurrencySelector={() => setShowCurrencyModal(true)}
              onOpenApkModal={() => setShowApkModal(true)}
            />
          )}

          {/* VIEW 6: AI COACH */}
          {activeTab === 'aicoach' && (
            <AICoachView user={user} challenges={challenges} />
          )}

          {/* VIEW 7: ANTI-CHEAT ADMIN */}
          {activeTab === 'admin' && (
            <AdminPanelView
              proofs={proofs}
              onVerifyProof={handleVerifyProofAdmin}
            />
          )}

          {/* VIEW 8: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              onClose={() => setActiveTab('dashboard')}
            />
          )}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          triggerHaptic('light');
          setActiveTab(tab);
        }}
      />

      {/* MODALS & DRAWERS */}
      {showCreateModal && (
        <CreateChallengeModal
          userBalance={user.walletBalance}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateChallenge}
        />
      )}

      {selectedChallengeForProof && (
        <ProofSubmissionModal
          challenge={selectedChallengeForProof}
          onClose={() => setSelectedChallengeForProof(null)}
          onSubmit={handleSubmitProof}
        />
      )}

      {showAlarmModal && activeAlarmChallenge && (
        <AntiSnoozeAlarmModal
          challengeTitle={activeAlarmChallenge.title}
          penaltyAmount={activeAlarmChallenge.snoozePenaltyAmount || 15}
          onClose={() => setShowAlarmModal(false)}
          onSnoozePenalty={handleSnoozePenalty}
          onCompleteTask={() => {
            setShowAlarmModal(false);
            setSelectedChallengeForProof(activeAlarmChallenge);
          }}
        />
      )}

      <NotificationsDrawer
        notifications={notifications}
        isOpen={showNotifDrawer}
        onClose={() => setShowNotifDrawer(false)}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* 30 Cute Panda Avatars Picker Modal */}
      <PandaAvatarPickerModal
        isOpen={showPandaPickerModal}
        currentAvatar={user.avatar}
        onSelectAvatar={(svgDataUri) => {
          setUser((prev) => ({ ...prev, avatar: svgDataUri }));
        }}
        onClose={() => setShowPandaPickerModal(false)}
      />

      {/* Asian & Global Currency Selector Modal */}
      <CurrencySelectorModal
        isOpen={showCurrencyModal}
        currentCurrency={user.currency || 'UZS'}
        onSelectCurrency={(code) => {
          setUser((prev) => ({ ...prev, currency: code }));
        }}
        onClose={() => setShowCurrencyModal(false)}
      />

      {/* APK Download & Android Setup Modal */}
      <ApkDownloadModal
        isOpen={showApkModal}
        onClose={() => setShowApkModal(false)}
      />
    </div>
  );
}

export default App;
