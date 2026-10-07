"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Trophy,
  Users,
  MapPin,
  Phone,
  Compass,
  Info,
  ChevronDown,
  Laptop,
} from "lucide-react";

interface HeaderProps {
  onOpenRegister?: () => void;
}

const REGISTER_DROPDOWN_OPTIONS = [
  {
    name: "Competitions",
    href: "/competitions",
    desc: "Speed Programming, Hackathon & Esports",
    icon: Trophy,
    color: "#003B96",
    badge: "9 Tracks",
  },
  {
    name: "Conferences",
    href: "/conferences",
    desc: "Keynotes, Leadership & Tech Dialogues",
    icon: Sparkles,
    color: "#F26522",
    badge: "Auditorium",
  },
  {
    name: "Workshops",
    href: "/conferences#workshops",
    desc: "Career Pro Masterclass & Hands-on Labs",
    icon: Laptop,
    color: "#167C38",
    badge: "Masterclass",
  },
];

const OTHER_NAV_ITEMS = [
  { name: "Home", href: "/", icon: Compass },
  { name: "Ambassadors", href: "/ambassadors", icon: Users },
  { name: "Team & About", href: "/team-about", icon: Info },
  { name: "Venue", href: "/venue", icon: MapPin },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Header({ onOpenRegister }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileRegisterExpanded, setMobileRegisterExpanded] = useState(true);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const isRegisterActive =
    pathname.startsWith("/competitions") || pathname.startsWith("/conferences");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
            <Image
              src="/cye-logo.png"
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
              PRE EVENT AT BUIC • 10TH NOV
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* 1. Home */}
          <Link
            href="/"
            className={`relative whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
              pathname === "/"
                ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
            }`}
          >
            Home
            {pathname === "/" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
            )}
          </Link>

          {/* 2. Unified "Register" Dropdown Tab */}
          <div
            className="relative group/dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isRegisterActive || dropdownOpen
                  ? "text-[#003B96] bg-blue-50/80 border border-blue-200/60 shadow-xs backdrop-blur-sm"
                  : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
              }`}
            >
              <span>Register</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen
                    ? "rotate-180 text-[#003B96]"
                    : "text-slate-400 group-hover/dropdown:rotate-180"
                }`}
              />
              {isRegisterActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
              )}
            </button>

            {/* Hover Dropdown Menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 visible translate-y-0 pointer-events-auto"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto"
              }`}
            >
              <div className="w-72 sm:w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-2.5 shadow-[0_20px_50px_rgba(0,35,90,0.15)] border border-slate-200/90 ring-1 ring-slate-900/5">
                {/* Header Tag */}
                <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Registration Tracks
                  </span>
                  <span className="text-[10px] font-bold text-[#167C38] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    BUIC 2026
                  </span>
                </div>

                {/* 3 Options: Competitions, Conferences, Workshops */}
                <div className="space-y-1">
                  {REGISTER_DROPDOWN_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isOptionActive =
                      opt.href === "/competitions"
                        ? pathname.startsWith("/competitions")
                        : opt.href === "/conferences"
                        ? pathname === "/conferences"
                        : false;

                    return (
                      <Link
                        key={opt.name}
                        href={opt.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`group/item flex items-center gap-3 p-2.5 rounded-2xl transition-all border ${
                          isOptionActive
                            ? "bg-blue-50/80 border-blue-200/60 text-[#003B96]"
                            : "hover:bg-slate-50 border-transparent hover:border-slate-200/70"
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110 shadow-2xs"
                          style={{
                            backgroundColor: `${opt.color}15`,
                            color: opt.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-black text-slate-900 group-hover/item:text-[#003B96] transition-colors">
                              {opt.name}
                            </span>
                            {opt.badge && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#003B96] group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Ambassadors */}
          <Link
            href="/ambassadors"
            className={`relative whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
              pathname.startsWith("/ambassadors")
                ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
            }`}
          >
            Ambassadors
            {pathname.startsWith("/ambassadors") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
            )}
          </Link>

          {/* 4. Team & About */}
          <Link
            href="/team-about"
            className={`relative whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
              pathname.startsWith("/team-about")
                ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
            }`}
          >
            Team &amp; About
            {pathname.startsWith("/team-about") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
            )}
          </Link>

          {/* 5. Venue */}
          <Link
            href="/venue"
            className={`relative whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
              pathname.startsWith("/venue")
                ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
            }`}
          >
            Venue
            {pathname.startsWith("/venue") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
            )}
          </Link>

          {/* 6. Contact */}
          <Link
            href="/contact"
            className={`relative whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
              pathname.startsWith("/contact")
                ? "text-[#003B96] bg-blue-50/70 border border-blue-200/50 shadow-xs backdrop-blur-sm"
                : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/60"
            }`}
          >
            Contact
            {pathname.startsWith("/contact") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#167C38] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* Interactive Morphing Register Now Button (Royal Blue Gradient Palette) */}
          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center justify-between gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full text-xs xl:text-sm font-black transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg cursor-pointer border-2 border-[#003B96] bg-gradient-to-r from-[#002B7A] via-[#003B96] to-[#1D4ED8] hover:bg-none hover:bg-white text-white hover:text-[#003B96] overflow-hidden"
          >
            {/* Top glass reflection highlight */}
            <span className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />

            {/* Left Circular Badge with Arrow */}
            <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-white text-[#003B96] flex items-center justify-center shadow-xs transition-all duration-300 group-hover:w-0 group-hover:h-0 group-hover:opacity-0 group-hover:-translate-x-3 overflow-hidden flex-shrink-0 z-10">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>

            {/* Button Label */}
            <span className="transition-colors duration-300 px-1 font-black z-10">
              Register Now
            </span>

            {/* Right Arrow (Appears on Hover) */}
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
        <div className="lg:hidden border-t border-slate-200/60 bg-white/90 backdrop-blur-2xl px-5 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                pathname === "/"
                  ? "bg-[#003B96] text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100/70"
              }`}
            >
              <Compass className="w-4 h-4 opacity-80" />
              <span>Home</span>
            </Link>

            {/* Register Accordion */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileRegisterExpanded(!mobileRegisterExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-[#003B96]" />
                  <span>Register Tracks</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    mobileRegisterExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileRegisterExpanded && (
                <div className="px-2 pb-2 space-y-1">
                  {REGISTER_DROPDOWN_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Link
                        key={opt.name}
                        href={opt.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-800 hover:text-[#003B96] text-xs font-bold transition-all shadow-2xs"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${opt.color}15`,
                            color: opt.color,
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <span className="block">{opt.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {opt.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Mobile Nav Items */}
            {OTHER_NAV_ITEMS.filter((item) => item.name !== "Home").map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

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

          <div className="pt-3">
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
