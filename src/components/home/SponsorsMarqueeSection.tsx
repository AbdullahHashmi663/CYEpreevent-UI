"use client";

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

export default function SponsorsMarqueeSection({
  sponsors = DEFAULT_SPONSORS,
  ambassadors = DEFAULT_AMBASSADORS,
}: SponsorsMarqueeProps) {
  return (
    <section
      id="sponsors-marquee"
      className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden border-y border-slate-200/80 select-none group-marquee"
    >
      {/* Background ambient soft multi-color light precomputed radial gradients */}
      <div className="absolute top-1/4 -left-24 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(0,59,150,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(242,101,34,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(22,124,56,0.06)_0%,transparent_70%)] pointer-events-none" />

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
          <span>Official CYE Network</span>
        </div>
      </div>

      {/* 4 Multi-Directional Pure CSS Marquee Lines (Non-stop motion, individual word highlight) */}
      <div className="space-y-4 sm:space-y-6 overflow-hidden py-2 relative">
        
        {/* LINE 1 (ODD - Moving Left): Repeat Word "SPONSORS" */}
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-1">
          <div className="animate-marquee-left">
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-6 sm:gap-10">
                  {idx % 2 === 0 ? (
                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs hover:text-[#003B96] hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                      SPONSORS
                    </span>
                  ) : (
                    <span
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
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
            </div>
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-6 sm:gap-10">
                  {idx % 2 === 0 ? (
                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs hover:text-[#003B96] hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                      SPONSORS
                    </span>
                  ) : (
                    <span
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
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
            </div>
          </div>
        </div>

        {/* LINE 2 (EVEN - Moving Right): List of Sponsor Names */}
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-1">
          <div className="animate-marquee-right">
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {sponsors.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#003B96] hover:to-[#002257] border border-slate-200/90 hover:border-[#003B96] shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#003B96] group-hover:bg-white group-hover:scale-125 transition-all shadow-xs" />
                  <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-white transition-colors">
                    {sponsor}
                  </span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#003B96] group-hover:text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {sponsors.map((sponsor, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#003B96] hover:to-[#002257] border border-slate-200/90 hover:border-[#003B96] shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#003B96] group-hover:bg-white group-hover:scale-125 transition-all shadow-xs" />
                  <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-white transition-colors">
                    {sponsor}
                  </span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#003B96] group-hover:text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LINE 3 (ODD - Moving Left): Repeat Word "AMBASSADORS" */}
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-1">
          <div className="animate-marquee-left">
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-6 sm:gap-10">
                  {idx % 2 === 0 ? (
                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs hover:text-[#167C38] hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                      AMBASSADORS
                    </span>
                  ) : (
                    <span
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
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
            </div>
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-6 sm:gap-10">
                  {idx % 2 === 0 ? (
                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 drop-shadow-xs hover:text-[#167C38] hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                      AMBASSADORS
                    </span>
                  ) : (
                    <span
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
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
            </div>
          </div>
        </div>

        {/* LINE 4 (EVEN - Moving Right): List of Ambassador Names */}
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-1">
          <div className="animate-marquee-right">
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {ambassadors.map((ambassador, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#167C38] hover:to-[#083a22] border border-slate-200/90 hover:border-[#167C38] shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#167C38] group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-white transition-colors">
                    {ambassador}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#167C38] group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40 border border-emerald-300/70 font-mono transition-colors">
                    Verified
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
              {ambassadors.map((ambassador, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="group flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#167C38] hover:to-[#083a22] border border-slate-200/90 hover:border-[#167C38] shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#167C38] group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-white transition-colors">
                    {ambassador}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#167C38] group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40 border border-emerald-300/70 font-mono transition-colors">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
