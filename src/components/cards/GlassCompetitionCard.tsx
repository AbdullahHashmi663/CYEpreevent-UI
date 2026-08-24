"use client";

import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Users,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface CompetitionCardData {
  title: string;
  track: string;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  badge: string;
  desc: string;
  team: string;
  prize: string;
  duration?: string;
  glowColor?: string;
}

interface GlassCompetitionCardProps {
  comp: CompetitionCardData;
  onRegister: (title: string) => void;
  index?: number;
}

// Render themed background watermark SVGs based on track and title
function renderThemedWatermark(title: string, track: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("speed") || lowerTitle.includes("code")) {
    return (
      <svg
        className="absolute -right-6 -bottom-6 w-44 h-44 text-[#003B96] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M10 20 L40 50 L10 80 L20 80 L50 50 L20 20 Z M55 75 H85 V85 H55 Z M45 25 H85 V35 H45 Z" />
      </svg>
    );
  }

  if (lowerTitle.includes("hackathon") || track.toLowerCase().includes("tech")) {
    return (
      <svg
        className="absolute -right-6 -bottom-6 w-44 h-44 text-[#F26522] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="6 4" />
        <path d="M50 20 L58 42 L80 42 L62 56 L69 78 L50 64 L31 78 L38 56 L20 42 L42 42 Z" />
      </svg>
    );
  }

  if (lowerTitle.includes("counter-strike") || track.toLowerCase().includes("esports")) {
    return (
      <svg
        className="absolute -right-8 -bottom-8 w-48 h-48 text-[#167C38] opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
      >
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="16" />
        <line x1="50" y1="5" x2="50" y2="30" />
        <line x1="50" y1="70" x2="50" y2="95" />
        <line x1="5" y1="50" x2="30" y2="50" />
        <line x1="70" y1="50" x2="95" y2="50" />
      </svg>
    );
  }

  if (lowerTitle.includes("speech") || lowerTitle.includes("seerah")) {
    return (
      <svg
        className="absolute -right-6 -bottom-6 w-44 h-44 text-[#167C38] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 15 C30 15 15 30 15 50 C15 65 25 78 40 83 L38 92 L52 84 C73 83 85 68 85 50 C85 30 70 15 50 15 Z M35 45 A 5 5 0 1 1 35 55 A 5 5 0 1 1 35 45 Z M50 45 A 5 5 0 1 1 50 55 A 5 5 0 1 1 50 45 Z M65 45 A 5 5 0 1 1 65 55 A 5 5 0 1 1 65 45 Z" />
      </svg>
    );
  }

  if (lowerTitle.includes("essay") || lowerTitle.includes("writing")) {
    return (
      <svg
        className="absolute -right-6 -bottom-6 w-44 h-44 text-[#F26522] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 20 H80 V80 H20 Z M30 35 H70 V42 H30 Z M30 48 H70 V55 H30 Z M30 61 H55 V68 H30 Z" />
      </svg>
    );
  }

  // Arts / Painting default watermark
  return (
    <svg
      className="absolute -right-6 -bottom-6 w-44 h-44 text-[#003B96] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M50 15 C28 15 15 28 15 50 C15 70 28 85 45 85 C50 85 54 81 54 76 C54 73 53 71 51 68 C49 65 48 62 48 58 C48 50 55 44 63 44 H70 C78 44 85 37 85 29 C85 21 70 15 50 15 Z" />
    </svg>
  );
}

export default function GlassCompetitionCard({
  comp,
  onRegister,
  index = 0,
}: GlassCompetitionCardProps) {
  const IconComponent = comp.icon;

  return (
    <div
      className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2.5 shadow-[0_12px_30px_-10px_rgba(0,59,150,0.08),0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-12px_rgba(0,59,150,0.22),0_14px_30px_-8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,59,150,0.15),inset_0_1px_0_rgba(255,255,255,1)] cursor-pointer"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.95) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(226, 232, 240, 0.9)",
      }}
    >
      {/* Themed Background SVG Watermark */}
      {renderThemedWatermark(comp.title, comp.track)}

      {/* Top Specular Glass Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white via-[#003B96]/25 to-transparent pointer-events-none" />

      {/* Dynamic Ambient Corner Spotlight */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#003B96]/10 blur-2xl group-hover:bg-[#F26522]/20 group-hover:scale-130 transition-all duration-500 pointer-events-none opacity-60 group-hover:opacity-100" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#167C38]/10 blur-2xl group-hover:bg-[#003B96]/20 group-hover:scale-130 transition-all duration-500 pointer-events-none opacity-60 group-hover:opacity-100" />

      {/* Main Content Area */}
      <div className="relative z-10 space-y-4">
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Genuinely Transparent 3D Glass Icon Gem */}
          <div className="relative">
            {/* Ambient Aura Halo */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${comp.color} opacity-30 blur-lg group-hover:opacity-75 group-hover:blur-xl transition-all duration-300`}
            />
            
            {/* Frosted Transparent Container */}
            <div className="relative w-13 h-13 rounded-2xl p-3 bg-white/90 backdrop-blur-md border border-white shadow-[0_6px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <IconComponent className="w-6 h-6 text-[#003B96] group-hover:text-[#F26522] transition-colors duration-300 stroke-[2.2]" />
            </div>
          </div>

          {/* Track Category Pill with Pulse Status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#167C38] animate-pulse" />
            <span className="text-[11px] font-mono font-black text-[#003B96] uppercase tracking-wider">
              {comp.track}
            </span>
          </div>
        </div>

        {/* Title & Badge */}
        <div className="pt-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider font-sans">
              {comp.badge}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#003B96] transition-colors duration-300 font-display">
            {comp.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans line-clamp-3">
          {comp.desc}
        </p>

        {/* Glass Metadata Strip */}
        <div className="pt-2">
          <div className="p-3 rounded-2xl bg-white/75 backdrop-blur-md border border-slate-200/60 shadow-2xs flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#003B96]" />
              <span className="text-slate-800 font-bold">{comp.team}</span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-200/60">
              <Trophy className="w-3.5 h-3.5 text-[#F26522]" />
              <span className="font-extrabold text-[11px]">{comp.prize}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Strip */}
      <div className="relative z-10 pt-5 mt-5 border-t border-slate-200/70 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRegister(comp.title);
          }}
          className="flex-1 py-3 px-4 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-[#003B96] via-[#002B70] to-[#002257] hover:from-[#F26522] hover:via-[#EA580C] hover:to-[#C2410C] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-98"
        >
          <span>Register Now</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
        </button>

        <Link
          href="/competitions"
          onClick={(e) => e.stopPropagation()}
          className="py-3 px-4 rounded-2xl text-xs font-bold text-slate-700 bg-white/90 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-[#003B96]/40 hover:text-[#003B96] transition-all duration-200 text-center"
        >
          Rules
        </Link>
      </div>
    </div>
  );
}
