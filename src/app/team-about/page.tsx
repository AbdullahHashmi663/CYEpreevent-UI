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
  department: string;
  lead: string;
  scope: string;
  color: string;
}

const DEPARTMENT_LEADS: DepartmentLead[] = [
  {
    department: "Technology & Coding Track",
    lead: "Technical Committee",
    scope: "Overseeing Speed Programming algorithmic judging, Mini Hackathon sprint infrastructure, and offline testing sandbox.",
    color: "from-blue-600 to-indigo-700",
  },
  {
    department: "Literary Arts & Speech",
    lead: "Literary Secretariat",
    scope: "Managing English/Urdu Speech adjudication, Seerah Quiz buzzer system, Essay & Short Story blind evaluation.",
    color: "from-emerald-600 to-teal-700",
  },
  {
    department: "Gaming Arena & Esports",
    lead: "Esports Management",
    scope: "Coordinating 5v5 Counter-Strike 2 tournament brackets, low-latency LAN configurations, and live spectator broadcast.",
    color: "from-purple-600 to-violet-800",
  },
  {
    department: "Logistics, Safety & Security",
    lead: "Venue Operations",
    scope: "Administering Bahria University E-8 Gate 1 & 2 security passes, venue signage, safety protocols, and emergency medical desks.",
    color: "from-amber-600 to-orange-700",
  },
  {
    department: "Ambassadors & Campus Outreach",
    lead: "Mobilization Wing",
    scope: "Supervising 100+ campus ambassadors, desk registration campaigns, promotional kits, and inter-university MoUs.",
    color: "from-rose-600 to-pink-700",
  },
  {
    department: "Delegate Services & Media",
    lead: "Communications Team",
    scope: "Accreditation badges, photography, live social streaming, and VIP reception at CYE Nexus Conference.",
    color: "from-cyan-600 to-blue-700",
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
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

            {/* Level 1: Event Head */}
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-br from-[#003B96] to-[#001D4D] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-400/20 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Crown className="w-24 h-24" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-3">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Event Head</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Mamoon Ahmed Ali
                </h3>
                <p className="text-blue-200 text-xs sm:text-sm font-medium mt-1">
                  Overall Event Strategy, Executive Supervision & BUIC Protocol
                </p>
              </div>
            </div>

            {/* Connector Line 1 */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-slate-300" />
            </div>

            {/* Level 2: Deputy Event Heads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md text-center space-y-2 relative overflow-hidden group hover:border-[#167C38] transition-all">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#167C38] text-[11px] font-black uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Deputy Event Head</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Hamid Sultan
                </h4>
                <p className="text-slate-500 text-xs font-medium">
                  Operations, Technical Tracks & Ambassador Mobilization
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md text-center space-y-2 relative overflow-hidden group hover:border-[#F26522] transition-all">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#F26522] text-[11px] font-black uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Deputy Event Head</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Hiba Ali
                </h4>
                <p className="text-slate-500 text-xs font-medium">
                  Literary Arts, Conferences & Institutional Partnerships
                </p>
              </div>
            </div>

            {/* Team Coverflow Marquee Carousel (Auto-advances every 2.5s) */}
            <TeamCoverflowMarquee />

            {/* Connector Line 2 */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-slate-300" />
            </div>

            {/* Level 3: Department Leads Grid */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Departmental Operational Committees
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEPARTMENT_LEADS.map((dept) => (
                  <div
                    key={dept.department}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-[#003B96] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-lg">
                          {dept.lead}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 leading-snug">
                        {dept.department}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {dept.scope}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dedicated On-Site Team</span>
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
                      src="/images/youth-insight.png"
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
