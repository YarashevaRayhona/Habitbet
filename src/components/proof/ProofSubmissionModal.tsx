import React, { useState } from 'react';
import { X, Camera, MapPin, ShieldCheck, ShieldAlert, Sparkles, RefreshCw, Upload, CheckCircle2, Zap } from 'lucide-react';
import { Challenge, ProofSubmission } from '../../types';
import { verifyProofAI, AIProofResponse } from '../../services/geminiService';
import { triggerHaptic } from '../../utils/haptics';
import { fireWinConfetti, fireCashRain } from '../../utils/confetti';
import { PANDA_AVATARS } from '../../data/pandaAvatars';

interface ProofSubmissionModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (proof: ProofSubmission, challengeId: string) => void;
}

export const ProofSubmissionModal: React.FC<ProofSubmissionModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  if (!isOpen || !challenge) return null;

  const [step, setStep] = useState<'capture' | 'scanning' | 'result'>('capture');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80');
  const [note, setNote] = useState('');
  const [aiResult, setAiResult] = useState<AIProofResponse | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const sampleProofPhotos = [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
  ];

  const handleStartScan = async () => {
    triggerHaptic('heavy');
    setStep('scanning');
    setIsScanning(true);

    // Call AI verification service
    const res = await verifyProofAI(challenge.title, challenge.proofMethod, note);

    setTimeout(() => {
      setAiResult(res);
      setIsScanning(false);
      setStep('result');
      triggerHaptic('success');
      fireWinConfetti();
      fireCashRain();
    }, 1500);
  };

  const handleConfirmAndClaim = () => {
    triggerHaptic('success');
    const newProof: ProofSubmission = {
      id: `pr_${Date.now()}`,
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      userId: 'usr_me',
      userName: 'Alex Rivera',
      userAvatar: PANDA_AVATARS[0].svgDataUri,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: photoUrl,
      proofType: challenge.proofMethod,
      gpsLocation: 'Miami Fitness Plaza (25.7617° N, 80.1918° W)',
      aiConfidenceScore: aiResult?.confidenceScore || 98,
      isVerified: true,
      antiCheatFlags: [],
      likes: 1,
      commentsCount: 0
    };

    onSubmitSuccess(newProof, challenge.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      <div className="glass-card max-w-md w-full p-6 space-y-5 border border-[#00E5FF]/40 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Submit Habit Proof</h2>
              <p className="text-xs text-gray-400">{challenge.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Capture / Select Photo */}
        {step === 'capture' && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 h-52 bg-black/50 group">
              <img src={photoUrl} alt="proof" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 justify-between">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  GPS Tagged Live
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {challenge.proofMethod} Required
                </span>
              </div>
            </div>

            {/* Select alternative proof photo */}
            <div>
              <label className="text-xs font-bold text-gray-300 mb-1 block">Live Camera Snapshots</label>
              <div className="flex gap-2">
                {sampleProofPhotos.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhotoUrl(url)}
                    className={`relative flex-1 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      photoUrl === url ? 'border-[#00E5FF] scale-105' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={url} alt="snap" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Note / Caption */}
            <div>
              <label className="text-xs font-bold text-gray-300 mb-1 block">Proof Notes (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Completed 5:00 AM wake up ritual..."
                className="w-full glass-input py-2 px-3 text-xs"
              />
            </div>

            <button
              onClick={handleStartScan}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white font-black text-sm shadow-xl hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Run AI Anti-Cheat Verification</span>
            </button>
          </div>
        )}

        {/* Step 2: AI Scanning Animation */}
        {step === 'scanning' && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#00E5FF]/30 border-t-[#00E5FF] animate-spin" />
              <ShieldCheck className="w-10 h-10 text-[#00E5FF] animate-pulse" />
            </div>
            <h3 className="text-lg font-black text-white">Analyzing Image EXIF & Metadata</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Detecting duplicate uploads, face match, GPS spoofing, and timestamp accuracy...
            </p>
          </div>
        )}

        {/* Step 3: Verified Result */}
        {step === 'result' && aiResult && (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-[#22C55E]/40 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">Proof Verified!</h3>
              <div className="text-xs font-black text-[#22C55E] uppercase tracking-wider">
                AI Confidence: {aiResult.confidenceScore}%
              </div>
              <p className="text-xs text-gray-300 italic">{aiResult.aiVerdict}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#141A2B] border border-white/10 text-left space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Objects Detected</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(aiResult?.detectedObjects || []).map((obj, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-cyan-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmAndClaim}
              className="w-full py-3.5 rounded-2xl bg-[#22C55E] text-black font-black text-sm shadow-xl hover:bg-emerald-400 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-black fill-black" />
              <span>Confirm & Lock In Victory</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
