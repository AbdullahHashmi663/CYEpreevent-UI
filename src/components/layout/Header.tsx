"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Trophy,
  Users,
  MapPin,
  Phone,
  Compass,
  Info,
} from "lucide-react";

interface HeaderProps {
  onOpenRegister?: () => void;
}

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Compass },
  { name: "Competitions", href: "/competitions", icon: Trophy },
  { name: "Ambassadors", href: "/ambassadors", icon: Users },
  { name: "Conferences", href: "/#conferences", icon: Sparkles },
  { name: "Team & About", href: "/team-about", icon: Info },
  { name: "Venue", href: "/venue", icon: MapPin },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Header({ onOpenRegister }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsScrolled(false);
        setScrollDirection("up");
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY.current + 8) {
          // Scrolling downward
          setScrollDirection("down");
        } else if (currentScrollY < lastScrollY.current - 8) {
          // Scrolling upward
          setScrollDirection("up");
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shrunk state when scrolled down
  const isShrunk = isScrolled && scrollDirection === "down";

  return (
    <motion.header
      initial={false}
      animate={{
        height: isShrunk ? 60 : 80,
        backgroundColor: isShrunk
          ? "rgba(255, 255, 255, 0.39)"
          : "rgba(255, 255, 255, 0.47)",
        boxShadow: isShrunk
          ? "0 12px 30px -10px rgba(0, 59, 150, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.04)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.03)",
        borderColor: isShrunk
          ? "rgba(226, 232, 240, 0.65)"
          : "rgba(226, 232, 240, 0.9)",
      }}
      transition={{
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl border-b select-none will-change-transform"
    >
      <div className="w-full h-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">

        {/* Brand Logo & Title with smooth Motion Scale */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <motion.div
            animate={{
              scale: isShrunk ? 0.86 : 1,
            }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 origin-left"
          >
            <Image
              src="/images/logo-removebg-preview 8.png"
              alt="Capital Youth Expo Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-[#003B96] leading-tight group-hover:text-[#002257] transition-colors font-display text-sm sm:text-base">
                CAPITAL YOUTH EXPO
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-orange-100 text-[#F26522] font-black uppercase tracking-wider text-[10px]">
                BUIC 2026
              </span>
            </div>
            <motion.span
              animate={{
                opacity: isShrunk ? 0.85 : 1,
                fontSize: isShrunk ? "10px" : "11.5px",
              }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-extrabold text-[#167C38] tracking-wide uppercase"
            >
              PRE EVENT AT BUIC • 1ST OCT
            </motion.span>
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
                className={`relative px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${isActive
                    ? "text-[#003B96] bg-blue-50/80 shadow-xs"
                    : "text-slate-600 hover:text-[#003B96] hover:bg-slate-100/70"
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

        {/* Right CTA Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.button
            animate={{
              paddingTop: isShrunk ? "8px" : "10px",
              paddingBottom: isShrunk ? "8px" : "10px",
              paddingLeft: isShrunk ? "18px" : "24px",
              paddingRight: isShrunk ? "18px" : "24px",
            }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={onOpenRegister}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full text-xs xl:text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-shadow duration-300 shadow-md cursor-pointer active:scale-98"
          >
            <span>Register Now</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight className="w-3.5 h-3.5 text-white stroke-[3]" />
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-5 pt-4 pb-8 space-y-3 shadow-2xl overflow-hidden"
          >
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive
                        ? "bg-[#003B96] text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
