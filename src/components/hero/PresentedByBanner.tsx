import Image from "next/image";
import { Sparkles, Shield, Compass } from "lucide-react";

export default function PresentedByBanner() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="relative glass-card bg-white/95 rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Vector Art & Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
            <Image
              src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
              alt="Community Empowerment Illustration"
              fill
              className="object-contain"
            />
          </div>

          {/* Center Text Content */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 font-black text-base sm:text-lg tracking-wider uppercase">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100/80 text-[#003B96]">ENGAGE.</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-orange-100/80 text-[#F26522]">ENCOURAGE.</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100/80 text-[#167C38]">EMPOWER.</span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              Presented by Al Nakhla Student Support Centre & Youth Insight Pakistan
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
              Uniting young scholars, innovators, and leaders to collaborate, compete, and inspire across Bahria University Islamabad.
            </p>
          </div>

          {/* Right Sponsor / Organizer Logos */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-center">
            {/* Al Nakhla Logo */}
            <div className="relative w-28 sm:w-32 h-14 bg-slate-50/80 rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center">
              <Image
                src="/images/al_naq_logo-removebg-preview 1.png"
                alt="Al Nakhla Student Support Centre"
                fill
                className="object-contain p-1"
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-[1.5px] bg-slate-200 rounded-full" />

            {/* Youth Insight Logo */}
            <div className="relative w-24 sm:w-28 h-14 bg-slate-50/80 rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center">
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
