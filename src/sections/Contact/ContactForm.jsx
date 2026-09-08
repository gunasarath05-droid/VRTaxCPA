"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { FiSend, FiCheck } from "react-icons/fi";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
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
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <section className="py-8 sm:py-14 md:py-18 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">

          {/* Left: Form intro */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 lg:sticky top-32 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-2.5 font-figtree">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-3">
                Schedule an Initial Consultation
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-manrope">
                Tell us about your tax situation or business advisory needs. VR Tax CPA LLC will personally review your inquiry and reach out within 1 business day.
              </p>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 mt-1 sm:mt-3">
              {[
                "100% confidential & secure",
                "Direct communication with us",
                "Virtual & phone consultations available",
                "Fast response within 1 business day",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0B1F3B] font-medium font-manrope">
                  <span className="w-5 h-5 rounded-full bg-[#d3d663]/20 text-[#0B1F3B] flex items-center justify-center flex-shrink-0 text-[10px]">
                    <FiCheck />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 w-full">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-4 sm:gap-5 shadow-sm"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0B1F3B] flex items-center justify-center text-[#d3d663] text-2xl sm:text-3xl shadow-lg">
                  <FiCheck />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-figtree text-[#0B1F3B]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-manrope">
                  Your consultation request has been received. Vethavalli Ramakrishnan, CPA will review your details and contact you via email or phone within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 shadow-sm"
              >
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Company / Entity Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Ventures LLC (optional)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Service selector */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all cursor-pointer"
                  >
                    <option value="">Select a service category...</option>
                    {services.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    How Can We Help You? (Brief Description)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a little about your tax situation, current deadlines, or what you'd like to discuss during our consultation..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="dark"
                    size="lg"
                    icon={<FiSend className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Submit Consultation Request
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
