import React, { useState } from 'react';
import { X, Sparkles, Check, Filter } from 'lucide-react';
import { PANDA_AVATARS, PandaAvatarOption } from '../../data/pandaAvatars';
import { triggerHaptic } from '../../utils/haptics';

interface PandaAvatarPickerModalProps {
  isOpen: boolean;
  currentAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
  onClose: () => void;
}

export const PandaAvatarPickerModal: React.FC<PandaAvatarPickerModalProps> = ({
  isOpen,
  currentAvatar,
  onSelectAvatar,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['All', 'Wealth & Royal', 'Asian & Cultural', 'Cute & Cozy', 'Warrior & Hero', 'Futuristic & Pro'];

  const filteredPandas = PANDA_AVATARS.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const handleChoose = (panda: PandaAvatarOption) => {
    triggerHaptic('medium');
    setSelectedId(panda.id);
    onSelectAvatar(panda.svgDataUri);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card max-w-xl w-full p-6 space-y-5 border border-[#7C3AED]/40 bg-gradient-to-b from-[#141A2B] via-[#141A2B] to-[#7C3AED]/10 shadow-2xl rounded-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#00E5FF] flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>Choose Cute Panda Avatar</span>
                <span className="text-[10px] bg-[#00E5FF] text-black font-extrabold px-2 py-0.5 rounded-full uppercase">
                  30 Styles
                </span>
              </h2>
              <p className="text-xs text-gray-300">Select your high-stakes Asian Panda mascot style!</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                triggerHaptic('light');
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Avatar Grid (30 pandas) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 pr-1">
          {filteredPandas.map((panda) => {
            const isSelected = currentAvatar === panda.svgDataUri || selectedId === panda.id;
            return (
              <div
                key={panda.id}
                onClick={() => handleChoose(panda)}
                className={`relative group glass-card p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-2 hover:scale-105 ${
                  isSelected
                    ? 'border-[#00E5FF] bg-[#00E5FF]/20 ring-2 ring-[#00E5FF]/50 shadow-xl'
                    : 'border-white/10 bg-[#0B0F19] hover:border-white/30'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00E5FF] text-black flex items-center justify-center z-10 shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                
                <div className="w-16 h-16 rounded-2xl overflow-hidden p-1 bg-white/5 border border-white/10 group-hover:border-[#00E5FF]/50 transition-colors">
                  <img src={panda.svgDataUri} alt={panda.name} className="w-full h-full object-contain" />
                </div>

                <div>
                  <h4 className="text-xs font-black text-white line-clamp-1">{panda.name}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mt-0.5 leading-tight">{panda.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Selected mascot updates instantly across Leaderboard & Social feeds</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
