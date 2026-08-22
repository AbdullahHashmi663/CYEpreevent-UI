"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Camera, Award } from "lucide-react";

interface RecapItem {
  id: number;
  title: string;
  subtitle: string;
  src: string;
  tag: string;
  color: string;
}

const RECAP_ITEMS: RecapItem[] = [
  {
    id: 1,
    title: "Grand Opening & Keynote Arena",
    subtitle: "Over 2,500+ attendees gathered for the inaugural youth leadership addresses at BUIC.",
    src: "/images/recap1.png",
    tag: "Auditorium Ceremony",
    color: "#003B96",
  },
  {
    id: 2,
    title: "Speed Programming & Hackathon Sprint",
    subtitle: "Intense competitive coding challenges and rapid software prototype pitching.",
    src: "/images/recap2.png",
    tag: "Technology Arena",
    color: "#F26522",
  },
  {
    id: 3,
    title: "Esports & Tactical Stadium Clash",
    subtitle: "Adrenaline-fueled collegiate championship with live casting and audience buzz.",
    src: "/images/recap3.png",
    tag: "Esports Tournament",
    color: "#167C38",
  },
  {
    id: 4,
    title: "CYE Nexus Leadership Talks",
    subtitle: "Direct mentorship sessions with Pakistan's prominent startup founders and tech leaders.",
    src: "/images/recap4.jpg",
    tag: "Industry Mentorship",
    color: "#003B96",
  },
  {
    id: 5,
    title: "Grand Awards & Shield Distribution",
    subtitle: "Honoring national champions, campus ambassadors, and outstanding collegiate teams.",
    src: "/images/recap5.jpg",
    tag: "Victory Gala",
    color: "#F26522",
  },
];

export default function RecapCoverflowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle carousel every 4.5s when not hovered
  useEffect(() => {
    if (isHovered) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RECAP_ITEMS.length);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + RECAP_ITEMS.length) % RECAP_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % RECAP_ITEMS.length);
  };

  const activeItem = RECAP_ITEMS[activeIndex];

  return (
    <section
      id="recap-2023"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden border-y border-slate-200/80 select-none"
      style={{
        background: "linear-gradient(175deg, #ffffff 0%, #ffffff 68%, rgba(0, 59, 150, 0.08) 82%, rgba(22, 124, 56, 0.14) 100%)",
      }}
    >
      {/* 30% Bottom Gradient Lighting: Blue & Green ambient glow blooms */}
      <div className="absolute bottom-0 -left-20 w-[550px] h-[400px] bg-[#003B96]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[550px] h-[400px] bg-[#167C38]/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50/40 rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative gradient border lines */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#003B96]/30 via-[#F26522]/30 via-[#167C38]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#167C38]/40 via-[#003B96]/40 via-[#F26522]/30 to-transparent" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-xs font-black uppercase tracking-widest text-[#F26522] border border-orange-200/80 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#F26522]" />
            <span>Legacy & Heritage</span>
          </div>

          <div className="space-y-1">
            <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-[#167C38]">
              MEMORIES THAT DEFINED AN ERA
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900">
              RECAP OF CAPITAL YOUTH EXPO 2023
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Relive the electrifying energy, packed auditoriums, and milestone breakthroughs from our previous flagship edition at BUIC.
          </p>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative w-full py-6 sm:py-10 flex flex-col items-center">
          
          {/* 3D Scene Viewport */}
          <div
            className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-visible"
            style={{ perspective: 1200 }}
          >
            {RECAP_ITEMS.map((item, idx) => {
              let offset = idx - activeIndex;
              if (offset > RECAP_ITEMS.length / 2) offset -= RECAP_ITEMS.length;
              if (offset < -RECAP_ITEMS.length / 2) offset += RECAP_ITEMS.length;

              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              const rotateY = offset * -32;
              const translateX = offset * 240;
              const translateZ = isCenter ? 80 : -100 * absOffset;
              const scale = isCenter ? 1 : 0.82;
              const opacity = isCenter ? 1 : Math.max(0.5, 1 - absOffset * 0.35);
              const zIndex = 30 - absOffset;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="absolute w-[270px] sm:w-[380px] md:w-[460px] h-[250px] sm:h-[350px] md:h-[400px] cursor-pointer will-change-transform rounded-3xl overflow-hidden"
                  style={{
                    zIndex,
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Card Image Wrapper */}
                  <div
                    className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                      isCenter
                        ? "border-2 border-white shadow-[0_25px_60px_-15px_rgba(0,59,150,0.35),0_10px_25px_rgba(22,124,56,0.2)]"
                        : "border border-slate-200/90 shadow-md hover:border-slate-400/80"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? "scale-105" : "scale-100 filter brightness-85"
                      }`}
                      priority={idx === 0 || idx === 1}
                      quality={90}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Tag Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
                        {item.tag}
                      </span>
                    </div>

                    {/* Bottom Card Title Overlay on Center Card */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                      <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block mb-0.5">
                        CYE 2023 Memory #{item.id}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Memory Caption Box (Below Coverflow) */}
          <div className="mt-8 sm:mt-12 text-center max-w-xl mx-auto px-4 min-h-[75px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-1"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#167C38]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>{activeItem.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {activeItem.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls: Navigation Arrows & Indicator Dots */}
          <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8 z-20">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Memory"
              className="w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 hover:text-[#003B96] border border-slate-300/80 flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Pagination Pill Dots */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-xs backdrop-blur-md">
              {RECAP_ITEMS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === dotIdx
                      ? "w-8 bg-gradient-to-r from-[#F26522] to-[#EA580C] shadow-md shadow-[#F26522]/30"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              aria-label="Next Memory"
              className="w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 hover:text-[#003B96] border border-slate-300/80 flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
