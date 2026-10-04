"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowUpRight,
  Sparkles,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Ticket,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User,
  Building,
  GraduationCap,
  Clock,
  ExternalLink,
} from "lucide-react";

// Starburst SVG Icon matching the exact sunburst / starburst in the reference image
function StarburstIcon({ className = "w-10 h-10 text-white", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="18" fill="currentColor" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const isLong = i % 2 === 0;
        const length = isLong ? 48 : 36;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 20 * Math.cos(rad);
        const y1 = 50 + 20 * Math.sin(rad);
        const x2 = 50 + length * Math.cos(rad);
        const y2 = 50 + length * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={isLong ? "3" : "2"}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  track: string;
  image: string;
  bio: string;
}

const SPEAKERS_DATA: Speaker[] = [
  {
    id: "spk-1",
    name: "Dr. Arshad Malik",
    role: "HEAD OF AI & APPLIED RESEARCH",
    company: "Turing Labs & Former MIT Fellow",
    topic: "LLMs in Production: Engineering Agentic Systems for Emerging Markets",
    track: "AI & Deep Tech",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM.jpeg",
    bio: "Pioneering research in generative AI and automated developer tooling across South Asia and North America.",
  },
  {
    id: "spk-2",
    name: "Christian Grant",
    role: "DESIGN DIRECTOR",
    company: "Studio Nexus London",
    topic: "Spatial Interfaces & Human-Centered Design in the Age of Generative UX",
    track: "Design & UX",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.44 PM (1).jpeg",
    bio: "Award-winning creative director specializing in interactive branding, WebGL experiences, and brand systems.",
  },
  {
    id: "spk-3",
    name: "Michelle Larson",
    role: "SENIOR PRODUCT DESIGNER",
    company: "HyperScale Ventures",
    topic: "From 0 to 1 Million Users: Product Architecture That Scales Seamlessly",
    track: "Venture & Product",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.45 PM.jpeg",
    bio: "Led product teams across fintech unicorns, scaling customer engagement through intuitive design patterns.",
  },
  {
    id: "spk-4",
    name: "Mark Petterson",
    role: "DESIGN GUILD LEAD",
    company: "Cognitive AI Systems",
    topic: "Democratizing Venture Capital for Pakistani Collegiate Innovators",
    track: "Venture & Product",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.46 PM.jpeg",
    bio: "Angel investor and mentor backing 30+ early-stage deep-tech and consumer applications.",
  },
  {
    id: "spk-5",
    name: "Marry Conor",
    role: "SENIOR UI/UX DESIGNER",
    company: "Apex Media Labs",
    topic: "Modern Brand Visual Identity & Dynamic Micro-Animations for Web",
    track: "Design & UX",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.47 PM.jpeg",
    bio: "Crafting modern, accessible digital design languages and frontend motion mechanics for global products.",
  },
  {
    id: "spk-6",
    name: "Matey Black",
    role: "CREATIVE STRATEGIST",
    company: "NextGen Creative Group",
    topic: "Storytelling & Brand Narratives for Tech Startups",
    track: "Leadership & Strategy",
    image: "/images/members/WhatsApp Image 2026-08-24 at 12.10.43 PM.jpeg",
    bio: "Advised 50+ founders on brand narrative, public relations, and seed funding roadshows.",
  },
];

const PASS_TIERS = [
  {
    id: "student-pass",
    name: "Student Pass",
    price: "Free",
    currency: "PKR 0",
    badge: "Most Popular",
    highlight: false,
    perks: [
      "Access to all general auditorium keynote sessions",
      "Official Digital Attendance & Participation Certificate",
      "Interactive Q&A access during speaker panels",
      "Access to public networking hall & sponsor booths",
    ],
  },
  {
    id: "vip-pass",
    name: "VIP Delegate Pass",
    price: "PKR 1,500",
    currency: "Exclusive Tier",
    badge: "Priority Seating",
    highlight: true,
    perks: [
      "Reserved Front-Row seating in the Main BUIC Auditorium",
      "Exclusive Access to Backstage VIP Speaker Lounge",
      "Founder & Speaker speed-mentoring roundtables",
      "Premium Delegate Welcome Kit & Printed Physical Certificate",
      "Complimentary Executive Lunch & Refreshments Voucher",
    ],
  },
  {
    id: "ambassador-pass",
    name: "Campus Ambassador Pass",
    price: "Complimentary",
    currency: "Official Delegation",
    badge: "By Nomination",
    highlight: false,
    perks: [
      "Institutional Priority Entry with customized lanyard badge",
      "Fast-track Check-in at BUIC Main Entrance",
      "Campus Leader Recognition during Closing Ceremony",
      "Direct channel with CYE Organizing Board & Mentors",
    ],
  },
];

const SCHEDULE_ITEMS = [
  {
    time: "09:00 AM - 10:00 AM",
    title: "Delegate Check-In & Welcome Networking",
    speaker: "CYE Executive Directorate",
    room: "Auditorium Foyer",
    type: "Registration",
  },
  {
    time: "10:00 AM - 11:15 AM",
    title: "Opening Keynote: Exploring The Future & AI Frontiers",
    speaker: "Dr. Arshad Malik & Christian Grant",
    room: "Main Auditorium Hall",
    type: "Keynote",
  },
  {
    time: "11:30 AM - 01:00 PM",
    title: "Panel Debate: Building High-Impact Ventures from Pakistan",
    speaker: "Michelle Larson, Mark Petterson & Matey Black",
    room: "Main Stage",
    type: "Panel Discussion",
  },
  {
    time: "01:00 PM - 02:15 PM",
    title: "VIP Networking Lunch & Founder Speed-Mentoring",
    speaker: "All Keynote Speakers & Delegates",
    room: "Executive Lounge & Courtyard",
    type: "Networking",
  },
  {
    time: "02:15 PM - 04:00 PM",
    title: "Hands-on Masterclasses: Generative UX & Spatial Architecture",
    speaker: "Marry Conor & Christian Grant",
    room: "Lab 01 & Seminar Hall B",
    type: "Masterclass",
  },
  {
    time: "04:15 PM - 05:30 PM",
    title: "Closing Accolades, Delegate Certificates & Stage Honors",
    speaker: "Distinguished Guests & Patron Board",
    room: "Main Stage",
    type: "Ceremony",
  },
];

export default function ConferencesPage() {
  const [selectedPass, setSelectedPass] = useState<string>("student-pass");
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState<number>(1);
  const [selectedSpeakerModal, setSelectedSpeakerModal] = useState<Speaker | null>(null);
  const [activeTrackFilter, setActiveTrackFilter] = useState<string>("All");

  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [studentId, setStudentId] = useState("");
  const [preferredTrack, setPreferredTrack] = useState("AI & Deep Tech");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredBadge, setRegisteredBadge] = useState<{
    id: string;
    name: string;
    tier: string;
    university: string;
    seat: string;
  } | null>(null);

  const registrationSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRegistration = (tierId?: string) => {
    if (tierId) {
      setSelectedPass(tierId);
    }
    registrationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredSpeakers =
    activeTrackFilter === "All"
      ? SPEAKERS_DATA
      : SPEAKERS_DATA.filter((s) => s.track === activeTrackFilter);

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !university) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const chosenTier = PASS_TIERS.find((t) => t.id === selectedPass);
      const randomSeat = `SEC-A${Math.floor(10 + Math.random() * 89)}`;
      const randomId = `CYE-CONF-${Math.floor(10000 + Math.random() * 90000)}`;

      setRegisteredBadge({
        id: randomId,
        name: fullName,
        tier: chosenTier?.name || "Student Pass",
        university: university,
        seat: randomSeat,
      });
    }, 1100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b1e] text-slate-100 selection:bg-[#F26522] selection:text-white">
      {/* Unified Global Header */}
      <Header />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: EXACT DESIGN AS IN THE REFERENCE PICTURE                */}
        {/* ========================================================================= */}
        <section className="relative w-full bg-gradient-to-b from-[#020b18] via-[#002257] to-[#003B96] text-white overflow-hidden select-none">
          {/* Top Grayscale Auditorium / Audience Photo with Gradient Mask Bleed */}
          <div className="absolute top-0 inset-x-0 h-[560px] sm:h-[620px] lg:h-[680px] pointer-events-none overflow-hidden z-0">
            <Image
              src="/images/auditorium.webp"
              alt="Auditorium Audience Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top grayscale contrast-125 brightness-[0.72] opacity-45 mix-blend-luminosity scale-102"
            />
            {/* Smooth Vertical Gradient Fade into Solid Vibrant Blue */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020b18]/80 via-[#002257]/70 to-[#003B96] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,rgba(0,59,150,0.45)_0%,transparent_80%)] pointer-events-none" />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto pt-24 sm:pt-28 pb-16 lg:pb-24 flex flex-col justify-between min-h-[92vh]">
            
            {/* Top Sub-Nav row matching the reference with diagonal arrows */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-10 border-b border-white/15">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] animate-ping" />
                <span className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-white/90">
                  CYE NEXUS CONFERENCES 2026
                </span>
              </div>

              <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-black tracking-wider uppercase text-white/80">
                <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span className="text-[#F26522]">↗</span> HOME
                </Link>
                <Link href="/competitions" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span className="text-[#F26522]">↗</span> COMPETITIONS
                </Link>
                <Link href="/conferences" className="text-white flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 decoration-[#F26522]">
                  <span className="text-[#F26522]">↗</span> CONFERENCES
                </Link>
                <Link href="/ambassadors" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span className="text-[#F26522]">↗</span> AMBASSADORS
                </Link>
                <Link href="/venue" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span className="text-[#F26522]">↗</span> VENUE
                </Link>
                <Link href="/contact" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span className="text-[#F26522]">↗</span> CONTACTS
                </Link>
              </div>

              <button
                onClick={() => scrollToRegistration()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#003B96] hover:bg-slate-100 text-xs font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>↗ Register Pass</span>
              </button>
            </div>

            {/* Middle Section: Date & City Header Tag */}
            <div className="mt-12 sm:mt-16 mb-4 sm:mb-6">
              <div className="flex items-center gap-6 text-sm sm:text-base font-bold text-white tracking-wide font-sans">
                <div className="flex flex-col">
                  <span className="text-base sm:text-xl font-black text-white">01-02nd</span>
                  <span className="text-xs uppercase text-white/80 font-mono tracking-widest">of October 2026</span>
                </div>
                <div className="w-[1px] h-8 bg-white/30" />
                <div className="flex flex-col">
                  <span className="text-base sm:text-xl font-black text-white">Islamabad</span>
                  <span className="text-xs uppercase text-emerald-300 font-mono tracking-widest">BUIC Auditorium</span>
                </div>
              </div>
            </div>

            {/* Giant Bold Headline: EXACT MATCH TO REFERENCE IMAGE "EXPLORING THE FUTURE" */}
            <div className="my-4 sm:my-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[108px] font-black uppercase tracking-tighter leading-[0.92] text-white font-display drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                EXPLORING<br />
                THE FUTURE
              </h1>
            </div>

            {/* Lower Hero 2-Column Split: Exactly matching Reference Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-8 sm:pt-12">
              
              {/* Left Column: Overlapping Speaker Avatars & Contact */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-4">
                  {/* 3 Circular Avatars */}
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    {SPEAKERS_DATA.slice(0, 3).map((speaker, idx) => (
                      <div
                        key={idx}
                        className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full ring-2 ring-white overflow-hidden shadow-lg bg-slate-900"
                      >
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-black text-white leading-tight">
                      12+ Skilled<br />Speakers
                    </span>
                    <span className="text-white text-lg font-bold">↗</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-white/90">
                  <a
                    href="tel:+9251111111CYE"
                    className="flex items-center gap-2 hover:text-[#F26522] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F26522]" />
                    <span>+92 51 111-111-CYE</span>
                  </a>
                  <a
                    href="mailto:nexus@capitalyouthexpo.com"
                    className="flex items-center gap-2 hover:text-[#F26522] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F26522]" />
                    <span>NEXUS@CAPITALYOUTHEXPO.COM</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Title, Description & Action Button */}
              <div className="lg:col-span-6 space-y-5 lg:pl-6">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight font-display leading-snug">
                  DECODE THE FUTURE: THE CYE NEXUS LEADERSHIP & TECH SUMMIT
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                  Leading founders, venture capitalists, AI pioneers, and industry icons converge at BUIC Islamabad to equip students with actionable roadmaps for global careers, venture funding, and cutting-edge software architecture.
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => scrollToRegistration()}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-none border-2 border-white hover:bg-white hover:text-[#003B96] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span>↗ Buy Tickets / Pass</span>
                  </button>

                  <a
                    href="#agenda"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white/80 hover:text-white transition-colors"
                  >
                    <span>View Schedule</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ANIMATED STARBURST MARQUEE: "SPEAKERS ✺ SPEAKERS ✺ KEYNOTES ✺"        */}
        {/* ========================================================================= */}
        <section className="relative w-full py-4 sm:py-6 bg-[#003B96] text-white border-y border-white/20 overflow-hidden select-none shadow-2xl">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center mx-4 sm:mx-6 shrink-0 gap-4 sm:gap-6">
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-display text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  {i % 3 === 0 ? "SPEAKERS" : i % 3 === 1 ? "KEYNOTES" : "LEADERSHIP"}
                </span>
                <StarburstIcon className="w-8 h-8 sm:w-11 sm:h-11 text-white animate-spin" style={{ animationDuration: "16s" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SPEAKERS SHOWCASE SECTION: EXACT CARDS DESIGN FROM REFERENCE IMAGE   */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-28 bg-[#003B96] text-white overflow-hidden select-none border-b border-white/15">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,101,34,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(22,124,56,0.18)_0%,transparent_70%)] pointer-events-none" />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
            
            {/* Section Header with Track Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>DISTINGUISHED FACULTY & LEADERS</span>
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
                  Featured Speakers
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {["All", "AI & Deep Tech", "Design & UX", "Venture & Product", "Leadership & Strategy"].map(
                  (track) => (
                    <button
                      key={track}
                      onClick={() => setActiveTrackFilter(track)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        activeTrackFilter === track
                          ? "bg-white text-[#003B96] shadow-md font-black"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                      }`}
                    >
                      {track}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Speakers Cards Row (5 Vertical Tall Cards matching the reference picture!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {filteredSpeakers.map((speaker, idx) => (
                <div
                  key={speaker.id}
                  onClick={() => setSelectedSpeakerModal(speaker)}
                  className="group relative flex flex-col justify-end h-[420px] sm:h-[440px] rounded-none overflow-hidden bg-slate-950 border border-white/20 cursor-pointer transition-all duration-300 hover:border-white hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Card Portrait Photo */}
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 300px, 240px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
                  />

                  {/* Dark Gradient Overlay for Typography Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                  {/* Bottom Info matching Reference Image */}
                  <div className="relative z-10 p-4 sm:p-5 space-y-1.5">
                    {/* Eyebrow Role Tag */}
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 block truncate">
                      {speaker.role}
                    </span>

                    {/* Speaker Name with Diagonal Arrow */}
                    <div className="flex items-center justify-between gap-1 text-white">
                      <h4 className="text-base sm:text-lg font-black tracking-tight font-display leading-tight truncate">
                        {speaker.name}
                      </h4>
                      <span className="text-white text-sm font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        ↗
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium line-clamp-1">
                      {speaker.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots (Matching 5 dots in the reference image) */}
            <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
              {filteredSpeakers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpeakerIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeSpeakerIdx === idx
                      ? "w-6 bg-white shadow-xs"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CONFERENCES REGISTRATION: TICKET PASS TIERS & INTERACTIVE FORM        */}
        {/* ========================================================================= */}
        <section
          ref={registrationSectionRef}
          id="registration"
          className="relative py-24 sm:py-32 bg-gradient-to-b from-[#003B96] via-[#021329] to-[#040b1e] text-white overflow-hidden select-none border-b border-white/15"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,101,34,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(22,124,56,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
            
            {/* Header Block */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-mono font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">
                <Ticket className="w-3.5 h-3.5 text-[#F26522]" />
                <span>OFFICIAL ADMISSION TIERS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
                Reserve Your Conference Pass
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                Choose your participation tier for CYE Nexus 2026 at Bahria University Islamabad Campus. Standard student passes are complimentary upon early registration.
              </p>
            </div>

            {/* Ticket Pass Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {PASS_TIERS.map((tier) => {
                const isSelected = selectedPass === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedPass(tier.id)}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-2 border-[#F26522] shadow-[0_0_35px_rgba(242,101,34,0.35)] scale-[1.02]"
                        : "bg-slate-950/80 border border-white/15 hover:border-white/40 hover:bg-slate-900/80"
                    }`}
                  >
                    {/* Top Tier Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        {tier.currency}
                      </span>
                      {tier.badge && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          tier.highlight
                            ? "bg-[#F26522] text-white"
                            : "bg-white/10 text-white border border-white/20"
                        }`}>
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-black text-white font-display">
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white font-display">
                          {tier.price}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">/ badge</span>
                      </div>
                    </div>

                    {/* Perks List */}
                    <div className="space-y-3 pt-4 border-t border-white/10 flex-1 mb-8">
                      {tier.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? "text-[#F26522]" : "text-emerald-400"
                          }`} />
                          <span className="leading-snug">{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* Radio Select Button */}
                    <button
                      type="button"
                      className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#F26522] to-[#EA580C] text-white shadow-lg"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      {isSelected ? "✓ Selected Pass" : "Select Pass"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Interactive Registration Form Card */}
            <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-slate-950 border border-white/20 shadow-2xl relative overflow-hidden">
              
              {/* Glowing Ambient Halo inside Card */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,59,150,0.3)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white font-display">
                    Delegate Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fill in your attendee information to receive your digital auditorium pass and entry QR barcode.
                  </p>
                </div>

                {registeredBadge ? (
                  /* Confirmation Ticket Screen */
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#003B96]/30 via-slate-900 to-[#021329] border border-emerald-400/40 space-y-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <ShieldCheck className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                        REGISTRATION CONFIRMED
                      </span>
                      <h4 className="text-2xl font-black text-white font-display">
                        Welcome to CYE Nexus, {registeredBadge.name}!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Your conference delegate credential has been generated. Bring this pass or your student CNIC/ID to the check-in desk at BUIC.
                      </p>
                    </div>

                    {/* Visual Ticket Pass */}
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-900/95 border border-white/25 text-left space-y-4 shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 block">PASS ID</span>
                          <span className="font-mono text-sm font-black text-[#F26522]">{registeredBadge.id}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#003B96] text-white text-[10px] font-black uppercase">
                          {registeredBadge.tier}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-slate-400 block">DELEGATE</span>
                          <span className="text-white font-bold">{registeredBadge.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">ASSIGNED SEAT</span>
                          <span className="text-emerald-400 font-bold">{registeredBadge.seat}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">INSTITUTION</span>
                          <span className="text-white font-medium truncate block">{registeredBadge.university}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-dashed border-white/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>DATE: 01 OCT 2026</span>
                        <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRegisteredBadge(null)}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Register Another Delegate
                    </button>
                  </div>
                ) : (
                  /* Registration Form */
                  <form onSubmit={handleSubmitRegistration} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#F26522]" /> Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Daniyal Ahmed"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#F26522] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#F26522]" /> Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="daniyal@university.edu.pk"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#F26522] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#167C38]" /> WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#167C38] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[#003B96]" /> University / Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="Bahria University / NUST / FAST"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#003B96] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Student ID / CNIC
                        </label>
                        <input
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="01-135231-001 or CNIC"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-white/40 focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#F26522]" /> Primary Track of Interest
                        </label>
                        <select
                          value={preferredTrack}
                          onChange={(e) => setPreferredTrack(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 focus:border-[#F26522] focus:outline-none text-sm text-white transition-colors"
                        >
                          <option value="AI & Deep Tech">AI & Deep Tech Engineering</option>
                          <option value="Venture & Startups">Venture Capital & Founders</option>
                          <option value="Design & Creative UX">Generative UX & Product Design</option>
                          <option value="Leadership & Careers">International Career Clinics</option>
                        </select>
                      </div>
                    </div>

                    {/* Selected Tier Preview */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block font-mono">SELECTED TICKET PASS</span>
                        <span className="font-bold text-white text-sm">
                          {PASS_TIERS.find((t) => t.id === selectedPass)?.name} (
                          {PASS_TIERS.find((t) => t.id === selectedPass)?.price})
                        </span>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">1 SEAT RESERVED</span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#F26522] via-[#EA580C] to-[#003B96] hover:from-[#EA580C] hover:to-[#002B70] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Digital Pass...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Reserve Conference Pass</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SUMMIT AGENDA & RUNNING SCHEDULE TIMELINE                             */}
        {/* ========================================================================= */}
        <section id="agenda" className="relative py-20 sm:py-28 bg-[#020b18] text-white border-b border-white/10 select-none">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-5xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F26522]">
                1ST OCTOBER 2026 • BUIC AUDITORIUM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
                Summit Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A power-packed single-day conference engineered for high-density learning and peer networking.
              </p>
            </div>

            <div className="space-y-4">
              {SCHEDULE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#003B96] text-white">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-white font-display pt-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-300 font-medium">
                      Hosted by: <strong className="text-white">{item.speaker}</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-mono text-slate-400 block">ROOM / VENUE</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center sm:justify-end gap-1">
                      <MapPin className="w-3 h-3 text-[#F26522]" /> {item.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Speaker Details Modal */}
      <AnimatePresence>
        {selectedSpeakerModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedSpeakerModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-white/20 p-6 sm:p-8 space-y-5 text-white shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 ring-2 ring-white/20">
                  <Image
                    src={selectedSpeakerModal.image}
                    alt={selectedSpeakerModal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#F26522] uppercase tracking-wider block">
                    {selectedSpeakerModal.role}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display">
                    {selectedSpeakerModal.name}
                  </h3>
                  <span className="text-xs text-slate-300 font-medium">
                    {selectedSpeakerModal.company}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  KEYNOTE SESSION
                </span>
                <h5 className="text-sm font-bold text-white leading-snug">
                  {selectedSpeakerModal.topic}
                </h5>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedSpeakerModal.bio}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  TRACK: <strong className="text-white">{selectedSpeakerModal.track}</strong>
                </span>

                <button
                  onClick={() => setSelectedSpeakerModal(null)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
