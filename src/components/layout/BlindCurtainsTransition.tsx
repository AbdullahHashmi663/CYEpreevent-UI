"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CurtainColorTheme {
  name: string;
  gradient: string;
  glow: string;
  accent: string;
  border: string;
}

const CURTAIN_COLORS: CurtainColorTheme[] = [
  {
    name: "Green",
    gradient: "linear-gradient(135deg, #092e14 0%, #167C38 35%, #1fa94c 50%, #167C38 65%, #07220e 100%)",
    glow: "rgba(34, 197, 94, 0.45)",
    accent: "#4ade80",
    border: "rgba(74, 222, 128, 0.35)",
  },
  {
    name: "Blue",
    gradient: "linear-gradient(135deg, #001940 0%, #003B96 35%, #1d6fe6 50%, #003B96 65%, #001230 100%)",
    glow: "rgba(56, 189, 248, 0.45)",
    accent: "#38bdf8",
    border: "rgba(56, 189, 248, 0.35)",
  },
  {
    name: "Orange",
    gradient: "linear-gradient(135deg, #6c2200 0%, #F26522 35%, #ff8342 50%, #F26522 65%, #4f1800 100%)",
    glow: "rgba(249, 115, 22, 0.45)",
    accent: "#fb923c",
    border: "rgba(251, 146, 60, 0.35)",
  },
];

const SLATS_COUNT = 6;

type CurtainPhase = "idle" | "entering" | "covered" | "exiting";

export default function BlindCurtainsTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [colorIndex, setColorIndex] = useState(0);
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const pendingHref = useRef<string | null>(null);
  const currentPathname = useRef(pathname);

  // Keep ref up to date
  useEffect(() => {
    currentPathname.current = pathname;
  }, [pathname]);

  // Handle route change when page loads
  useEffect(() => {
    if (phase === "entering" || phase === "covered") {
      // Small pause to ensure new page DOM is painted behind the curtains
      const timer = setTimeout(() => {
        setPhase("exiting");
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Global link click interceptor for page-to-page navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore modified clicks (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) {
        return;
      }

      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, hash anchors, mailto, tel, downloads
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      // Normalize href target path
      const url = new URL(href, window.location.href);
      const targetPathname = url.pathname;

      // Ignore if clicking on current page
      if (targetPathname === currentPathname.current && url.hash) {
        return;
      }
      if (targetPathname === currentPathname.current && !url.search) {
        return;
      }

      // Intercept navigation
      e.preventDefault();
      e.stopPropagation();

      if (phase !== "idle") return;

      pendingHref.current = href;
      setColorIndex((prev) => (prev + 1) % CURTAIN_COLORS.length);
      setPhase("entering");

      // Once curtain covers screen (~480ms), push router navigation
      setTimeout(() => {
        setPhase("covered");
        if (pendingHref.current) {
          router.push(pendingHref.current);
          pendingHref.current = null;
        }
      }, 500);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [router, phase]);

  const theme = CURTAIN_COLORS[colorIndex];

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col overflow-hidden select-none">
      {/* Slat Blinds Array */}
      {Array.from({ length: SLATS_COUNT }).map((_, i) => {
        const reverseIdx = SLATS_COUNT - 1 - i;
        const isEntering = phase === "entering" || phase === "covered";
        const isExiting = phase === "exiting";

        return (
          <motion.div
            key={i}
            className="relative flex-1 w-full overflow-hidden border-t border-white/20 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)]"
            style={{
              background: theme.gradient,
              transformOrigin: isEntering ? "bottom" : "top",
            }}
            initial={{ scaleY: isEntering ? 0 : 1 }}
            animate={{
              scaleY: isEntering ? 1 : isExiting ? 0 : 1,
            }}
            transition={{
              duration: 0.46,
              ease: [0.22, 1, 0.36, 1],
              delay: isEntering ? reverseIdx * 0.035 : i * 0.035,
            }}
            onAnimationComplete={() => {
              if (isExiting && i === SLATS_COUNT - 1) {
                setPhase("idle");
              }
            }}
          >
            {/* Micro-pattern lattice sheen */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Top specular edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            {/* Bottom depth shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Horizontal reflection line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.08] pointer-events-none" />
          </motion.div>
        );
      })}

      {/* Sweeping Radiant Light Beam across blinds */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: [0, 0.45, 0],
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
        }}
      />

      {/* Luxury Central Glassmorphic Badge Emblem */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{
          opacity: phase === "exiting" ? 0 : 1,
          scale: phase === "exiting" ? 1.05 : 1,
          y: phase === "exiting" ? -15 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          className="relative flex flex-col items-center px-8 py-5 rounded-3xl backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
          style={{
            background: "rgba(10, 15, 26, 0.75)",
            border: `1.5px solid ${theme.border}`,
            boxShadow: `0 0 50px ${theme.glow}, inset 0 0 20px rgba(255,255,255,0.1)`,
          }}
        >
          {/* Internal glow orb */}
          <div
            className="absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-60"
            style={{ background: theme.accent }}
          />

          {/* Logo / Emblem */}
          <div className="relative flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0 drop-shadow-md">
              <Image
                src="/cye-logo.png"
                alt="CYE Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-[0.25em] text-white uppercase drop-shadow-sm font-display">
                CAPITAL YOUTH EXPO
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase font-sans">
                BUIC PRE-EVENT 2026
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
