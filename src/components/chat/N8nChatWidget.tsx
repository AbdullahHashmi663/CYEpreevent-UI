"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Lottie } from "lottie-react";
import { motion } from "framer-motion";
import robotAnimation from "../../../public/images/Little power robot.json";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickLinks?: { text: string; href: string }[];
}

const FAQ_KNOWLEDGE: { pattern: RegExp; response: string; quickLinks?: { text: string; href: string }[] }[] = [
  {
    pattern: /when|date|time|timing|schedule|day/i,
    response: "The **Capital Youth Expo Pre-Event** takes place on **Tuesday, 10th November 2026** from **09:00 AM to 05:00 PM PST** at Bahria University (BUIC) E-8 Campus, Islamabad.",
    quickLinks: [{ text: "View Venue & Timings", href: "/venue" }],
  },
  {
    pattern: /where|venue|location|address|campus|map|directions|gate/i,
    response: "The event is hosted at **Bahria University Islamabad Campus (BUIC)**, Shangrilla Road, Sector E-8, Islamabad. Dedicated entry is through **Gate 1 & Gate 2**.",
    quickLinks: [{ text: "Open Interactive Map", href: "/venue" }],
  },
  {
    pattern: /competition|track|category|categories|hackathon|speed programming|counter strike|cs|speech|seerah|essay|painting/i,
    response: "We feature 4 major tracks across 9 exciting competitions:\n• **Technology**: Speed Programming & Mini Hackathon\n• **Literary**: Speech, Seerah Quiz, Essay Writing & Short Story Writing\n• **Art**: Painting & Visual Arts\n• **Esports**: Counter-Strike 2 (5v5 Tactical)\n• **Conferences**: CYE Nexus & Career Pro Talks",
    quickLinks: [{ text: "Explore All Competitions", href: "/competitions" }],
  },
  {
    pattern: /ambassador|volunteer|perk|benefits|shield|certificate|apply/i,
    response: "The **CYE Campus Ambassador Program** offers official leadership certificates, exclusive shields & merch, media spotlights, and VIP networking with industry mentors!",
    quickLinks: [{ text: "Apply as Ambassador", href: "/ambassadors" }],
  },
  {
    pattern: /register|registration|participate|cost|fee|pass/i,
    response: "Registrations are open! You can register individually or as a team through our online registration portal. Don't forget to attach your valid Student ID card.",
    quickLinks: [{ text: "Register Now", href: "/competitions" }],
  },
  {
    pattern: /team|head|mamoon|hamid|hiba|organizer|al nakhla|youth insight/i,
    response: "CYE is organized by **Al Nakhla Student Support Centre** and **Youth Insight Pakistan** at BUIC.\n• **Event Head**: Mamoon Ahmed Ali\n• **Deputy Event Heads**: Hamid Sultan & Hiba Ali.",
    quickLinks: [{ text: "View Team Leadership", href: "/team-about" }],
  },
  {
    pattern: /contact|email|phone|helpline|support/i,
    response: "You can reach our organizing committee via email at **cye.buic@gmail.com** or call the BUIC support helpline at **+92 51 9260002**.",
    quickLinks: [{ text: "Contact Support Desk", href: "/contact" }],
  },
];

const SUGGESTED_QUESTIONS = [
  "What is the date & venue?",
  "Which competitions are offered?",
  "How to apply as an Ambassador?",
  "Who is organizing this event?",
];

export default function N8nChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to **Capital Youth Expo Pre-Event at BUIC**! I'm your AI Event Assistant. How can I assist you today?",
      timestamp: "Just now",
      quickLinks: [
        { text: "View Competitions", href: "/competitions" },
        { text: "Ambassador Program", href: "/ambassadors" },
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm here to help with everything regarding CYE 2026 at BUIC! You can ask about competition rules, ambassador benefits, venue access, or registration instructions.";
      let matchedLinks: { text: string; href: string }[] | undefined = [
        { text: "Browse Competitions", href: "/competitions" },
        { text: "Contact Team", href: "/contact" },
      ];

      for (const faq of FAQ_KNOWLEDGE) {
        if (faq.pattern.test(text)) {
          botResponse = faq.response;
          matchedLinks = faq.quickLinks;
          break;
        }
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickLinks: matchedLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Box */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003B96] via-[#002B70] to-[#167C38] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm tracking-tight text-white">CYE AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-blue-100 font-medium">n8n Connected • Instant Answers</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-[#003B96] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 shadow-xs space-y-2 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-br-xs font-medium"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {msg.quickLinks && msg.quickLinks.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.quickLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#003B96] font-bold text-[11px] transition-colors"
                        >
                          <span>{link.text}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[10px] ${msg.sender === "user" ? "text-orange-100" : "text-slate-400"} text-right`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs italic">
                <div className="w-7 h-7 rounded-xl bg-[#003B96] text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#003B96] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#003B96] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#003B96] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors flex-shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about CYE 2026..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#003B96] hover:bg-[#002b70] disabled:opacity-40 text-white transition-all shadow-sm cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Little Power Robot Animation sitting on top of Ask AI Button */}
      {!isOpen && (
        <div className="relative z-10 -mb-2 pointer-events-none self-center drop-shadow-[0_8px_16px_rgba(0,59,150,0.25)]">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <Lottie
              src={robotAnimation}
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Floating Launcher Trigger with Cyber Cut-Border Animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cye-cut-border-btn font-display"
        aria-label="Toggle AI Chat Assistant"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F26522] rounded-full border border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F26522] rounded-full border border-white" />
        </div>
        <span className="font-extrabold text-xs tracking-wider uppercase">
          {isOpen ? "Close Assistant" : "Ask CYE AI"}
        </span>
      </button>
    </div>
  );
}
