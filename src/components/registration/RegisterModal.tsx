"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy,
  User,
  Mail,
  Phone,
  Building,
  CreditCard,
  Sparkles,
  Users,
} from "lucide-react";
import { COMPETITIONS_LIST, registerForCompetition } from "@/lib/api";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCompetition?: string;
}

interface MemberData {
  fullName: string;
  email: string;
  phone: string;
  cnic: string;
  university: string;
}

const emptyMember = (): MemberData => ({
  fullName: "",
  email: "",
  phone: "",
  cnic: "",
  university: "",
});

export default function RegisterModal({
  isOpen,
  onClose,
  defaultCompetition = COMPETITIONS_LIST[0],
}: RegisterModalProps) {
  const [competition, setCompetition] = useState(defaultCompetition);
  const [members, setMembers] = useState<MemberData[]>([emptyMember()]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleMemberChange = (
    index: number,
    field: keyof MemberData,
    value: string
  ) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers((prev) => [
        ...prev,
        {
          ...emptyMember(),
          university: prev[0]?.university || "", // Prefill university from lead
        },
      ]);
    }
  };

  const handleRemoveMember = (indexToRemove: number) => {
    if (members.length > 1) {
      setMembers((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate all members
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const label = i === 0 ? "Member 1 (Team Lead)" : `Member ${i + 1}`;

      if (!m.fullName.trim()) {
        setErrorMsg(`Please enter Full Name for ${label}.`);
        return;
      }
      if (!m.email.trim()) {
        setErrorMsg(`Please enter Email Address for ${label}.`);
        return;
      }
      if (!m.phone.trim()) {
        setErrorMsg(`Please enter Phone / WhatsApp Number for ${label}.`);
        return;
      }
      if (!m.cnic.trim()) {
        setErrorMsg(`Please enter CNIC / B-Form Number for ${label}.`);
        return;
      }
      if (!m.university.trim()) {
        setErrorMsg(`Please enter University / Institution for ${label}.`);
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("competition", competition);
    formData.append("members_count", String(members.length));
    formData.append("team_members", JSON.stringify(members));

    // Primary lead fields for standard backend compatibility
    formData.append("full_name", members[0].fullName);
    formData.append("email", members[0].email);
    formData.append("phone", members[0].phone);
    formData.append("cnic", members[0].cnic);
    formData.append("university", members[0].university);

    // Individual member fields
    members.forEach((m, idx) => {
      formData.append(`member_${idx + 1}_name`, m.fullName);
      formData.append(`member_${idx + 1}_email`, m.email);
      formData.append(`member_${idx + 1}_phone`, m.phone);
      formData.append(`member_${idx + 1}_cnic`, m.cnic);
      formData.append(`member_${idx + 1}_university`, m.university);
    });

    const res = await registerForCompetition(formData);
    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(
        res.message || "Registration completed successfully for your team!"
      );
      setMembers([emptyMember()]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 sm:p-8 my-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-wider">
              Capital Youth Expo 2026
            </span>
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-[#167C38] text-[11px] font-black uppercase tracking-wider">
              BUIC Pre-Event
            </span>
            <span className="inline-block px-2.5 py-1 rounded-full bg-orange-100 text-[#F26522] text-[11px] font-bold">
              1 to 3 Members Roster
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Competition Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Register your individual entry or team roster (up to 3 members) for Bahria University on 1st October 2026.
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">{successMsg}</p>
              <p className="text-xs text-emerald-700 mt-1">
                Your entry has been recorded. All team members will receive event day gate pass instructions via WhatsApp & Email.
              </p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Competition Selector */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#003B96]" />
              <span>Select Competition Track *</span>
            </label>
            <select
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all cursor-pointer shadow-2xs"
            >
              {COMPETITIONS_LIST.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Team Members Cards */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#003B96]" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Participant & Team Details ({members.length}/3)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">
                Max 3 Members
              </span>
            </div>

            {members.map((member, idx) => {
              const isLead = idx === 0;

              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 relative group"
                >
                  {/* Card Header with Member Tag and Remove Button */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white ${
                          isLead ? "bg-[#003B96]" : idx === 1 ? "bg-[#167C38]" : "bg-[#F26522]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                        {isLead ? "Member 1 (Team Lead / Primary) *" : `Member ${idx + 1} Details *`}
                      </span>
                    </div>

                    {!isLead && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Remove</span>
                      </button>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#003B96]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder={isLead ? "e.g. Abdullah Tariq (Lead)" : `e.g. Member ${idx + 1} Full Name`}
                      value={member.fullName}
                      onChange={(e) => handleMemberChange(idx, "fullName", e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                    />
                  </div>

                  {/* Compulsory Number Fields: Phone & CNIC in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Phone / WhatsApp (Compulsory) */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#003B96]" />
                        <span>Phone / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="03001234567"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(idx, "phone", e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>

                    {/* CNIC / B-Form Number (Compulsory) */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CreditCard className="w-3 h-3 text-[#003B96]" />
                        <span>CNIC / B-Form Number *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 61101-1234567-1"
                        value={member.cnic}
                        onChange={(e) => handleMemberChange(idx, "cnic", e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & University in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#003B96]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={member.email}
                        onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>

                    {/* University */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-[#003B96]" />
                        <span>University / Institute *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bahria University"
                        value={member.university}
                        onChange={(e) => handleMemberChange(idx, "university", e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* + Add Member Button (Allowed up to 3 members) */}
            {members.length < 3 && (
              <button
                type="button"
                onClick={handleAddMember}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-[#003B96]/30 hover:border-[#003B96] bg-blue-50/40 hover:bg-blue-50 text-[#003B96] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-[#003B96] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Add Member {members.length + 1} (Max 3 Members)</span>
              </button>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Team Registration...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Confirm Registration for {competition} ({members.length}{" "}
                    {members.length === 1 ? "Member" : "Members"})
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
