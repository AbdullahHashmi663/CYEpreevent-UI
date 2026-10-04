"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, GitBranch, Cpu, Boxes, Briefcase, CheckCircle2 } from "lucide-react";

interface MilestoneTrack {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  borderGlow: string;
  iconBg: string;
  icon: "foundations" | "fullstack" | "ai" | "placement";
  tag: string;
}

const MILESTONES: MilestoneTrack[] = [
  {
    id: "01",
    title: "Foundations",
    subtitle: "Think and reason like an engineer, not just write syntax.",
    accent: "#003B96", // CYE Blue
    borderGlow: "rgba(0, 59, 150, 0.45)",
    iconBg: "from-[#003B96] to-[#0284C7]",
    icon: "foundations",
    tag: "Core Engineering",
  },
  {
    id: "02",
    title: "Full Stack Dev",
    subtitle: "Ship real, deployed products end to end.",
    accent: "#F26522", // CYE Orange
    borderGlow: "rgba(242, 101, 34, 0.45)",
    iconBg: "from-[#EA580C] to-[#FB923C]",
    icon: "fullstack",
    tag: "Production Ready",
  },
  {
    id: "03",
    title: "AI Engineering",
    subtitle: "Build with LLMs, not just talk about prompts.",
    accent: "#167C38", // CYE Green
    borderGlow: "rgba(22, 124, 56, 0.45)",
    iconBg: "from-[#14532D] to-[#22C55E]",
    icon: "ai",
    tag: "Autonomous Systems",
  },
  {
    id: "04",
    title: "Placement Prep",
    subtitle: "Mock interviews, resume, and leadership skills.",
    accent: "#4F46E5", // Royal Indigo
    borderGlow: "rgba(79, 70, 229, 0.45)",
    iconBg: "from-[#312E81] to-[#6366F1]",
    icon: "placement",
    tag: "Career Velocity",
  },
];

export default function HumanAISynergySection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const leftFingertipGlowRef = useRef<HTMLDivElement>(null);
  const rightFingertipGlowRef = useRef<HTMLDivElement>(null);
  const contactSparkRef = useRef<HTMLDivElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);

  // 3 distinct laser segments for the sequential line ignition (Image 1, 2, 3)
  const segment1Ref = useRef<HTMLDivElement>(null);
  const segment2Ref = useRef<HTMLDivElement>(null);
  const segment3Ref = useRef<HTMLDivElement>(null);

  // Card node auras
  const cardAurasRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0); // 0 = approach, 1 = image 1, 2 = image 2, 3 = image 3

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const leftHand = leftHandRef.current;
    const rightHand = rightHandRef.current;
    const leftFingertipGlow = leftFingertipGlowRef.current;
    const rightFingertipGlow = rightFingertipGlowRef.current;
    const contactSpark = contactSparkRef.current;
    const centerOrb = centerOrbRef.current;
    const segment1 = segment1Ref.current;
    const segment2 = segment2Ref.current;
    const segment3 = segment3Ref.current;

    if (!trigger || !leftHand || !rightHand) return;

    const ctx = gsap.context(() => {
      // Calculate responsive travel distance so hands start cleanly from outer edges of the page
      const getTravelDistance = () => {
        const w = window.innerWidth;
        return Math.max(w * 0.55, 800);
      };

      const isMobile = window.innerWidth < 768;
      const touchLeftX = isMobile ? 14 : 22;
      const touchRightX = isMobile ? -10 : -14;

      // Position offsets matching the 3 images:
      // Image 1: Hands ~42px apart from contact
      const img1LeftX = touchLeftX - 42;
      const img1RightX = touchRightX + 42;

      // Image 2: Hands ~18px apart from contact
      const img2LeftX = touchLeftX - 18;
      const img2RightX = touchRightX + 18;

      // Master scroll timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=2400",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.50) {
              setActiveStage(0);
            } else if (p < 0.64) {
              setActiveStage(1); // EXACT Image 1
            } else if (p < 0.78) {
              setActiveStage(2); // EXACT Image 2
            } else {
              setActiveStage(3); // EXACT Image 3
            }
          },
        },
      });

      // ================= INITIAL STATE =================
      // Hands start far away at the outer edges of the screen
      gsap.set(leftHand, {
        x: () => -getTravelDistance(),
        opacity: 0.95,
      });

      gsap.set(rightHand, {
        x: () => getTravelDistance(),
        opacity: 0.95,
      });

      // Fingertip glows start hidden
      if (leftFingertipGlow) gsap.set(leftFingertipGlow, { scale: 0, opacity: 0 });
      if (rightFingertipGlow) gsap.set(rightFingertipGlow, { scale: 0, opacity: 0 });

      // Central floating orb starts hidden
      if (centerOrb) gsap.set(centerOrb, { scale: 0.25, opacity: 0 });

      // Contact spark starts hidden
      if (contactSpark) gsap.set(contactSpark, { scale: 0, opacity: 0 });

      // 3 Laser line segments start unlit (scaleX: 0)
      if (segment1) gsap.set(segment1, { scaleX: 0, transformOrigin: "left center" });
      if (segment2) gsap.set(segment2, { scaleX: 0, transformOrigin: "left center" });
      if (segment3) gsap.set(segment3, { scaleX: 0, transformOrigin: "left center" });

      // Card auras start muted
      cardAurasRef.current.forEach((aura) => {
        if (aura) gsap.set(aura, { opacity: 0.1 });
      });

      // ================= TIMELINE SEQUENCE =================

      // STEP 0: SETTLE BUFFER (0.00 -> 0.10)
      tl.to({}, { duration: 0.10 });

      // STEP 1: APPROACH & PROGRESSIVE PIPELINE (0.10 -> 0.50)
      // Hands move from screen edges towards Image 1 position (~38px apart)
      tl.to(
        leftHand,
        {
          x: img1LeftX,
          opacity: 1,
          ease: "power2.out",
          duration: 0.40,
        },
        0.10
      );

      tl.to(
        rightHand,
        {
          x: img1RightX,
          opacity: 1,
          ease: "power2.out",
          duration: 0.40,
        },
        0.10
      );

      // Card 0 (Foundations) lights up:
      if (cardAurasRef.current[0]) {
        tl.to(
          cardAurasRef.current[0],
          { opacity: 0.75, duration: 0.12, ease: "power2.out" },
          0.15
        );
      }

      // Segment 1 lasers across Card 0 -> Card 1 (0.20 -> 0.34)
      if (segment1) {
        tl.to(
          segment1,
          { scaleX: 1, duration: 0.14, ease: "power2.out" },
          0.20
        );
      }

      // Card 1 (Full Stack Dev) activates upon laser arrival (0.32 -> 0.38)
      if (cardAurasRef.current[1]) {
        tl.to(
          cardAurasRef.current[1],
          { opacity: 0.75, duration: 0.12, ease: "power2.out" },
          0.32
        );
      }

      // Segment 2 lasers across Card 1 -> Card 2 (0.36 -> 0.50)
      if (segment2) {
        tl.to(
          segment2,
          { scaleX: 1, duration: 0.14, ease: "power2.out" },
          0.36
        );
      }

      // Card 2 (AI Engineering) activates upon laser arrival (0.48 -> 0.54)
      if (cardAurasRef.current[2]) {
        tl.to(
          cardAurasRef.current[2],
          { opacity: 0.75, duration: 0.12, ease: "power2.out" },
          0.48
        );
      }

      // ================= STEP 2: EXACT MATCH TO IMAGE 1 (0.50 -> 0.64) =================
      // 1. Hands are ~38px apart.
      // 2. Both fingertips ignite individual fingertip glows!
      if (leftFingertipGlow && rightFingertipGlow) {
        tl.to(
          [leftFingertipGlow, rightFingertipGlow],
          {
            scale: 1,
            opacity: 0.95,
            duration: 0.12,
            ease: "power2.out",
          },
          0.50
        );
      }
      // Note: At this stage:
      // - Segment 1 & Segment 2 are lit
      // - Cards 0, 1, 2 are lit
      // - Segment 3 is 0% (UNLIT)
      // - Card 3 is muted (UNLIT)
      // - Central orb is hidden (NOT YET EMERGED)
      // EXACT STATE OF IMAGE 1!

      // ================= STEP 3: EXACT MATCH TO IMAGE 2 (0.64 -> 0.78) =================
      // 1. Hands glide closer to ~16px distance
      tl.to(leftHand, { x: img2LeftX, duration: 0.14, ease: "power2.out" }, 0.64);
      tl.to(rightHand, { x: img2RightX, duration: 0.14, ease: "power2.out" }, 0.64);

      // 2. Fingertip glows brighten
      if (leftFingertipGlow && rightFingertipGlow) {
        tl.to(
          [leftFingertipGlow, rightFingertipGlow],
          { scale: 1.15, opacity: 1, duration: 0.14, ease: "power2.out" },
          0.64
        );
      }

      // 3. Central diffuse orb emerges in the space below the hands!
      if (centerOrb) {
        tl.to(
          centerOrb,
          {
            scale: 0.65,
            opacity: 0.52,
            duration: 0.14,
            ease: "power2.out",
          },
          0.64
        );
      }

      // 4. Segment 3 begins shooting from Card 2 towards Card 3 (~50% across!)
      if (segment3) {
        tl.to(
          segment3,
          { scaleX: 0.5, duration: 0.14, ease: "power2.out" },
          0.64
        );
      }

      // 5. Card 3 begins to glow (aura fading in to 40%)
      if (cardAurasRef.current[3]) {
        tl.to(
          cardAurasRef.current[3],
          { opacity: 0.42, duration: 0.14, ease: "power2.out" },
          0.66
        );
      }
      // EXACT STATE OF IMAGE 2!

      // ================= STEP 4: EXACT MATCH TO IMAGE 3 (0.78 -> 0.90) =================
      // 1. Hands reach point of contact (maximum proximity / fingertips meet)
      tl.to(leftHand, { x: touchLeftX, duration: 0.12, ease: "power2.out" }, 0.78);
      tl.to(rightHand, { x: touchRightX, duration: 0.12, ease: "power2.out" }, 0.78);

      // 2. Contact spark bursts right at meeting point!
      if (contactSpark) {
        tl.to(
          contactSpark,
          {
            scale: 1.1,
            opacity: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          0.78
        );
      }

      // 3. Central diffuse floating orb blooms into full brilliance!
      if (centerOrb) {
        tl.to(
          centerOrb,
          {
            scale: 1.05,
            opacity: 0.95,
            duration: 0.14,
            ease: "power2.out",
          },
          0.78
        );
      }

      // 4. Segment 3 completes 100% all the way to Card 3!
      if (segment3) {
        tl.to(
          segment3,
          { scaleX: 1.0, duration: 0.12, ease: "power2.out" },
          0.78
        );
      }

      // 5. Card 3 reaches 100% full ignition and glow!
      if (cardAurasRef.current[3]) {
        tl.to(
          cardAurasRef.current[3],
          { opacity: 0.85, duration: 0.12, ease: "power2.out" },
          0.80
        );
      }
      // EXACT STATE OF IMAGE 3!

      // ================= STEP 5: SUSTAINED FINAL HOLD (0.90 -> 1.00) =================
      tl.to({}, { duration: 0.10 }, 0.90);
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="human-ai-synergy"
      className="relative w-full h-screen min-h-[620px] bg-white text-slate-900 overflow-hidden select-none flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 border-b border-slate-200"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ================= 1. HEADER (Compact & Fit in Screen) ================= */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 shrink-0">
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-[#167C38] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest border border-emerald-200/80 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#167C38] animate-pulse" />
            <span className="bg-gradient-to-r from-[#167C38] via-[#003B96] to-[#F26522] bg-clip-text text-transparent font-extrabold">
              CYE 2024 • THE SYMBIOSIS OF MINDS
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display leading-tight">
            One Journey. Every Skill That Matters.
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed line-clamp-2">
            Where human ingenuity meets artificial intelligence. From core computational reasoning to deploying production-grade AI systems at BUIC.
          </p>
        </div>
      </div>

      {/* ================= 2. HANDS ARENA (Fitted in Screen, 100% Page Width, Generous Tall Container) ================= */}
      <div className="relative w-full flex-1 h-[460px] sm:h-[520px] md:h-[580px] lg:h-[640px] xl:h-[700px] min-h-[440px] my-1 flex items-center justify-center overflow-visible">
        
        {/* ================= LIGHT IGNITION SEQUENCE ================= */}
        
        {/* 1. Central Diffuse Green Orb (Appears in Image 2, Blooms in Image 3) */}
        <div
          ref={centerOrbRef}
          className="absolute top-[13.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[240px] md:w-[300px] h-[180px] sm:h-[240px] md:h-[300px] rounded-full pointer-events-none z-15 will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(74, 222, 128, 0.4) 30%, rgba(22, 124, 56, 0.2) 55%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />

        {/* 2. Soft Fingertip Contact Spark (Ignites when fingertips meet in Image 3) */}
        <div
          ref={contactSparkRef}
          className="absolute top-[13.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center will-change-transform"
        >
          {/* Luminous ambient halo */}
          <div
            className="absolute w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(74, 222, 128, 0.75) 35%, rgba(22, 124, 56, 0.3) 60%, transparent 80%)",
              filter: "blur(7px)",
            }}
          />

          {/* Delicate luminous core spark */}
          <div className="relative w-5 h-5 rounded-full bg-white border-2 border-emerald-400 shadow-[0_0_14px_#22C55E,0_0_28px_rgba(22,124,56,0.55)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* LEFT HAND: Natural Human Hand (Tall, fully unclipped, complete palm & wrist) */}
        <div
          ref={leftHandRef}
          className="absolute right-[50%] top-0 h-full w-[50vw] min-w-[500px] max-w-[1100px] flex items-center justify-end pointer-events-none will-change-transform z-10"
        >
          <div
            className="relative w-full h-full will-change-transform"
            style={{
              transformOrigin: "100% 13.8%",
              transform: "scale(1.04)",
            }}
          >
            <Image
              src="/images/hand_left_nobg.png"
              alt="Human Hand"
              fill
              priority
              sizes="50vw"
              className="object-contain object-right pointer-events-none select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
            />

            {/* Left fingertip glow (Attached to human fingertip - moves with hand!) */}
            <div
              ref={leftFingertipGlowRef}
              className="absolute top-[13.8%] right-[0px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-20 will-change-transform flex items-center justify-center"
            >
              <div
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(74,222,128,0.7) 40%, rgba(22,124,56,0.25) 65%, transparent 80%)",
                  filter: "blur(4px)",
                }}
              />
              <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#22C55E]" />
            </div>
          </div>
        </div>

        {/* RIGHT HAND: Natural Robotic Hand (Tall, fully unclipped, complete wrist & forearm) */}
        <div
          ref={rightHandRef}
          className="absolute left-[50%] top-0 h-full w-[50vw] min-w-[500px] max-w-[1100px] flex items-center justify-start pointer-events-none will-change-transform z-10"
        >
          <div
            className="relative w-full h-full will-change-transform"
            style={{
              transformOrigin: "0% 13.8%",
              transform: "scale(1.04)",
            }}
          >
            <Image
              src="/images/robo_hand_nobg.png"
              alt="Robotic Hand"
              fill
              priority
              sizes="50vw"
              className="object-contain object-left pointer-events-none select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
            />

            {/* Right fingertip glow (Attached to robotic fingertip - moves with hand!) */}
            <div
              ref={rightFingertipGlowRef}
              className="absolute top-[13.8%] left-[0px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20 will-change-transform flex items-center justify-center"
            >
              <div
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(74,222,128,0.7) 40%, rgba(22,124,56,0.25) 65%, transparent 80%)",
                  filter: "blur(4px)",
                }}
              />
              <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#22C55E]" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. TRACK CARDS (Sequential Laser Pipeline Across 4 Cards) ================= */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 shrink-0">
        <div className="relative w-full max-w-4xl mx-auto pt-1 pb-1 sm:pb-2">
          
          {/* ================= 3 SEQUENTIAL LASER SEGMENTS ================= */}
          
          {/* Segment 1: Card 1 (Foundations) -> Card 2 (Full Stack Dev) */}
          <div
            className="absolute top-[32px] sm:top-[36px] md:top-[40px] h-[3px] z-0 hidden md:block overflow-hidden rounded-full"
            style={{ left: "12.5%", width: "25%" }}
          >
            <div className="absolute inset-0 bg-slate-200" />
            <div
              ref={segment1Ref}
              className="absolute inset-0 bg-gradient-to-r from-[#003B96] via-[#167C38] to-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.6)] will-change-transform"
            />
          </div>

          {/* Segment 2: Card 2 (Full Stack Dev) -> Card 3 (AI Engineering) */}
          <div
            className="absolute top-[32px] sm:top-[36px] md:top-[40px] h-[3px] z-0 hidden md:block overflow-hidden rounded-full"
            style={{ left: "37.5%", width: "25%" }}
          >
            <div className="absolute inset-0 bg-slate-200" />
            <div
              ref={segment2Ref}
              className="absolute inset-0 bg-gradient-to-r from-[#22C55E] via-[#167C38] to-[#F26522] shadow-[0_0_10px_rgba(34,197,94,0.6)] will-change-transform"
            />
          </div>

          {/* Segment 3: Card 3 (AI Engineering) -> Card 4 (Placement Prep) */}
          <div
            className="absolute top-[32px] sm:top-[36px] md:top-[40px] h-[3px] z-0 hidden md:block overflow-hidden rounded-full"
            style={{ left: "62.5%", width: "25%" }}
          >
            <div className="absolute inset-0 bg-slate-200" />
            <div
              ref={segment3Ref}
              className="absolute inset-0 bg-gradient-to-r from-[#F26522] via-[#22C55E] to-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.6)] will-change-transform"
            />
          </div>

          {/* 4 Milestone Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 relative z-10">
            {MILESTONES.map((item, idx) => {
              const isHovered = activeCard === idx;
              // Card is active according to the sequence stage:
              // Card 0: active from approach
              // Card 1: active from approach
              // Card 2: active in Stage 1, 2, 3
              // Card 3: active only in Stage 2 (partial) and Stage 3 (full)
              const isNodeActive =
                idx < 3 ? activeStage >= 1 : activeStage >= 2;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="track-card-node group flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform hover:-translate-y-1"
                >
                  {/* 3D Glossy Squircle App Icon Badge */}
                  <div className="relative mb-2 sm:mb-2.5">
                    {/* Glowing Aura on ignition / hover */}
                    <div
                      ref={(el) => {
                        cardAurasRef.current[idx] = el;
                      }}
                      className={`absolute -inset-2.5 rounded-2xl blur-md transition-opacity duration-300 ${
                        isHovered
                          ? "opacity-80"
                          : "opacity-15"
                      }`}
                      style={{
                        background: `radial-gradient(circle, ${item.borderGlow} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Squircle Beveled Shell */}
                    <div
                      className="relative w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-xl sm:rounded-2xl p-[2px] transition-all duration-300 shadow-md"
                      style={{
                        background: isHovered || isNodeActive
                          ? `linear-gradient(135deg, ${item.accent}, #ffffff, ${item.accent})`
                          : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.8) 50%, rgba(203,213,225,0.9) 100%)",
                        boxShadow: isHovered || isNodeActive
                          ? `0 10px 20px -4px ${item.borderGlow}, inset 0 1px 2px rgba(255,255,255,0.8)`
                          : `0 6px 16px -6px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.9)`,
                      }}
                    >
                      {/* Vibrant Glass Core */}
                      <div
                        className={`w-full h-full rounded-[11px] sm:rounded-[15px] bg-gradient-to-b ${item.iconBg} flex items-center justify-center relative overflow-hidden shadow-inner`}
                      >
                        {/* Specular Gloss Reflection */}
                        <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/35 to-transparent rounded-t-[11px] sm:rounded-t-[15px] pointer-events-none" />

                        {/* Node Icon Graphic */}
                        {item.icon === "foundations" && (
                          <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
                            <GitBranch className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                          </div>
                        )}

                        {item.icon === "fullstack" && (
                          <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
                            <Cpu className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                          </div>
                        )}

                        {item.icon === "ai" && (
                          <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
                            <Boxes className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                          </div>
                        )}

                        {item.icon === "placement" && (
                          <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                          </div>
                        )}

                        {/* Active Indicator Pulse Dot */}
                        {isNodeActive && (
                          <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 font-display tracking-tight group-hover:text-[#167C38] transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-slate-600 text-[10px] sm:text-xs font-medium leading-tight max-w-[190px] mt-0.5 line-clamp-2 group-hover:text-slate-800 transition-colors duration-200">
                    {item.subtitle}
                  </p>

                  {/* Micro Tag */}
                  <span
                    className="mt-1.5 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-600 group-hover:border-slate-300 transition-colors duration-200"
                    style={{
                      color: isHovered ? item.accent : undefined,
                    }}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{item.tag}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
