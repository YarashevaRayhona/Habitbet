import React, { useState, useEffect } from 'react';
import { X, Smartphone, Github, Download, Check, ExternalLink, ShieldCheck, Zap, Copy } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'pwa' | 'github' | 'cmd'>('pwa');

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    triggerHaptic('medium');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("📱 To install on Android without Play Store $25 fee:\n1. Open this page in Chrome on Android\n2. Tap the ⋮ menu in top right\n3. Select 'Add to Home screen' or 'Install App'!\n\nIt will install directly as an Android App!");
    }
  };

  const copyBuildCommand = () => {
    triggerHaptic('light');
    const cmd = "npm i @capacitor/core @capacitor/cli @capacitor/android && npx cap add android && npx cap sync && cd android && ./gradlew assembleDebug";
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card max-w-lg w-full p-5 space-y-4 border border-[#00E5FF]/40 bg-[#141A2B] shadow-2xl rounded-3xl text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#141A2B] rounded-[14px] flex items-center justify-center text-emerald-400">
                <Smartphone className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-black flex items-center gap-1.5">
                <span>Download Android APK</span>
                <span className="text-[9px] bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono font-black">
                  FREE $0
                </span>
              </h2>
              <p className="text-xs text-gray-400">No $25 Play Store Fee required!</p>
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

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#0B0F19] border border-white/10 text-xs font-bold">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('pwa');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'pwa'
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            1-Tap Install
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('github');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'github'
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            GitHub Auto APK
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('cmd');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'cmd'
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Capacitor Build
          </button>
        </div>

        {/* Tab 1: Instant PWA / App Install */}
        {activeTab === 'pwa' && (
          <div className="space-y-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <Zap className="w-4 h-4" />
                <span>Instant Mobile APK / App Web Container</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Install HabitBet directly on your Android phone screen without downloading from Google Play Store or paying any developer fees.
              </p>
            </div>

            <button
              onClick={handleInstallPWA}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#00E5FF] text-[#0B0F19] font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isInstalled ? 'App Already Installed!' : 'Install HabitBet App on Phone'}</span>
            </button>

            <div className="space-y-2 text-xs text-gray-400 bg-[#0B0F19] p-3.5 rounded-2xl border border-white/5">
              <h4 className="font-bold text-gray-200">How to install manually on Android Chrome:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Tap Chrome menu <span className="text-white font-mono font-bold">⋮</span> (top right corner).</li>
                <li>Tap <span className="text-emerald-400 font-bold">"Add to Home screen"</span> or <span className="text-emerald-400 font-bold">"Install App"</span>.</li>
                <li>Launch HabitBet as a fullscreen Android App with full offline & camera support!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 2: GitHub Free APK Workflow */}
        {activeTab === 'github' && (
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#0B0F19] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#00E5FF] font-black">
                <Github className="w-4 h-4" />
                <span>Automatic GitHub Actions APK Workflow Configured!</span>
              </div>
              <p className="text-gray-300">
                We have added <code className="text-emerald-400 font-mono bg-white/10 px-1 py-0.5 rounded">.github/workflows/build-apk.yml</code> to this project!
              </p>
            </div>

            <div className="space-y-2 text-xs text-gray-300 space-y-1.5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-black text-[10px] shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-white">Export code to GitHub</h4>
                  <p className="text-gray-400 text-[11px]">Click Settings (top right) ➔ "Export to GitHub" or download ZIP.</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-black text-[10px] shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-white">Automated APK Compilation</h4>
                  <p className="text-gray-400 text-[11px]">GitHub Actions automatically builds <code className="text-emerald-400 font-mono">HabitBet-Android-APK.apk</code> in your repo's Actions / Releases tab!</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-black text-[10px] shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-white">Download & Install directly</h4>
                  <p className="text-gray-400 text-[11px]">Download <code className="text-emerald-400 font-mono">app-debug.apk</code> from GitHub Actions artifacts directly to any Android device for free!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Local Capacitor Commands */}
        {activeTab === 'cmd' && (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-gray-300">
              Build the raw Android <code className="text-emerald-400 font-mono">.apk</code> on your computer using Capacitor:
            </p>

            <div className="p-3.5 rounded-2xl bg-[#0B0F19] border border-white/10 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="font-mono font-bold text-emerald-400">Terminal Build Commands</span>
                <button
                  onClick={copyBuildCommand}
                  className="flex items-center gap-1 text-[#00E5FF] hover:underline text-[11px]"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Copied!' : 'Copy Command'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-gray-200 bg-black/50 p-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap border border-white/5">
                npm i @capacitor/core @capacitor/cli @capacitor/android{"\n"}
                npx cap add android{"\n"}
                npx cap sync android{"\n"}
                cd android && ./gradlew assembleDebug
              </pre>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Output path: <code className="font-mono font-bold text-white">android/app/build/outputs/apk/debug/app-debug.apk</code></span>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-[11px] text-gray-400">
            🐼 HabitBet Android App Edition • 100% Free & Open Source
          </p>
        </div>
      </div>
    </div>
  );
};
