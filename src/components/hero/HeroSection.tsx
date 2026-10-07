"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Trophy, ChevronRight } from "lucide-react";
import DateVenueBadge from "./DateVenueBadge";
import PresentedByBanner from "./PresentedByBanner";
import gsap from "gsap";
import { animate as animeJs } from "animejs";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
}

export default function HeroSection({ onExploreClick, onRegisterClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const verticalBannerRef = useRef<HTMLDivElement>(null);
  const exploreIndicatorRef = useRef<HTMLDivElement>(null);

  // ── Entrance animations on mount ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Vertical orange side banner slides down
    tl.fromTo(
      verticalBannerRef.current,
      { scaleY: 0, transformOrigin: "top center", opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.9 },
      0
    );

    // Tagline with decorative dots fades up
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.35
    );

    // Title lines cascade in
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll("span");
      tl.fromTo(
        lines,
        { opacity: 0, x: -55, skewX: -4 },
        { opacity: 1, x: 0, skewX: 0, stagger: 0.12, duration: 0.75 },
        0.55
      );
    }

    // Badge
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.65 },
      1.1
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current?.children ?? [],
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
      1.35
    );

    // Banner + explore indicator
    tl.fromTo(
      bannerRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.55
    );
    tl.fromTo(
      exploreIndicatorRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5 },
      1.7
    );

    // ── Continuous subtle floating on the whole hero content ──────────────
    gsap.to(titleRef.current, {
      y: "+=8",
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // ── AnimeJS v4: pulsing explore indicator dots ───────────────────────────
    if (exploreIndicatorRef.current) {
      const dots = Array.from(
        exploreIndicatorRef.current.querySelectorAll(".indicator-dot")
      ) as HTMLElement[];
      dots.forEach((dot, i) => {
        animeJs(dot, {
          scale: [1, 1.5, 1],
          opacity: [1, 0.4, 1],
          duration: 1400,
          delay: i * 200,
          loop: true,
          ease: "inOutSine",
        });
      });
    }
  }, []);

  // ── AnimeJS: CTA button micro-wobble on click ─────────────────────────────
  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    animeJs(e.currentTarget, {
      scale: [1, 0.94, 1.04, 1],
      duration: 380,
      ease: "outElastic(1, 0.6)",
    });
    onRegisterClick?.();
  };

  return (
    <section ref={heroRef} className="relative w-full flex-1 flex flex-col justify-between pt-1 sm:pt-2 pb-1 overflow-hidden">

      {/* ==================== CYBER LEFT FLOATING VERTICAL BANNER (BUIC 2026) ==================== */}
      <div
        ref={verticalBannerRef}
        className="absolute left-2 sm:left-3 md:left-4 top-3 sm:top-4 bottom-4 sm:bottom-6 z-20 w-6 sm:w-7 md:w-7.5 bg-gradient-to-b from-[#F26522] via-[#EA580C] to-[#F26522] rounded-full border border-white/20 shadow-[0_6px_20px_rgba(242,101,34,0.35)] flex flex-col justify-between items-center py-4 sm:py-5 select-none pointer-events-none"
      >
        {/* Top Vertical Text */}
        <div className="flex flex-col items-center">
          <span className="[writing-mode:vertical-rl] rotate-180 text-white font-black tracking-[0.25em] text-[9px] sm:text-[10px] md:text-[11px] uppercase drop-shadow-xs">
            BUIC 2026
          </span>
        </div>

        {/* Center Vertical Divider Line */}
        <div className="w-[1.5px] h-8 sm:h-12 bg-white/40 rounded-full" />

        {/* Lower Vertical Text & Geometric Accent Bars */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="[writing-mode:vertical-rl] rotate-180 text-white font-black tracking-[0.25em] text-[9px] sm:text-[10px] md:text-[11px] uppercase drop-shadow-xs">
            BUIC 2026
          </span>

          {/* Geometric Accent Bars at Bottom */}
          <div className="flex items-end gap-1 h-6 sm:h-8 pt-1">
            <div className="w-1 sm:w-1.5 h-5 sm:h-6 bg-white/90 rounded-full shadow-xs" />
            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full pl-12 sm:pl-16 md:pl-20 lg:pl-24 xl:pl-28 pr-4 sm:pr-8 lg:pr-12 xl:pr-16 pt-6 sm:pt-8 md:pt-10 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Hero Headlines & Metadata */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-3.5 sm:space-y-4 text-left">
            {/* Stylized Flagship Pre-Event Tagline */}
            <div ref={taglineRef} className="inline-flex items-center gap-1.5 sm:gap-2 select-none pt-0.5">
              {/* Left Dots + Horizontal Line */}
              <div className="flex items-center gap-1">
                <span className="indicator-dot w-1 h-1 rounded-full bg-[#F26522]" />
                <span className="indicator-dot w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                <span className="w-6 sm:w-10 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              {/* Text */}
              <span className="text-xs sm:text-sm font-black tracking-wider text-[#F26522] uppercase">
                Flagship Pre-event of Islamabad
              </span>

              {/* Right Horizontal Line + Dots */}
              <div className="flex items-center gap-1">
                <span className="w-6 sm:w-10 h-[2px] bg-[#F26522] rounded-full" />
                <span className="indicator-dot w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                <span className="indicator-dot w-1 h-1 rounded-full bg-[#F26522]" />
              </div>
            </div>

            {/* Bold Multi-colored Main Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] font-black tracking-tight leading-[0.95] select-none"
            >
              <span className="block text-[#003B96] drop-shadow-xs">CAPITAL</span>
              <span className="block text-[#167C38] drop-shadow-xs">YOUTH EXPO</span>
              <span className="block text-[#F26522] drop-shadow-xs">PRE EVENT</span>
              <span className="block text-[#003B96] drop-shadow-xs">AT BUIC</span>
            </h1>

            {/* Date & Venue Info Badges with Live Countdown */}
            <div ref={badgeRef}>
              <DateVenueBadge />
            </div>

            {/* Dual CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
              {/* Luminous Blue Aurora Button (Register for Competitions) */}
              <button
                onClick={handleRegisterClick}
                className="relative group inline-flex items-center justify-center rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Compact Ambient Blue Glow - Only Visible on Hover */}
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#003B96] via-[#2563EB] to-[#0284C7] opacity-0 group-hover:opacity-80 blur-md transition-opacity duration-300 pointer-events-none" />

                {/* Inner Aurora Blue Canvas */}
                <span className="relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full overflow-hidden bg-gradient-to-r from-[#003B96] via-[#1D4ED8] to-[#0284C7] text-white flex items-center gap-2 text-xs sm:text-sm font-black shadow-md border border-blue-400/30">
                  {/* Shimmer light sweep on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  {/* Top subtle light reflection */}
                  <span className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  {/* Luminous Bottom Inner Rim Glow */}
                  <span className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px] opacity-80 group-hover:opacity-100 transition-all pointer-events-none" />

                  {/* Button Content */}
                  <Trophy className="w-3.5 h-3.5 text-amber-300 relative z-10" />
                  <span className="relative z-10 tracking-tight">Register for Competitions</span>
                  <ChevronRight className="w-4 h-4 text-white stroke-[3] transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                </span>
              </button>

              {/* Custom Liquid Animated Gradient Border Button */}
              <a
                href="#explore"
                onClick={(e) => {
                  if (onExploreClick) {
                    e.preventDefault();
                    onExploreClick();
                  }
                }}
                className="relative group inline-flex items-center justify-center p-[3.5px] rounded-full overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-md"
              >
                {/* Default Subtle Boundary Layer */}
                <span className="absolute inset-0 rounded-full border border-slate-300 bg-white group-hover:opacity-0 transition-opacity duration-300" />

                {/* Animated Liquid Gradient Rotating Border on Hover */}
                <span className="absolute -inset-[250%] rounded-full bg-cye-liquid animate-liquid-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[0.5px]" />

                {/* Inner White Pill Container */}
                <span className="relative z-10 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors duration-200">
                  <span>Explore Tracks</span>
                  <ChevronRight className="w-4 h-4 text-slate-900 stroke-[3] transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Spacer for 3D Graphic */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[160px]" />
        </div>
      </div>

      {/* Floating Presented By Sub-Hero Banner */}
      <div ref={bannerRef} className="relative z-20 mt-auto pl-10 sm:pl-16 md:pl-20 lg:pl-24 pr-4 sm:pr-8 pb-1">
        <PresentedByBanner />

        {/* Explore What Awaits You Section Indicator */}
        <div
          ref={exploreIndicatorRef}
          className="flex items-center justify-center gap-3 pt-2.5 pb-1 text-[11px] font-black text-slate-600 uppercase tracking-widest select-none"
        >
          <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#003B96]" />
          <span className="indicator-dot w-1.5 h-1.5 rounded-full bg-[#003B96]" />
          <span className="text-slate-900 font-extrabold">EXPLORE WHAT AWAITS YOU</span>
          <span className="indicator-dot w-1.5 h-1.5 rounded-full bg-[#F26522]" />
          <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#F26522]" />
        </div>
      </div>
    </section>
  );
}
