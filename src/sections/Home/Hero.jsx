"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiSend,
  FiCheck,
  FiChevronDown,
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
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Close dropdown on outside click
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className="relative min-h-[90vh] pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 lg:pb-20 flex items-center bg-slate-50 text-[#111815] overflow-hidden"
    >
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src={heroBgImg}
          alt=""
          fill
          priority
          className="object-cover object-center sm:object-right-top opacity-90"
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 min-w-0">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 xl:gap-12 items-center min-w-0 w-full">

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
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1F3B] leading-[1.18] sm:leading-[1.14] tracking-tight mb-3 sm:mb-5 font-figtree w-full break-words"
            >
              You&apos;ve got a business. <br className="hidden sm:inline" />
              We have <span className="text-[#2D503B] underline decoration-[#d3d663] underline-offset-4">your back.</span>
            </motion.h1>

            {/* 2. Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#334155] text-xs sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 max-w-lg font-normal font-manrope break-words w-full"
            >
              Strategic tax planning, proactive IRS compliance, precision accounting, payroll support, and fractional CFO guidance to minimize tax stress and fuel sustainable financial growth.
            </motion.p>

            {/* 3. Trust badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg mb-5 sm:mb-7"
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
              className="w-full sm:w-auto flex justify-center lg:justify-start mb-4 lg:mb-0"
            >
              <Button
                href="/services"
                variant="dark"
                size="lg"
                className="w-full sm:w-auto justify-center"
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
            <div className="w-full max-w-[460px] bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(11,31,59,0.12)] border border-white/90 ring-1 ring-black/[0.03] relative">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success-card"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="text-center py-8 px-2 flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center text-2xl shadow-md" aria-hidden="true">
                      <FiCheck />
                    </div>
                    <h3 className="text-xl font-bold font-figtree text-[#0B1F3B]">
                      Inquiry Received!
                    </h3>
                    <p className="text-sm text-slate-600 font-manrope leading-relaxed max-w-xs">
                      Thank you for reaching out. We will review your consultation request and reach back shortly.
                    </p>
                    <Button
                      type="button"
                      variant="dark"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                      className="mt-2"
                    >
                      Send Another Request
                    </Button>
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
                        <label htmlFor="hero-full-name" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="hero-full-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="hero-company-name" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Company / Entity Name
                        </label>
                        <input
                          id="hero-company-name"
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="hero-email-address" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="hero-email-address"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="hero-phone-number" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="hero-phone-number"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
                      <label id="hero-service-label" htmlFor="hero-service-btn" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                        Service Needed <span className="text-rose-500">*</span>
                      </label>
                      <button
                        id="hero-service-btn"
                        type="button"
                        onClick={() => setServiceDropdownOpen((prev) => !prev)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setServiceDropdownOpen(false);
                          if (e.key === "ArrowDown" && !serviceDropdownOpen) {
                            e.preventDefault();
                            setServiceDropdownOpen(true);
                          }
                        }}
                        className={`w-full flex items-center justify-between bg-white/70 backdrop-blur-xs border rounded-xl px-3.5 py-2.5 text-xs transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] text-left cursor-pointer ${
                          serviceDropdownOpen
                            ? "bg-white border-[#0B1F3B] ring-2 ring-[#0B1F3B]/20"
                            : "border-slate-200/80 hover:border-slate-300"
                        }`}
                        aria-haspopup="listbox"
                        aria-expanded={serviceDropdownOpen}
                        aria-controls="hero-service-listbox"
                      >
                        <span className={form.service ? "text-[#0B1F3B] font-semibold truncate" : "text-slate-400 font-normal"}>
                          {form.service || "Select a service category..."}
                        </span>
                        <FiChevronDown
                          className={`text-sm text-slate-500 transition-transform duration-300 shrink-0 ml-2 ${
                            serviceDropdownOpen ? "rotate-180 text-[#0B1F3B]" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <input
                        type="text"
                        name="service"
                        value={form.service}
                        required
                        tabIndex={-1}
                        aria-hidden="true"
                        className="sr-only"
                        onChange={() => {}}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please select a service from the list");
                        }}
                        onInput={(e) => e.target.setCustomValidity("")}
                      />

                      {/* Dropdown Menu Popup */}
                      <AnimatePresence>
                        {serviceDropdownOpen && (
                          <motion.div
                            id="hero-service-listbox"
                            aria-labelledby="hero-service-label"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, y: -4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_45px_rgba(11,31,59,0.18)] p-2 max-h-52 overflow-y-auto dropdown-scroll overscroll-contain space-y-1"
                            role="listbox"
                          >
                            {services.map((s, idx) => {
                              const isSelected = form.service === s;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => {
                                    setForm((prev) => ({ ...prev, service: s }));
                                    setServiceDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#0B1F3B] text-white font-bold shadow-xs"
                                      : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3B]"
                                  }`}
                                >
                                  <span className="truncate">{s}</span>
                                  {isSelected && <FiCheck className="text-sm shrink-0 ml-1 text-[#d3d663]" aria-hidden="true" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="hero-message-body" className="text-[10px] font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                How Can We Help You? (Brief Description)
              </label>
              <textarea
                id="hero-message-body"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us a little about your tax situation or questions..."
                className="w-full bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 transition-all resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>
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