import Image from "next/image";
import { Sparkles, Shield, Compass } from "lucide-react";

export default function PresentedByBanner() {
  return (
    <div className="w-full px-3 sm:px-8 lg:px-12 xl:px-16">
      <div className="relative glass-card bg-white/95 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 w-full">
          {/* Left Vector Art & Badge */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
            <Image
              src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
              alt="Community Empowerment Illustration"
              fill
              className="object-contain"
            />
          </div>

          {/* Center Text Content */}
          <div className="flex-1 w-full min-w-0 text-center md:text-left space-y-2 px-1 sm:px-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 font-black text-xs sm:text-sm md:text-base tracking-wide sm:tracking-wider uppercase">
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-blue-100/80 text-[#003B96]">ENGAGE.</span>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-orange-100/80 text-[#F26522]">ENCOURAGE.</span>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-emerald-100/80 text-[#167C38]">EMPOWER.</span>
            </div>

            <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 leading-snug break-words">
              Presented by Al Nakhla Student Support Centre & Youth Insight Pakistan
            </h3>

            <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 max-w-full md:max-w-xl mx-auto md:mx-0 font-medium leading-relaxed break-words">
              Uniting young scholars, innovators, and leaders to collaborate, compete, and inspire across Bahria University Islamabad.
            </p>
          </div>

          {/* Right Sponsor / Organizer Logos */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-center">
            {/* Al Nakhla Logo */}
            <div className="relative w-24 sm:w-28 md:w-32 h-12 sm:h-14 bg-slate-50/80 rounded-xl sm:rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center">
              <Image
                src="/images/al_naq_logo-removebg-preview 1.png"
                alt="Al Nakhla Student Support Centre"
                fill
                className="object-contain p-1"
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-8 sm:h-10 w-[1.5px] bg-slate-200 rounded-full" />

            {/* Youth Insight Logo */}
            <div className="relative w-20 sm:w-24 md:w-28 h-12 sm:h-14 bg-slate-50/80 rounded-xl sm:rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center">
              <Image
                src="/images/youth insight.png"
                alt="Youth Insight Pakistan"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

