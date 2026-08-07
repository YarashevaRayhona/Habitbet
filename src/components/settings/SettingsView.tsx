import React, { useState } from 'react';
import { Settings, Shield, Bell, Volume2, Smartphone, Download, Lock, Check, Moon, Zap, UserCheck } from 'lucide-react';
import { User } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface SettingsViewProps {
  user: User;
  onClose: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onClose }) => {
  const [hapticsEnabled, setHapticsEnabled] = useState(user.hapticFeedback);
  const [soundEnabled, setSoundEnabled] = useState(user.soundEffects);
  const [biometrics, setBiometrics] = useState(user.biometricsEnabled);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExportData = () => {
    triggerHaptic('success');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `habitbet_data_${user.username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Settings Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#00E5FF]" />
          App Preferences & Security
        </h2>
        <button
          onClick={() => {
            triggerHaptic('light');
            onClose();
          }}
          className="text-xs font-black text-[#00E5FF] hover:underline"
        >
          Close
        </button>
      </div>

      {/* Account Info Card */}
      <div className="glass-card p-4 space-y-3 border border-white/10">
        <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Account Credentials</span>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-gray-400">Username</span>
            <span className="font-bold text-white">@{user.username}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-gray-400">Email Address</span>
            <span className="font-bold text-white">yarasheva.rayhona.13@gmail.com</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-400">Timezone</span>
            <span className="font-bold text-[#00E5FF]">{user.timezone}</span>
          </div>
        </div>
      </div>

      {/* Toggles List */}
      <div className="glass-card p-4 space-y-3 border border-white/10">
        <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Preferences & Feedback</span>

        {/* Haptics Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#7C3AED]" />
            <div>
              <p className="text-xs font-bold text-white">Haptic Vibration Feedback</p>
              <p className="text-[10px] text-gray-400">Tactile feel on buttons & wins</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              setHapticsEnabled(!hapticsEnabled);
            }}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              hapticsEnabled ? 'bg-[#7C3AED] justify-end' : 'bg-white/10 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-[#00E5FF]" />
            <div>
              <p className="text-xs font-bold text-white">Sound Effects & Alarms</p>
              <p className="text-[10px] text-gray-400">Anti-Snooze audio & victory fanfare</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              setSoundEnabled(!soundEnabled);
            }}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              soundEnabled ? 'bg-[#00E5FF] justify-end' : 'bg-white/10 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#0B0F19] shadow-md" />
          </button>
        </div>

        {/* Biometrics Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-[#22C55E]" />
            <div>
              <p className="text-xs font-bold text-white">FaceID / Biometric Lock</p>
              <p className="text-[10px] text-gray-400">Require FaceID before withdrawal</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              setBiometrics(!biometrics);
            }}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              biometrics ? 'bg-[#22C55E] justify-end' : 'bg-white/10 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black shadow-md" />
          </button>
        </div>

        {/* Push Notifications Toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-xs font-bold text-white">Real-Time Proof Alerts</p>
              <p className="text-[10px] text-gray-400">Notify when friends nudge or stake</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              setPushNotifs(!pushNotifs);
            }}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              pushNotifs ? 'bg-amber-500 justify-end' : 'bg-white/10 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black shadow-md" />
          </button>
        </div>
      </div>

      {/* Export Data Section */}
      <div className="glass-card p-4 space-y-3 border border-white/10">
        <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Data Privacy & Portability</span>
        <button
          onClick={handleExportData}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
        >
          <Download className="w-4 h-4 text-[#00E5FF]" />
          <span>{exported ? 'Data Exported Successfully!' : 'Export All Habit & Wallet Data (.JSON)'}</span>
        </button>
      </div>
    </div>
  );
};
