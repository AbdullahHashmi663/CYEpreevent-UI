"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import TeamCoverflowMarquee from "@/components/team/TeamCoverflowMarquee";
import {
  Users,
  Shield,
  Target,
  Award,
  Crown,
  Sparkles,
  Layers,
  CheckCircle2,
  Building,
  GraduationCap,
  ArrowRight,
  UserCheck,
  Briefcase,
} from "lucide-react";

interface DepartmentLead {
  name: string;
  department: string;
  lead: string;
  scope: string;
  image: string;
}

const DEPARTMENT_LEADS: DepartmentLead[] = [
  {
    name: "Hamza Ali",
    department: "Technology & Coding Track",
    lead: "Technical Committee Lead",
    scope: "Overseeing Speed Programming algorithmic judging, Mini Hackathon sprint infrastructure, and offline testing sandbox.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.43 PM.jpeg",
  },
  {
    name: "Ayesha Khan",
    department: "Literary Arts & Speech",
    lead: "Literary Secretariat Lead",
    scope: "Managing English/Urdu Speech adjudication, Seerah Quiz buzzer system, Essay & Short Story blind evaluation.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM (2).jpeg",
  },
  {
    name: "Zaid Ahmed",
    department: "Gaming Arena & Esports",
    lead: "Esports Management Lead",
    scope: "Coordinating 5v5 Counter-Strike 2 tournament brackets, low-latency LAN configurations, and live spectator broadcast.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM.jpeg",
  },
  {
    name: "Fatima Noor",
    department: "Logistics, Safety & Security",
    lead: "Venue Operations Lead",
    scope: "Administering Bahria University E-8 Gate 1 & 2 security passes, venue signage, safety protocols, and emergency medical desks.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.46 PM.jpeg",
  },
  {
    name: "Bilal Tariq",
    department: "Ambassadors & Campus Outreach",
    lead: "Mobilization Wing Lead",
    scope: "Supervising 100+ campus ambassadors, desk registration campaigns, promotional kits, and inter-university MoUs.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.47 PM.jpeg",
  },
  {
    name: "Maham Tariq",
    department: "Delegate Services & Media",
    lead: "Communications & Media Lead",
    scope: "Accreditation badges, photography, live social streaming, and VIP reception at CYE Nexus Conference.",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.45 PM.jpeg",
  },
];

export default function TeamAboutPage() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-16">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Leadership & Vision</span>
            </div>
            <h1
              className="font-serif italic font-normal text-[#167C38] tracking-normal"
              style={{
                fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
                fontSize: "52px",
                lineHeight: "56px",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              About CYE & Executive Body
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Organized by <strong className="text-slate-800">Al Nakhla Student Support Centre</strong> and <strong className="text-slate-800">Youth Insight Pakistan</strong> in collaboration with Bahria University Islamabad.
            </p>
          </div>

          {/* ==================== 1. LEADERSHIP HIERARCHY ORG TREE ==================== */}
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#F26522] uppercase tracking-[0.2em]">
                Executive Committee Structure
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Organizing Leadership Hierarchy
              </h2>
            </div>

            {/* Level 1: Event Head (Geometric Conic Pattern with Gold Neon Lighting Effect) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[350px] h-[490px] sm:h-[520px] rounded-3xl overflow-hidden border border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_65px_rgba(245,158,11,0.5)] hover:border-amber-400/80 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-end group select-none">
                {/* 3D Geometric Cube Pattern Background with Glowing Neon Lines */}
                <div className="absolute inset-0 geometric-cube-pattern geometric-lighting-gold pointer-events-none" />

                {/* Radiant Ambient Halo Light Effect Behind Person */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-500/30 blur-3xl animate-neon-pulse pointer-events-none" />

                {/* Subtle Ambient Vignette and Bottom Gradient Fade */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/92 via-38% to-transparent pointer-events-none" />

                {/* Floating Crown Badge with Neon Glow */}
                <div className="absolute top-4 right-4 z-20 opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
                  <Crown className="w-10 h-10 text-amber-400" />
                </div>

                {/* Transparent Cutout Portrait with 3D Drop Shadow */}
                <div className="absolute inset-x-0 top-3 h-[320px] sm:h-[350px] pointer-events-none">
                  <Image
                    src="/images/members/without-bg/WhatsApp_Image_2026-08-24_at_12.10.44_PM__1_-removebg-preview.png"
                    alt="Mamoon Ahmed Ali - Event Head"
                    fill
                    className="object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 sm:p-7 text-center space-y-1.5 pointer-events-none">
                  <h3 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-snug drop-shadow-md">
                    Mamoon Ahmed Ali
                  </h3>

                  <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                    Event Head
                  </p>

                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed max-w-[280px] mx-auto pt-1 line-clamp-3">
                    Overall Event Strategy, Executive Supervision & BUIC Protocol
                  </p>
                </div>
              </div>
            </div>

            {/* Connector Line 1 with Glowing Gradient */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400/50 to-slate-400" />
            </div>

            {/* Level 2: Deputy Event Heads (Geometric Pattern with Lighting Lines) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto justify-items-center">
              {/* Deputy Head 1: Hamid Sultan (Emerald Neon Lighting) */}
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] h-[480px] sm:h-[500px] rounded-3xl overflow-hidden border border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:shadow-[0_0_65px_rgba(16,185,129,0.5)] hover:border-emerald-400/80 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-end group select-none">
                {/* 3D Geometric Cube Pattern Background with Emerald Glowing Lines */}
                <div className="absolute inset-0 geometric-cube-pattern geometric-lighting-emerald pointer-events-none" />

                {/* Radiant Ambient Halo Light Effect Behind Person */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-emerald-500/30 blur-3xl animate-neon-pulse pointer-events-none" />

                {/* Ambient Vignette and Bottom Fade */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09120c] via-[#09120c]/92 via-38% to-transparent pointer-events-none" />

                {/* Transparent Cutout Portrait */}
                <div className="absolute inset-x-0 top-3 h-[310px] sm:h-[330px] pointer-events-none">
                  <Image
                    src="/images/members/without-bg/WhatsApp_Image_2026-08-24_at_12.10.46_PM-removebg-preview.png"
                    alt="Hamid Sultan - Deputy Event Head"
                    fill
                    className="object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 sm:p-7 text-center space-y-1.5 pointer-events-none">
                  <h4 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug drop-shadow-md">
                    Hamid Sultan
                  </h4>

                  <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                    Deputy Event Head
                  </p>

                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed max-w-[280px] mx-auto pt-1 line-clamp-3">
                    Operations, Technical Tracks & Ambassador Mobilization
                  </p>
                </div>
              </div>

              {/* Deputy Head 2: Hiba Ali (Orange Neon Lighting) */}
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] h-[480px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#F26522]/50 shadow-[0_0_40px_rgba(242,101,34,0.25)] hover:shadow-[0_0_65px_rgba(242,101,34,0.5)] hover:border-[#F26522]/80 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-end group select-none">
                {/* 3D Geometric Cube Pattern Background with Orange Glowing Lines */}
                <div className="absolute inset-0 geometric-cube-pattern geometric-lighting-orange pointer-events-none" />

                {/* Radiant Ambient Halo Light Effect Behind Person */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-orange-500/30 blur-3xl animate-neon-pulse pointer-events-none" />

                {/* Ambient Vignette and Bottom Fade */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-[#140b07]/92 via-38% to-transparent pointer-events-none" />

                {/* Transparent Cutout Portrait */}
                <div className="absolute inset-x-0 top-3 h-[310px] sm:h-[330px] pointer-events-none">
                  <Image
                    src="/images/members/without-bg/WhatsApp_Image_2026-08-24_at_12.10.45_PM-removebg-preview.png"
                    alt="Hiba Ali - Deputy Event Head"
                    fill
                    className="object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 sm:p-7 text-center space-y-1.5 pointer-events-none">
                  <h4 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug drop-shadow-md">
                    Hiba Ali
                  </h4>

                  <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#F26522] drop-shadow-[0_0_12px_rgba(242,101,34,0.4)]">
                    Deputy Event Head
                  </p>

                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed max-w-[280px] mx-auto pt-1 line-clamp-3">
                    Literary Arts, Conferences & Institutional Partnerships
                  </p>
                </div>
              </div>
            </div>

            {/* Team Coverflow Marquee Carousel (Auto-advances every 2.5s) */}
            <TeamCoverflowMarquee />

            {/* Connector Line 2 */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-slate-300" />
            </div>

            {/* Level 3: Department Leads Grid (Green Portrait Cards matching reference) */}
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-black text-[#167C38] uppercase tracking-[0.2em]">
                  Departmental Operational Committees
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Department Leads & Committee Directors
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {DEPARTMENT_LEADS.map((dept) => (
                  <div
                    key={dept.name}
                    className="relative w-full h-[470px] sm:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c8346] via-[#106232] to-[#06391a] border border-emerald-400/25 shadow-[0_15px_35px_rgba(6,57,26,0.3)] hover:shadow-[0_25px_50px_rgba(6,57,26,0.5)] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-end group select-none"
                  >
                    {/* Top Portrait Image with Grayscale and Zoom Effect */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={dept.image}
                        alt={dept.name}
                        fill
                        className="object-cover object-top filter grayscale contrast-115 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      {/* Top Soft Green Ambient Blend */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#1c8346]/40 via-transparent to-transparent pointer-events-none" />
                      {/* Bottom Deep Green Fade for crystal-clear text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#063317] via-[#063317]/95 via-42% to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative z-10 p-6 sm:p-7 text-center space-y-1.5 pointer-events-none">
                      {/* Name */}
                      <h4 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug drop-shadow-md">
                        {dept.name}
                      </h4>

                      {/* Designation */}
                      <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-200 drop-shadow-xs">
                        {dept.lead}
                      </p>

                      {/* Scope / Description */}
                      <p className="text-xs sm:text-[13px] text-white/80 font-medium leading-relaxed max-w-[280px] mx-auto pt-1 line-clamp-3">
                        {dept.scope}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================== 2. MISSION, VISION & PILLARS ==================== */}
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#003B96] uppercase tracking-[0.2em]">
                Foundational Objectives
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Mission & Strategic Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#003B96] flex items-center justify-center shadow-xs">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Provide an inclusive, high-caliber inter-university platform where students showcase technical prowess, critical thinking, artistic creativity, and competitive sportsmanship.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center shadow-xs">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Bridge the gap between academia and modern technology industries, nurturing a forward-looking generation capable of ethical leadership and national innovation.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#167C38] flex items-center justify-center shadow-xs">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Three Pillars</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-800">Engage</strong> every student, <strong className="text-slate-800">Encourage</strong> bold ideation and creative problem solving, and <strong className="text-slate-800">Empower</strong> youth with real mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* ==================== 3. ORGANIZING PARTNERS DEEP DIVE ==================== */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#167C38] uppercase tracking-[0.2em]">
                Collaborative Coalition
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Organizing Bodies & Patrons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Partner 1 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-16 relative w-48">
                    <Image
                      src="/images/al_naq_logo-removebg-preview 1.png"
                      alt="Al Nakhla Student Support Centre Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Al Nakhla Student Support Centre
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    A premier student development initiative based at Bahria University dedicated to academic mentorship, personal development, community service, and fostering career-readiness among university scholars.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#003B96]">
                  <Building className="w-4 h-4" />
                  <span>Primary Host Organization</span>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-16 relative w-44">
                    <Image
                      src="/images/Vertical Logo YI 1.png"
                      alt="Youth Insight Pakistan Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Youth Insight Pakistan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    A national youth engagement ecosystem creating transformative leadership summits, educational seminars, competitive festivals, and industry networking platforms across Pakistan.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#F26522]">
                  <Briefcase className="w-4 h-4" />
                  <span>Strategic National Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#003B96] via-[#167C38] to-[#EA580C] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl font-black">
                Ready to Join the Expo Movement?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                Register as a competitor or apply for the campus ambassador program today.
              </p>
            </div>
            <button
              onClick={() => setRegisterOpen(true)}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black text-[#003B96] bg-white hover:bg-slate-100 transition-all shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </div>
  );
}
