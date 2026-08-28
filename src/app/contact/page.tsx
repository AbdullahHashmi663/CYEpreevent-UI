"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterModal from "@/components/registration/RegisterModal";
import { sendContactMessage } from "@/lib/api";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  HelpCircle,
  Building,
  Sparkles,
  MessageSquare,
  Tag,
} from "lucide-react";

const INQUIRY_TYPES = [
  "Competition Guidelines & Queries",
  "Ambassador & Volunteer Inquiries",
  "Sponsorships & MoU Partnerships",
  "Venue Security & Delegation Passes",
  "General Assistance",
];

export default function ContactPage() {
  const [registerOpen, setRegisterOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name || !email || !message) {
      setErrorMsg("Please fill out all required fields marked with *.");
      return;
    }

    setLoading(true);
    const res = await sendContactMessage({
      name,
      email,
      message: `[Inquiry: ${inquiryType}] ${phone ? `[Phone: ${phone}] ` : ""}${message}`,
    });
    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(res.message || "Your inquiry has been logged! Our organizing desk will reply within 24 hours.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 text-[#F26522] text-xs font-black uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Official Help Desk</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Contact Organizing Desk
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Have questions regarding competition tracks, ambassador kits, institutional delegations, or sponsorships? Reach out directly to our central organizing committee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900">
                  Verified Contact Channels
                </h3>

                <div className="space-y-5 text-xs sm:text-sm text-slate-600 font-medium">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#003B96] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">Venue Location</p>
                      <p className="text-slate-500">Bahria University (BUIC), Shangrilla Road, E-8 Campus, Islamabad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">Official Email</p>
                      <a href="mailto:cye.buic@gmail.com" className="text-[#003B96] font-bold hover:underline">
                        cye.buic@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#167C38] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">BUIC Secretariat Helpline</p>
                      <p className="text-slate-500">+92 51 9260002 (Ext: 1234)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">Operating Hours</p>
                      <p className="text-slate-500">Monday – Friday: 09:00 AM – 05:00 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#003B96] to-[#002257] rounded-3xl p-8 text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Organizing Partners</span>
                </div>
                <h4 className="text-lg font-black">
                  Al Nakhla Student Support & Youth Insight Pakistan
                </h4>
                <p className="text-xs text-blue-100 font-normal leading-relaxed">
                  Our joint taskforce is on campus daily to assist students, delegations, and sponsors with registration and technical preparations.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Fill out the form below and our team will get in touch promptly.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{successMsg}</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        A confirmation ticket has been dispatched to your email address.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Usama Malik"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                        Inquiry Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                      Your Message / Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please write your detailed query, delegation size, or specific requirements here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] cye-glow-orange shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Official Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
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
