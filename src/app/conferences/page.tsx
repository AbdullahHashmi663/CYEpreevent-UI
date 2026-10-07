"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import {
  Sparkles,
  Mic2,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Users,
  Award,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Flame,
  Shield,
  Star,
  Compass,
  Radio,
  Share2,
  Check,
} from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  organization: string;
  image?: string;
  badge: string;
  bio: string;
  highlights: string[];
}

interface ConferenceSession {
  id: string;
  type: "talk" | "workshop";
  title: string;
  tagline: string;
  time: string;
  venue: string;
  speakers: Speaker[];
  overview: string;
  takeaways: string[];
  status: "confirmed" | "announcing_soon";
  badgeColor: string;
}

const SCHEDULE_ITEMS = [
  {
    time: "09:30 AM",
    title: "Auditorium Doors Open & Delegate Check-In",
    category: "Registration",
    desc: "Badge distribution, delegate kit collection, and welcome reception at BUIC Foyer.",
  },
  {
    time: "10:15 AM",
    title: "Grand Opening Ceremony & Welcome Address",
    category: "Plenary",
    desc: "Opening remarks by Al Nakhla Student Support Centre & Youth Insight executive leadership.",
  },
  {
    time: "10:30 AM – 12:30 PM",
    title: "Talks: Purpose of Life (Finding it & Living it)",
    category: "Keynote",
    speaker: "Raja Zia Ul Haq (CEO Youth Club) & Asad Ullah Awan",
    desc: "Inspirational keynote followed by 30-minute open interactive Q&A with the audience.",
    featured: true,
  },
  {
    time: "12:30 PM – 01:45 PM",
    title: "Networking Recess, Exhibition & Lunch Break",
    category: "Break",
    desc: "Explore the Art Gallery, tech stalls, cafeteria lounges, and student delegation booths.",
  },
  {
    time: "02:00 PM – 03:45 PM",
    title: "Workshop: Career Pro Masterclass",
    category: "Workshop",
    speaker: "Distinguished Career Specialist",
    desc: "Hands-on corporate readiness, interview mastery, and career roadmap formulation.",
    featured: true,
  },
  {
    time: "04:00 PM – 05:00 PM",
    title: "Grand Awards & Delegate Honors Ceremony",
    category: "Closing",
    desc: "Presentation of appreciation shields, delegate certificates, and competition winner honors on the main stage.",
  },
];

export default function ConferencesPage() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-[#F26522] selection:text-white">
      {/* Navbar */}
      <Header onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 pb-24">
        {/* ==================== 1. CRISP LIGHT HERO SECTION ==================== */}
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-white">
          {/* Subtle Ambient Decorative Spots */}
          <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003B96]/10 border border-[#003B96]/15 text-xs font-black uppercase tracking-widest text-[#003B96] shadow-xs">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#F26522]" />
                <span>CYE Pre Event at BUIC • Conferences & Masterclasses</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] uppercase">
                  CYE NEXUS <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003B96] via-[#0b42a3] to-[#F26522]">
                    CONFERENCES & TALKS
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                Immerse yourself in thought leadership, soul-stirring keynotes, and high-impact career masterclasses featuring top thought leaders at Bahria University on <strong className="text-slate-900 font-bold">Tuesday, 10th November 2026</strong>.
              </p>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <Calendar className="w-4 h-4 text-[#F26522]" />
                  <span>Tuesday, 10th November 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <Clock className="w-4 h-4 text-[#003B96]" />
                  <span>10:30 AM – 05:00 PM PST</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <MapPin className="w-4 h-4 text-[#167C38]" />
                  <span>Main Auditorium, BUIC E-8 Islamabad</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#F26522] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Reserve Conference Delegate Pass</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 transition-all shadow-xs cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#F26522]" />
                  <span>{copiedLink ? "Link Copied!" : "Share Event"}</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 2. FEATURED KEYNOTE SPOTLIGHT: RAJA ZIA UL HAQ ==================== */}
        <section className="py-20 relative">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-black text-[#F26522] uppercase tracking-[0.25em] block mb-1">
                  ⭐ Flagship Keynote Session
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                  Purpose of Life: Finding it & Living it
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-[#003B96] text-xs font-black">
                <Mic2 className="w-4 h-4 text-[#F26522]" />
                <span>Morning Plenary • 10:30 AM PST</span>
              </div>
            </div>

            {/* Spotlight Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Speaker Luxury Frame (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden flex flex-col items-center text-center">
                  
                  {/* Decorative Background Glows */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl pointer-events-none" />

                  {/* Top Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#003B96] text-white text-[11px] font-black uppercase tracking-wider mb-6 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Featured Keynote Speaker</span>
                  </div>

                  {/* CUSTOM IMAGE FRAME */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-6">
                    {/* Outer Glowing Dual-Gradient Border Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F26522] via-[#003B96] to-amber-500 p-[4px] shadow-[0_10px_30px_rgba(0,59,150,0.18)] group-hover:shadow-[0_15px_40px_rgba(242,101,34,0.28)] transition-all duration-500">
                      {/* Inner Pure-White Frame Canvas */}
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-4 border-white relative shadow-inner">
                        <Image
                          src="/images/zia.png"
                          alt="Raja Zia Ul Haq - CEO Youth Club"
                          fill
                          className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                          priority
                        />
                      </div>
                    </div>

                    {/* Floating Verified Badge */}
                    <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#F26522] to-[#EA580C] text-white p-2.5 rounded-2xl shadow-lg border-2 border-white">
                      <Mic2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Raja Zia Ul Haq
                  </h3>
                  <p className="text-sm font-extrabold text-[#F26522] mt-1">
                    CEO, Youth Club
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    International Life Coach & Renowned Youth Counselor
                  </p>

                  <div className="w-full pt-4 mt-4 border-t border-slate-100 space-y-2 text-left">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Profile Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>Keynote speaker across 100+ prestigious universities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>Mentor to millions on youth purpose and ethical vision</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Right Column: Talk Overview & Co-Speaker Card (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Main Session Content Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-lg bg-orange-50 text-[#F26522] text-xs font-black uppercase tracking-wider border border-orange-100">
                      Session Synopsis
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      Unlocking True Clarity in a World of Distraction
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Every great innovation, career breakthrough, and social movement starts with a clear understanding of purpose. In this dynamic address, Raja Zia Ul Haq and Asad Ullah Awan unpack how young individuals can rise above societal pressures, discover their innate purpose, and lead meaningful, impact-driven lives.
                    </p>
                  </div>

                  {/* 4 Core Pillars Grid */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Key Takeaways & Discussions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                        <Compass className="w-4 h-4 text-[#003B96] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Self-Discovery Matrix</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Finding your unique strengths & ethical compass.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                        <Flame className="w-4 h-4 text-[#F26522] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Overcoming Distraction</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Mastering digital discipline & emotional focus.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                        <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Resilience & Conviction</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Standing firm against peer and career anxieties.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Live Open-Mic Q&A</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Direct questions with Raja Zia Ul Haq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Co-Speaker Sub-Card: Asad Ullah Awan */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#003B96] to-[#F26522] p-1 flex-shrink-0 shadow-md">
                    <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-[#003B96]">
                      <Users className="w-8 h-8 text-[#003B96]" />
                    </div>
                  </div>

                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#003B96] text-[10px] font-black uppercase">
                      Co-Speaker & Mentor
                    </div>
                    <h4 className="text-lg font-black text-slate-900">
                      Asad Ullah Awan
                    </h4>
                    <p className="text-xs text-[#F26522] font-bold">
                      Youth Mentor & Motivational Counselor
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      Guiding university scholars on actionable habit transformation, emotional intelligence, and purpose execution.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ==================== 3. WORKSHOP SPOTLIGHT: CAREER PRO ==================== */}
        <section id="workshops" className="py-20 bg-white border-y border-slate-200 relative scroll-mt-24">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-black text-[#003B96] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-[0.25em] inline-block mb-1">
                  🛠️ Executive Hands-on Workshop
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                  Career Pro: The Masterclass
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-[#F26522] text-xs font-bold">
                <Briefcase className="w-4 h-4 text-[#F26522]" />
                <span>Afternoon Session • 02:00 PM PST</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Workshop Content (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Career Pro is tailored for undergraduate and graduate students aspiring to break into top-tier tech firms, startups, and multinational corporations. Learn how to package your university achievements into compelling professional value.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1.5">
                    <span className="text-xs font-black text-[#F26522] uppercase tracking-wider">Module 1</span>
                    <h4 className="text-sm font-black text-slate-900">AI-Proof Resume Engineering</h4>
                    <p className="text-xs text-slate-500">Passing ATS filters and framing technical project portfolios.</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1.5">
                    <span className="text-xs font-black text-[#003B96] uppercase tracking-wider">Module 2</span>
                    <h4 className="text-sm font-black text-slate-900">High-Impact Interview Mastery</h4>
                    <p className="text-xs text-slate-500">STAR methodology, behavioral answers & negotiation strategy.</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1.5">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Module 3</span>
                    <h4 className="text-sm font-black text-slate-900">LinkedIn Inbound Networking</h4>
                    <p className="text-xs text-slate-500">Connecting directly with engineering managers and recruiters.</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1.5">
                    <span className="text-xs font-black text-purple-600 uppercase tracking-wider">Module 4</span>
                    <h4 className="text-sm font-black text-slate-900">Career Pro Roadmap Handout</h4>
                    <p className="text-xs text-slate-500">Exclusive PDF guide & action framework for attendees.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="px-6 py-3.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#003B96] to-[#001D4D] hover:from-[#0b42a3] hover:to-[#001538] transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>Register for Career Pro Workshop</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Facilitator Placeholder Frame (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-slate-50 rounded-3xl p-8 border border-slate-200/90 text-center space-y-5 relative overflow-hidden shadow-xs">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#F26522] to-[#003B96] mx-auto p-1 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-slate-400">
                      <Briefcase className="w-10 h-10 text-[#F26522]" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F26522] bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
                      Facilitator Announcement
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Distinguished Career Expert
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Leading Industry Strategist & Talent Development Coach
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 font-medium shadow-2xs">
                    Speaker details and corporate credentials will be announced across CYE channels prior to expo day.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== 4. COMPLETE AUDITORIUM TIMELINE ==================== */}
        <section className="py-20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-5xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black text-[#F26522] uppercase tracking-[0.2em] block">
                Official Expo Day Schedule
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Auditorium Agenda & Timings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Plan your day at Bahria University on Tuesday, 10th November 2026.
              </p>
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4">
              {SCHEDULE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-6 border transition-all ${
                    item.featured
                      ? "bg-white border-[#F26522]/40 shadow-md shadow-orange-500/5"
                      : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black font-mono px-3 py-1 rounded-xl bg-slate-100 text-slate-900 border border-slate-200">
                        {item.time}
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        {item.category}
                      </span>
                    </div>

                    {item.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#F26522] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured Session</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1">
                    <h3 className="text-lg font-black text-slate-900">
                      {item.title}
                    </h3>
                    {item.speaker && (
                      <p className="text-xs font-bold text-[#F26522]">
                        {item.speaker}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 5. CALL TO ACTION BANNER ==================== */}
        <section className="pt-4">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#003B96] via-[#167C38] to-[#EA580C] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              
              <div className="space-y-2 text-center md:text-left z-10">
                <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                  Pre-Registration Open
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  Reserve Your Free Conference Seat Pass
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 max-w-xl font-medium">
                  Auditorium seating is allocated on a first-registered basis. Secure your accreditation badge for access to all talks and masterclasses.
                </p>
              </div>

              <button
                onClick={() => setRegisterOpen(true)}
                className="px-8 py-4 rounded-full text-xs sm:text-sm font-black text-[#003B96] bg-white hover:bg-slate-100 transition-all shadow-xl flex-shrink-0 cursor-pointer flex items-center gap-2 z-10"
              >
                <span>Get Conference Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Register Modal */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        defaultCompetition="CYE Nexus & Career Pro Talks"
      />
    </div>
  );
}
