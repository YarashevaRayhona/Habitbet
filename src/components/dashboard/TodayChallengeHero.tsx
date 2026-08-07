import React from 'react';
import { Clock, Camera, ShieldCheck, Sparkles, Bell } from 'lucide-react';
import { Challenge } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface TodayChallengeHeroProps {
  challenge: Challenge;
  onSubmitProof?: () => void;
  onOpenProofModal?: (challenge: Challenge) => void;
  onTriggerAlarm?: () => void;
  onViewDetails?: (challenge: Challenge) => void;
}

export const TodayChallengeHero: React.FC<TodayChallengeHeroProps> = ({
  challenge,
  onSubmitProof,
  onOpenProofModal,
  onTriggerAlarm,
  onViewDetails,
}) => {
  const handleProofClick = () => {
    triggerHaptic('heavy');
    if (onSubmitProof) {
      onSubmitProof();
    } else if (onOpenProofModal) {
      onOpenProofModal(challenge);
    }
  };

  const stakeDisplay = challenge.stakeAmount || challenge.betAmount || 50;
  const proofDisplay = challenge.proofType || challenge.proofMethod || 'Selfie & GPS';

  return (
    <div className="relative overflow-hidden glass-card p-5 border border-[#7C3AED]/40 bg-gradient-to-br from-[#141A2B] via-[#141A2B] to-[#7C3AED]/20 shadow-2xl space-y-4">
      {/* Background Accent */}
      {challenge.image && (
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none">
          <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover filter blur-sm" />
        </div>
      )}

      <div className="relative z-10 space-y-4">
        {/* Top Header Label */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#7C3AED]/30 text-[#00E5FF] border border-[#00E5FF]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Today's High-Stakes Priority</span>
          </div>

          <div className="flex items-center gap-2">
            {onTriggerAlarm && (
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  onTriggerAlarm();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-500/20 text-[#EF4444] border border-red-500/40 text-[10px] font-black hover:bg-red-500/30 transition-all"
                title="Test Anti-Snooze Alarm"
              >
                <Bell className="w-3 h-3 animate-bounce" />
                <span>Alarm Test</span>
              </button>
            )}

            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>5h 22m remaining</span>
            </div>
          </div>
        </div>

        {/* Challenge Title & Info */}
        <div
          className="cursor-pointer"
          onClick={() => onViewDetails && onViewDetails(challenge)}
        >
          <h2 className="text-xl font-black text-white hover:text-[#00E5FF] transition-colors italic">
            {challenge.title}
          </h2>
          <p className="text-xs text-gray-300 line-clamp-2 mt-1 font-semibold">
            {challenge.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Pool</span>
            <span className="text-sm font-black text-[#22C55E]">${challenge.totalPool}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Your Stake</span>
            <span className="text-sm font-black text-white">${stakeDisplay}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Proof Required</span>
            <span className="text-xs font-bold text-[#00E5FF]">{proofDisplay}</span>
          </div>
        </div>

        {/* Participants Avatars */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {challenge.participants && challenge.participants.length > 0 && (
              <div className="flex -space-x-2 overflow-hidden">
                {challenge.participants.map((p) => (
                  <img
                    key={p.id}
                    src={p.avatar}
                    alt={p.username}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#141A2B] object-cover"
                  />
                ))}
              </div>
            )}
            <span className="text-xs text-gray-400 font-semibold">
              {challenge.participants ? challenge.participants.length : 4} competitors
            </span>
          </div>

          {/* Action Button */}
          {challenge.todaySubmitted ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Verified Today!</span>
            </div>
          ) : (
            <button
              onClick={handleProofClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all glow-purple"
            >
              <Camera className="w-4 h-4" />
              <span>Submit Proof</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
