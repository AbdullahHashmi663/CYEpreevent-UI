import Image from "next/image";

export default function PresentedByBanner() {
  return (
    <div className="w-full px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="relative glass-card bg-white/95 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 w-full">
          {/* Left Vector Art / Community Icon */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
            <Image
              src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
              alt="Community Empowerment"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80px, 112px"
            />
          </div>

          {/* Center Text Content */}
          <div className="flex-1 w-full min-w-0 text-center md:text-left space-y-2">
            {/* Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 font-black text-[10px] sm:text-xs md:text-sm tracking-wider uppercase">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100/90 text-[#003B96] border border-blue-200/60 shadow-2xs">
                ENGAGE.
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100/90 text-[#F26522] border border-orange-200/60 shadow-2xs">
                ENCOURAGE.
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-[#167C38] border border-emerald-200/60 shadow-2xs">
                EMPOWER.
              </span>
            </div>

            {/* Sub-heading */}
            <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 leading-snug break-words max-w-[320px] sm:max-w-none mx-auto md:mx-0">
              Presented by Al Nakhla Student Support Centre &amp; Youth Insight Pakistan
            </h3>

            {/* Description Paragraph with Controlled Mobile Max-Width */}
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-medium leading-relaxed break-words max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-xl mx-auto md:mx-0">
              Uniting young scholars, innovators, and leaders to collaborate, compete, and inspire across Bahria University Islamabad.
            </p>
          </div>

          {/* Right Sponsor / Organizer Logos */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-center">
            {/* Al Nakhla Logo */}
            <div className="relative w-24 sm:w-28 md:w-30 h-11 sm:h-13 bg-slate-50/90 rounded-xl sm:rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center shadow-2xs">
              <Image
                src="/images/al-nakhla-logo.png"
                alt="Al Nakhla Student Support Centre"
                fill
                className="object-contain p-1"
                sizes="120px"
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-7 sm:h-9 w-[1.5px] bg-slate-200 rounded-full" />

            {/* Youth Insight Logo */}
            <div className="relative w-22 sm:w-26 md:w-28 h-11 sm:h-13 bg-slate-50/90 rounded-xl sm:rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center shadow-2xs">
              <Image
                src="/images/youth-insight.png"
                alt="Youth Insight Pakistan"
                fill
                className="object-contain p-1"
                sizes="112px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
