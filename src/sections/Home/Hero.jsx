"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiSend,
  FiCheck,
} from "react-icons/fi";

import heroBgImg from "@/assets/images/home/hero/Herobg.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const trustItems = ["Client Focused", "Secure & Confidential", "Year-Round Support"];

export default function Hero() {
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

  // Auto-dismiss the success card after 4 seconds and return to the form
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitted]);

  const services = [
    "Tax Compliance (Individual & Business)",
    "Tax Planning & Strategic Advisory",
    "Business Entity Formation (LLC / S-Corp)",
    "Payroll Support (Setup & Training)",
    "Accounting Services & Bookkeeping",
    "Fractional CFO Services",
    "IRS Representation",
    "Texas Sales Tax & 1099 Filing",
    "Other / General Inquiry",
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
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 500);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 flex items-center bg-slate-50 text-[#111815] overflow-hidden"
    >
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <Image
          src={heroBgImg}
          alt="VR Tax CPA LLC Professional Accounting & Tax Advisory"
          fill
          priority
          className="object-cover object-center sm:object-right-top opacity-90"
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center min-w-0 w-full">

          {/* ── Left Column: Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 w-full"
          >
            {/* 1. Heading */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0B1F3B] leading-[1.18] sm:leading-[1.14] tracking-tight mb-4 sm:mb-5 font-figtree w-full break-words"
            >
              You&apos;ve got a business. <br className="hidden sm:inline" />
              We have <span className="text-[#d3d663]">your back.</span>
            </motion.h1>

            {/* 2. Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#334155] text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-7 max-w-lg font-normal font-manrope break-words w-full"
            >
              Strategic tax planning, proactive IRS compliance, precision accounting, payroll support, and fractional CFO guidance to minimize tax stress and fuel sustainable financial growth.
            </motion.p>

            {/* 3. Trust badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg mb-6 sm:mb-8"
              aria-label="Key firm credentials and guarantees"
            >
              {trustItems.map((label) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#E2E8F0] shadow-xs text-center sm:text-left min-w-0"
                >
                  <FiCheckCircle className="text-[#2D503B] text-sm shrink-0 stroke-[2.5]" aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#0B1F3B] font-figtree leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* 4. CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex-1 sm:flex-none justify-center"
            >
              <Button
                href="/services"
                variant="dark"
                size="lg"
                className="flex-1 sm:flex-none justify-center"
                ariaLabel="Explore our tax compliance and accounting practice areas"
              >
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Clean Glassmorphic Interactive Contact Form Card ── */}
          <motion.div
            id="contact-hero-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[460px] bg-white/80 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(11,31,59,0.12)] border border-white/90 ring-1 ring-black/[0.03] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="text-center py-8 px-2 flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center text-2xl shadow-md">
                      <FiCheck />
                    </div>
                    <h3 className="text-xl font-bold font-figtree text-[#0B1F3B]">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs text-slate-600 font-manrope leading-relaxed max-w-xs">
                      Thank you for reaching out. Vethavalli Ramakrishnan, CPA will review your details and connect with you within 1 business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="consultation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                  >
                    {/* Form Header */}
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold font-figtree text-[#0B1F3B] tracking-tight leading-tight">
                        Request an Initial Consultation
                      </h2>
                    </div>

                    {/* 2-Col Inputs: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Company / Entity Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    {/* 2-Col Inputs: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    {/* Service Needed */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                        Service Needed <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message / Brief Description */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                        How Can We Help You? (Brief Description)
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#d3d663] focus:ring-2 focus:ring-[#d3d663]/30 transition-all resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>

                    {/* Submit Button with Site Kinetic Wipe & Rolling Text Animation */}
                    <div className="pt-1">
                      <Button
                        type="submit"
                        variant="accent"
                        size="md"
                        disabled={loading}
                        showArrow={true}
                        className="w-full justify-center shadow-[0_6px_20px_rgba(211,214,99,0.35)] py-3 sm:py-3.5 font-figtree"
                        ariaLabel="Submit consultation request"
                      >
                        {loading ? "Submitting..." : "Submit Consultation Request"}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}