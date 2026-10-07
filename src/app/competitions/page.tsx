"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import { COMPETITIONS_LIST } from "@/lib/api";
import {
  Code,
  Trophy,
  Gamepad2,
  Mic,
  BookOpen,
  Palette,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Search,
  Users,
  Award,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Scale,
  Wrench,
  HelpCircle,
} from "lucide-react";

interface CompetitionItem {
  name: string;
  category: "Technology" | "Literary" | "Art" | "Gaming & Esports" | "Conferences";
  icon: any;
  color: string;
  bgLight: string;
  shortDesc: string;
  teamSize: string;
  duration: string;
  prize: string;
  rules: string[];
  evaluation: string[];
  toolsAllowed: string;
}

const ALL_COMPETITIONS: CompetitionItem[] = [
  {
    name: "Speed Programming",
    category: "Technology",
    icon: Code,
    color: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50 text-blue-600",
    shortDesc: "Solve algorithmic and logic challenges under intense time pressure.",
    teamSize: "Individual or Duo (1 - 2)",
    duration: "2.5 Hours (3 Rounds)",
    prize: "Champion Trophy + Gold Medals + Certificates",
    rules: [
      "Supported languages: C++, Python 3, Java, and C#.",
      "Strict plagiarism checks will be executed across all submitted codebases.",
      "Internet access will be restricted strictly to the competition submission portal.",
      "Points awarded based on test cases passed and speed of submission.",
    ],
    evaluation: ["Algorithmic efficiency (Time & Space Complexity)", "Correctness on edge cases", "Submission timestamp speed"],
    toolsAllowed: "VS Code, CLion, PyCharm, or CodeBlocks (Offline environment)",
  },
  {
    name: "Mini Hackathon",
    category: "Technology",
    icon: Trophy,
    color: "from-orange-500 to-amber-600",
    bgLight: "bg-orange-50 text-orange-600",
    shortDesc: "Sprint to design, code, and pitch a functioning MVP prototype for real-world impact.",
    teamSize: "2 to 4 Members",
    duration: "6 Hours Sprint + Pitching",
    prize: "Winner Shield + Mentorship + Cash Prize",
    rules: [
      "Themes and problem statements unveiled on the morning of 10th November 2026.",
      "All code and assets must be developed on-site during the expo hours.",
      "Each team gets 5 minutes to demo their live project followed by 3 minutes Q&A with judges.",
      "Open-source libraries and public frameworks are permitted with proper attribution.",
    ],
    evaluation: ["Innovation & Creativity (30%)", "Technical Execution (30%)", "UI/UX & Usability (20%)", "Pitch & Presentation (20%)"],
    toolsAllowed: "Any tech stack: Next.js, React, Flutter, Python, Node.js, Firebase, Supabase",
  },
  {
    name: "Counter-Strike 2",
    category: "Gaming & Esports",
    icon: Gamepad2,
    color: "from-purple-600 to-violet-800",
    bgLight: "bg-purple-50 text-purple-600",
    shortDesc: "High-octane tactical 5v5 FPS tournament on the big arena screen.",
    teamSize: "5 Players + 1 Optional Sub",
    duration: "Single Elimination Tournament",
    prize: "Esports Champion Trophy + Gaming Hardware & Merch",
    rules: [
      "Competitive MR12 rulebook following official Valve tournament standards.",
      "Maps chosen through standard veto / pick process (Active Duty pool: Mirage, Inferno, Dust II, Nuke, Anubis).",
      "Teams must bring their own peripherals (Mice, Keyboards, Headsets). PCs provided on stage.",
      "Toxic behavior, script abuse, or unfair third-party tools result in immediate disqualification.",
    ],
    evaluation: ["Round wins & bracket elimination", "Tactical cohesion & clutch performances"],
    toolsAllowed: "Official CS2 Client (LAN configuration)",
  },
  {
    name: "Speech Competition",
    category: "Literary",
    icon: Mic,
    color: "from-emerald-600 to-teal-700",
    bgLight: "bg-emerald-50 text-emerald-600",
    shortDesc: "Inspire the audience with oratorical mastery in English or Urdu.",
    teamSize: "Individual Entry",
    duration: "4 - 5 Minutes per Speaker",
    prize: "Best Orator Shield + Honor Certificate",
    rules: [
      "Speakers may present in either English or Urdu on pre-announced youth & societal themes.",
      "Prepared speech duration: Minimum 3 minutes, maximum 5 minutes.",
      "Paper reading is discouraged; memory, diction, and body language are heavily graded.",
      "Decisions by the panel of distinguished judges are final and binding.",
    ],
    evaluation: ["Content & Rhetorical Quality (35%)", "Delivery & Diction (35%)", "Stage Presence & Timing (30%)"],
    toolsAllowed: "Podium & Stage Mic",
  },
  {
    name: "Seerah Quiz",
    category: "Literary",
    icon: BookOpen,
    color: "from-teal-600 to-cyan-700",
    bgLight: "bg-teal-50 text-teal-600",
    shortDesc: "Demonstrate profound scholarship and knowledge of Islamic History and the blessed Seerah.",
    teamSize: "Individual or Duo (1 - 2)",
    duration: "Written Prelims + Buzzer Finals",
    prize: "Seerah Scholar Shield + Islamic Book Collection",
    rules: [
      "Round 1 consists of 40 multiple-choice and short-answer questions.",
      "Top 4 teams advance to the live buzzer stage round on main auditorium stage.",
      "Topics cover the Makkan and Madinan periods, companions, and civilizational contributions.",
      "Reference texts include 'Ar-Raheeq Al-Makhtum' (The Sealed Nectar).",
    ],
    evaluation: ["Accuracy of historical accounts", "Speed in buzzer round", "Depth of contextual knowledge"],
    toolsAllowed: "Live digital buzzer system provided",
  },
  {
    name: "Essay Writing",
    category: "Literary",
    icon: BookOpen,
    color: "from-rose-600 to-red-700",
    bgLight: "bg-rose-50 text-rose-600",
    shortDesc: "Synthesize critical analysis and persuasive writing on modern youth challenges.",
    teamSize: "Individual Entry",
    duration: "90 Minutes on-site",
    prize: "Distinguished Writer Shield + Publication in BUIC Journal",
    rules: [
      "Topics disclosed on the spot (Choice of 3 themes).",
      "Word count requirement: 1,000 to 1,500 words.",
      "Submissions can be handwritten or typed on provided terminals.",
      "Evaluated blindly by literature professors to maintain total objectivity.",
    ],
    evaluation: ["Originality & Analytical Rigor (40%)", "Structure & Coherence (30%)", "Grammar & Vocabulary (30%)"],
    toolsAllowed: "Stationery provided; no external notes permitted",
  },
  {
    name: "Short Story Writing",
    category: "Literary",
    icon: BookOpen,
    color: "from-pink-600 to-rose-700",
    bgLight: "bg-pink-50 text-pink-600",
    shortDesc: "Unleash narrative imagination with character-driven and impactful storytelling.",
    teamSize: "Individual Entry",
    duration: "90 Minutes on-site",
    prize: "Literary Creator Shield + Feature Showcase",
    rules: [
      "Theme prompt or opening line provided at the start of the session.",
      "Length: 800 to 1,200 words.",
      "Original fiction only; retellings or previously published works are not permitted.",
    ],
    evaluation: ["Creativity & Plot Development (40%)", "Emotional Resonance & Characterization (30%)", "Pacing & Style (30%)"],
    toolsAllowed: "Stationery provided",
  },
  {
    name: "Painting & Visual Arts",
    category: "Art",
    icon: Palette,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 text-amber-600",
    shortDesc: "Bring colors to life on canvas exploring themes of resilience, youth, and discovery.",
    teamSize: "Individual Entry",
    duration: "3 Hours Live Canvas Session",
    prize: "Master Artist Shield + Professional Art Kit",
    rules: [
      "Standard canvas boards (A2 size) will be provided at the studio area.",
      "Mediums permitted: Acrylics, Oil, Watercolors, or Mixed Media.",
      "Participants should bring their preferred brushes and color sets.",
      "Artworks will be displayed at the central expo gallery for public viewing.",
    ],
    evaluation: ["Artistic Concept & Theme Interpretation (35%)", "Technique & Color Harmony (35%)", "Aesthetic Finish (30%)"],
    toolsAllowed: "Canvas & Easels provided; bring personal paints/brushes",
  },
  {
    name: "CYE Nexus & Career Pro Talks",
    category: "Conferences",
    icon: Briefcase,
    color: "from-blue-700 to-cyan-800",
    bgLight: "bg-blue-50 text-blue-700",
    shortDesc: "Interactive talks, panel discussions, and career coaching by industry leaders.",
    teamSize: "Open to All Registered Attendees",
    duration: "Parallel Sessions Throughout the Day",
    prize: "Official Delegate Participation Certificate",
    rules: [
      "Access included with pre-registration badge.",
      "Interactive Q&A open to attendees after every keynote speech.",
      "Networking lounges open for direct interaction with startup founders and speakers.",
    ],
    evaluation: ["Attendance & Active Delegate Engagement"],
    toolsAllowed: "Notebooks & Smart devices for notes",
  },
];

const CATEGORIES = ["All", "Technology", "Literary", "Art", "Gaming & Esports", "Conferences"] as const;

export default function CompetitionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>("Speed Programming");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState<string>(COMPETITIONS_LIST[0]);

  const handleRegister = (name: string) => {
    // Map to closest match if needed
    const found = COMPETITIONS_LIST.find((c) => c.toLowerCase().includes(name.toLowerCase().split(" ")[0])) || name;
    setSelectedComp(found);
    setModalOpen(true);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const filteredCompetitions = ALL_COMPETITIONS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onOpenRegister={() => setModalOpen(true)} />

      <main className="flex-1 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Official Tracks & Categories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Competitions & Conferences
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Explore 9 competitive tracks across Technology, Literary Arts, Fine Art, Gaming, and Conferences at Bahria University on 10th November 2026.
            </p>
          </div>

          {/* Sticky Filter & Search Bar */}
          <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#003B96] text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tracks, rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-100 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
              />
            </div>
          </div>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCompetitions.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No competitions found</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Try clearing your search query or switching to another category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 rounded-full text-xs font-bold text-[#003B96] bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCompetitions.map((track, idx) => {
                const IconComp = track.icon;
                const isAccordionOpen = openAccordion === track.name;

                return (
                  <motion.div
                    key={track.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="group relative rounded-3xl flex flex-col justify-between overflow-hidden transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.88) 50%, rgba(241, 245, 249, 0.94) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.9)",
                      boxShadow:
                        "0 15px 35px -10px rgba(0, 59, 150, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    }}
                  >
                    {/* Specular Top Reflection */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white via-[#003B96]/20 to-transparent pointer-events-none" />

                    {/* Ambient Glow Orb */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#003B96]/10 blur-3xl group-hover:bg-[#F26522]/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#167C38]/10 blur-3xl group-hover:bg-[#003B96]/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                    {/* Top Content */}
                    <div className="p-6 sm:p-8 space-y-5 relative z-10">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* 3D Glass Icon Gem */}
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${track.color} opacity-30 blur-lg group-hover:opacity-70 group-hover:blur-xl transition-all duration-300`}
                            />
                            <div className="relative w-14 h-14 rounded-2xl p-3 bg-white/90 backdrop-blur-md border border-white shadow-[0_6px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                              <IconComp className="w-7 h-7 text-[#003B96] group-hover:text-[#F26522] transition-colors duration-300 stroke-[2.2]" />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-2xs w-fit mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#167C38] animate-pulse" />
                              <span className="text-[10px] font-mono font-black text-[#003B96] uppercase tracking-wider">
                                {track.category}
                              </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display group-hover:text-[#003B96] transition-colors">
                              {track.name}
                            </h2>
                          </div>
                        </div>

                        {/* Shimmering Prize Pill */}
                        <div className="flex items-center gap-1.5 text-amber-900 bg-amber-50/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-200/80 shadow-2xs">
                          <Trophy className="w-3.5 h-3.5 text-[#F26522]" />
                          <span className="text-xs font-black">{track.prize}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
                        {track.shortDesc}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/60 text-xs font-semibold text-slate-700 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#003B96]" />
                          <span className="text-slate-800 font-bold">{track.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#167C38]" />
                          <span>{track.duration}</span>
                        </div>
                      </div>

                      {/* Rules Accordion Trigger */}
                      <div className="pt-1">
                        <button
                          onClick={() => toggleAccordion(track.name)}
                          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/70 hover:bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border border-slate-200/60 shadow-2xs"
                        >
                          <span className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#003B96]" />
                            <span>Rules, Evaluation & Tools</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                              isAccordionOpen ? "rotate-180 text-slate-900" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion Content */}
                        {isAccordionOpen && (
                          <div className="mt-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 space-y-4 text-xs animate-in fade-in duration-200 shadow-2xs">
                            {/* Rules */}
                            <div>
                              <div className="flex items-center gap-1.5 font-extrabold text-slate-900 uppercase tracking-wider mb-2 text-[11px] font-display">
                                <FileText className="w-3.5 h-3.5 text-[#003B96]" />
                                <span>Structure & Competition Rules</span>
                              </div>
                              <ul className="space-y-1.5">
                                {track.rules.map((r, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-600 font-medium leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Evaluation */}
                            <div>
                              <div className="flex items-center gap-1.5 font-extrabold text-slate-900 uppercase tracking-wider mb-1.5 text-[11px] font-display">
                                <Scale className="w-3.5 h-3.5 text-[#167C38]" />
                                <span>Evaluation Metrics</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {track.evaluation.map((ev, idx) => (
                                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px]">
                                    {ev}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Tools */}
                            <div>
                              <div className="flex items-center gap-1.5 font-extrabold text-slate-900 uppercase tracking-wider mb-1 text-[11px] font-display">
                                <Wrench className="w-3.5 h-3.5 text-[#F26522]" />
                                <span>Tools & Environment</span>
                              </div>
                              <p className="text-slate-600 font-medium">{track.toolsAllowed}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-6 sm:p-8 pt-0 relative z-10">
                      <button
                        onClick={() => handleRegister(track.name)}
                        className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#003B96] via-[#002B70] to-[#002257] hover:from-[#F26522] hover:via-[#EA580C] hover:to-[#C2410C] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn active:scale-98"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Register for {track.name}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCompetition={selectedComp}
      />
    </div>
  );
}
