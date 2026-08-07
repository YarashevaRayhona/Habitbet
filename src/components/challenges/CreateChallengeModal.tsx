import React, { useState } from 'react';
import { X, Flame, DollarSign, Camera, AlarmClock, ShieldAlert, Sparkles, Users, Lock, Unlock, Image as ImageIcon } from 'lucide-react';
import { Challenge, HabitCategory, ProofMethod, ChallengeDifficulty } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newChallenge: Partial<Challenge>) => void;
}

export const CreateChallengeModal: React.FC<CreateChallengeModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Wake Up Early');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>('Hard');
  const [repeatSchedule, setRepeatSchedule] = useState('Daily at 06:00 AM');
  const [betAmount, setBetAmount] = useState(50);
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [proofMethod, setProofMethod] = useState<ProofMethod>('Selfie');
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [penalty, setPenalty] = useState('Forfeit bet amount to consistent pool winners.');
  const [reward, setReward] = useState('Share of loser bet pool + 150 HabitCoins.');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80');

  const categoriesList: HabitCategory[] = [
    'Wake Up Early',
    'Fitness',
    'Gym',
    'Walking',
    'Coding',
    'Study',
    'Reading',
    'Meditation',
    'Writing',
    'No Sugar',
    'No Smoking',
    'No Alcohol',
    'Prayer',
    'Hydration',
    'Custom'
  ];

  const proofMethodsList: ProofMethod[] = [
    'Selfie',
    'Photo',
    'Video',
    'GPS',
    'QR Scan',
    'AI Object Detection',
    'Face Verification',
    'Motion Detection',
    'Math Puzzle'
  ];

  const imagesList = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    triggerHaptic('success');
    onCreate({
      title,
      category,
      description: description || `Daily consistency challenge for ${title}.`,
      difficulty,
      repeatSchedule,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      betAmount,
      isPrivate,
      maxPlayers,
      image: selectedImage,
      proofMethod,
      alarmEnabled,
      penalty,
      reward,
      totalPool: betAmount * 2,
      status: 'active',
      todaySubmitted: false,
      participants: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      <div className="glass-card max-w-lg w-full p-6 space-y-5 border border-[#7C3AED]/40 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#7C3AED] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Create Habit Bet Pool</h2>
              <p className="text-xs text-gray-400">Put real stakes on your consistency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-300 mb-1 block">Challenge Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 5 AM Morning Miracle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full glass-input py-2.5 px-3 text-sm font-semibold"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-gray-300 mb-1 block">Habit Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full glass-input py-2.5 px-3 text-xs font-semibold"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat} className="bg-[#141A2B] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Bet Amount Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-300">Bet Stake per Player</label>
              <span className="text-sm font-black text-[#22C55E]">${betAmount} USD</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full accent-[#7C3AED]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
              <span>$5 (Low)</span>
              <span>$50 (Standard)</span>
              <span>$500 (High Stakes)</span>
            </div>
          </div>

          {/* Difficulty & Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 mb-1 block">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as ChallengeDifficulty)}
                className="w-full glass-input py-2 px-3 text-xs font-semibold"
              >
                <option value="Easy" className="bg-[#141A2B]">Easy</option>
                <option value="Medium" className="bg-[#141A2B]">Medium</option>
                <option value="Hard" className="bg-[#141A2B]">Hard</option>
                <option value="Extreme" className="bg-[#141A2B]">Extreme</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 mb-1 block">Max Competitors</label>
              <input
                type="number"
                min="2"
                max="50"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="w-full glass-input py-2 px-3 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Proof Method Required */}
          <div>
            <label className="text-xs font-bold text-gray-300 mb-1 block">Proof Verification Method</label>
            <select
              value={proofMethod}
              onChange={(e) => setProofMethod(e.target.value as ProofMethod)}
              className="w-full glass-input py-2.5 px-3 text-xs font-semibold"
            >
              {proofMethodsList.map((pm) => (
                <option key={pm} value={pm} className="bg-[#141A2B]">
                  {pm} Verification
                </option>
              ))}
            </select>
          </div>

          {/* Image Picker */}
          <div>
            <label className="text-xs font-bold text-gray-300 mb-1.5 block">Cover Image</label>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {imagesList.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(url)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === url ? 'border-[#00E5FF] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={url} alt="cover" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Smart Alarm & Private Toggle */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setAlarmEnabled(!alarmEnabled);
              }}
              className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                alarmEnabled
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-[#141A2B] border-white/10 text-gray-400'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">Smart Alarm</span>
                <span className="text-[10px] opacity-75">Force wake test</span>
              </div>
              <AlarmClock className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setIsPrivate(!isPrivate);
              }}
              className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                isPrivate
                  ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-purple-300'
                  : 'bg-[#141A2B] border-white/10 text-gray-400'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{isPrivate ? 'Private Pool' : 'Public Pool'}</span>
                <span className="text-[10px] opacity-75">{isPrivate ? 'Invite link only' : 'Open to all'}</span>
              </div>
              {isPrivate ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] font-black text-white text-sm shadow-xl hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <DollarSign className="w-4 h-4" />
            <span>Lock ${betAmount} & Launch Challenge</span>
          </button>
        </form>
      </div>
    </div>
  );
};
