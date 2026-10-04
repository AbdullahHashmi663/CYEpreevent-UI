"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronRight } from "lucide-react";

interface PillarsHorizontalScrollSectionProps {
  onRegisterClick?: (competitionName?: string) => void;
}

interface PillarCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  competition: string;
  accentColor: string;
  overlayGradient: string;
  doodleType: "crown" | "code" | "lightning" | "sparkles";
  stats: string;
}

const PILLAR_CARDS: PillarCard[] = [
  {
    id: "01",
    badge: "Featured",
    badgeColor: "bg-[#F26522] text-white",
    title: "Coming To Your Campus",
    subtitle: "Speed Programming & Hackathon",
    description:
      "40+ collegiate teams battling intense algorithmic problems and sprinting rapid 24-hour MVP software prototypes.",
    image: "/images/recap1.webp",
    competition: "Speed Programming",
    accentColor: "#F26522",
    overlayGradient: "from-[#F26522] via-[#F26522]/80 to-transparent",
    doodleType: "crown",
    stats: "PKR 150K+ Prizes • 40+ Teams",
  },
  {
    id: "02",
    badge: "Esports Arena • Track 02",
    badgeColor: "bg-[#167C38] text-white",
    title: "Counter-Strike 2 LAN",
    subtitle: "5v5 Knockout Championship",
    description:
      "Adrenaline-fueled 5v5 bomb defusal tournament on low-latency 128-tick servers with live caster commentary.",
    image: "/images/recap3.webp",
    competition: "Counter-Strike 2",
    accentColor: "#167C38",
    overlayGradient: "from-[#167C38] via-[#167C38]/80 to-transparent",
    doodleType: "lightning",
    stats: "5v5 Bracket • Champions Trophy",
  },
  {
    id: "03",
    badge: "Oration & Debate • Track 03",
    badgeColor: "bg-[#003B96] text-white",
    title: "Speech & Creative Arts",
    subtitle: "English & Urdu Declamations",
    description:
      "Eloquent declamations, Islamic Seerah buzzer rounds, and short narrative essays judged by national literary figures.",
    image: "/images/recap2.webp",
    competition: "Speech Competition",
    accentColor: "#003B96",
    overlayGradient: "from-[#003B96] via-[#003B96]/80 to-transparent",
    doodleType: "code",
    stats: "English & Urdu • Honor Shields",
  },
  {
    id: "04",
    badge: "Nexus & Leadership • Track 04",
    badgeColor: "bg-gradient-to-r from-[#F26522] to-[#EA580C] text-white",
    title: "CYE Nexus & Career Pro",
    subtitle: "Keynotes & Live Canvas Studio",
    description:
      "Direct mentorship with Pakistan's top tech founders, live painting visual studio, and campus ambassador gala.",
    image: "/images/recap5.jpg",
    competition: "Painting & Visual Arts",
    accentColor: "#EA580C",
    overlayGradient: "from-[#EA580C] via-[#EA580C]/80 to-transparent",
    doodleType: "sparkles",
    stats: "10+ Keynote Speakers • Live Studio",
  },
];

export default function PillarsHorizontalScrollSection({
  onRegisterClick,
}: PillarsHorizontalScrollSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    // Use GSAP context for bulletproof cleanup in React
    const ctx = gsap.context(() => {
      // Position cards so they start from the right 30% of the screen (approx 70vw)
      const getStartX = () => {
        return window.innerWidth > 768
          ? window.innerWidth * 0.7
          : window.innerWidth * 0.35;
      };

      // Traverse until the last card (Card 4) is fully showcased on the left-center
      const getEndX = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth + (windowWidth > 768 ? 160 : 40));
      };

      const totalTravelDistance = getStartX() + Math.abs(getEndX());

      // Create the pinned horizontal scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${Math.max(2400, totalTravelDistance * 1.25)}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Animate the cards track horizontally from right 30% of screen to full traverse
      tl.fromTo(
        track,
        {
          x: () => getStartX(),
        },
        {
          x: () => getEndX(),
          ease: "none",
        }
      );

      // Parallax effect on background images inside cards
      const images = track.querySelectorAll(".pillar-card-img");
      images.forEach((img) => {
        tl.fromTo(
          img,
          { scale: 1.1, xPercent: -3 },
          { scale: 1.0, xPercent: 3, ease: "none" },
          0
        );
      });
    }, trigger);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative w-full overflow-hidden select-none bg-gradient-to-br from-[#002257] via-[#083a22] to-[#021329] text-white border-y border-white/15"
    >
      {/* Background Photography: Auditorium with Low Opacity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/images/auditorium.webp"
          alt="CYE BUIC Auditorium"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002257]/60 via-transparent to-[#021329]/80" />
      </div>

      {/* Radiant Top Luminous White Glow Overlay matching Categories section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.16),transparent)] pointer-events-none" />

      {/* Dynamic Ambient Background Glows: CYE Blue & Emerald Green */}
      <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,59,150,0.45)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(22,124,56,0.4)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative top and bottom gradient accent borders (Blue -> White -> Green) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#003B96]/60 via-white/50 via-[#167C38]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#167C38]/60 via-white/50 via-[#003B96]/60 to-transparent" />

      {/* Pinned Viewport Container - Engineered to fit viewport cleanly without vertical clipping */}
      <div className="h-screen min-h-[680px] max-h-[960px] w-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden relative z-10">
        
        {/* 1. Top Section Header */}
        <div className="relative z-10 w-full px-4 sm:px-8 text-center max-w-4xl mx-auto space-y-1.5 sm:space-y-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#167C38] animate-ping" />
            <span>THE FOUR PILLARS OF CYE 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            How We Are Doing It{" "}
            <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">
              Faster And Better
            </span>{" "}
            Than Others!
          </h2>
        </div>

        {/* 2. Horizontally Scrubbing Staggered Cards Track (Exact Match to Reference Picture) */}
        <div className="relative z-10 w-full overflow-visible my-auto py-1 sm:py-2">
          <div
            ref={trackRef}
            className="flex items-start gap-5 sm:gap-7 md:gap-8 px-4 sm:px-6 w-max will-change-transform"
          >
            {PILLAR_CARDS.map((card, idx) => {
              // Alternate vertical offset: Staggered placement exactly as in user reference picture
              const isStaggeredDown = idx % 2 === 1;

              return (
                <div
                  key={card.id}
                  onClick={() => onRegisterClick?.(card.competition)}
                  className={`group relative w-[280px] sm:w-[310px] md:w-[340px] lg:w-[370px] h-[370px] sm:h-[400px] md:h-[430px] lg:h-[450px] rounded-none overflow-hidden border border-white/25 bg-slate-950 transition-all duration-500 cursor-pointer flex-shrink-0 flex flex-col justify-between ${
                    isStaggeredDown
                      ? "translate-y-5 sm:translate-y-7 md:translate-y-9"
                      : "translate-y-0"
                  } hover:-translate-y-1.5 hover:border-orange-400/90`}
                  style={{
                    boxShadow:
                      "0 20px 45px -8px rgba(242, 101, 34, 0.45), 0 0 25px 2px rgba(242, 101, 34, 0.25)",
                  }}
                >
                  {/* Card Background Photography */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 320px, 380px"
                      className="pillar-card-img object-cover object-center group-hover:scale-106 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                    />
                    {/* Top gradient for badge contrast */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                  </div>

                  {/* Hand-Drawn Creative Vector Doodles (Exact Homage to Reference Image) */}
                  {card.doodleType === "crown" && (
                    <div className="absolute top-[20%] left-[28%] sm:left-[32%] pointer-events-none z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                      <svg
                        width="68"
                        height="50"
                        viewBox="0 0 60 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-[0_0_14px_rgba(255,255,255,0.95)] stroke-[#FFE58F]"
                        style={{
                          strokeWidth: 2.8,
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      >
                        <path d="M 5 38 L 12 12 L 24 26 L 30 6 L 36 26 L 48 12 L 55 38 Z" />
                        <circle cx="12" cy="10" r="2.5" fill="#FFE58F" />
                        <circle cx="30" cy="4" r="2.5" fill="#FFE58F" />
                        <circle cx="48" cy="10" r="2.5" fill="#FFE58F" />
                      </svg>
                    </div>
                  )}

                  {card.doodleType === "lightning" && (
                    <div className="absolute top-[18%] right-[22%] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-120">
                      <svg
                        width="48"
                        height="62"
                        viewBox="0 0 40 55"
                        fill="none"
                        className="drop-shadow-[0_0_14px_rgba(242,101,34,0.95)] stroke-[#F26522]"
                        style={{
                          strokeWidth: 3,
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      >
                        <path
                          d="M 22 2 L 6 28 L 20 28 L 14 52 L 34 22 L 20 22 Z"
                          fill="rgba(242,101,34,0.35)"
                        />
                      </svg>
                    </div>
                  )}

                  {card.doodleType === "code" && (
                    <div className="absolute top-[18%] right-[20%] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-115">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white/95 drop-shadow-[0_0_12px_#38BDF8]">
                        &lt;/&gt;
                      </span>
                    </div>
                  )}

                  {card.doodleType === "sparkles" && (
                    <div className="absolute top-[18%] right-[22%] pointer-events-none z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                      <svg
                        width="52"
                        height="52"
                        viewBox="0 0 50 50"
                        fill="none"
                        className="drop-shadow-[0_0_14px_rgba(255,255,255,0.95)] fill-white"
                      >
                        <path d="M 25 0 C 25 15 35 25 50 25 C 35 25 25 35 25 50 C 25 35 15 25 0 25 C 15 25 25 15 25 0 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Top Card Bar: Badge + Circular Action Button (Matching Reference Image) */}
                  <div className="relative z-10 flex items-center justify-between w-full p-4 sm:p-5">
                    {/* Left Pill Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-md border border-white/30 ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>

                    {/* Right Circular Action Button (Solid black circle with white arrow, matching image) */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/90 group-hover:bg-white text-white group-hover:text-black border border-white/30 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom Overlay Card Banner (Matching Reference Image Gradient & Typography) */}
                  <div
                    className={`relative z-10 pt-10 pb-4 px-4 sm:px-5 space-y-1.5 bg-gradient-to-t ${card.overlayGradient}`}
                  >
                    <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-white/90 block">
                      {card.subtitle}
                    </span>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                      {card.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-relaxed line-clamp-2">
                      {card.description}
                    </p>

                    {/* Bottom Stats & Trigger Pill */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/20 text-[10.5px] font-bold text-white">
                      <span className="font-mono text-[10px] truncate max-w-[190px] text-white/80">
                        {card.stats}
                      </span>
                      <span className="font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform shrink-0">
                        Register
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Progress Scroller Bar */}
        <div className="relative z-10 w-full px-4 sm:px-8 max-w-sm mx-auto flex flex-col items-center gap-1.5 shrink-0">
          <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden border border-white/10 shadow-xs">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#003B96] via-[#167C38] to-[#F26522] w-0 transition-all duration-100"
            />
          </div>

          <div className="flex items-center justify-between w-full text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-300">
            <span>01 • TECH</span>
            <span>02 • ESPORTS</span>
            <span>03 • LITERARY</span>
            <span>04 • ARTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
