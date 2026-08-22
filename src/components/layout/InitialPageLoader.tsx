"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Compass, Zap } from "lucide-react";

export default function InitialPageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing CYE 2026 Experience...");

  useEffect(() => {
    // Lock scroll during initial load
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let windowLoaded = false;

    // Check if the page and all resources are completely loaded
    const handleWindowLoad = () => {
      windowLoaded = true;
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        windowLoaded = true;
      } else {
        window.addEventListener("load", handleWindowLoad);
      }
    }

    const interval = setInterval(() => {
      // Natural progression simulation with easing
      if (currentProgress < 35) {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        setStatusText("Loading Arenas & Competitions...");
      } else if (currentProgress < 70) {
        currentProgress += Math.floor(Math.random() * 6) + 3;
        setStatusText("Configuring Visuals & Interactive Assets...");
      } else if (currentProgress < 90) {
        currentProgress += Math.floor(Math.random() * 4) + 2;
        setStatusText("Finalizing AI Assistant & Schedule...");
      } else if (currentProgress < 99) {
        // Wait for true window load before finishing to 100
        if (windowLoaded) {
          currentProgress += 3;
        } else {
          currentProgress = Math.min(98, currentProgress + 0.5);
        }
        setStatusText("Welcome to Capital Youth Expo 2026");
      } else {
        currentProgress = 100;
        setStatusText("Experience Ready!");
        clearInterval(interval);

        // Allow smooth completion viewing before curtain lift
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 400);
      }

      setProgress(Math.min(100, Math.floor(currentProgress)));
    }, 45);

    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleWindowLoad);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="cye-initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(14px)",
            transition: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-900 select-none overflow-hidden"
        >
          {/* Ambient Lighting Glows: White, Blue, Orange, Green */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#003B96]/15 blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#167C38]/15 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#F26522]/10 rounded-full blur-[150px] pointer-events-none" />

          {/* Sublte Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 59, 150, 0.12) 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Center Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full px-5 sm:px-6 text-center"
          >
            {/* White Glassmorphic Frame */}
            <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,59,150,0.12),0_10px_25px_-5px_rgba(242,101,34,0.08)] border border-slate-200/90 backdrop-blur-2xl">
              
              {/* Glowing Logo Badge with Orbiting Tri-Color Ring */}
              <div className="relative mb-5 flex justify-center">
                {/* Multi-Color Outer Pulse Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.5, 0.85, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-[#003B96] via-[#F26522] via-[#167C38] to-[#003B96] blur-md opacity-70"
                />

                {/* White Logo Container */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white border border-slate-200 p-2.5 shadow-md flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/logo-removebg-preview 8.png"
                      alt="Capital Youth Expo 2026"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Tri-Color Action Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#003B96] border border-blue-200/80 font-black text-[10px] sm:text-[11px] tracking-wide uppercase">
                  ENGAGE.
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#F26522] border border-orange-200/80 font-black text-[10px] sm:text-[11px] tracking-wide uppercase">
                  ENCOURAGE.
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#167C38] border border-emerald-200/80 font-black text-[10px] sm:text-[11px] tracking-wide uppercase">
                  EMPOWER.
                </span>
              </div>

              {/* Brand Main Title */}
              <div className="space-y-1 mb-5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#003B96] uppercase font-display leading-tight">
                  CAPITAL <span className="text-[#167C38]">YOUTH EXPO</span>
                </h1>
                <p className="text-[11px] sm:text-xs font-black tracking-wider text-[#F26522] uppercase">
                  PRE EVENT AT BUIC • 1ST OCT 2026
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full space-y-2 pt-1">
                <div className="relative w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 shadow-inner">
                  {/* Active Multi-Color Gradient Fill (Blue -> Orange -> Green) */}
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#003B96] via-[#F26522] to-[#167C38] relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                  >
                    {/* Shimmering White Reflection Head */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 blur-2xs rounded-full" />
                  </motion.div>
                </div>

                {/* Percentage & Dynamic Status Row */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-500 pt-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#F26522] animate-spin flex-shrink-0" />
                    <span className="font-sans font-semibold text-[11px] sm:text-xs text-slate-700 truncate max-w-[190px] sm:max-w-[240px] text-left">
                      {statusText}
                    </span>
                  </div>
                  <span className="text-[#003B96] font-mono font-black text-xs sm:text-sm pl-2 flex-shrink-0">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Presenter Footer Tag */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                <span>Presented by</span>
                <strong className="text-slate-800 font-bold">Al Nakhla</strong>
                <span>&amp;</span>
                <strong className="text-slate-800 font-bold">Youth Insight</strong>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
