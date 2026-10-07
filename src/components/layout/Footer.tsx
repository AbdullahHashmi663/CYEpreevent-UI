import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Trophy, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#EA580C] via-[#F26522] to-[#C2410C] text-white border-t border-[#167C38]/40 overflow-hidden">
      {/* ── Top Radiant Green Glow Accent Line ─────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#167C38] via-[#22C55E] to-transparent shadow-[0_0_14px_#167C38] z-10" />

      {/* ── Decorative Green Architectural Lines Background Pattern ───────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Repeating Green Grid Pattern */}
            <pattern id="footer-green-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#167C38"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </pattern>

            {/* Glowing Green Linear Gradients */}
            <linearGradient id="greenLineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#167C38" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#167C38" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="greenLineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#167C38" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#167C38" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Ambient Grid overlay */}
          <rect width="100%" height="100%" fill="url(#footer-green-grid)" />

          {/* Dynamic sweeping diagonal geometric green lines */}
          <line x1="-5%" y1="15%" x2="105%" y2="75%" stroke="url(#greenLineGrad1)" strokeWidth="2.5" />
          <line x1="-10%" y1="35%" x2="110%" y2="95%" stroke="#167C38" strokeWidth="1.5" strokeDasharray="14 8" />
          <line x1="0%" y1="65%" x2="100%" y2="15%" stroke="url(#greenLineGrad2)" strokeWidth="2" />
          <line x1="-15%" y1="85%" x2="85%" y2="-5%" stroke="#22C55E" strokeWidth="1" strokeDasharray="8 6" opacity="0.7" />

          {/* Concentric Architectural Radar/Contour Green Circles */}
          <circle cx="90%" cy="25%" r="140" fill="none" stroke="#167C38" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="90%" cy="25%" r="220" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.6" />
          <circle cx="90%" cy="25%" r="320" fill="none" stroke="#167C38" strokeWidth="1" strokeDasharray="10 8" opacity="0.4" />

          <circle cx="10%" cy="85%" r="180" fill="none" stroke="#167C38" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="10%" cy="85%" r="260" fill="none" stroke="#22C55E" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>

      {/* ── Main Content Container ────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-2xl p-1.5 shadow-md border-2 border-white/60 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/cye-logo.png"
                  alt="Capital Youth Expo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white tracking-tight drop-shadow-sm font-display">
                  CAPITAL YOUTH EXPO
                </span>
                <span className="inline-block mt-0.5 text-[10px] font-black bg-[#167C38] text-white px-2 py-0.5 rounded-full border border-white/30 tracking-widest uppercase shadow-xs w-fit">
                  BUIC PRE EVENT 2026
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed drop-shadow-xs">
              Fostering innovation, leadership, and youth competitiveness at Bahria University Islamabad (BUIC) E-8 Campus. Presented jointly by Al Nakhla Student Support Centre &amp; Youth Insight Pakistan.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-28 h-12 bg-white rounded-xl p-2 border border-white/70 shadow-sm flex items-center justify-center transition-transform hover:scale-102">
                <Image
                  src="/images/al_naq_logo-removebg-preview 1.png"
                  alt="Al Nakhla Logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="relative w-24 h-12 bg-white rounded-xl p-2 border border-white/70 shadow-sm flex items-center justify-center transition-transform hover:scale-102">
                <Image
                  src="/images/youth-insight.png"
                  alt="Youth Insight Logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 drop-shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/70 shadow-[0_0_8px_#22C55E]" />
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  All Competitions
                </Link>
              </li>
              <li>
                <Link href="/ambassadors" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Ambassador Program
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Conferences &amp; Talks
                </Link>
              </li>
              <li>
                <Link href="/team-about" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Team Leadership
                </Link>
              </li>
              <li>
                <Link href="/venue" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Venue &amp; Gate Access
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all hover:font-bold">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Competitions & Tracks (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 drop-shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/70 shadow-[0_0_8px_#22C55E]" />
              <Trophy className="w-3.5 h-3.5 text-white" />
              <span>Featured Tracks</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-white/90">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/80 shadow-[0_0_6px_#22C55E]" />
                <span>Speed Programming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <span>Mini Hackathon 2026</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/80 shadow-[0_0_6px_#22C55E]" />
                <span>Counter-Strike 2 Esports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <span>Speech &amp; Seerah Quiz</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/80 shadow-[0_0_6px_#22C55E]" />
                <span>Essay &amp; Story Writing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <span>CYE Nexus &amp; Career Pro Talks</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Event & Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 drop-shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#167C38] border border-white/70 shadow-[0_0_8px_#22C55E]" />
              <span>Event Details</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white font-medium">
              <div className="flex items-start gap-3 bg-gradient-to-r from-[#002A72] via-[#003B96] to-[#0047B3] p-3.5 rounded-2xl border border-white/20 shadow-md shadow-[#002257]/25 backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-[#4ADE80] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-snug text-white">Bahria University, Shangrilla Rd, Sector E-8, Islamabad</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#002A72] via-[#003B96] to-[#0047B3] p-3.5 rounded-2xl border border-white/20 shadow-md shadow-[#002257]/25 backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-[#4ADE80]">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-white">cye.buic@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#002A72] via-[#003B96] to-[#0047B3] p-3.5 rounded-2xl border border-white/20 shadow-md shadow-[#002257]/25 backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-[#4ADE80]">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-white">+92 51 9260002 (BUIC Desk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Divider Green Line & Copyright ───────────────────────── */}
        <div className="mt-14 pt-8 border-t border-[#167C38]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/85 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Capital Youth Expo. All rights reserved. Organised by Al Nakhla &amp; Youth Insight Pakistan.
          </div>
          <div className="flex items-center gap-2 bg-[#167C38]/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/30 font-bold shadow-xs">
            <span>Built for BUIC Pre-Event • 10th November 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
