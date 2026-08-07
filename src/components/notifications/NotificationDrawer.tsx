import React from 'react';
import { X, Bell, DollarSign, Flame, Award, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: '🏆 $140 Payout Received!',
      body: 'You completed 5 AM Miracle Wake Up. 3 opponents failed and their $140 pot was transferred to your wallet.',
      time: '10m ago',
      type: 'money',
      unread: true
    },
    {
      id: 'n2',
      title: '🔥 Friend Failed Habit',
      body: '@elena_crypto failed today\'s wake-up challenge. Her $50 stake rolled over to survivors.',
      time: '1h ago',
      type: 'social',
      unread: true
    },
    {
      id: 'n3',
      title: '⏰ Smart Alarm Reminder',
      body: 'Tomorrow 05:00 AM Miracle Club alarm is set. Stake at risk: $50.',
      time: '3h ago',
      type: 'alarm',
      unread: false
    },
    {
      id: 'n4',
      title: '🎖️ Badge Unlocked: Money Maker',
      body: 'Congratulations! You unlocked the Money Maker badge for surpassing $2,000 total earnings.',
      time: '1d ago',
      type: 'achievement',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-end p-4 animate-fadeIn">
      <div className="glass-card max-w-sm w-full p-5 space-y-4 border border-[#7C3AED]/40 shadow-2xl h-[85vh] flex flex-col my-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-base font-black text-white">Notifications</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-white/10 text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => triggerHaptic('light')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                n.unread
                  ? 'bg-[#7C3AED]/20 border-[#7C3AED] shadow-md'
                  : 'bg-[#141A2B] border-white/10 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{n.title}</span>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{n.body}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            triggerHaptic('light');
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-white/10 text-gray-300 hover:text-white text-xs font-bold"
        >
          Mark All Read
        </button>
      </div>
    </div>
  );
};
