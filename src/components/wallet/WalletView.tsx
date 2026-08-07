import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Lock, CreditCard, Gift, Copy, Check, ShieldCheck, DollarSign, Coins } from 'lucide-react';
import { User, Transaction } from '../../types';
import { triggerHaptic } from '../../utils/haptics';
import { fireCashRain } from '../../utils/confetti';
import { formatCurrency, getCurrencyConfig } from '../../utils/currency';

import { INITIAL_USER, INITIAL_TRANSACTIONS } from '../../data/mockData';

interface WalletViewProps {
  user?: User;
  transactions?: Transaction[];
  onDeposit?: (amount: number) => void;
  onWithdraw?: (amount: number) => void;
  onOpenCurrencySelector?: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  user = INITIAL_USER,
  transactions = INITIAL_TRANSACTIONS,
  onDeposit = (_amount: number) => {},
  onWithdraw = (_amount: number) => {},
  onOpenCurrencySelector,
}) => {
  const safeUser = user || INITIAL_USER;
  const safeTransactions = transactions || INITIAL_TRANSACTIONS;
  const safeWalletBalance = safeUser.walletBalance ?? 0;
  const safeEscrowBalance = safeUser.escrowBalance ?? 0;
  const currencyCode = safeUser.currency || 'UZS';
  const currencyConfig = getCurrencyConfig(currencyCode);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('100');
  const [withdrawAmount, setWithdrawAmount] = useState('50');
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('success');
    if (promoCode.toUpperCase() === 'HABIT2026') {
      onDeposit(25);
      fireCashRain();
      setPromoMessage(`🎉 Promo code applied! ${formatCurrency(25, currencyCode)} credited to your wallet.`);
    } else {
      setPromoMessage(`Valid code example: HABIT2026 (${formatCurrency(25, currencyCode)} bonus)`);
    }
  };

  const handleCopyReferral = () => {
    triggerHaptic('light');
    navigator.clipboard.writeText(`https://habitbet.app/invite/${safeUser.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDeposit = () => {
    const amt = parseFloat(depositAmount);
    if (amt > 0) {
      triggerHaptic('success');
      fireCashRain();
      onDeposit(amt);
      setShowDepositModal(false);
    }
  };

  const handleConfirmWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (amt > 0 && amt <= safeWalletBalance) {
      triggerHaptic('success');
      onWithdraw(amt);
      setShowWithdrawModal(false);
    } else {
      alert('Insufficient wallet balance!');
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Wallet Balance Hero Card */}
      <div className="glass-card p-6 border border-[#22C55E]/40 bg-gradient-to-br from-[#141A2B] via-[#141A2B] to-[#22C55E]/20 space-y-4">
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Total HabitBet Balance</span>
            {onOpenCurrencySelector && (
              <button
                onClick={() => {
                  triggerHaptic('light');
                  onOpenCurrencySelector();
                }}
                className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#22C55E] border border-emerald-500/30 text-[10px] font-black flex items-center gap-1"
              >
                <span>{currencyConfig.flag}</span>
                <span>{currencyConfig.code}</span>
              </button>
            )}
          </div>
          <div className="p-2 rounded-2xl bg-[#22C55E]/20 text-[#22C55E]">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-white">{formatCurrency(safeWalletBalance, currencyCode)}</h2>
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-300 mt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> Ready for Withdrawal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-300">
              <Lock className="w-3.5 h-3.5" /> {formatCurrency(safeEscrowBalance, currencyCode)} in Active Bets
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              triggerHaptic('medium');
              setShowDepositModal(true);
            }}
            className="py-3 rounded-2xl bg-[#22C55E] text-black font-black text-xs hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-lg"
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('medium');
              setShowWithdrawModal(true);
            }}
            className="py-3 rounded-2xl bg-white/10 text-white font-black text-xs hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-white/20"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw Cash</span>
          </button>
        </div>
      </div>

      {/* Referral & Promo Section */}
      <div className="glass-card p-4 space-y-3 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#00E5FF]" />
            <h3 className="text-xs font-black text-white">Invite Friends ($25 Bonus)</h3>
          </div>
          <button
            onClick={handleCopyReferral}
            className="px-2.5 py-1 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-extrabold flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
        </div>

        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code (e.g. HABIT2026)"
            className="flex-1 glass-input py-2 px-3 text-xs"
          />
          <button type="submit" className="px-3 py-2 rounded-xl bg-[#7C3AED] text-white font-bold text-xs">
            Apply
          </button>
        </form>
        {promoMessage && <p className="text-[10px] text-emerald-400 font-bold">{promoMessage}</p>}
      </div>

      {/* Transaction History */}
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Transaction History</h3>

        <div className="space-y-2">
          {safeTransactions.map((tx) => (
            <div key={tx.id} className="glass-card p-3.5 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-emerald-500/20 text-[#22C55E]' : 'bg-red-500/20 text-[#EF4444]'}`}>
                  {tx.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{tx.note}</h4>
                  <span className="text-[10px] text-gray-400">{tx.date} • {tx.method}</span>
                </div>
              </div>
              <span className={`text-sm font-black ${tx.amount > 0 ? 'text-[#22C55E]' : 'text-gray-300'}`}>
                {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : `${tx.amount.toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-sm w-full space-y-4 border border-[#22C55E]">
            <h3 className="text-base font-black text-white">Deposit Wallet Funds</h3>
            <div>
              <label className="text-xs text-gray-300 font-bold mb-1 block">Deposit Amount ($)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full glass-input py-2.5 px-3 text-lg font-bold"
              />
            </div>
            <div className="text-[11px] text-gray-400 space-y-1">
              <p>Supported Payment Methods:</p>
              <p className="font-bold text-white"> Apple Pay • Google Pay • Visa / Mastercard • Stripe</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeposit}
                className="flex-1 py-2.5 rounded-xl bg-[#22C55E] text-black font-black text-xs"
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-sm w-full space-y-4 border border-white/20">
            <h3 className="text-base font-black text-white">Withdraw to Bank / Crypto</h3>
            <div>
              <label className="text-xs text-gray-300 font-bold mb-1 block">Withdraw Amount ($)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full glass-input py-2.5 px-3 text-lg font-bold"
              />
            </div>
            <p className="text-[10px] text-gray-400">Instant payout to linked Apple Pay or Bank account.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdraw}
                className="flex-1 py-2.5 rounded-xl bg-[#7C3AED] text-white font-black text-xs"
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
