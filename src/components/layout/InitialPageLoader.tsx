"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function InitialPageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing CYE Platform...");

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
        setStatusText("Finalizing AI Engine & Schedule...");
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
            scale: 1.03,
            filter: "blur(12px)",
            transition: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gradient-to-b from-[#00173d] via-[#00112c] to-[#010814] text-white select-none overflow-hidden"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#003B96]/35 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#167C38]/30 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F26522]/20 blur-[140px] pointer-events-none" />

          {/* Sublte Grid Lattice Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Center Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full px-6 text-center"
          >
            {/* Glowing Logo Badge with Orbiting Pulse Ring */}
            <div className="relative mb-6">
              {/* Outer Pulsing Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#003B96] via-[#F26522] to-[#167C38] blur-lg opacity-60"
              />

              {/* Logo Frame */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900/90 border border-white/20 p-3 shadow-2xl backdrop-blur-xl flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo-removebg-preview 8.png"
                    alt="Capital Youth Expo 2026"
                    fill
                    priority
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Brand Titles */}
            <div className="space-y-1 mb-6">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-display">
                CAPITAL YOUTH EXPO
              </h1>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#167C38] uppercase">
                PRE EVENT AT BUIC • 2026
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2.5">
              <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/15 backdrop-blur-md">
                {/* Active Progress Fill */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#003B96] via-[#F26522] to-[#167C38] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                >
                  {/* Shimmering highlight head */}
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/60 blur-xs rounded-full" />
                </motion.div>
              </div>

              {/* Percentage & Dynamic Status Row */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522] animate-spin" />
                  <span className="font-sans font-medium text-[11px] text-slate-300 truncate max-w-[200px] sm:max-w-[260px] text-left">
                    {statusText}
                  </span>
                </div>
                <span className="text-[#F26522] font-black">{progress}%</span>
              </div>
            </div>

            {/* Presenter Footer Tag */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              <span>Presented by Al Nakhla &amp; Youth Insight</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
