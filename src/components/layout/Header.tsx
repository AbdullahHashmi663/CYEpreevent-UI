"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ArrowRight, Menu, X, Sparkles, Trophy, Users, MapPin, Phone, Compass, Info } from "lucide-react";

interface HeaderProps {
  onOpenRegister?: () => void;
}

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Compass },
  { name: "Competitions", href: "/competitions", icon: Trophy },
  { name: "Ambassadors", href: "/ambassadors", icon: Users },
  { name: "Conferences", href: "/conferences", icon: Sparkles },
  { name: "Team & About", href: "/team-about", icon: Info },
  { name: "Venue", href: "/venue", icon: MapPin },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Header({ onOpenRegister }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
            <Image
              src="/images/logo-removebg-preview 8.png"
              alt="Capital Youth Expo Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-108"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-[#003B96] leading-tight group-hover:text-[#002257] transition-colors">
              CAPITAL YOUTH EXPO
            </span>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#167C38] tracking-wide uppercase">
              PRE EVENT AT BUIC • 1ST OCT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? false
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                    : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/conferences"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-black text-[#003B96] bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/70 backdrop-blur-sm transition-all duration-200 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            <span>Conferences & Talks</span>
          </Link>

          {/* Interactive Morphing Register Now Button (Royal Blue Gradient Palette) */}
          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center justify-between gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full text-xs xl:text-sm font-black transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg cursor-pointer border-2 border-[#003B96] bg-gradient-to-r from-[#002B7A] via-[#003B96] to-[#1D4ED8] hover:bg-none hover:bg-white text-white hover:text-[#003B96] overflow-hidden"
          >
            {/* Top glass reflection highlight */}
            <span className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />

            {/* Left Circular Badge with Arrow (Visible at Rest - Image 1) */}
            <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-white text-[#003B96] flex items-center justify-center shadow-xs transition-all duration-300 group-hover:w-0 group-hover:h-0 group-hover:opacity-0 group-hover:-translate-x-3 overflow-hidden flex-shrink-0 z-10">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>

            {/* Button Label */}
            <span className="transition-colors duration-300 px-1 font-black z-10">
              Register Now
            </span>

            {/* Right Arrow (Appears on Hover - Image 2) */}
            <span className="w-0 h-0 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:h-4 xl:group-hover:w-5 xl:group-hover:h-5 group-hover:opacity-100 flex items-center justify-center text-[#003B96] overflow-hidden flex-shrink-0 group-hover:translate-x-0 -translate-x-2 z-10">
              <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 bg-white/50 backdrop-blur-sm hover:bg-slate-100/80 transition-colors border border-slate-200/70"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/60 bg-white/80 backdrop-blur-2xl px-5 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[#003B96] text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 space-y-2">
            <Link
              href="/conferences"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black text-[#003B96] bg-blue-50/80 border border-blue-200/80 backdrop-blur-sm shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F26522]" />
              <span>Conferences & Masterclasses</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRegister) onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-black text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] cye-glow-orange shadow-lg cursor-pointer"
            >
              <span>Register for Competitions</span>
              <ChevronRight className="w-4 h-4 text-white stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
