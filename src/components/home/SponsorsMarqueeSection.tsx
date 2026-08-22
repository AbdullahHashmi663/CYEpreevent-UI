"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { Sparkles, Trophy, Users, ArrowUpRight } from "lucide-react";

interface SponsorsMarqueeProps {
  sponsors?: string[];
  ambassadors?: string[];
}

const DEFAULT_SPONSORS = [
  "Youth Insight",
  "Al Nakhla",
  "Bahria University",
  "Tech Vanguard",
  "Dev Matrix Labs",
  "GameForge Studios",
  "Nexus Capital",
  "CodeSphere Systems",
  "Red Bull Esports",
  "Microsoft Learn",
  "CloudPulse Networks",
  "CyberPeak Security",
];

const DEFAULT_AMBASSADORS = [
  "Hamza Ali (Lead Ambassador)",
  "Ayesha Khan (BUIC Tech Chapter)",
  "Zaid Ahmed (Esports Lead)",
  "Fatima Noor (Literary Lead)",
  "Bilal Tariq (Creative Outreach)",
  "Maham Tariq (Campus Relations)",
  "Usman Farooq (Community Manager)",
  "Zainab Malik (Partnership Envoy)",
  "Saad Hassan (Logistics Officer)",
  "Sara Ahmed (Student Liaison)",
  "Abdullah Shah (Operations)",
  "Hira Khalid (Media & Press)",
];

// Helper to wrap numbers between min and max
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

interface VelocityLineProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function VelocityLine({ children, baseVelocity = 0.65 }: VelocityLineProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 250,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.8], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = baseVelocity * (delta / 1000);

    const vFactor = velocityFactor.get();
    if (vFactor !== 0) {
      moveBy += moveBy * Math.abs(vFactor) * 0.7;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-1">
      <motion.div
        className="flex whitespace-nowrap flex-nowrap shrink-0 will-change-transform"
        style={{ x }}
      >
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {children}
        </div>
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {children}
        </div>
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {children}
        </div>
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function SponsorsMarqueeSection({
  sponsors = DEFAULT_SPONSORS,
  ambassadors = DEFAULT_AMBASSADORS,
}: SponsorsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="sponsors-marquee"
      className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden border-y border-slate-200/80 select-none"
    >
      {/* Background ambient soft multi-color light glow spots */}
      <div className="absolute top-1/4 -left-24 w-[480px] h-[480px] bg-[#003B96]/[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[480px] h-[480px] bg-[#F26522]/[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#167C38]/[0.05] rounded-full blur-[150px] pointer-events-none" />

      {/* Top & bottom subtle multi-color gradient divider lines */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#003B96]/30 via-[#F26522]/30 via-[#167C38]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#167C38]/30 via-[#003B96]/30 via-[#F26522]/30 to-transparent" />

      {/* Header Tag */}
      <div className="w-full px-4 sm:px-8 max-w-7xl mx-auto mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 text-xs font-black uppercase tracking-widest text-[#F26522] border border-orange-200/80 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#F26522]" />
            <span>Official Network & Sponsors</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">
            Powering The CYE Ecosystem
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100/90 px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#167C38] animate-pulse" />
          <span>Interactive Scroll Ticker</span>
        </div>
      </div>

      {/* 4 Multi-Directional Editorial Scroll Text Lines */}
      <div className="space-y-3 sm:space-y-5 md:space-y-6 overflow-hidden py-2 relative">
        
        {/* LINE 1 (ODD - Moving Left): Repeat Word "SPONSORS" */}
        <VelocityLine baseVelocity={-0.65}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10">
              {idx % 2 === 0 ? (
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs">
                  SPONSORS
                </span>
              ) : (
                <span
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent"
                  style={{
                    WebkitTextStroke: "2.5px #F26522",
                    textShadow: "0 0 20px rgba(242, 101, 34, 0.2)",
                  }}
                >
                  SPONSORS
                </span>
              )}
              <span className="w-3 h-3 sm:w-4 sm:h-4 rotate-45 bg-[#F26522] rounded-xs shadow-md shadow-[#F26522]/30" />
            </div>
          ))}
        </VelocityLine>

        {/* LINE 2 (EVEN - Moving Right): List of Sponsor Names */}
        <VelocityLine baseVelocity={0.65}>
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-blue-50/90 border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#003B96] group-hover:scale-125 transition-transform shadow-xs" />
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-[#003B96] transition-colors">
                {sponsor}
              </span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#003B96] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          ))}
        </VelocityLine>

        {/* LINE 3 (ODD - Moving Left): Repeat Word "AMBASSADORS" */}
        <VelocityLine baseVelocity={-0.65}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10">
              {idx % 2 === 0 ? (
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs">
                  AMBASSADORS
                </span>
              ) : (
                <span
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent"
                  style={{
                    WebkitTextStroke: "2.5px #167C38",
                    textShadow: "0 0 20px rgba(22, 124, 56, 0.2)",
                  }}
                >
                  AMBASSADORS
                </span>
              )}
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#167C38] fill-[#167C38]/20" />
            </div>
          ))}
        </VelocityLine>

        {/* LINE 4 (EVEN - Moving Right): List of Ambassador Names */}
        <VelocityLine baseVelocity={0.65}>
          {ambassadors.map((ambassador, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-emerald-50/90 border border-slate-200/90 hover:border-emerald-400/80 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#167C38] group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-[#167C38] transition-colors">
                {ambassador}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#167C38] border border-emerald-300/70 font-mono">
                Verified
              </span>
            </div>
          ))}
        </VelocityLine>

      </div>
    </section>
  );
}
