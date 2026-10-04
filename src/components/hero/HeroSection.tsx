"use client";

import Image from "next/image";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import PresentedByBanner from "./PresentedByBanner";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
  onLoadingProgress?: (progress: number) => void;
}

const STUDENT_AVATARS = [
  "/images/members/WhatsApp Image 2026-08-24 at 12.10.43 PM.jpeg",
  "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM.jpeg",
  "/images/members/WhatsApp Image 2026-08-24 at 12.10.45 PM.jpeg",
  "/images/members/WhatsApp Image 2026-08-24 at 12.10.46 PM.jpeg",
];

export default function HeroSection({
  onExploreClick,
  onRegisterClick,
}: HeroSectionProps) {
  return (
    <section className="relative w-full bg-white text-slate-900 overflow-hidden select-none border-b border-slate-200/80">
      
      {/* ================= GEOMETRIC BACKGROUND: WHITE BG WITH BLUE & ORANGE DOTS AND LINES ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Soft Ambient Radial Warmth Tints */}
        <div className="absolute -top-20 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(242,101,34,0.06)_0%,transparent_70%)]" />
        <div className="absolute -bottom-20 right-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(0,59,150,0.05)_0%,transparent_70%)]" />

        {/* SVG Matrix Dot Grids and Geometric Circuit Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Orange Dot Matrix Pattern */}
            <pattern
              id="hero-dots-orange"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.3" fill="#F26522" opacity="0.45" />
            </pattern>

            {/* Blue Dot Matrix Pattern */}
            <pattern
              id="hero-dots-blue"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.3" fill="#003B96" opacity="0.4" />
            </pattern>

            {/* Gradient Masks to smoothly fade out the dot clusters */}
            <radialGradient id="dots-fade-left" cx="0%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="dots-fade-right" cx="100%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Left Orange Dotted Grid */}
          <rect
            x="0"
            y="0"
            width="45%"
            height="100%"
            fill="url(#hero-dots-orange)"
            mask="url(#dots-fade-left-mask)"
            style={{
              maskImage: "radial-gradient(ellipse at 15% 45%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 15% 45%, black 20%, transparent 75%)",
            }}
          />

          {/* Right Blue Dotted Grid */}
          <rect
            x="55%"
            y="0"
            width="45%"
            height="100%"
            fill="url(#hero-dots-blue)"
            style={{
              maskImage: "radial-gradient(ellipse at 85% 55%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 85% 55%, black 20%, transparent 75%)",
            }}
          />

          {/* ================= TECHNICAL GEOMETRIC LINES (Matching Sheryians layout) ================= */}
          
          {/* Top-Left Angular Circuit Line */}
          <path
            d="M -20 120 L 160 120 L 240 200 L 240 380 L 180 440 L 40 440"
            fill="none"
            stroke="#F26522"
            strokeWidth="1.5"
            opacity="0.35"
          />

          {/* Top-Right Angular Circuit Line */}
          <path
            d="M 1940 120 L 1440 120 L 1360 200 L 1360 380 L 1420 440 L 1560 440"
            fill="none"
            stroke="#003B96"
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Diagonal 45-Degree Accents */}
          <line
            x1="120"
            y1="60"
            x2="320"
            y2="260"
            stroke="#003B96"
            strokeWidth="1.2"
            opacity="0.25"
            strokeDasharray="6 6"
          />
          <line
            x1="1480"
            y1="60"
            x2="1280"
            y2="260"
            stroke="#F26522"
            strokeWidth="1.2"
            opacity="0.3"
            strokeDasharray="6 6"
          />

          {/* Subtle Technical Crosshairs (+) at Coordinate Intersections */}
          <g transform="translate(160, 120)" stroke="#F26522" strokeWidth="1.5" opacity="0.6">
            <line x1="-6" y1="0" x2="6" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="6" />
          </g>
          <g transform="translate(240, 200)" stroke="#003B96" strokeWidth="1.5" opacity="0.5">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(1440, 120)" stroke="#003B96" strokeWidth="1.5" opacity="0.6">
            <line x1="-6" y1="0" x2="6" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="6" />
          </g>
          <g transform="translate(1360, 200)" stroke="#F26522" strokeWidth="1.5" opacity="0.6">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>

          {/* Small Crosshairs Near the Bottom */}
          <g transform="translate(280, 520)" stroke="#003B96" strokeWidth="1.2" opacity="0.4">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(1320, 520)" stroke="#F26522" strokeWidth="1.2" opacity="0.4">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
        </svg>
      </div>

      {/* ================= MAIN HERO CONTENT (SHERYIANS REFERENCE LAYOUT) ================= */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-center text-center">
        
        {/* 1. Top Eyebrow Tag */}
        <div className="mb-5 sm:mb-6">
          <span className="text-[#F26522] font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.28em] inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-ping" />
            ENGAGE. ENCOURAGE. EMPOWER.
          </span>
        </div>

        {/* 2. Main Headline with Bounding Corner Box around Highlighted Word */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-slate-950 tracking-tight leading-[1.06] max-w-5xl mx-auto font-display mb-6">
          Become The Next Champion That{" "}
          <span className="relative inline-block px-3 sm:px-5 py-0.5 mx-1 text-slate-950 border-2 border-[#F26522] rounded-md bg-orange-50/60 shadow-xs">
            Pakistan
            {/* 4 Corner Anchor Handles (Signature Detail from Reference Screenshot) */}
            <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-[#F26522] rounded-xs" />
            <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-[#F26522] rounded-xs" />
            <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-[#F26522] rounded-xs" />
            <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-[#F26522] rounded-xs" />
          </span>{" "}
          Is Waiting For!
        </h1>

        {/* 3. Subtitle Paragraph */}
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-7">
          Join a growing community of collegiate innovators, gamers, and orators preparing for real-world excellence at Capital Youth Expo (BUIC • 1st Oct 2026).
        </p>

        {/* 4. Social Proof / Student Avatars Row (Exact match to Sheryians reference) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex -space-x-2.5 overflow-hidden p-0.5">
            {STUDENT_AVATARS.map((src, index) => (
              <div
                key={index}
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white overflow-hidden shadow-xs"
              >
                <Image
                  src={src}
                  alt={`Student Ambassador ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <span className="text-xs sm:text-sm text-slate-700 font-semibold font-sans">
            <strong className="text-[#F26522] font-black">80,000+</strong> Students learning & competing across 40+ universities
          </span>
        </div>

        {/* 5. Primary Action Button ("Start Journey →" Style) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
          <button
            onClick={onRegisterClick}
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-2xl sm:rounded-full text-sm sm:text-base font-black text-white bg-gradient-to-r from-[#F26522] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] hover:scale-105 active:scale-98 transition-all duration-300 shadow-xl shadow-orange-500/25 cursor-pointer"
          >
            <span>Start Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#003B96] hover:text-[#003B96] active:scale-98 transition-all duration-300 shadow-xs cursor-pointer"
          >
            <span>Explore 9 Tracks</span>
          </button>
        </div>

        {/* 6. Presented By Banner */}
        <div className="w-full max-w-4xl mx-auto pt-2 border-t border-slate-100">
          <PresentedByBanner />
        </div>

      </div>
    </section>
  );
}
