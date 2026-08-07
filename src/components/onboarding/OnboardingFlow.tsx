import React, { useState } from 'react';
import { ShieldAlert, Flame, DollarSign, Camera, AlarmClock, ChevronRight, Check, ArrowRight, Sparkles, User, Globe, Coins, ShieldCheck } from 'lucide-react';
import { User as UserType, Currency } from '../../types';
import { triggerHaptic } from '../../utils/haptics';
import { PANDA_AVATARS } from '../../data/pandaAvatars';

interface OnboardingFlowProps {
  onComplete: (newUser: Partial<UserType>) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'slides' | 'auth' | 'profile'>('slides');
  const [slideIndex, setSlideIndex] = useState(0);

  // Form State
  const [username, setUsername] = useState('alex_apex');
  const [avatar, setAvatar] = useState(PANDA_AVATARS[0].svgDataUri);
  const [timezone, setTimezone] = useState('GMT+5 (Tashkent / Asia)');
  const [country, setCountry] = useState('Uzbekistan 🇺🇿');
  const [currency, setCurrency] = useState<Currency>('UZS');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Early Morning Routine', 'High Intensity Fitness']);

  const slides = [
    {
      title: 'Beat Procrastination. Win Money.',
      subtitle: 'Put real money on the line. Complete habits to win cash from friends who quit.',
      icon: DollarSign,
      color: 'from-[#7C3AED] to-[#00E5FF]',
      badge: 'HIGH STAKES ACCOUNTABILITY',
      bgImg: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Bet Against Your Friends',
      subtitle: 'Create private or public habit pools. Stakes stay locked safely in escrow.',
      icon: Flame,
      color: 'from-orange-500 to-amber-500',
      badge: 'SOCIAL COMPETITION',
      bgImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Claim Cash & Elevate Rank',
      subtitle: 'Winners automatically receive loser pool shares, instant wallet deposits, and XP level ups.',
      icon: Coins,
      color: 'from-emerald-500 to-teal-400',
      badge: 'REAL PAYOUTS',
      bgImg: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'AI Camera & Proof System',
      subtitle: 'Verify habits with live selfie, GPS motion tags, object detection, and timestamp watermarks.',
      icon: Camera,
      color: 'from-cyan-500 to-blue-600',
      badge: 'AUTOMATED VERIFICATION',
      bgImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Anti-Cheat & Anti-Snooze Alarm',
      subtitle: 'AI detects fakes, deepfakes & location spoofing. Smart alarm forces math puzzles or walk tests.',
      icon: ShieldAlert,
      color: 'from-purple-600 to-pink-500',
      badge: 'ZERO CHEATING TOLERANCE',
      bgImg: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const avatarsList = [
    PANDA_AVATARS[0].svgDataUri,
    PANDA_AVATARS[1].svgDataUri,
    PANDA_AVATARS[4].svgDataUri,
    PANDA_AVATARS[5].svgDataUri,
    PANDA_AVATARS[14].svgDataUri,
    PANDA_AVATARS[20].svgDataUri
  ];

  const goalOptions = [
    'Early Morning Routine',
    'High Intensity Fitness',
    'Daily Code & Build',
    'Deep Study & Reading',
    'Zero Sugar & Clean Eating',
    '10,000 Steps Daily',
    'Mindfulness & Prayer',
    'Cold Shower & Hydration'
  ];

  const handleNextSlide = () => {
    triggerHaptic('light');
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep('auth');
    }
  };

  const handleSelectAuthMode = (mode: string) => {
    triggerHaptic('medium');
    setStep('profile');
  };

  const toggleGoal = (goal: string) => {
    triggerHaptic('light');
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleFinalSubmit = () => {
    triggerHaptic('success');
    onComplete({
      username,
      avatar,
      timezone,
      country,
      currency,
      goals: selectedGoals
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] text-white overflow-y-auto flex flex-col justify-between max-w-lg mx-auto">
      {/* Step 1: 5 Onboarding Slides */}
      {step === 'slides' && (
        <div className="relative flex-1 flex flex-col justify-between p-6 overflow-hidden">
          {/* Background image preview */}
          <div className="absolute inset-0 z-0 opacity-20 transition-all duration-700">
            <img
              src={slides[slideIndex].bgImg}
              alt="bg"
              className="w-full h-full object-cover filter blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
          </div>

          {/* Top Bar Progress */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <div className="flex gap-1.5 flex-1 max-w-xs">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slideIndex ? 'flex-1 bg-[#00E5FF]' : 'w-3 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setStep('auth')}
              className="text-xs font-bold text-gray-400 hover:text-white px-3 py-1 rounded-full bg-white/10"
            >
              Skip
            </button>
          </div>

          {/* Center Card */}
          <div className="relative z-10 my-auto py-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/10 text-[#00E5FF] border border-[#00E5FF]/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              {slides[slideIndex].badge}
            </div>

            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr p-0.5 shadow-2xl glow-purple animate-pulse">
              <div className="w-full h-full rounded-3xl bg-[#141A2B] flex items-center justify-center">
                {React.createElement(slides[slideIndex].icon, { className: 'w-12 h-12 text-[#00E5FF]' })}
              </div>
            </div>

            <h2 className="text-3xl font-black tracking-tight leading-tight px-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#00E5FF]">
              {slides[slideIndex].title}
            </h2>

            <p className="text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">
              {slides[slideIndex].subtitle}
            </p>
          </div>

          {/* Bottom Navigation */}
          <div className="relative z-10 space-y-4 pb-4">
            <button
              onClick={handleNextSlide}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] font-black text-white text-base shadow-xl hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>{slideIndex === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Auth Chooser */}
      {step === 'auth' && (
        <div className="p-6 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="pt-8 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center text-[#00E5FF] font-black text-2xl">
              HB
            </div>
            <h2 className="text-2xl font-black text-white">Join HabitBet</h2>
            <p className="text-xs text-gray-400">Select your preferred login method to continue</p>
          </div>

          <div className="space-y-3 my-auto py-6">
            <button
              onClick={() => handleSelectAuthMode('apple')}
              className="w-full py-3.5 px-4 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-md"
            >
              <span className="text-lg"></span>
              <span>Continue with Apple</span>
            </button>

            <button
              onClick={() => handleSelectAuthMode('google')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#141A2B] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <span className="text-base">G</span>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleSelectAuthMode('email')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#141A2B] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <span>✉️</span>
              <span>Continue with Email</span>
            </button>

            <button
              onClick={() => handleSelectAuthMode('phone')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#141A2B] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <span>📱</span>
              <span>Phone OTP Verification</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500 pb-4">
            By signing up you agree to HabitBet Escrow Terms, Anti-Cheat Policy & Privacy Guidelines.
          </p>
        </div>
      )}

      {/* Step 3: User Profile Onboarding Form */}
      {step === 'profile' && (
        <div className="p-6 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="space-y-6 pt-4">
            <div>
              <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider">Final Setup</span>
              <h2 className="text-2xl font-black text-white">Create Your Profile</h2>
              <p className="text-xs text-gray-400">Configure your HabitBet identity & preferences</p>
            </div>

            {/* Profile Avatar Selection */}
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">Choose Avatar</label>
              <div className="flex items-center justify-between gap-2">
                {avatarsList.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setAvatar(url);
                    }}
                    className={`relative rounded-2xl overflow-hidden ring-2 transition-all ${
                      avatar === url ? 'ring-[#00E5FF] scale-110' : 'ring-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="avatar" className="w-12 h-12 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-1 block">Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400 font-bold text-sm">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full glass-input py-2.5 pl-8 pr-4 text-sm font-semibold"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Region & Currency */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full glass-input py-2.5 px-3 text-xs font-semibold"
                >
                  <option value="USD" className="bg-[#141A2B]">USD ($)</option>
                  <option value="EUR" className="bg-[#141A2B]">EUR (€)</option>
                  <option value="GBP" className="bg-[#141A2B]">GBP (£)</option>
                  <option value="SOL" className="bg-[#141A2B]">SOL (Solana)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full glass-input py-2.5 px-3 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Primary Goals Selection */}
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">Select Primary Goals</label>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                {goalOptions.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#7C3AED] text-white border-[#00E5FF] shadow-md'
                          : 'bg-[#141A2B] text-gray-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleFinalSubmit}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] font-black text-white text-base shadow-xl hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 mt-6"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Enter HabitBet Arena</span>
          </button>
        </div>
      )}
    </div>
  );
};
