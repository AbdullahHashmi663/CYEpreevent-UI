"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Hamza Ali",
    role: "Technical Committee Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.43 PM.jpeg",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Literary Secretariat Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM (1).jpeg",
  },
  {
    id: 3,
    name: "Zaid Ahmed",
    role: "Esports Arena Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM (2).jpeg",
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "Venue & Protocol Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM.jpeg",
  },
  {
    id: 5,
    name: "Bilal Tariq",
    role: "Mobilization & Outreach Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.45 PM.jpeg",
  },
  {
    id: 6,
    name: "Maham Tariq",
    role: "Delegate Services & VIP Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.46 PM (1).jpeg",
  },
  {
    id: 7,
    name: "Usman Farooq",
    role: "Visual Arts & Creative Lead",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.46 PM.jpeg",
  },
  {
    id: 8,
    name: "Zainab Malik",
    role: "Partnerships Envoy",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.47 PM.jpeg",
  },
];

export default function TeamCoverflowMarquee() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = TEAM_MEMBERS.length;
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic movement with duration of exactly 2.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="our-team"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-12 sm:py-16 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 text-center">
        
        {/* Exact Template Header */}
        <div className="space-y-1.5">
          <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase">
            EXECUTIVE BODY <span className="text-slate-300">·</span> <span className="text-[#003B96] font-extrabold">{String(total).padStart(2, "0")} PEOPLE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight font-sans">
            Our Team
          </h2>
        </div>

        {/* 3D Curved Perspective Showcase */}
        <div
          className="relative w-full h-[380px] sm:h-[440px] md:h-[490px] flex items-center justify-center overflow-visible my-2"
          style={{ perspective: 1200 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {TEAM_MEMBERS.map((member, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Render up to 2 cards on each side
            if (absOffset > 2) return null;

            const rotateY = offset * -26;
            const translateX = offset * 220;
            const translateZ = isCenter ? 40 : -120 * absOffset;
            const scale = isCenter ? 1 : Math.max(0.74, 1 - absOffset * 0.14);
            const opacity = isCenter ? 1 : Math.max(0.45, 1 - absOffset * 0.28);
            const zIndex = 30 - absOffset * 5;

            return (
              <div
                key={member.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, filter 0.6s ease",
                }}
                className="absolute w-[240px] sm:w-[280px] md:w-[320px] h-[340px] sm:h-[400px] md:h-[450px] cursor-pointer will-change-transform rounded-[26px] overflow-hidden"
              >
                <div
                  className={`relative w-full h-full rounded-[26px] overflow-hidden bg-slate-900 transition-all duration-500 ${
                    isCenter
                      ? "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] ring-1 ring-white/20"
                      : "shadow-[0_15px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
                  }`}
                >
                  {/* Portrait Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-cover object-top transition-all duration-600 ${
                      isCenter
                        ? "filter-none brightness-100 contrast-100"
                        : "grayscale contrast-110 brightness-85"
                    }`}
                    priority={idx === 0 || idx === 1}
                  />

                  {/* Clean Dark Vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Bottom Text Overlay: Name & Role matching template */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-left space-y-0.5 pointer-events-none">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight font-sans tracking-tight drop-shadow-md">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium font-sans drop-shadow-xs">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle ghosted number under center card */}
        <div className="text-[11px] font-mono font-bold text-slate-300 -mt-2">
          {String(activeIndex + 1).padStart(2, "0")}
        </div>

        {/* Controls Bar matching exact reference layout */}
        <div className="flex flex-col items-center gap-3.5 pt-2">
          {/* Active Index Counter: 05 / 08 */}
          <div className="text-xs sm:text-sm font-mono font-bold tracking-wider">
            <span className="text-[#003B96] font-extrabold text-sm sm:text-base">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-400 mx-1.5 font-normal">/</span>
            <span className="text-slate-600">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Controls: Chevron Left, Dash Bars, Chevron Right */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Team Member"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Progress Dash Lines */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {TEAM_MEMBERS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-[2.5px] rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === dotIdx
                      ? "w-8 sm:w-10 bg-[#003B96] h-[3px]"
                      : "w-5 sm:w-7 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              aria-label="Next Team Member"
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-[#003B96] text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Footer Sub-caption */}
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase font-semibold">
            DRAG <span className="text-slate-300">·</span> SCROLL <span className="text-slate-300">·</span> ARROWS
          </div>
        </div>

      </div>
    </section>
  );
}
