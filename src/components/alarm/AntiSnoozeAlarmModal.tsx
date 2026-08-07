import React, { useState } from 'react';
import { AlarmClock, Volume2, ShieldAlert, CheckCircle2, RotateCcw, X, Smartphone, Zap } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';
import { fireWinConfetti } from '../../utils/confetti';

interface AntiSnoozeAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntiSnoozeAlarmModal: React.FC<AntiSnoozeAlarmModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeMode, setActiveMode] = useState<'ringing' | 'math' | 'shake' | 'dismissed'>('ringing');
  const [numShakes, setNumShakes] = useState(0);
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathSuccess, setMathSuccess] = useState(false);

  const handleStartChallenge = (mode: 'math' | 'shake') => {
    triggerHaptic('heavy');
    setActiveMode(mode);
  };

  const handleShake = () => {
    triggerHaptic('medium');
    const next = numShakes + 5;
    setNumShakes(next);
    if (next >= 50) {
      triggerHaptic('success');
      fireWinConfetti();
      setActiveMode('dismissed');
    }
  };

  const handleCheckMath = (e: React.FormEvent) => {
    e.preventDefault();
    if (mathAnswer === '115') { // 47 + 68
      triggerHaptic('success');
      setMathSuccess(true);
      fireWinConfetti();
      setTimeout(() => setActiveMode('dismissed'), 800);
    } else {
      triggerHaptic('warning');
      alert('Wrong answer! Alarm continues ringing.');
      setMathAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card max-w-md w-full p-6 space-y-6 border border-amber-500/50 shadow-2xl text-center relative overflow-hidden">
        {/* Pulsing ring background */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-[#EF4444] to-amber-500 animate-pulse" />

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Anti-Snooze Smart Alarm
          </span>
          <button onClick={onClose} className="p-1 rounded-full bg-white/10 text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode 1: Ringing */}
        {activeMode === 'ringing' && (
          <div className="space-y-6 py-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center pulse-ring">
              <AlarmClock className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">05:00 AM</h2>
              <p className="text-xs text-amber-300 font-bold mt-1">
                Miracle Morning Wake Up ($50 Stake at risk!)
              </p>
            </div>

            <p className="text-xs text-gray-300 max-w-xs mx-auto">
              Snooze button disabled by HabitBet contract. Select a wake-up test to stop alarm:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleStartChallenge('math')}
                className="p-4 rounded-2xl bg-[#7C3AED]/30 border border-[#7C3AED] hover:bg-[#7C3AED]/50 transition-all font-bold text-xs text-white flex flex-col items-center gap-2"
              >
                <span className="text-lg">🧮</span>
                <span>Solve Math Challenge</span>
              </button>

              <button
                onClick={() => handleStartChallenge('shake')}
                className="p-4 rounded-2xl bg-[#00E5FF]/20 border border-[#00E5FF] hover:bg-[#00E5FF]/40 transition-all font-bold text-xs text-white flex flex-col items-center gap-2"
              >
                <Smartphone className="w-6 h-6 text-[#00E5FF] animate-wiggle" />
                <span>Shake Phone 50 Times</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode 2: Math Equation */}
        {activeMode === 'math' && (
          <form onSubmit={handleCheckMath} className="space-y-5 py-4">
            <h3 className="text-lg font-black text-white">Solve to Dismiss Alarm</h3>
            <div className="text-3xl font-black text-[#00E5FF] bg-black/40 py-3 rounded-2xl border border-white/10">
              47 + 68 = ?
            </div>

            <input
              type="number"
              required
              autoFocus
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="Enter answer"
              className="w-full glass-input py-3 text-center text-xl font-bold"
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#7C3AED] font-black text-white text-sm shadow-xl hover:bg-purple-600 active:scale-98 transition-all"
            >
              Verify Math Solution
            </button>
          </form>
        )}

        {/* Mode 3: Shake Phone */}
        {activeMode === 'shake' && (
          <div className="space-y-5 py-4">
            <h3 className="text-lg font-black text-white">Shake Phone Progress</h3>
            <div className="w-full bg-white/10 rounded-full h-6 overflow-hidden p-1 border border-white/10">
              <div
                style={{ width: `${(numShakes / 50) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#22C55E] transition-all duration-300"
              />
            </div>

            <p className="text-xs font-bold text-gray-300">{numShakes} / 50 Shakes Completed</p>

            <button
              onClick={handleShake}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] font-black text-white text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-6 h-6" />
              <span>TAP TO SIMULATE SHAKE</span>
            </button>
          </div>
        )}

        {/* Mode 4: Successfully Dismissed */}
        {activeMode === 'dismissed' && (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Alarm Dismissed!</h2>
            <p className="text-xs text-emerald-400 font-semibold">
              $50 Stake Protected! Complete your selfie proof before 05:15 AM.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-[#22C55E] text-black font-black text-sm hover:bg-emerald-400 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
