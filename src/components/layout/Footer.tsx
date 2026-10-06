import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Trophy, Sparkles, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Decorative gradient glow on top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#F26522] to-transparent" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white/10 rounded-2xl p-1 backdrop-blur-md border border-white/10">
                <Image
                  src="/images/logo-removebg-preview 8.png"
                  alt="Capital Youth Expo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white tracking-tight">
                  CAPITAL YOUTH EXPO
                </span>
                <span className="text-xs font-black text-[#167C38] tracking-widest uppercase">
                  BUIC PRE EVENT 2026
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Fostering innovation, leadership, and youth competitiveness at Bahria University Islamabad (BUIC) E-8 Campus. Presented jointly by Al Nakhla Student Support Centre & Youth Insight Pakistan.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-28 h-12 bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-center">
                <Image
                  src="/images/al_naq_logo-removebg-preview 1.png"
                  alt="Al Nakhla Logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="relative w-24 h-12 bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-center">
                <Image
                  src="/images/Vertical Logo YI 1.png"
                  alt="Youth Insight Logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  All Competitions
                </Link>
              </li>
              <li>
                <Link href="/ambassadors" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Ambassador Program
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Conferences & Talks
                </Link>
              </li>
              <li>
                <Link href="/team-about" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Team Leadership
                </Link>
              </li>
              <li>
                <Link href="/venue" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Venue & Gate Access
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Competitions & Tracks (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#003B96]" />
              <span>Featured Tracks</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Speed Programming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span>Mini Hackathon 2026</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Counter-Strike 2 Esports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Speech & Seerah Quiz</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Essay & Story Writing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>CYE Nexus & Career Pro Talks</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Event & Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Event Details
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <MapPin className="w-4 h-4 text-[#F26522] flex-shrink-0 mt-0.5" />
                <span>Bahria University, Shangrilla Rd, Sector E-8, Islamabad</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <Mail className="w-4 h-4 text-[#003B96] flex-shrink-0" />
                <span>cye.buic@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <Phone className="w-4 h-4 text-[#167C38] flex-shrink-0" />
                <span>+92 51 9260002 (BUIC Desk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Capital Youth Expo. All rights reserved. Organised by Al Nakhla & Youth Insight Pakistan.
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Built for BUIC Pre-Event • 1st October 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
