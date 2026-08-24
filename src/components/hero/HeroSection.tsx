"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import DateVenueBadge from "./DateVenueBadge";
import PresentedByBanner from "./PresentedByBanner";
import HeroFrameCanvas from "./HeroFrameCanvas";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
  onLoadingProgress?: (progress: number) => void;
}

export default function HeroSection({
  onExploreClick,
  onRegisterClick,
  onLoadingProgress,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check prefers-reduced-motion & screen size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const checkScreen = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkScreen();

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      window.addEventListener("resize", checkScreen);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        window.removeEventListener("resize", checkScreen);
      };
    }
  }, []);

  // Track scroll position across the hero runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  // Sync motion value with canvas scroll progress state
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setCurrentScrollProgress(latest);
  });

  // Desktop typography gentle parallax and fade towards end of runway
  const desktopTextY = useTransform(smoothProgress, [0, 0.7, 1], ["0%", "-4%", "-15%"]);
  const desktopTextOpacity = useTransform(smoothProgress, [0, 0.7, 0.95, 1], [1, 1, 0.6, 0.1]);
  const desktopTextScale = useTransform(smoothProgress, [0, 0.7, 1], [1, 1.02, 0.98]);

  // Mobile typography dynamic on-scroll pop & blur-up parallax
  const mobileTextY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], ["0%", "-3%", "-10%", "-22%"]);
  const mobileTextScale = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [1, 1.04, 0.98, 0.9]);
  const mobileTextBlur = useTransform(smoothProgress, [0, 0.45, 0.8, 1], ["blur(0px)", "blur(0px)", "blur(5px)", "blur(12px)"]);
  const mobileTextOpacity = useTransform(smoothProgress, [0, 0.65, 0.9, 1], [1, 0.95, 0.4, 0]);

  // Mobile background on-scroll blur-up & zoom effect
  const mobileBgBlur = useTransform(smoothProgress, [0, 0.45, 0.9], ["blur(0px)", "blur(6px)", "blur(14px)"]);
  const mobileBgScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const mobileBgOpacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.85, 0.35]);

  // Bottom banner fade out slightly as we scroll down
  const bannerOpacity = useTransform(smoothProgress, [0, 0.6, 0.9, 1], [1, 0.95, 0.5, 0]);
  const bannerY = useTransform(smoothProgress, [0, 0.8, 1], ["0%", "5%", "15%"]);

  // Staggered popping entrance animation variants for mobile text
  const popWordVariants = {
    hidden: { scale: 0.72, opacity: 0, y: 28, filter: "blur(12px)" },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 380,
        damping: 18,
        delay: 0.12 + custom * 0.09,
      },
    }),
  };

  const popBadgeVariants = {
    hidden: { scale: 0.75, opacity: 0, y: -16, filter: "blur(8px)" },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 360,
        damping: 20,
        delay: 0.08,
      },
    },
  };

  const popItemVariants = {
    hidden: { scale: 0.82, opacity: 0, y: 24, filter: "blur(10px)" },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 20,
        delay: 0.45 + custom * 0.1,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isMobile ? "h-[160vh]" : "h-[220vh] sm:h-[260vh]"} bg-slate-900 select-none`}
    >
      {/* Pinned Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-4 sm:pt-8 pb-4 sm:pb-6">
        
        {/* Background Stage Canvas & Ambient Lighting */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={
            prefersReducedMotion
              ? {}
              : isMobile
              ? {
                  filter: mobileBgBlur,
                  scale: mobileBgScale,
                  opacity: mobileBgOpacity,
                }
              : {}
          }
        >
          {/* Hero Frame Canvas: Plays 260 interactive frames on desktop; static poster on mobile */}
          <HeroFrameCanvas
            scrollProgress={prefersReducedMotion ? 0 : currentScrollProgress}
            onLoadingProgress={onLoadingProgress}
            isMobile={isMobile}
            className="w-full h-full"
          />

          {/* Left Gradient Overlay for crisp contrast and readability of hero text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent md:w-3/5 lg:w-1/2 pointer-events-none" />

          {/* Subtle Bottom & Top Vignette Gradients */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent pointer-events-none" />
        </motion.div>

        {/* Main Hero Content Area */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Headlines & Metadata */}
            <motion.div
              className="lg:col-span-7 xl:col-span-6 space-y-3 sm:space-y-4 text-left will-change-transform"
              style={
                prefersReducedMotion
                  ? {}
                  : isMobile
                  ? {
                      y: mobileTextY,
                      opacity: mobileTextOpacity,
                      scale: mobileTextScale,
                      filter: mobileTextBlur,
                      transformOrigin: "top left",
                    }
                  : {
                      y: desktopTextY,
                      opacity: desktopTextOpacity,
                      scale: desktopTextScale,
                      transformOrigin: "top left",
                    }
              }
            >
              {/* Tag Badge with Pop Entrance */}
              <motion.div
                variants={popBadgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-[#003B96] text-xs font-black uppercase tracking-widest border border-blue-200 shadow-xs backdrop-blur-xs active:scale-95 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F26522] animate-pulse" />
                <span>The Flagship Pre-Event of Islamabad</span>
              </motion.div>

              {/* Bold Multi-colored Main Title with Staggered Word Popping */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[76px] font-black tracking-tight leading-[0.95] select-none">
                <motion.span
                  custom={0}
                  variants={popWordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-[#003B96] drop-shadow-xs origin-left will-change-transform"
                >
                  CAPITAL
                </motion.span>
                <motion.span
                  custom={1}
                  variants={popWordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-[#167C38] drop-shadow-xs origin-left will-change-transform"
                >
                  YOUTH EXPO
                </motion.span>
                <motion.span
                  custom={2}
                  variants={popWordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-[#F26522] drop-shadow-xs origin-left will-change-transform"
                >
                  PRE EVENT
                </motion.span>
                <motion.span
                  custom={3}
                  variants={popWordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-[#003B96] drop-shadow-xs origin-left will-change-transform"
                >
                  AT BUIC
                </motion.span>
              </h1>

              {/* Date & Venue Info Badges with Pop Animation */}
              <motion.div
                custom={0}
                variants={popItemVariants}
                initial="hidden"
                animate="visible"
              >
                <DateVenueBadge />
              </motion.div>

              {/* Dual CTA Buttons with Pop Animation */}
              <motion.div
                custom={1}
                variants={popItemVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
              >
                <button
                  onClick={onRegisterClick}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg cursor-pointer active:scale-95"
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
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-slate-800 hover:text-[#003B96] font-bold text-xs sm:text-base group transition-colors cursor-pointer px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full hover:bg-white/80 backdrop-blur-xs active:scale-95"
                >
                  <span>Explore Tracks</span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-300 bg-white/90 flex items-center justify-center group-hover:border-[#003B96] group-hover:bg-[#003B96] group-hover:text-white transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Spacer for 3D Interactive Model Visual on Desktop */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[220px]" />
          </div>
        </div>

        {/* Floating Presented By Sub-Hero Banner */}
        <motion.div
          className="relative z-20 mt-auto pt-2 will-change-transform"
          style={
            prefersReducedMotion
              ? {}
              : {
                  opacity: bannerOpacity,
                  y: bannerY,
                }
          }
        >
          <PresentedByBanner />

          {/* Explore What Awaits You Section Indicator */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-3 pb-1 text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest select-none">
            <span className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-transparent to-[#003B96]" />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#003B96]" />
            <span className="text-slate-900 font-extrabold">EXPLORE WHAT AWAITS YOU</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F26522]" />
            <span className="w-8 sm:w-12 h-[2px] bg-gradient-to-l from-transparent to-[#F26522]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
