import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

export const WeeklyChart: React.FC = () => {
  const weekData = [
    { day: 'Mon', count: 3, earnings: 40, success: 100 },
    { day: 'Tue', count: 3, earnings: 35, success: 100 },
    { day: 'Wed', count: 2, earnings: 25, success: 80 },
    { day: 'Thu', count: 4, earnings: 60, success: 100 },
    { day: 'Fri', count: 3, earnings: 45, success: 100 },
    { day: 'Sat', count: 4, earnings: 80, success: 100 },
    { day: 'Sun', count: 3, earnings: 50, success: 90 }
  ];

  const maxVal = 80;

  return (
    <div className="glass-card p-4 space-y-3 border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
            7-Day Performance
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Weekly Payout Velocity</span>
            <span className="text-xs text-[#22C55E] font-extrabold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +$335
            </span>
          </h3>
        </div>
        <div className="text-xs text-gray-400 font-medium flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-xl">
          <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>This Week</span>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="pt-2 flex items-end justify-between gap-2 h-28">
        {weekData.map((item) => {
          const barHeight = Math.round((item.earnings / maxVal) * 100);
          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
              <div className="text-[10px] font-bold text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                ${item.earnings}
              </div>
              <div className="w-full bg-white/10 rounded-xl overflow-hidden flex items-end h-20 p-0.5">
                <div
                  style={{ height: `${barHeight}%` }}
                  className="w-full rounded-lg bg-gradient-to-t from-[#7C3AED] to-[#00E5FF] group-hover:from-[#00E5FF] group-hover:to-[#22C55E] transition-all duration-500"
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
