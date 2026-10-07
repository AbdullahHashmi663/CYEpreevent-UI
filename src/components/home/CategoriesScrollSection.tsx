"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate as animeJs } from "animejs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ThemeColor = "orange" | "blue" | "green" | "white";

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  track: string;
  theme: ThemeColor;
  accentHover: string;
  activeBadge: string;
  sparkleColor: string;
  glowShadow: string;
  iconTextColor: string;
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "01",
    name: "SPEED PROGRAMMING",
    subtitle: "Algorithmic & Problem Solving Arena",
    track: "Technology",
    theme: "blue",
    accentHover: "group-hover:text-blue-300",
    activeBadge: "bg-[#003B96] text-white shadow-lg shadow-[#003B96]/50 border border-blue-400/30",
    sparkleColor: "text-blue-400",
    glowShadow: "drop-shadow-[0_0_35px_rgba(0,59,150,0.65)]",
    iconTextColor: "text-[#003B96]",
  },
  {
    id: "02",
    name: "MINI HACKATHON",
    subtitle: "Rapid MVP Sprint & Product Pitch",
    track: "Technology",
    theme: "orange",
    accentHover: "group-hover:text-orange-300",
    activeBadge: "bg-[#F26522] text-white shadow-lg shadow-[#F26522]/50 border border-orange-400/30",
    sparkleColor: "text-[#F26522]",
    glowShadow: "drop-shadow-[0_0_35px_rgba(242,101,34,0.5)]",
    iconTextColor: "text-[#F26522]",
  },
  {
    id: "03",
    name: "COUNTER-STRIKE 2",
    subtitle: "5v5 Knockout Tactical Esports",
    track: "Esports",
    theme: "green",
    accentHover: "group-hover:text-emerald-300",
    activeBadge: "bg-[#167C38] text-white shadow-lg shadow-[#167C38]/50 border border-emerald-400/30",
    sparkleColor: "text-emerald-400",
    glowShadow: "drop-shadow-[0_0_35px_rgba(22,124,56,0.6)]",
    iconTextColor: "text-[#167C38]",
  },
  {
    id: "04",
    name: "SPEECH COMPETITION",
    subtitle: "English & Urdu Oratorical Mastery",
    track: "Literary",
    theme: "white",
    accentHover: "group-hover:text-slate-100",
    activeBadge: "bg-white text-slate-950 shadow-lg shadow-white/40 border border-white/60 font-black",
    sparkleColor: "text-white",
    glowShadow: "drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]",
    iconTextColor: "text-slate-950",
  },
  {
    id: "05",
    name: "SEERAH QUIZ",
    subtitle: "Islamic History & Live Buzzer Rounds",
    track: "Literary",
    theme: "green",
    accentHover: "group-hover:text-emerald-300",
    activeBadge: "bg-[#167C38] text-white shadow-lg shadow-[#167C38]/50 border border-emerald-400/30",
    sparkleColor: "text-emerald-400",
    glowShadow: "drop-shadow-[0_0_35px_rgba(22,124,56,0.6)]",
    iconTextColor: "text-[#167C38]",
  },
  {
    id: "06",
    name: "ESSAY & SHORT STORY",
    subtitle: "Critical Synthesis & Fiction Writing",
    track: "Literary",
    theme: "orange",
    accentHover: "group-hover:text-orange-300",
    activeBadge: "bg-[#F26522] text-white shadow-lg shadow-[#F26522]/50 border border-orange-400/30",
    sparkleColor: "text-[#F26522]",
    glowShadow: "drop-shadow-[0_0_35px_rgba(242,101,34,0.5)]",
    iconTextColor: "text-[#F26522]",
  },
  {
    id: "07",
    name: "PAINTING & VISUAL ARTS",
    subtitle: "Live Canvas Studio & Exhibition",
    track: "Fine Art",
    theme: "blue",
    accentHover: "group-hover:text-blue-300",
    activeBadge: "bg-[#003B96] text-white shadow-lg shadow-[#003B96]/50 border border-blue-400/30",
    sparkleColor: "text-blue-400",
    glowShadow: "drop-shadow-[0_0_35px_rgba(0,59,150,0.65)]",
    iconTextColor: "text-[#003B96]",
  },
  {
    id: "08",
    name: "CYE NEXUS CONFERENCES",
    subtitle: "Keynotes, Panel Debates & Tech Summits",
    track: "Conferences",
    theme: "green",
    accentHover: "group-hover:text-emerald-300",
    activeBadge: "bg-[#167C38] text-white shadow-lg shadow-[#167C38]/50 border border-emerald-400/30",
    sparkleColor: "text-emerald-400",
    glowShadow: "drop-shadow-[0_0_35px_rgba(22,124,56,0.6)]",
    iconTextColor: "text-[#167C38]",
  },
  {
    id: "09",
    name: "CAREER PRO TALKS",
    subtitle: "Founder Coaching & Industry Mentorship",
    track: "Leadership",
    theme: "orange",
    accentHover: "group-hover:text-orange-300",
    activeBadge: "bg-[#F26522] text-white shadow-lg shadow-[#F26522]/50 border border-orange-400/30",
    sparkleColor: "text-[#F26522]",
    glowShadow: "drop-shadow-[0_0_35px_rgba(242,101,34,0.5)]",
    iconTextColor: "text-[#F26522]",
  },
];

export default function CategoriesScrollSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScheduledRef = useRef<boolean>(false);
  const prevActiveRef = useRef<number>(0);

  // ── Left column refs for GSAP section-entry animation ─────────────────────
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // ── GSAP: section entry animation ─────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Left sticky column fades from left
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Right column items stagger up
      const items = rightColRef.current?.querySelectorAll(":scope > div");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const checkActiveItem = () => {
      isScheduledRef.current = false;
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (containerRect.bottom < 0 || containerRect.top > windowHeight) return;

      const viewportCenter = windowHeight / 2;
      let closestIdx = activeIndexRef.current;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
        }
      });

      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }
    };

    const handleScroll = () => {
      if (!isScheduledRef.current) {
        isScheduledRef.current = true;
        requestAnimationFrame(checkActiveItem);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkActiveItem();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── AnimeJS: animate active item headline on change ───────────────────────
  useEffect(() => {
    const prev = prevActiveRef.current;
    if (prev === activeIndex) return;
    prevActiveRef.current = activeIndex;

    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) return;

    const headline = activeEl.querySelector("h2");
    if (headline) {
      animeJs(headline as HTMLElement, {
        translateX: [-6, 0],
        opacity: [0.6, 1],
        duration: 380,
        ease: "outCubic",
      });
    }

    const arrowBtn = activeEl.querySelector(".cat-arrow");
    if (arrowBtn) {
      animeJs(arrowBtn as HTMLElement, {
        scale: [0.7, 1.1, 1],
        rotate: ["-15deg", "0deg"],
        duration: 400,
        ease: "outBack(1.7)",
      });
    }
  }, [activeIndex]);

  const activeCategory = CATEGORIES_DATA[activeIndex] || CATEGORIES_DATA[0];

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-gradient-to-br from-[#002257] via-[#083a22] to-[#021329] text-white py-24 sm:py-32 overflow-hidden border-y border-white/15 select-none"
    >
      {/* Radiant Top Luminous White Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.16),transparent)] pointer-events-none" />

      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,59,150,0.45)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(22,124,56,0.4)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative gradient accent borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#003B96]/60 via-white/50 via-[#167C38]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#167C38]/60 via-white/50 via-[#003B96]/60 to-transparent" />

      <div className="w-full px-3 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-2 sm:gap-6 md:gap-8 items-start relative">

          {/* Left Vertical Label Column */}
          <div
            ref={leftColRef}
            className="col-span-3 sm:col-span-2 flex flex-col items-center justify-start sticky top-36 z-20 pt-4 pl-0 sm:pl-2"
          >
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              {/* Dynamic glowing pulsing indicator */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full animate-ping absolute ${
                    activeCategory.theme === "orange"
                      ? "bg-[#F26522]"
                      : activeCategory.theme === "blue"
                      ? "bg-[#003B96]"
                      : activeCategory.theme === "green"
                      ? "bg-[#167C38]"
                      : "bg-white"
                  }`}
                />
                <div
                  className={`w-2.5 h-2.5 rounded-full relative z-10 transition-colors duration-500 ${
                    activeCategory.theme === "orange"
                      ? "bg-[#F26522] shadow-[0_0_12px_#F26522]"
                      : activeCategory.theme === "blue"
                      ? "bg-[#003B96] shadow-[0_0_12px_#003B96]"
                      : activeCategory.theme === "green"
                      ? "bg-[#167C38] shadow-[0_0_12px_#167C38]"
                      : "bg-white shadow-[0_0_12px_#ffffff]"
                  }`}
                />
              </div>

              {/* Vertical Rotated Text */}
              <span
                className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] bg-gradient-to-b from-white via-slate-300 to-slate-500 bg-clip-text text-transparent transform -rotate-90 origin-center whitespace-nowrap py-4 sm:py-6"
                style={{ writingMode: "vertical-rl" }}
              >
                CATEGORIES
              </span>

              {/* Progress counter */}
              <div className="flex flex-col items-center text-[10px] sm:text-[11px] font-black font-mono">
                <span className="text-[#F26522]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30 text-[8px] sm:text-[9px] my-0.5">/</span>
                <span className="text-[#167C38]">
                  {String(CATEGORIES_DATA.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Stacked Category Titles */}
          <div
            ref={rightColRef}
            className="col-span-9 sm:col-span-10 space-y-6 sm:space-y-12 lg:space-y-16 pl-2.5 sm:pl-6 border-l border-white/10 relative"
          >
            {CATEGORIES_DATA.map((cat, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={cat.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`group transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "opacity-100 scale-100 translate-x-0.5 sm:translate-x-2"
                      : "opacity-30 hover:opacity-75 scale-[0.98] translate-x-0"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <Link
                    href="/competitions"
                    className="block space-y-1.5 sm:space-y-2 focus:outline-none"
                  >
                    {/* Track Badge & Subtitle */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                        {cat.id}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[11px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? cat.activeBadge
                            : "bg-white/10 text-slate-400 group-hover:bg-white/15 group-hover:text-white"
                        }`}
                      >
                        {cat.track}
                      </span>
                      {isActive && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                          <Sparkles className={`w-3.5 h-3.5 ${cat.sparkleColor}`} />
                          <span>{cat.subtitle}</span>
                        </span>
                      )}
                    </div>

                    {/* Headline Typography & Arrow Button */}
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <h2
                        className={`text-lg xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-tight sm:leading-none transition-all duration-300 break-words ${
                          isActive
                            ? `text-white ${cat.glowShadow}`
                            : `text-slate-600 ${cat.accentHover}`
                        }`}
                      >
                        {cat.name}
                      </h2>

                      {/* Arrow CTA Button */}
                      <div
                        className={`cat-arrow w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300 mr-2.5 sm:mr-0 ${
                          isActive
                            ? `bg-white ${cat.iconTextColor} scale-100 opacity-100 shadow-xl shadow-white/15`
                            : "bg-white/5 text-slate-600 scale-90 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:bg-white/15"
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
