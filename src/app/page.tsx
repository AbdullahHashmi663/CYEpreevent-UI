"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  Trophy,
  Gamepad2,
  Mic,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Award,
  ChevronDown,
  User,
  Building,
  GraduationCap,
  Mail,
  Pencil,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Sparkles,
  BookOpen,
  Palette,
  Flame,
  Clock,
  Compass,
  Briefcase,
} from "lucide-react";

import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import CategoriesScrollSection from "@/components/home/CategoriesScrollSection";
import RegisterModal from "@/components/registration/RegisterModal";
import Footer from "@/components/layout/Footer";
import { COMPETITIONS_LIST, applyForAmbassador } from "@/lib/api";

const COMPETITION_DETAILS = [
  {
    title: "Speed Programming",
    track: "Technology",
    icon: Code,
    color: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50 text-blue-600",
    badge: "Algo & Logic",
    desc: "Solve intense algorithmic problems in C++, Python, or Java under tight time constraints.",
    team: "Individual / Duo",
    prize: "Trophy + Gold Medals",
  },
  {
    title: "Mini Hackathon",
    track: "Technology",
    icon: Trophy,
    color: "from-orange-500 to-amber-600",
    bgLight: "bg-orange-50 text-orange-600",
    badge: "Build & Pitch",
    desc: "Collaborate in fast-paced teams to build innovative software solutions and pitch live to judges.",
    team: "2 - 4 Members",
    prize: "Winner Shield + Mentorship",
  },
  {
    title: "Counter-Strike 2",
    track: "Esports & Gaming",
    icon: Gamepad2,
    color: "from-purple-600 to-violet-800",
    bgLight: "bg-purple-50 text-purple-600",
    badge: "5v5 Knockout",
    desc: "Showcase tactical prowess, aim precision, and team communication in an adrenaline-pumping tournament.",
    team: "5 Players Roster",
    prize: "Esports Trophy + Gaming Merch",
  },
  {
    title: "Speech & Seerah Quiz",
    track: "Literary & Oration",
    icon: Mic,
    color: "from-emerald-600 to-teal-700",
    bgLight: "bg-emerald-50 text-emerald-600",
    badge: "Eloquence & Knowledge",
    desc: "Demonstrate inspiring public speaking rhetoric and profound knowledge of Islamic history and Seerah.",
    team: "Individual Entry",
    prize: "Honor Shield + Certificates",
  },
  {
    title: "Essay & Short Story Writing",
    track: "Literary Arts",
    icon: BookOpen,
    color: "from-rose-600 to-red-700",
    bgLight: "bg-rose-50 text-rose-600",
    badge: "Creative Expression",
    desc: "Craft compelling essays and creative short narratives judged on originality, structure, and depth.",
    team: "Individual Entry",
    prize: "Author Shield + Publication",
  },
  {
    title: "Painting & Visual Arts",
    track: "Fine Art",
    icon: Palette,
    color: "from-amber-500 to-yellow-600",
    bgLight: "bg-amber-50 text-amber-600",
    badge: "Visual Canvas",
    desc: "Express creative vision through live painting and visual artworks on themes of hope, unity, and future.",
    team: "Individual Entry",
    prize: "Artist Shield + Art Kit",
  },
];

const MASTER_PLAN_STAGES = [
  {
    stage: "Stage 1",
    title: "Ambassador & Volunteer Drive",
    desc: "Online registration & interview screening to select enthusiastic campus representatives.",
    tag: "Recruitment",
    color: "bg-blue-600 text-white",
  },
  {
    stage: "Stage 2",
    title: "Ambassadors Meetup & Briefing",
    desc: "Initial orientation session, distribution of promotional toolkits, and role assignments.",
    tag: "Orientation",
    color: "bg-emerald-600 text-white",
  },
  {
    stage: "Stage 3",
    title: "Registrations & Campus Desk Campaigns",
    desc: "Setting up registration desks and conducting class-to-class campaigns across universities.",
    tag: "Outreach",
    color: "bg-orange-500 text-white",
  },
  {
    stage: "Stage 4",
    title: "MoU Signing & Partnerships",
    desc: "Formalizing strategic collaborations with student societies, industry leaders, and academic sponsors.",
    tag: "Strategic",
    color: "bg-indigo-600 text-white",
  },
  {
    stage: "Stage 5",
    title: "Pre-Event Strategy Session",
    desc: "Final logistics review, stage management rehearsals, and security protocols alignment.",
    tag: "Readiness",
    color: "bg-purple-600 text-white",
  },
  {
    stage: "Stage 6",
    title: "Main Event: Competitions & Conferences",
    desc: "Parallel competitive tracks, CYE Nexus, and Career Pro Talks held live at BUIC E-8 on 1st Oct 2026.",
    tag: "Grand Expo",
    color: "bg-[#F26522] text-white",
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What are the core responsibilities of an Ambassador?",
    answer:
      "Ambassadors represent CYE on campus, assist in spreading event awareness, guide student participants for competitions, and coordinate with the central organizing team.",
    iconColor: "bg-emerald-100 text-emerald-600",
    icon: User,
  },
  {
    id: 2,
    question: "Do I need prior experience in campus marketing?",
    answer:
      "No prior experience required! We provide full guidance, official promotional toolkits, and mentor support to all selected ambassadors.",
    iconColor: "bg-blue-100 text-blue-600",
    icon: GraduationCap,
  },
  {
    id: 3,
    question: "How and when will certificates and shields be distributed?",
    answer:
      "Official certificates of leadership and appreciation shields will be awarded during the closing ceremony of the CYE Pre-Event at BUIC on 1st October 2026.",
    iconColor: "bg-orange-100 text-orange-600",
    icon: Shield,
  },
  {
    id: 4,
    question: "Can students from other universities join as participants & ambassadors?",
    answer:
      "Yes! Students from all universities across Islamabad, Rawalpindi, and nationwide institutes are eligible to participate and apply.",
    iconColor: "bg-purple-100 text-purple-600",
    icon: Users,
  },
];

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState<string>(COMPETITIONS_LIST[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Ambassador Form State
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [departmentSemester, setDepartmentSemester] = useState("");
  const [email, setEmail] = useState("");
  const [motivation, setMotivation] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleOpenRegister = (competitionName?: string) => {
    if (competitionName) {
      setSelectedComp(competitionName);
    }
    setRegisterOpen(true);
  };

  const scrollToExplore = () => {
    const el = document.getElementById("explore");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleAmbassadorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName || !university || !departmentSemester || !email || !motivation) {
      setErrorMsg("All fields marked with * are required.");
      return;
    }

    setFormLoading(true);

    const res = await applyForAmbassador({
      full_name: fullName,
      university,
      department: departmentSemester,
      semester: departmentSemester,
      motivation: motivation,
    });

    setFormLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(res.message || "Application submitted successfully!");
      setFullName("");
      setUniversity("");
      setDepartmentSemester("");
      setEmail("");
      setMotivation("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Combined Area with CYE Background spanning from top of Navbar through Hero */}
      <div className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-slate-50">
        {/* Background Graphic Image extending behind Navbar */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/IMG BG.png"
            alt="Capital Youth Expo Background"
            fill
            className="object-cover object-right-top md:object-center opacity-90"
            priority
            quality={95}
          />
          {/* Subtle left gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent md:w-3/4 pointer-events-none" />
        </div>

        {/* Header Bar */}
        <Header onOpenRegister={() => handleOpenRegister()} />

        {/* 1. Main Hero Section (Fills remaining height of screen) */}
        <HeroSection
          onExploreClick={scrollToExplore}
          onRegisterClick={() => handleOpenRegister()}
        />
      </div>

      <main className="flex-1">

        {/* 2. Competitions Showcase Section */}
        <section id="explore" className="py-20 bg-white border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5 text-[#F26522]" />
                <span>Competitive Tracks</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Featured Competitions & Events
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">
                Choose your field of excellence, compete with the sharpest minds in Islamabad, and earn official accolades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {COMPETITION_DETAILS.map((comp) => {
                const IconComponent = comp.icon;
                return (
                  <div
                    key={comp.title}
                    className="group relative bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${comp.bgLight} shadow-xs transition-transform group-hover:scale-110`}>
                          <IconComponent className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span className="text-[11px] font-black text-[#003B96] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {comp.track}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider block mb-1">
                          {comp.badge}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 leading-snug group-hover:text-[#003B96] transition-colors">
                          {comp.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {comp.desc}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>👥 {comp.team}</span>
                        <span className="text-emerald-700 font-bold">🏆 {comp.prize}</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-3">
                      <button
                        onClick={() => handleOpenRegister(comp.title)}
                        className="flex-1 py-3 px-4 rounded-xl text-xs font-black text-white bg-[#003B96] hover:bg-[#002b70] shadow-sm transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                      <Link
                        href="/competitions"
                        className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors"
                      >
                        Rules
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/competitions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#003B96] to-[#002257] hover:opacity-95 shadow-md transition-all"
              >
                <span>View Complete Rules & All 9 Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. CONFERENCES & CAREER PRO TALKS HIGHLIGHT */}
        <section id="conferences" className="py-20 bg-gradient-to-br from-slate-900 via-[#002257] to-slate-950 text-white relative overflow-hidden">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-white/15">
                  <Briefcase className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>CYE Nexus & Career Pro Talks</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Connect with Industry Mentors & Visionaries
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Running alongside the competitions, CYE Nexus and Career Pro Talks bring keynote addresses, panel discussions, and career coaching directly from Pakistan&apos;s leading tech entrepreneurs and industry luminaries.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider block">Keynote Sessions</span>
                    <h4 className="text-base font-extrabold text-white">AI & Future Tech Horizons</h4>
                    <p className="text-xs text-slate-400">Emerging opportunities and technical career roadmaps.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Career Coaching</span>
                    <h4 className="text-base font-extrabold text-white">Startup & Leadership Labs</h4>
                    <p className="text-xs text-slate-400">Networking and guidance for ambitious student founders.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/15 space-y-6 text-center shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F26522] to-[#EA580C] text-white flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Free Entry for Pre-Registered Attendees</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2">
                    Seats for the conference hall are allocated on a first-come basis. Register today to reserve your seat pass.
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleOpenRegister("CYE Nexus & Career Pro Talks")}
                    className="w-full py-4 rounded-2xl text-sm font-black text-[#003B96] bg-white hover:bg-slate-100 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Reserve Conference Pass</span>
                    <ArrowRight className="w-4 h-4 text-[#003B96]" />
                  </button>

                  <Link
                    href="/conferences"
                    className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Full Speaker Lineup & Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F26522]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5 ON-SCROLL HIGHLIGHTED CATEGORIES SHOWCASE */}
        <CategoriesScrollSection />

        {/* 4. MASTER PLAN 6-STAGE ROADMAP */}
        <section className="py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#167C38]/10 text-[#167C38] text-xs font-black uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5 text-[#167C38]" />
                <span>Event Execution Strategy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                CYE 6-Stage Master Plan
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">
                Our structured roadmap ensuring seamless execution from student outreach to the grand expo day at BUIC.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MASTER_PLAN_STAGES.map((step, idx) => (
                <div
                  key={step.stage}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${step.color}`}>
                      {step.stage}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#003B96] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BECOME A CYE AMBASSADOR SECTION */}
        <section className="py-20 bg-white">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center">
              {/* Left Vector Art */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
                <div className="relative w-48 h-48 xl:w-56 xl:h-56">
                  <Image
                    src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
                    alt="Ambassador Illustration Left"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Center Main Text */}
              <div className="lg:col-span-6 space-y-4">
                <span className="block text-xs font-black text-slate-800 tracking-[0.25em] uppercase">
                  LEAD YOUR CAMPUS
                </span>

                <div className="space-y-0">
                  <h2 className="text-6xl sm:text-7xl font-black tracking-tight leading-none">
                    <span className="text-[#003B96]">C</span>
                    <span className="text-[#167C38]">Y</span>
                    <span className="text-[#F26522]">E</span>
                  </h2>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                    AMBASSADOR PROGRAM
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                  Represent Capital Youth Expo Pre-Event at BUIC on{" "}
                  <strong className="text-slate-900 font-bold">1st October 2026</strong>{" "}
                  and lead the vanguard of youth change in your department.
                </p>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <a
                    href="#ambassador-form"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] cye-glow-orange transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <Link
                    href="/ambassadors"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Program Details</span>
                    <Plus className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>
              </div>

              {/* Right Vector Art */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
                <div className="relative w-48 h-48 xl:w-56 xl:h-56">
                  <Image
                    src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
                    alt="Ambassador Illustration Right"
                    fill
                    className="object-contain scale-x-[-1]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BENEFITS & PERKS */}
        <section id="ambassador-benefits" className="py-16 bg-slate-50">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  AMBASSADOR PERKS & RECOGNITION
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                    <Award className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#167C38] tracking-wider uppercase">
                    OFFICIAL RECOGNITION
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Official leadership certificates awarded by BUIC administration & social media spotlights.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shadow-xs">
                    <Trophy className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#F26522] tracking-wider uppercase">
                    PRIZES & SHIELDS
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Exclusive appreciation shields, official merchandise, and special performance awards.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                    <Users className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#003B96] tracking-wider uppercase">
                    NETWORKING & MENTORSHIP
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    VIP backstage access and direct engagement with keynote speakers, tech founders, and judges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              <div className="bg-slate-50/80 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/80 space-y-3">
                {FAQ_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  const isOpen = activeFaq === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(item.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-9 h-9 rounded-xl ${item.iconColor} flex items-center justify-center flex-shrink-0`}>
                            <IconComp className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-slate-700" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 8. AMBASSADOR & VOLUNTEER APPLICATION FORM */}
        <section id="ambassador-form" className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  AMBASSADOR & VOLUNTEER APPLICATION FORM
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{successMsg}</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Our management team will review your submission and contact you via email.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleAmbassadorSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Enter your Full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                        University Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Enter your University name"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                        Department / Semester <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="E.g. BS Computer Science / 6th Semester"
                          value={departmentSemester}
                          onChange={(e) => setDepartmentSemester(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                      Why do you want to be an Ambassador? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Pencil className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={3}
                        placeholder="Share your motivation, leadership experience, and how you will promote CYE on campus..."
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-10 py-4 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] cye-glow-orange transition-all shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Submit Ambassador Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration Modal */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        defaultCompetition={selectedComp}
      />
    </div>
  );
}

