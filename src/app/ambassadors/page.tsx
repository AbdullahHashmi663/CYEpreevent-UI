"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import { applyForAmbassador } from "@/lib/api";
import {
  Award,
  Trophy,
  Users,
  ChevronDown,
  User,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Pencil,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Sparkles,
  Compass,
  Star,
  Zap,
} from "lucide-react";

const MASTER_PLAN_STAGES = [
  {
    stage: "Stage 1",
    title: "Ambassador & Volunteer Registration",
    desc: "Online applications opened nationwide. Candidates undergo interview screening to select the finest leadership cohort.",
    tag: "Recruitment & Selection",
    color: "bg-blue-600 text-white",
  },
  {
    stage: "Stage 2",
    title: "Ambassadors Meetup & Orientation",
    desc: "Central orientation session at BUIC to align vision, distribute official promotional toolkits, and assign departmental roles.",
    tag: "Briefing & Toolkits",
    color: "bg-emerald-600 text-white",
  },
  {
    stage: "Stage 3",
    title: "Registrations & Campus Desk Campaigns",
    desc: "Ambassadors establish promotional registration desks, host info sessions, and run class-to-class campaigns in their institutes.",
    tag: "Outreach & Mobilization",
    color: "bg-orange-500 text-white",
  },
  {
    stage: "Stage 4",
    title: "MoU Signing & Institutional Partnerships",
    desc: "Executive committee signs formal partnerships and MoUs with top university departments, student bodies, and media partners.",
    tag: "Strategic Alliances",
    color: "bg-indigo-600 text-white",
  },
  {
    stage: "Stage 5",
    title: "Pre-Event Strategy & Logistics Session",
    desc: "Comprehensive rehearsal, team assignments, security clearance protocols, and stage management walkthrough.",
    tag: "Final Readiness",
    color: "bg-purple-600 text-white",
  },
  {
    stage: "Stage 6",
    title: "Grand Main Event at BUIC",
    desc: "Parallel competitive tracks, CYE Nexus, and Career Pro Talks culminate at Bahria University Islamabad Campus on 10th Nov 2026.",
    tag: "Expo Day Execution",
    color: "bg-[#F26522] text-white",
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What are the core responsibilities of an Ambassador?",
    answer:
      "Ambassadors represent CYE on their home campuses, guide fellow students through the competition tracks, facilitate registration desks, and assist the core management team on event day at BUIC.",
    iconColor: "bg-emerald-100 text-emerald-600",
    icon: User,
  },
  {
    id: 2,
    question: "Do I need prior experience in campus marketing or event management?",
    answer:
      "No prior experience is necessary! We provide a complete orientation, promotional toolkits, leadership workshops, and dedicated support from our senior organizing committee.",
    iconColor: "bg-blue-100 text-blue-600",
    icon: GraduationCap,
  },
  {
    id: 3,
    question: "How and when will certificates and shields be distributed?",
    answer:
      "Official Certificates of Leadership and commemorative shields will be presented on stage during the Grand Closing Ceremony of the CYE Pre-Event at Bahria University on 10th November 2026.",
    iconColor: "bg-orange-100 text-orange-600",
    icon: Shield,
  },
  {
    id: 4,
    question: "Can students from other universities join as ambassadors?",
    answer:
      "Yes! Students from all universities across Islamabad, Rawalpindi, and surrounding cities are warmly invited to apply for the ambassador cohort.",
    iconColor: "bg-purple-100 text-purple-600",
    icon: Users,
  },
];

export default function AmbassadorsPage() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [departmentSemester, setDepartmentSemester] = useState("");
  const [motivation, setMotivation] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const scrollToForm = () => {
    const el = document.getElementById("application-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMasterPlan = () => {
    const el = document.getElementById("master-plan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName || !phone || !email || !university || !departmentSemester || !motivation) {
      setErrorMsg("All fields marked with * are required.");
      return;
    }

    setLoading(true);

    const res = await applyForAmbassador({
      full_name: fullName,
      phone,
      email,
      university,
      department: departmentSemester,
      semester: departmentSemester,
      motivation: motivation,
    });

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(res.message || "Application submitted successfully!");
      setFullName("");
      setPhone("");
      setEmail("");
      setUniversity("");
      setDepartmentSemester("");
      setMotivation("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Header onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 pb-20">
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-14 lg:py-20 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center">
              
              {/* Left Vector Art (Moves from Top-Left into place on scroll) */}
              <motion.div
                initial={{ opacity: 0, x: -90, y: -70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.25, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex lg:col-span-3 justify-center items-center will-change-transform"
              >
                <div className="relative w-48 h-48 xl:w-56 xl:h-56">
                  <Image
                    src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
                    alt="Ambassador Illustration Left"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Center Main Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>Campus Leadership Cohort 2026</span>
                </div>

                <div className="space-y-0">
                  <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-none">
                    <span className="text-[#003B96]">C</span>
                    <span className="text-[#167C38]">Y</span>
                    <span className="text-[#F26522]">E</span>
                  </h1>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                    AMBASSADOR PROGRAM
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                  Represent Capital Youth Expo Pre-Event at BUIC on{" "}
                  <strong className="text-slate-900 font-bold">10th November 2026</strong>. Lead your campus community, gain leadership experience, and earn official honors.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Apply as Ambassador</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={scrollToMasterPlan}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Explore Master Plan</span>
                    <Compass className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </motion.div>

              {/* Right Vector Art (Moves from Top-Right into place on scroll) */}
              <motion.div
                initial={{ opacity: 0, x: 90, y: -70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.25, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex lg:col-span-3 justify-center items-center will-change-transform"
              >
                <div className="relative w-48 h-48 xl:w-56 xl:h-56">
                  <Image
                    src="/images/ChatGPT Image Aug 18, 2026, 03_38_03 AM 1.png"
                    alt="Ambassador Illustration Right"
                    fill
                    className="object-contain scale-x-[-1]"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. MASTER PLAN 6-STAGE ROADMAP ==================== */}
        <section id="master-plan" className="py-20 bg-white border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#167C38]/10 text-[#167C38] text-xs font-black uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5 text-[#167C38]" />
                  <span>Program Architecture</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  Master Plan: 6 Stages to Grand Expo
                </h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">
                  The step-by-step organizational journey connecting campus ambassadors to the main event execution on 10th November 2026.
                </p>
              </div>

              {/* 6 Stages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MASTER_PLAN_STAGES.map((st) => (
                  <div
                    key={st.stage}
                    className="bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${st.color}`}>
                        {st.stage}
                      </span>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                        {st.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#003B96] transition-colors leading-snug">
                      {st.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BENEFITS & PERKS SECTION ==================== */}
        <section id="benefits" className="py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  AMBASSADOR PERKS & BENEFITS
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              {/* 3 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                    <Award className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#167C38] tracking-wider uppercase">
                    OFFICIAL RECOGNITION
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Official leadership certificate endorsed by BUIC and featured recognition across all CYE digital media channels.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-xs">
                    <Trophy className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#F26522] tracking-wider uppercase">
                    PRIZES & SHIELDS
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Custom appreciation shields, official merchandise, and special honors for top performing campus delegations.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                    <Users className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black text-[#003B96] tracking-wider uppercase">
                    NETWORKING & PERKS
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Direct VIP access to keynote speakers, startup founders, academics, and Al Nakhla & Youth Insight executives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. FAQ SECTION ==================== */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              {/* FAQ Accordion List */}
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

        {/* ==================== 5. APPLICATION FORM SECTION ==================== */}
        <section id="application-form" className="py-20 bg-slate-50">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
                <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                  AMBASSADOR APPLICATION FORM
                </h2>
                <span className="w-12 sm:w-16 h-[2px] bg-[#F26522] rounded-full" />
              </div>

              {/* Form Box */}
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
                        Our management committee will review your submission and schedule your orientation call.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 font-display">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 font-display">
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="E.g. +92 300 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email & University */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 font-display">
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
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 font-display">
                        University / Institute <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="E.g. Bahria University Islamabad"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Department & Semester */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 font-display">
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
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3 Textarea */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                      Why do you want to be a CYE Ambassador? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Pencil className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={4}
                        placeholder="Explain your motivation, previous leadership or event activities, and how you will mobilize students on your campus..."
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-12 py-4 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] cye-glow-orange transition-all shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
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

      {/* Register Modal */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </div>
  );
}
