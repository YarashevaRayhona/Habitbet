import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle, Eye, RefreshCw, Lock, DollarSign, Filter } from 'lucide-react';
import { ProofSubmission } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface AdminPanelViewProps {
  proofs?: ProofSubmission[];
  onVerifyProof?: (proofId: string, approved: boolean) => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ proofs = [], onVerifyProof }) => {
  const [selectedProof, setSelectedProof] = useState<ProofSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'pending'>('pending');

  const pendingProofs = (proofs || []).filter(p => {
    if (filter === 'flagged') return (p.aiConfidenceScore < 80) || (p.antiCheatFlags || []).length > 0;
    return true;
  });

  const handleApprove = (proof: ProofSubmission) => {
    triggerHaptic('success');
    if (onVerifyProof) onVerifyProof(proof.id, true);
    setSelectedProof(null);
  };

  const handleReject = (proof: ProofSubmission) => {
    triggerHaptic('medium');
    if (onVerifyProof) onVerifyProof(proof.id, false);
    setSelectedProof(null);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Admin Panel Banner */}
      <div className="glass-card p-5 border border-amber-500/40 bg-gradient-to-br from-[#141A2B] via-[#141A2B] to-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Peer Review & Anti-Cheat Hub</h2>
              <p className="text-xs text-gray-300">Community Moderation, EXIF Validation & AI Verification</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
            {pendingProofs.length} Pending
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 pt-1">
          {(['pending', 'flagged', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                triggerHaptic('light');
                setFilter(f);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === f
                  ? 'bg-amber-500 text-black font-black'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {f} Proofs
            </button>
          ))}
        </div>
      </div>

      {/* Proof Review Grid */}
      <div className="space-y-3">
        {pendingProofs.length === 0 ? (
          <div className="glass-card p-8 text-center space-y-2 border border-white/10">
            <CheckCircle className="w-10 h-10 text-[#22C55E] mx-auto" />
            <h3 className="text-sm font-black text-white">All Clear!</h3>
            <p className="text-xs text-gray-400">No pending or flagged proofs in queue for review.</p>
          </div>
        ) : (
          pendingProofs.map((proof) => (
            <div
              key={proof.id}
              className={`glass-card p-4 space-y-3 border transition-all ${
                proof.aiFraudScore > 25
                  ? 'border-red-500/50 bg-red-950/20'
                  : 'border-white/10 bg-[#141A2B]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-black text-white">{proof.challengeTitle}</h3>
                  <span className="text-[10px] text-gray-400">Submitted by @{proof.username} • {proof.timestamp}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      proof.aiFraudScore > 20
                        ? 'bg-red-500/20 text-[#EF4444]'
                        : 'bg-[#22C55E]/20 text-[#22C55E]'
                    }`}
                  >
                    AI Fraud Risk: {proof.aiFraudScore}%
                  </span>
                </div>
              </div>

              {/* Proof Image Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black">
                <img
                  src={proof.imageUrl || proof.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'}
                  alt={proof.challengeTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md p-2 rounded-xl text-[10px] text-gray-300 flex justify-between items-center">
                  <span>GPS: {proof.gpsStatus} ({proof.locationName})</span>
                  <span>Stake: ${proof.stakeAmount}</span>
                </div>
              </div>

              {/* Note / Verification Details */}
              {proof.userNote && (
                <p className="text-xs text-slate-300 italic bg-white/5 p-2 rounded-xl border border-white/5">
                  "{proof.userNote}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleApprove(proof)}
                  className="flex-1 py-2.5 rounded-xl bg-[#22C55E] text-black font-black text-xs hover:bg-emerald-400 transition-all flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve & Release Escrow</span>
                </button>

                <button
                  onClick={() => handleReject(proof)}
                  className="flex-1 py-2.5 rounded-xl bg-[#EF4444] text-white font-black text-xs hover:bg-red-600 transition-all flex items-center justify-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject & Forfeit</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
