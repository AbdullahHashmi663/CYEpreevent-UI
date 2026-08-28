"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll position when footer enters viewport (completes earlier)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "75% end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // Vertical size expansion completes earlier
  const scaleY = useTransform(smoothProgress, [0, 0.75, 1], [0.88, 1, 1]);

  // Opacity transitions to full clarity earlier
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.7, 1], [0.4, 0.75, 1, 1]);

  // Parallax upward lift completes earlier
  const translateY = useTransform(smoothProgress, [0, 0.75, 1], ["25px", "0px", "0px"]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#083a22] via-[#0b4a2b] to-[#041c0f] select-none pt-4 sm:pt-8"
    >
      <motion.div
        style={{
          scaleY,
          opacity,
          y: translateY,
          transformOrigin: "bottom center",
          width: "100%",
        }}
        className="w-full bg-gradient-to-b from-[#002257] via-[#00173d] to-[#020b18] text-slate-300 border-t border-[#003B96]/50 relative overflow-hidden will-change-transform shadow-[0_-20px_50px_rgba(0,59,150,0.3)]"
      >
        {/* Decorative gradient glow on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#003B96] via-[#F26522] via-[#167C38] to-transparent" />
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,59,150,0.3)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(22,124,56,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* ================= LEFT SIDE GEOMETRIC MATRIX PATTERN ================= */}
        <div
          className="absolute top-0 bottom-0 left-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage: "radial-gradient(ellipse at 0% 50%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 50%, black 25%, transparent 80%)",
          }}
        >
          <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="footer-pattern-left"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-25)"
              >
                <line x1="0" y1="8" x2="16" y2="8" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
                <line x1="24" y1="8" x2="36" y2="8" stroke="#167C38" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M8 24h8M12 20v8" stroke="#003B96" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <path d="M28 24h8M32 20v8" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <circle cx="20" cy="18" r="1.2" fill="#38bdf8" opacity="0.7" />
                <circle cx="4" cy="34" r="1.2" fill="#167C38" opacity="0.8" />
                <circle cx="36" cy="34" r="1.2" fill="#003B96" opacity="0.6" />
                <line x1="18" y1="28" x2="24" y2="38" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-pattern-left)" />
          </svg>
        </div>

        {/* ================= RIGHT SIDE GEOMETRIC MATRIX PATTERN ================= */}
        <div
          className="absolute top-0 bottom-0 right-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage: "radial-gradient(ellipse at 100% 50%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 50%, black 25%, transparent 80%)",
          }}
        >
          <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="footer-pattern-right"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(25)"
              >
                <line x1="0" y1="8" x2="16" y2="8" stroke="#F26522" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <line x1="24" y1="8" x2="36" y2="8" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
                <path d="M8 24h8M12 20v8" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <path d="M28 24h8M32 20v8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <circle cx="20" cy="18" r="1.2" fill="#F26522" opacity="0.8" />
                <circle cx="4" cy="34" r="1.2" fill="#003B96" opacity="0.7" />
                <circle cx="36" cy="34" r="1.2" fill="#ff8342" opacity="0.7" />
                <line x1="18" y1="28" x2="24" y2="38" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-pattern-right)" />
          </svg>
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 relative z-10">
          
          {/* ================= TOP PROMINENT BRAND & SOCIAL ROW ================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center pb-8 border-b border-white/10">
            
            {/* 1. Left: Circular CYE Logo & Title */}
            <div className="md:col-span-5 lg:col-span-4 flex items-center gap-3.5">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-white/10 rounded-full p-1 backdrop-blur-md border border-white/15 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/images/logo-removebg-preview 8.png"
                    alt="Capital Youth Expo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-black text-white tracking-wide uppercase font-display leading-tight">
                    CAPITAL YOUTH EXPO
                  </span>
                  <span className="text-[11px] font-black text-white/90 tracking-widest uppercase font-sans">
                    PRE EVENT AT BUIC
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. Middle: Colored Motto & Taglines */}
            <div className="md:col-span-4 lg:col-span-5 space-y-0.5 text-left">
              <div className="text-xs sm:text-sm font-black tracking-wider uppercase font-display flex flex-wrap items-center gap-1.5">
                <span className="text-[#38bdf8]">ENGAGE.</span>
                <span className="text-[#F26522]">ENCOURAGE.</span>
                <span className="text-[#4ade80]">EMPOWER.</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-tight">
                Empowering youth. Enriching minds.
              </p>
              <p className="text-xs text-slate-400 font-medium leading-tight">
                Building a better tomorrow.
              </p>
            </div>

            {/* 3. Right: Follow Us with Vertical Divider & Circular Social Icons */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-col md:border-l md:border-white/15 md:pl-6 space-y-2">
              <span className="text-xs font-black text-white tracking-wide font-display uppercase">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#003B96] border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#F26522] border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-red-600 border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* ================= COMPACT NAVIGATION LINKS ================= */}
          <div className="py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/competitions" className="hover:text-white transition-colors">
              Competitions
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/ambassadors" className="hover:text-white transition-colors">
              Ambassadors
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/team-about" className="hover:text-white transition-colors">
              Team & Leadership
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/venue" className="hover:text-white transition-colors">
              Venue & Access
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-400 font-medium">
            <div>
              &copy; {new Date().getFullYear()} Capital Youth Expo Pre-Event. All rights reserved.
            </div>

            <div className="flex items-center gap-3 text-xs tracking-wider uppercase">
              <span className="text-slate-400 font-medium">Organized By:</span>
              <span className="font-extrabold text-white font-display">AL NAKHLA</span>
              <span className="text-white/30">|</span>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-white tracking-widest font-display text-[11px] leading-tight">
                  YOUTH INSIGHT
                </span>
                <span className="text-[9px] tracking-[0.25em] text-slate-400 font-bold -mt-0.5">
                  PAKISTAN
                </span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
