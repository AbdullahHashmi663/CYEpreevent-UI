"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2, AlertCircle, Loader2, Trophy, User, Mail, Phone, Building, Sparkles, Image as ImageIcon } from "lucide-react";
import { COMPETITIONS_LIST, registerForCompetition } from "@/lib/api";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCompetition?: string;
}

export default function RegisterModal({
  isOpen,
  onClose,
  defaultCompetition = COMPETITIONS_LIST[0],
}: RegisterModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [phone, setPhone] = useState("");
  const [competition, setCompetition] = useState(defaultCompetition);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("Image size exceeds 2MB limit. Please upload a smaller file.");
        return;
      }
      setImageFile(file);
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName || !email || !university || !competition) {
      setErrorMsg("All required fields must be completed.");
      return;
    }

    if (!imageFile) {
      setErrorMsg("Student ID / Profile Photo is required for campus gate verification.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("university", university);
    formData.append("phone", phone);
    formData.append("competition", competition);
    formData.append("image", imageFile);

    const res = await registerForCompetition(formData);
    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(res.message || "Registration completed successfully!");
      setFullName("");
      setEmail("");
      setUniversity("");
      setPhone("");
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#003B96]/10 text-[#003B96] text-xs font-black uppercase tracking-wider">
              Capital Youth Expo 2026
            </span>
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-[#167C38] text-[11px] font-black uppercase tracking-wider">
              BUIC Pre-Event
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Register for Competition
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Join the biggest youth convergence at Bahria University on 1st October 2026.
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">{successMsg}</p>
              <p className="text-xs text-emerald-700 mt-1">
                Your entry has been recorded. Check your email for event day gate pass instructions.
              </p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#003B96]" />
              <span>Select Competition Track *</span>
            </label>
            <select
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all cursor-pointer"
            >
              {COMPETITIONS_LIST.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#003B96]" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Abdullah Tariq"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#003B96]" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#003B96]" />
                <span>Phone / WhatsApp</span>
              </label>
              <input
                type="tel"
                placeholder="+92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#003B96]" />
              <span>University / College Institution *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Bahria University Islamabad (BUIC)"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B96] transition-all"
            />
          </div>

          {/* Student ID / Image Upload */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#003B96]" />
                <span>Student ID / Profile Photo (Max 2MB) *</span>
              </span>
              {imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="text-[11px] text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
              )}
            </label>
            <div className="relative border-2 border-dashed border-slate-200 hover:border-[#003B96] rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                {imagePreview ? (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#003B96] shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Student ID Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#003B96] flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800">
                  {imageFile ? imageFile.name : "Click or drag your ID photo to upload"}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  JPEG, PNG, WebP or GIF up to 2MB
                </span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl text-sm font-black text-white bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] hover:from-[#EA580C] hover:to-[#9A3412] cye-glow-orange transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Registration for {competition}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
