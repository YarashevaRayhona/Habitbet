import React from 'react';
import { X, Bell, DollarSign, Flame, Award, ShieldAlert, Sparkles, CheckCheck } from 'lucide-react';
import { NotificationItem } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'win':
        return <Award className="w-4 h-4 text-emerald-400" />;
      case 'penalty':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'proof_verified':
        return <Sparkles className="w-4 h-4 text-[#00E5FF]" />;
      default:
        return <Bell className="w-4 h-4 text-[#7C3AED]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-end p-4 animate-fadeIn">
      <div className="glass-card max-w-sm w-full p-5 space-y-4 border border-[#7C3AED]/40 shadow-2xl h-[85vh] flex flex-col my-auto rounded-3xl bg-[#141A2B] text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-base font-black text-white">Notifications</h2>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="text-[10px] bg-rose-500 text-white font-black px-2 py-0.5 rounded-full">
                {notifications.filter((n) => !n.read).length} new
              </span>
            )}
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-1 rounded-full bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-xs">
              No notifications yet!
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => triggerHaptic('light')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                  !n.read
                    ? 'bg-[#7C3AED]/20 border-[#7C3AED] shadow-md'
                    : 'bg-[#0B0F19] border-white/10 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(n.type)}
                    <span className="text-xs font-black text-white">{n.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pl-6">{n.message}</p>
              </div>
            ))
          )}
        </div>

        {notifications.some((n) => !n.read) && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              onMarkAllRead();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-98 transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>
    </div>
  );
};
