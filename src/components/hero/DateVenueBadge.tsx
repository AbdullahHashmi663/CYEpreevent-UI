"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Flame } from "lucide-react";

export default function DateVenueBadge() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target event date: 1st October 2026 09:00 AM PST
    const eventDate = new Date("2026-10-01T09:00:00+05:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 sm:space-y-4 my-4 sm:my-8 max-w-full">
      {/* Date & Venue Cards */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        {/* Date Card */}
        <div className="glass-card flex items-center gap-3 sm:gap-3.5 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200/80 bg-white/95 group w-full sm:w-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#003B96]/10 text-[#003B96] group-hover:bg-[#003B96] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              1st October 2026
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-[#167C38] tracking-wider uppercase mt-0.5">
              THURSDAY • FULL DAY EXPO
            </span>
          </div>
        </div>

        {/* Venue Card */}
        <div className="glass-card flex items-center gap-3 sm:gap-3.5 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200/80 bg-white/95 group w-full sm:w-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F26522]/10 text-[#F26522] group-hover:bg-[#F26522] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
              Bahria University (BUIC)
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-tight mt-0.5 truncate">
              Shangrilla Rd, Sector E-8, Islamabad
            </span>
          </div>
        </div>
      </div>

      {/* Live Event Countdown Ticker */}
      <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#002257] text-white shadow-lg border border-slate-700/50 max-w-full">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase text-[#F26522] tracking-wider pr-2 border-r border-slate-700">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F26522] animate-bounce" />
          <span>Countdown</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black tracking-tight font-mono">
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-extrabold text-white">{timeLeft.days}</span>
            <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 -mt-0.5">DAYS</span>
          </div>
          <span className="text-slate-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-extrabold text-white">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 -mt-0.5">HRS</span>
          </div>
          <span className="text-slate-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-extrabold text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 -mt-0.5">MIN</span>
          </div>
          <span className="text-slate-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-extrabold text-[#F26522]">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 -mt-0.5">SEC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
