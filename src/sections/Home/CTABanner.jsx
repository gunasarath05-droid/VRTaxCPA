"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import {
  FiSend,
  FiCheck,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShield,
  FiClock,
} from "react-icons/fi";

export default function CTABanner() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const services = [
    "Tax Compliance (Individual & Business Returns)",
    "Tax Planning & Strategic Advisory",
    "Business Entity Formation (LLC / S-Corp)",
    "Payroll Support (Setup & Training)",
    "Accounting Services & Management Financials",
    "Fractional CFO Services",
    "IRS Representation & Notice Resolution",
    "Texas Sales Tax & 1099 Filing",
    "General Inquiry / Other",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact-form-section" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d3d663]/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0B1F3B]/5 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Left Column: Value Prop & Contact Info ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-3">
                <span>Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-3">
                Ready To Take Control? Schedule Your Consultation.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-manrope">
                Connect directly with VR Tax CPA LLC. We provide proactive tax planning, comprehensive compliance, and personalized advisory designed to give you peace of mind.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+14694716580"
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0B1F3B]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FiPhone className="text-base" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 font-figtree block">Call Us Directly</span>
                  <span className="text-sm font-bold text-[#0B1F3B] font-figtree group-hover:text-[#0B1F3B] transition-colors">(469) 471-6580</span>
                </div>
              </a>

              <a
                href="mailto:info@vrtaxcpa.com"
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0B1F3B]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FiMail className="text-base" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 font-figtree block">Email Us</span>
                  <span className="text-sm font-bold text-[#0B1F3B] font-figtree group-hover:text-[#0B1F3B] transition-colors">info@vrtaxcpa.com</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center shrink-0">
                  <FiMapPin className="text-base" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 font-figtree block">Office Location</span>
                  <span className="text-sm font-medium text-slate-700 font-manrope">3035 Ivy Hill Lane, Irving, TX 75063</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                { icon: <FiShield className="text-[#0B1F3B]" />, text: "100% Confidential & Secure" },
                { icon: <FiClock className="text-[#0B1F3B]" />, text: "Response in 1 Business Day" },
                { icon: <FiCheck className="text-[#0B1F3B]" />, text: "Direct CPA Advisory" },
                { icon: <FiCheck className="text-[#0B1F3B]" />, text: "Virtual & In-Person Sessions" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 font-manrope">
                  <span className="w-5 h-5 rounded-full bg-[#d3d663]/30 flex items-center justify-center shrink-0 text-xs">
                    {badge.icon}
                  </span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Interactive Contact Form ── */}
          <div className="lg:col-span-7 w-full">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-4 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-[#0B1F3B] flex items-center justify-center text-[#d3d663] text-2xl shadow-lg">
                  <FiCheck />
                </div>
                <h3 className="text-2xl font-extrabold font-figtree text-[#0B1F3B]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-slate-600 text-sm max-w-md leading-relaxed font-manrope">
                  Your inquiry has been successfully received. Vethavalli Ramakrishnan, CPA will review your tax details and get in touch with you within one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
                  }}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-[#0B1F3B] hover:text-[#d3d663] underline cursor-pointer font-figtree transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 shadow-xl"
              >
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold font-figtree text-[#0B1F3B]">
                    Request an Initial Consultation
                  </h3>
                  <p className="text-xs text-slate-500 font-manrope mt-1">
                    Fill out the form below and our CPA team will respond promptly.
                  </p>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Smith"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Company / Entity Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Ventures LLC (optional)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. (469) 471-6580"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Service Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all cursor-pointer"
                  >
                    <option value="">Select a service category...</option>
                    {services.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message / Details */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    How Can We Help You? (Brief Description)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us a little about your tax situation, upcoming deadlines, or what you'd like to discuss..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={loading}
                    icon={<FiSend className="w-4 h-4" />}
                    className="w-full sm:w-auto font-figtree"
                  >
                    {loading ? "Submitting..." : "Submit Consultation Request"}
                  </Button>
                </div>
              </motion.form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

