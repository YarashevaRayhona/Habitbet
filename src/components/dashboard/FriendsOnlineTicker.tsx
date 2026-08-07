import React from 'react';
import { Users, Flame, Plus } from 'lucide-react';
import { Friend } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

import { INITIAL_FRIENDS } from '../../data/mockData';

interface FriendsOnlineTickerProps {
  friends?: Friend[];
  onSelectFriend?: (friend: Friend) => void;
  onInviteFriends?: () => void;
}

export const FriendsOnlineTicker: React.FC<FriendsOnlineTickerProps> = ({
  friends,
  onSelectFriend = (_f: Friend) => {},
  onInviteFriends = () => {},
}) => {
  const safeFriends = friends && friends.length > 0 ? friends : INITIAL_FRIENDS;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
          Friends Online & Competing
        </span>
        <button
          onClick={() => {
            triggerHaptic('light');
            onInviteFriends();
          }}
          className="text-xs font-bold text-[#00E5FF] hover:underline flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Friends</span>
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {safeFriends.map((friend) => (
          <button
            key={friend.id}
            onClick={() => {
              triggerHaptic('light');
              onSelectFriend(friend);
            }}
            className="flex-shrink-0 flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl bg-[#141A2B] border border-white/10 hover:border-[#7C3AED]/50 transition-all text-left group"
          >
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-9 h-9 rounded-xl object-cover"
              />
              {friend.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#141A2B]" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#00E5FF] transition-colors">
                @{friend.username}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-orange-400 font-bold">
                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                {friend.streak}d streak
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
