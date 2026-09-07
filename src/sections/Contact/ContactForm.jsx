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
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left: Form intro */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky top-32">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-4">
                Schedule an Initial Consultation
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-manrope">
                Tell us about your tax situation or business advisory needs. VR Tax CPA LLC will personally review your inquiry and reach out within 1 business day.
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-3 mt-4">
              {[
                "100% confidential & secure",
                "Direct communication with us",
                "Virtual & phone consultations available",
                "Fast response within 1 business day",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-[#0B1F3B] font-medium font-manrope">
                  <span className="w-5 h-5 rounded-full bg-[#d3d663]/20 text-[#0B1F3B] flex items-center justify-center flex-shrink-0 text-[10px]">
                    <FiCheck />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-slate-200 rounded-3xl p-16 text-center flex flex-col items-center gap-5 shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-[#0B1F3B] flex items-center justify-center text-[#d3d663] text-3xl shadow-lg">
                  <FiCheck />
                </div>
                <h3 className="text-2xl font-extrabold font-figtree text-[#0B1F3B]">Thank You for Reaching Out!</h3>
                <p className="text-slate-600 text-sm max-w-md leading-relaxed font-manrope">
                  Your consultation request has been received. Vethavalli Ramakrishnan, CPA will review your details and contact you via email or phone within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 flex flex-col gap-6 shadow-sm"
              >
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Smith"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">Company / Entity Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Ventures LLC (optional)"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. (469) 471-6580"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all"
                    />
                  </div>
                </div>

                {/* Service selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">Service Needed</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all cursor-pointer"
                  >
                    <option value="">Select a service category...</option>
                    {services.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider">How Can We Help You? (Brief Description)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a little about your tax situation, current deadlines, or what you'd like to discuss during our consultation..."
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d3d663] focus:border-[#d3d663] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  icon={<FiSend className="w-4 h-4" />}
                  className="self-start mt-2"
                >
                  Submit Consultation Request
                </Button>
              </motion.form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
