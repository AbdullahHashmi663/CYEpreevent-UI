"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Users,
  Clock,
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

export default function GlassCompetitionCard({
  comp,
  onRegister,
  index = 0,
}: GlassCompetitionCardProps) {
  const IconComponent = comp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -7, scale: 1.012 }}
      className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 250, 252, 0.85) 50%, rgba(241, 245, 249, 0.92) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        boxShadow:
          "0 15px 35px -10px rgba(0, 59, 150, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
      }}
    >
      {/* Top Specular Glass Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white via-[#003B96]/20 to-transparent pointer-events-none" />

      {/* Dynamic Ambient Corner Spotlight */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#003B96]/10 blur-3xl group-hover:bg-[#F26522]/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#167C38]/10 blur-3xl group-hover:bg-[#003B96]/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 space-y-4">
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-3">
          
          {/* 3D Glass Icon Gem */}
          <div className="relative">
            {/* Ambient Aura Halo */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${comp.color} opacity-30 blur-lg group-hover:opacity-70 group-hover:blur-xl transition-all duration-300`}
            />
            
            {/* Frosted Container */}
            <div className="relative w-13 h-13 rounded-2xl p-3 bg-white/90 backdrop-blur-md border border-white shadow-[0_6px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <IconComponent className="w-6 h-6 text-[#003B96] group-hover:text-[#F26522] transition-colors duration-300 stroke-[2.2]" />
            </div>
          </div>

          {/* Track Category Pill with Pulse Status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-2xs">
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
          <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-2xs flex items-center justify-between text-xs font-semibold text-slate-700">
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
    </motion.div>
  );
}
