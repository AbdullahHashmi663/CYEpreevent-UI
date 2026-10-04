"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Code, Gamepad2, Palette } from "lucide-react";

const TRACK_STEPS = [
  { label: "TECH", icon: Code, color: "#003B96", threshold: 25 },
  { label: "LITERARY", icon: Sparkles, color: "#167C38", threshold: 50 },
  { label: "ESPORTS", icon: Gamepad2, color: "#F26522", threshold: 75 },
  { label: "ARTS", icon: Palette, color: "#003B96", threshold: 95 },
];

export default function InitialPageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Calibrating CYE 2026 Arenas...");
  const realFrameProgressRef = useRef<number>(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let windowLoaded = false;

    const handleWindowLoad = () => {
      windowLoaded = true;
    };

    const handleFrameProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ progress: number }>;
      if (customEvent.detail && typeof customEvent.detail.progress === "number") {
        realFrameProgressRef.current = customEvent.detail.progress;
      }
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        windowLoaded = true;
      } else {
        window.addEventListener("load", handleWindowLoad);
      }
      window.addEventListener("cye-hero-frame-progress", handleFrameProgress);
    }

    const interval = setInterval(() => {
      const realFrameP = realFrameProgressRef.current;

      // Smooth progression tied to keyframe availability
      if (currentProgress < realFrameP) {
        currentProgress = Math.min(realFrameP, currentProgress + 6);
      } else if (currentProgress < 50) {
        currentProgress += Math.floor(Math.random() * 6) + 4;
      } else if (currentProgress < 90) {
        currentProgress += Math.floor(Math.random() * 5) + 3;
      } else {
        // As soon as keyframes are ready (realFrameP >= 60) or window loaded, smoothly complete to 100%
        if (realFrameP >= 60 || windowLoaded) {
          currentProgress = 100;
        } else {
          currentProgress = Math.min(99, currentProgress + 2);
        }
      }

      // Update milestone messages
      if (currentProgress < 30) {
        setStatusMessage("Initializing Technology & 3D Stage Frames...");
      } else if (currentProgress < 60) {
        setStatusMessage("Loading Literary, Speech & Arts Tracks...");
      } else if (currentProgress < 85) {
        setStatusMessage("Preparing CS2 Esports Arena & Keynotes...");
      } else if (currentProgress < 99) {
        setStatusMessage("Connecting to BUIC Islamabad Campus...");
      } else {
        setStatusMessage("Welcome to Capital Youth Expo 2026!");
        clearInterval(interval);

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 400);
      }

      setProgress(Math.min(100, Math.floor(currentProgress)));
    }, 35);

    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleWindowLoad);
        window.removeEventListener("cye-hero-frame-progress", handleFrameProgress);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[999999] select-none pointer-events-auto overflow-hidden">
          {/* Top Left Split Shutter */}
          <motion.div
            key="left-curtain"
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#FFFFFF] border-r border-slate-100 z-10"
          />

          {/* Right Split Shutter */}
          <motion.div
            key="right-curtain"
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#FFFFFF] border-l border-slate-100 z-10"
          />

          {/* Central Main Stage */}
          <motion.div
            key="loader-content"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
              transition: { duration: 0.45, ease: "easeInOut" },
            }}
            className="relative z-20 w-full h-full flex flex-col items-center justify-between py-8 sm:py-12 px-4"
          >
            {/* Top Brand Header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#167C38] animate-ping" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#003B96]">
                Bahria University Islamabad
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] sm:text-xs font-black text-[#F26522] uppercase">
                1st Oct 2026
              </span>
            </motion.div>

            {/* Center Dynamic Kinetic Ring & Logo */}
            <div className="flex flex-col items-center my-auto space-y-6 max-w-sm sm:max-w-md w-full text-center">
              
              {/* Kinetic Multi-Orbital Compass */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                {/* Outer Orbit Ring (Blue) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#003B96]/40"
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#003B96] shadow-[0_0_12px_#003B96]" />
                </motion.div>

                {/* Middle Orbit Arc (Orange) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full border-t-2 border-r-2 border-transparent border-t-[#F26522] border-r-[#F26522] shadow-[0_0_15px_rgba(242,101,34,0.3)]"
                >
                  <div className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-[#F26522]" />
                </motion.div>

                {/* Inner Orbit Arc (Green) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-7 rounded-full border-b-2 border-l-2 border-transparent border-b-[#167C38] border-l-[#167C38]"
                >
                  <div className="absolute bottom-1 left-2 w-2 h-2 rounded-full bg-[#167C38]" />
                </motion.div>

                {/* Central Floating Logo with Ambient Glow */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-[0_15px_35px_-8px_rgba(0,59,150,0.18)] border border-slate-100 p-3 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/logo-removebg-preview 8.png"
                      alt="Capital Youth Expo"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Event Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 font-display">
                  <span className="text-[#003B96]">CAPITAL</span>{" "}
                  <span className="text-[#167C38]">YOUTH</span>{" "}
                  <span className="text-[#F26522]">EXPO</span>
                </h1>
                <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-slate-400">
                  Pre-Event Official Portal
                </p>
              </div>

              {/* Giant Numerical Percentage Counter */}
              <div className="flex items-baseline justify-center font-mono font-black tracking-tight text-slate-900 leading-none">
                <span className="text-4xl sm:text-5xl bg-gradient-to-r from-[#003B96] via-[#F26522] to-[#167C38] bg-clip-text text-transparent">
                  {progress}
                </span>
                <span className="text-xl sm:text-2xl text-[#F26522] ml-1 font-sans font-extrabold">
                  %
                </span>
              </div>

              {/* Liquid Progress Bar */}
              <div className="w-full space-y-2">
                <div className="relative w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-inner">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#003B96] via-[#F26522] to-[#167C38] relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 blur-2xs rounded-full" />
                  </motion.div>
                </div>

                {/* Live Loading Milestone Label */}
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate px-2">
                  {statusMessage}
                </p>
              </div>

              {/* 4 Interactive Track Steppers */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full pt-1">
                {TRACK_STEPS.map((step) => {
                  const Icon = step.icon;
                  const isDone = progress >= step.threshold;

                  return (
                    <div
                      key={step.label}
                      className={`flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl border transition-all duration-300 ${
                        isDone
                          ? "bg-white border-slate-200 shadow-xs scale-102"
                          : "bg-slate-50 border-slate-100 opacity-40"
                      }`}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: isDone ? step.color : "#94a3b8" }}
                      />
                      <span
                        className="text-[9px] font-black uppercase tracking-wider"
                        style={{ color: isDone ? step.color : "#94a3b8" }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Organizer Footer Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider"
            >
              <span>Presented by</span>
              <span className="text-[#003B96] font-black">Al Nakhla</span>
              <span>•</span>
              <span className="text-[#F26522] font-black">Youth Insight</span>
            </motion.div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
