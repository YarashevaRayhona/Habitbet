import React from 'react';
import { X, DollarSign, Check, Coins } from 'lucide-react';
import { SUPPORTED_CURRENCIES, CurrencyConfig } from '../../utils/currency';
import { triggerHaptic } from '../../utils/haptics';

interface CurrencySelectorModalProps {
  isOpen: boolean;
  currentCurrency: string;
  onSelectCurrency: (code: string) => void;
  onClose: () => void;
}

export const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
  isOpen,
  currentCurrency,
  onSelectCurrency,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card max-w-md w-full p-5 space-y-4 border border-[#7C3AED]/40 bg-[#141A2B] shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Select Display Currency</h2>
              <p className="text-xs text-gray-400">Asian currencies (UZS, CNY, JPY, KRW) & Global</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency List */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {SUPPORTED_CURRENCIES.map((c) => {
            const isSelected = currentCurrency.toUpperCase() === c.code.toUpperCase();
            return (
              <div
                key={c.code}
                onClick={() => {
                  triggerHaptic('medium');
                  onSelectCurrency(c.code);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-white shadow-md'
                    : 'border-white/10 bg-[#0B0F19] text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h4 className="text-xs font-black flex items-center gap-1.5">
                      <span>{c.name}</span>
                      {c.code === 'UZS' && (
                        <span className="text-[9px] bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 px-1.5 py-0.2 rounded font-black">
                          POPULAR ASIAN
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono">
                      1 USD = {c.rateFromUSD.toLocaleString()} {c.symbol}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#00E5FF]">{c.symbol}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#00E5FF]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
