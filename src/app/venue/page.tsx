"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Building2,
  ShieldCheck,
  DoorOpen,
  Car,
  Compass,
  AlertTriangle,
  Monitor,
  Mic2,
  Palette,
  Gamepad2,
  Sparkles,
  ExternalLink,
  PhoneCall,
} from "lucide-react";

const CAMPUS_FACILITIES = [
  {
    title: "Main Auditorium",
    purpose: "Opening Ceremony, Keynotes, Speech Finals, Seerah Buzzer & Grand Awards",
    icon: Mic2,
    badge: "Central Stage",
    color: "bg-blue-50 text-[#003B96]",
  },
  {
    title: "CS & AI Computer Labs",
    purpose: "Speed Programming (Algo Sandbox) & Mini Hackathon Development Pods",
    icon: Monitor,
    badge: "Tech Arena",
    color: "bg-emerald-50 text-[#167C38]",
  },
  {
    title: "Esports Arena Hall",
    purpose: "5v5 Counter-Strike 2 Tournament with spectator seating & big display",
    icon: Gamepad2,
    badge: "Gaming Zone",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Exhibition Concourse",
    purpose: "Live Painting Studio, Fine Arts Gallery & Partner Interactive Stalls",
    icon: Palette,
    badge: "Arts Gallery",
    color: "bg-orange-50 text-[#F26522]",
  },
];

export default function VenuePage() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-16">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Campus Guide & Protocols</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Venue & Access Protocols
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Bahria University Islamabad Campus (BUIC), Shangrilla Road, Sector E-8, Islamabad. Join us on <strong className="text-slate-900">Tuesday, 10th November 2026</strong> from <strong className="text-slate-900">09:00 AM to 05:00 PM PST</strong>.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003B96] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Campus</span>
                <h4 className="text-sm font-black text-slate-900">BUIC Main Campus</h4>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#167C38] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Date</span>
                <h4 className="text-sm font-black text-slate-900">10th November 2026</h4>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Expo Hours</span>
                <h4 className="text-sm font-black text-slate-900">09:00 AM - 05:00 PM</h4>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Security</span>
                <h4 className="text-sm font-black text-slate-900">CNIC / Student ID Req.</h4>
              </div>
            </div>
          </div>

          {/* ==================== GATE 1 vs GATE 2 ENTRY PROTOCOLS ==================== */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#F26522] uppercase tracking-[0.2em]">
                Entry Gate Instructions
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Gate Entry Protocols (Gate 1 vs Gate 2)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gate 1 Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-wider">
                    <DoorOpen className="w-4 h-4" />
                    <span>GATE 1 ENTRY</span>
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase">Shangrilla Road</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  VIPs, Guests, Faculty & Media
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Gate 1 is designated strictly for keynote speakers, registered industry executives, guest dignitaries, faculty members, and official media vehicles.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#003B96] flex-shrink-0" />
                    <span>VIP & Faculty vehicle parking passes verified here</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#003B96] flex-shrink-0" />
                    <span>Express VIP accreditation desk at foyer</span>
                  </li>
                </ul>
              </div>

              {/* Gate 2 Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-[#167C38] text-xs font-black uppercase tracking-wider">
                    <DoorOpen className="w-4 h-4" />
                    <span>GATE 2 ENTRY</span>
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase">Naval Complex Side</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  Student Competitors & Attendees
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Gate 2 serves as the primary entrance for student delegations, team competitors, campus ambassadors, and general expo visitors.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#167C38] flex-shrink-0" />
                    <span>Student ID Card / QR pass scanning station</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#167C38] flex-shrink-0" />
                    <span>Direct pathway to Central Registration & Badge desks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ==================== CAMPUS FACILITIES ==================== */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#003B96] uppercase tracking-[0.2em]">
                Venue Layout
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Key Campus Facilities on Expo Day
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CAMPUS_FACILITIES.map((facility) => {
                const IconComp = facility.icon;
                return (
                  <div
                    key={facility.title}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${facility.color} flex items-center justify-center`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {facility.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-slate-900">
                      {facility.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {facility.purpose}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================== MAP & DIRECTIONS SECTION ==================== */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-[#F26522]" />
                  <h3 className="text-xl font-black text-slate-900">
                    How to Reach BUIC
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
                  <p>
                    Bahria University Islamabad Campus is centrally situated along Shangrilla Road in Sector E-8, right beside the Naval Complex.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                      <Car className="w-4 h-4 text-[#003B96]" />
                      <span>Via Faisal Avenue & Margalla Road:</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Take Margalla Road towards E-8, turn onto Shangrilla Road. Gate 1 is located 200m ahead on the left.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Security Advisory</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Please carry your original National CNIC / Smart Card along with your University Student ID card to clear base security check-points seamlessly.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Bahria+University+Islamabad+Campus"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-2xl text-xs font-black text-white bg-[#003B96] hover:bg-[#002b70] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map Box */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-3 overflow-hidden h-[460px] relative">
                <iframe
                  title="Bahria University Islamabad Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.571434771787!2d73.02450847625895!3d33.72007807328285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe661f4fa59f%3A0xbdf526365a6f23b7!2sBahria%20University%20Islamabad%20Campus!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1.25rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
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
