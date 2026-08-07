import React from 'react';
import { CheckCircle2, Flame, Sparkles } from 'lucide-react';

interface DailyProgressRingProps {
  completedCount?: number;
  totalCount?: number;
  completed?: number;
  total?: number;
}

export const DailyProgressRing: React.FC<DailyProgressRingProps> = ({
  completedCount,
  totalCount,
  completed,
  total,
}) => {
  const actualCompleted = completedCount ?? completed ?? 0;
  const actualTotal = totalCount ?? total ?? 1;
  const safeCompleted = typeof actualCompleted === 'number' && !isNaN(actualCompleted) ? actualCompleted : 0;
  const safeTotal = typeof actualTotal === 'number' && !isNaN(actualTotal) && actualTotal > 0 ? actualTotal : 1;
  const rawPercent = Math.round((safeCompleted / safeTotal) * 100);
  const percent = isNaN(rawPercent) ? 0 : Math.min(100, Math.max(0, rawPercent));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const rawOffset = circumference - (percent / 100) * circumference;
  const strokeDashoffset = isNaN(rawOffset) ? circumference : rawOffset;

  return (
    <div className="glass-card p-4 flex items-center justify-between border border-white/10">
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
          Daily Completion Rate
        </span>
        <h3 className="text-lg font-black text-white">
          {safeCompleted} of {safeTotal} Habits Verified
        </h3>
        <p className="text-xs text-gray-400">
          {percent === 100 ? '🎉 All today\'s bets secured!' : 'Submit remaining proof before deadline.'}
        </p>
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-black text-white">{percent}%</span>
          <span className="text-[9px] text-[#00E5FF] font-bold">DONE</span>
        </div>
      </div>
    </div>
  );
};
