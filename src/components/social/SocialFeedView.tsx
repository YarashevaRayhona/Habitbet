import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Flame, Send, Camera, Image, Mic, CheckCheck, Search, UserPlus, Sparkles } from 'lucide-react';
import { ProofSubmission, Friend, ChatMessage } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

import { INITIAL_FRIENDS, INITIAL_CHAT_MESSAGES, INITIAL_PROOFS } from '../../data/mockData';

interface SocialFeedViewProps {
  proofs?: ProofSubmission[];
  friends?: Friend[];
  chatMessages?: ChatMessage[];
  onSendMessage?: (text: string) => void;
  user?: any;
  onVerifyProof?: (proofId: string, approved: boolean) => void;
}

export const SocialFeedView: React.FC<SocialFeedViewProps> = ({
  proofs = INITIAL_PROOFS as unknown as ProofSubmission[],
  friends = INITIAL_FRIENDS,
  chatMessages = INITIAL_CHAT_MESSAGES,
  onSendMessage = (_text: string) => {},
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'chat' | 'friends'>('feed');
  const [chatInput, setChatInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [localProofs, setLocalProofs] = useState(proofs || []);

  const safeFriends = friends || INITIAL_FRIENDS;
  const safeChatMessages = chatMessages || INITIAL_CHAT_MESSAGES;

  const handleToggleLike = (proofId: string) => {
    triggerHaptic('light');
    setLocalProofs((prev) =>
      (prev || []).map((p) => {
        if (p.id === proofId) {
          const userLiked = !p.userLiked;
          return {
            ...p,
            userLiked,
            likes: userLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    triggerHaptic('medium');
    onSendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Sub Tabs */}
      <div className="flex rounded-2xl bg-[#141A2B] p-1 border border-white/10">
        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveSubTab('feed');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
            activeSubTab === 'feed'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Activity Feed
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveSubTab('chat');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeSubTab === 'chat'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Bet Arena Chat</span>
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveSubTab('friends');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
            activeSubTab === 'friends'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Friends ({safeFriends.length})
        </button>
      </div>

      {/* SUB TAB 1: ACTIVITY FEED */}
      {activeSubTab === 'feed' && (
        <div className="space-y-4">
          {/* Stories Reels Bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {safeFriends.map((f) => (
              <div key={f.id} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#7C3AED] to-[#00E5FF] shadow-lg hover:scale-105 transition-transform">
                  <img src={f.avatar} alt={f.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-[10px] text-gray-300 font-bold truncate max-w-[60px]">{f.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Activity Cards */}
          {(localProofs || []).map((proof) => (
            <div key={proof.id} className="glass-card p-4 space-y-3 border border-white/10">
              {/* User info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={proof.userAvatar} alt={proof.userName} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#7C3AED]/50" />
                  <div>
                    <h3 className="text-xs font-black text-white">{proof.userName}</h3>
                    <span className="text-[10px] text-gray-400">{proof.timestamp} • {proof.challengeTitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#22C55E] text-[10px] font-extrabold border border-emerald-500/30">
                  <Sparkles className="w-3 h-3 text-[#22C55E]" />
                  <span>AI Score {proof.aiConfidenceScore}%</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 h-64 bg-black">
                <img src={proof.image} alt="proof" className="w-full h-full object-cover" />
                {proof.gpsLocation && (
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] text-cyan-300 font-semibold border border-white/10">
                    📍 {proof.gpsLocation}
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-gray-300">
                <button
                  onClick={() => handleToggleLike(proof.id)}
                  className={`flex items-center gap-1.5 font-bold transition-all ${
                    proof.userLiked ? 'text-orange-500 scale-105' : 'hover:text-white'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${proof.userLiked ? 'fill-orange-500 text-orange-500' : ''}`} />
                  <span>{proof.likes} Fires</span>
                </button>

                <div className="flex items-center gap-1.5 font-bold hover:text-white cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  <span>{proof.commentsCount} Comments</span>
                </div>

                <div className="flex items-center gap-1 font-bold hover:text-white cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB TAB 2: LIVE BET ARENA CHAT */}
      {activeSubTab === 'chat' && (
        <div className="glass-card p-4 space-y-4 border border-white/10 flex flex-col h-[65vh]">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {safeChatMessages.map((msg) => {
              const isMe = msg.senderId === 'usr_me';
              return (
                <div key={msg.id} className={`flex items-start gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <img src={msg.senderAvatar} alt={msg.senderName} className="w-7 h-7 rounded-full object-cover mt-1" />
                  <div className={`p-3 rounded-2xl max-w-[75%] text-xs space-y-1 ${
                    isMe ? 'bg-[#7C3AED] text-white' : 'bg-[#141A2B] text-gray-200 border border-white/10'
                  }`}>
                    <div className="flex items-center justify-between gap-2 text-[10px] opacity-75">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing Indicator */}
          <div className="text-[10px] text-gray-400 italic flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
            <span>@sarah_fits is typing...</span>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Talk trash or motivate friends..."
              className="flex-1 glass-input py-2.5 px-3 text-xs"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#7C3AED] text-white hover:bg-purple-600 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SUB TAB 3: FRIENDS LIST */}
      {activeSubTab === 'friends' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search HabitBet users..."
              className="w-full glass-input py-2 pl-9 pr-3 text-xs"
            />
          </div>

          <div className="space-y-2">
            {safeFriends.map((friend) => (
              <div key={friend.id} className="glass-card p-3.5 flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-11 h-11 rounded-2xl object-cover" />
                    {friend.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#141A2B]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white">{friend.name}</h3>
                    <span className="text-[10px] text-gray-400">@{friend.username} • ${friend.totalWon} Won</span>
                    <span className="text-[10px] text-orange-400 font-bold block mt-0.5">{friend.recentAchievement}</span>
                  </div>
                </div>

                <button
                  onClick={() => triggerHaptic('light')}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-[#7C3AED] text-xs font-bold transition-all"
                >
                  Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
