import Image from "next/image";
import { Sparkles, Shield, Compass } from "lucide-react";

export default function PresentedByBanner() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto">
      <div className="relative glass-card bg-white/95 rounded-2xl shadow-md border border-slate-200/80 p-4 sm:p-5 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left Vector Art & Badge */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
            <Image
              src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
              alt="Community Empowerment Illustration"
              fill
              className="object-contain"
            />
          </div>

          {/* Center Text Content */}
          <div className="flex-1 text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-1.5 font-black text-xs sm:text-sm tracking-wider uppercase">
              <span className="px-2 py-0.5 rounded-md bg-blue-100/80 text-[#003B96]">ENGAGE.</span>
              <span className="px-2 py-0.5 rounded-md bg-orange-100/80 text-[#F26522]">ENCOURAGE.</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-[#167C38]">EMPOWER.</span>
            </div>

            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
              Presented by Al Nakhla Student Support Centre & Youth Insight Pakistan
            </h3>

            <p className="text-[11px] sm:text-xs text-slate-500 max-w-xl font-medium leading-relaxed">
              Uniting young scholars, innovators, and leaders to collaborate, compete, and inspire across Bahria University Islamabad.
            </p>
          </div>

          {/* Right Sponsor / Organizer Logos */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-center">
            {/* Al Nakhla Logo */}
            <div className="relative w-24 sm:w-28 h-11 bg-slate-50/80 rounded-xl p-1.5 border border-slate-200/80 flex items-center justify-center">
              <Image
                src="/images/al_naq_logo-removebg-preview 1.png"
                alt="Al Nakhla Student Support Centre"
                fill
                className="object-contain p-0.5"
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-[1.5px] bg-slate-200 rounded-full" />

            {/* Youth Insight Logo */}
            <div className="relative w-20 sm:w-24 h-11 bg-slate-50/80 rounded-xl p-1.5 border border-slate-200/80 flex items-center justify-center">
              <Image
                src="/images/youth-insight.png"
                alt="Youth Insight Pakistan"
                fill
                className="object-contain p-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
