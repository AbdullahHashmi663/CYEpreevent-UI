"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    src: "/images/recap1.webp",
    tag: "Auditorium Ceremony",
    color: "#003B96",
  },
  {
    id: 2,
    title: "Speed Programming & Hackathon Sprint",
    subtitle: "Intense competitive coding challenges and rapid software prototype pitching.",
    src: "/images/recap2.webp",
    tag: "Technology Arena",
    color: "#F26522",
  },
  {
    id: 3,
    title: "Esports & Tactical Stadium Clash",
    subtitle: "Adrenaline-fueled collegiate championship with live casting and audience buzz.",
    src: "/images/recap3.webp",
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: -45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { y: -40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Viewport IntersectionObserver: only run timer when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle carousel every 4.5s when visible and not hovered or hidden
  useEffect(() => {
    if (isHovered || !isVisible) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RECAP_ITEMS.length);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isHovered, isVisible]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + RECAP_ITEMS.length) % RECAP_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % RECAP_ITEMS.length);
  };

  const activeItem = RECAP_ITEMS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="recap-2023"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden border-y border-slate-200 select-none"
      style={{ backgroundColor: "#ffffff" }}
    >

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
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
        <div ref={stageRef} className="relative w-full py-6 sm:py-10 flex flex-col items-center will-change-transform">
          
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
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 380px, 460px"
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? "scale-105" : "scale-100 filter brightness-85"
                      }`}
                      priority={idx === 0}
                      quality={80}
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
