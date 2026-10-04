"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Briefcase,
  Zap,
  Target,
  ChevronRight,
} from "lucide-react";

import dynamic from "next/dynamic";

import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import PillarsHorizontalScrollSection from "@/components/home/PillarsHorizontalScrollSection";
import InteractiveSpotlightTextSection from "@/components/home/InteractiveSpotlightTextSection";
import CategoriesScrollSection from "@/components/home/CategoriesScrollSection";
import SponsorsMarqueeSection from "@/components/home/SponsorsMarqueeSection";
import RecapCoverflowSection from "@/components/home/RecapCoverflowSection";
import HumanAISynergySection from "@/components/home/HumanAISynergySection";
import Footer from "@/components/layout/Footer";
import { COMPETITIONS_LIST } from "@/lib/api";

const RegisterModal = dynamic(
  () => import("@/components/registration/RegisterModal"),
  { ssr: false }
);

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState<string>(COMPETITIONS_LIST[0]);

  const mainRef = useRef<HTMLElement>(null);
  const [passTilt, setPassTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 });

  const handlePassMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 14;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    setPassTilt({
      rx,
      ry,
      px: Math.round((x / rect.width) * 100),
      py: Math.round((y / rect.height) * 100),
    });
  };

  const handlePassMouseLeave = () => {
    setPassTilt({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  // Senior Animation Choreographer: Descend-on-scroll & dynamic depth triggers
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mainEl = mainRef.current;
    if (!mainEl) return;

    const ctx = gsap.context(() => {


      // -------------------------------------------------------------
      // 2. CONFERENCES & KEYNOTES (#conferences)
      // -------------------------------------------------------------
      gsap.to(".conf-orb-1", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: "#conferences",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".conf-orb-2", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#conferences",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Left Column Descend
      gsap.fromTo(
        ".conf-descend",
        { y: -45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#conferences",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Keynote Topic Cards Descend
      gsap.fromTo(
        ".conf-card-item",
        { y: -40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.14,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".conf-cards-row",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right Column 3D Holographic Pass Card Descend
      gsap.fromTo(
        ".conf-pass-card",
        { y: -65, opacity: 0, rotateX: 12, transformPerspective: 1000 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".conf-pass-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );


    }, mainEl);

    return () => ctx.revert();
  }, []);

  const handleOpenRegister = (competitionName?: string) => {
    if (competitionName) {
      setSelectedComp(competitionName);
    }
    setRegisterOpen(true);
  };

  const scrollToExplore = () => {
    const el = document.getElementById("categories") || document.getElementById("conferences");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 selection:bg-[#167C38] selection:text-white">
      {/* Header Bar */}
      <Header onOpenRegister={() => handleOpenRegister()} />

      <main ref={mainRef} className="flex-1">
        {/* 1. Main Hero Section (Lightweight, zero scroll pins/canvas frame scrubbers, clean white circuit & dot matrix) */}
        <HeroSection
          onExploreClick={scrollToExplore}
          onRegisterClick={() => handleOpenRegister()}
        />

        {/* 1.5 The Four Pillars of CYE (GSAP Horizontal Cards Scroll Section with +30px height, orange drop shadow, sharp corners) */}
        <PillarsHorizontalScrollSection onRegisterClick={handleOpenRegister} />

        {/* Interactive Spotlight Typography: "Capital Youth Expo" (100% width, min 50vh, Neue Machina Ultrabold local font) */}
        <InteractiveSpotlightTextSection />

        {/* 3. CONFERENCES & CAREER PRO TALKS (Editorial Split Stage with 3D Tilt & GSAP Descend) */}
        <section
          id="conferences"
          className="section-auto-contain relative py-24 sm:py-32 bg-gradient-to-br from-[#020b18] via-[#002257] to-[#041c0f] text-white overflow-hidden border-b border-white/10 select-none"
        >
          {/* Radiant Ambient Radial Glows */}
          <div className="conf-orb-1 absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(242,101,34,0.2)_0%,transparent_70%)] pointer-events-none will-change-transform" />
          <div className="conf-orb-2 absolute bottom-0 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,59,150,0.35)_0%,transparent_70%)] pointer-events-none will-change-transform" />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
              {/* Left Column: Keynote Topics */}
              <div className="lg:col-span-7 space-y-6">
                <div className="conf-descend will-change-transform inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest border border-white/15 backdrop-blur-md shadow-xs">
                  <Briefcase className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>EXECUTIVE KEYNOTES & WORKSHOPS</span>
                </div>

                <h2 className="conf-descend will-change-transform text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-display">
                  Direct Mentorship from Pakistan&apos;s{" "}
                  <span className="font-instrument-serif italic font-normal text-[#F26522]">
                    Tech Visionaries
                  </span>
                </h2>

                <p className="conf-descend will-change-transform text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  Running parallel to competitive tracks, CYE Nexus brings keynote panels, startup founder circles, and hands-on career clinics directly to the students of Islamabad.
                </p>

                <div className="conf-cards-row grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="conf-card-item will-change-transform p-5 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md space-y-2 hover:border-white/35 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-[#F26522] flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#F26522] uppercase tracking-wider block">
                      Keynote Series
                    </span>
                    <h4 className="text-base font-black text-white">
                      AI & Deep Tech Horizons
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Roadmaps to international tech careers, LLM engineering, and venture funding.
                    </p>
                  </div>

                  <div className="conf-card-item will-change-transform p-5 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md space-y-2 hover:border-white/35 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      Career Clinic
                    </span>
                    <h4 className="text-base font-black text-white">
                      Startup & Founder Labs
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Direct 1-on-1 resume reviews and seed networking for student entrepreneurs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Holographic VIP Pass Card with 3D Tilt Sheen */}
              <div className="lg:col-span-5">
                <div
                  onMouseMove={handlePassMouseMove}
                  onMouseLeave={handlePassMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${passTilt.rx}deg) rotateY(${passTilt.ry}deg)`,
                    transition: "transform 0.12s ease-out",
                  }}
                  className="conf-pass-card will-change-transform relative rounded-[32px] p-8 sm:p-9 border border-white/20 bg-slate-900/85 backdrop-blur-2xl shadow-2xl space-y-6 text-center overflow-hidden group hover:border-white/40"
                >
                  {/* Holographic Top Glow Sheen dynamically following cursor */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75"
                    style={{
                      background: `radial-gradient(circle 280px at ${passTilt.px}% ${passTilt.py}%, rgba(242,101,34,0.35) 0%, rgba(0,59,150,0.25) 50%, transparent 80%)`,
                    }}
                  />
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#F26522]/25 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#003B96]/35 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                  {/* Icon Emblem */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F26522] to-[#EA580C] text-white flex items-center justify-center mx-auto shadow-xl">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>

                  <div className="relative z-10">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10.5px] font-mono font-bold uppercase tracking-widest inline-block mb-3">
                      BUIC AUDITORIUM PASS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display">
                      Free Entry for Pre-Registered Attendees
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-medium">
                      Auditorium seating is allocated on a strict first-come basis. Reserve your conference badge today.
                    </p>
                  </div>

                  {/* Ticket Notch Aesthetic */}
                  <div className="relative z-10 pt-2 border-t border-dashed border-white/20 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>SEATS: 250 AVAILABLE</span>
                    <span className="text-emerald-400 font-bold">LIVE ADMISSION</span>
                  </div>

                  <button
                    onClick={() => handleOpenRegister("CYE Nexus & Career Pro Talks")}
                    className="relative z-10 w-full py-4 rounded-2xl text-sm font-black text-slate-950 bg-white hover:bg-slate-100 hover:scale-[1.02] active:scale-98 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Reserve Conference Pass</span>
                    <ChevronRight className="w-4 h-4 text-slate-950 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.25 SPONSORS & AMBASSADORS EDITORIAL SCROLL MARQUEE */}
        <SponsorsMarqueeSection />

        {/* 3.5 ON-SCROLL HIGHLIGHTED CATEGORIES SHOWCASE */}
        <CategoriesScrollSection />

        {/* 3.75 3D COVERFLOW RECAP OF CAPITAL YOUTH EXPO 2023 */}
        <RecapCoverflowSection />

        {/* 3.85 HUMAN × AI SYNERGY SCROLL INTERACTION (Hand Contact & Ignited Spark) */}
        <HumanAISynergySection />


      </main>

      {/* Footer */}
      <Footer />

      {/* Dynamic Registration Modal */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        defaultCompetition={selectedComp}
      />
    </div>
  );
}
