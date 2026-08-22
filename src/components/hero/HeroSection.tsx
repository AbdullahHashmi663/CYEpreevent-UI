"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import DateVenueBadge from "./DateVenueBadge";
import PresentedByBanner from "./PresentedByBanner";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
}

export default function HeroSection({ onExploreClick, onRegisterClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll position across the hero section (finishes higher up)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "70% start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Background image on-scroll zoom, blur, and parallax (completes earlier/higher)
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const bgBlur = useTransform(smoothProgress, [0, 0.85, 1], ["blur(0px)", "blur(14px)", "blur(16px)"]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.7, 1], [0.95, 0.65, 0.3]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "14%"]);

  // Hero typography on-scroll scale and parallax lift (finishes higher up)
  const textScale = useTransform(smoothProgress, [0, 1], [1, 1.16]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.8, 0.35]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-50 pt-6 sm:pt-10 pb-8 select-none"
    >
      {/* Background Graphic Image with On-Scroll Zoom & Blur */}
      <motion.div
        className="absolute inset-0 z-0 select-none will-change-transform pointer-events-none"
        style={{
          scale: bgScale,
          filter: bgBlur,
          opacity: bgOpacity,
          y: bgY,
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/images/IMG BG.png"
          alt="Capital Youth Expo Background"
          fill
          className="object-cover object-right-top md:object-center"
          priority
          quality={95}
        />
        {/* Subtle left gradient overlay for high contrast on light mode text */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent md:w-3/4 pointer-events-none" />
      </motion.div>

      {/* Main Content Area with On-Scroll Text Scaling */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Headlines & Metadata (Scales up slightly on scroll) */}
          <motion.div
            className="lg:col-span-7 xl:col-span-6 space-y-4 text-left will-change-transform"
            style={{
              scale: textScale,
              y: textY,
              opacity: textOpacity,
              transformOrigin: "top left",
            }}
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-[#003B96] text-xs font-black uppercase tracking-widest border border-blue-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
              <span>The Flagship Pre-Event of Islamabad</span>
            </div>

            {/* Bold Multi-colored Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tight leading-[0.95] select-none">
              <span className="block text-[#003B96] drop-shadow-xs">CAPITAL</span>
              <span className="block text-[#167C38] drop-shadow-xs">YOUTH EXPO</span>
              <span className="block text-[#F26522] drop-shadow-xs">PRE EVENT</span>
              <span className="block text-[#003B96] drop-shadow-xs">AT BUIC</span>
            </h1>

            {/* Date & Venue Info Badges with Live Countdown */}
            <DateVenueBadge />

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Register for Competitions</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#explore"
                onClick={(e) => {
                  if (onExploreClick) {
                    e.preventDefault();
                    onExploreClick();
                  }
                }}
                className="inline-flex items-center gap-3 text-slate-700 hover:text-[#003B96] font-bold text-sm sm:text-base group transition-colors cursor-pointer px-4 py-3 rounded-full hover:bg-white/80"
              >
                <span>Explore Tracks</span>
                <div className="w-9 h-9 rounded-full border border-slate-300 bg-white/90 flex items-center justify-center group-hover:border-[#003B96] group-hover:bg-[#003B96] group-hover:text-white transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Spacer for 3D Graphic */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[220px]" />
        </div>
      </div>

      {/* Floating Presented By Sub-Hero Banner */}
      <div className="relative z-20 mt-[40px] sm:mt-[60px]">
        <PresentedByBanner />

        {/* Explore What Awaits You Section Indicator */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-2 text-xs font-black text-slate-600 uppercase tracking-widest select-none">
          <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#003B96]" />
          <span className="w-2 h-2 rounded-full bg-[#003B96]" />
          <span className="text-slate-900 font-extrabold">EXPLORE WHAT AWAITS YOU</span>
          <span className="w-2 h-2 rounded-full bg-[#F26522]" />
          <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#F26522]" />
        </div>
      </div>
    </section>
  );
}

