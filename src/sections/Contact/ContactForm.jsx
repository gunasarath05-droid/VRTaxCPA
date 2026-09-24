"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import { FiSend, FiCheck, FiChevronDown } from "react-icons/fi";
import { useSiteData } from "@/context/SiteDataContext";

export default function ContactForm() {
  const { addInquiry } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
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
    if (addInquiry) {
      addInquiry(form);
    }
    setSubmitted(true);
    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
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
                Tell us about your tax situation or business advisory needs. Our team will review your request and reach out to you at the earliest.
              </p>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 mt-1 sm:mt-3">
              {[
                "Confidential & Secure Consultations",
                "Professional Guidance & Expertise",
                "Flexible Virtual & Phone Consultations",
                "Prompt Response & Dedicated Support",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0B1F3B] font-medium font-manrope">
                  <span className="w-5 h-5 rounded-full bg-[#2D503B]/15 text-[#2D503B] flex items-center justify-center flex-shrink-0 text-[10px]" aria-hidden="true">
                    <FiCheck />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 w-full">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thank-you-card"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-4 sm:gap-5 shadow-sm"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0B1F3B] flex items-center justify-center text-[#d3d663] text-2xl sm:text-3xl shadow-lg" aria-hidden="true">
                    <FiCheck />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-figtree text-[#0B1F3B]">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-manrope">
                    Your consultation request has been received. Our advisory team will review your details and contact you promptly.
                  </p>
                  <Button
                    type="button"
                    variant="dark"
                    size="md"
                    onClick={() => setSubmitted(false)}
                    className="mt-2"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-shadow"
                >
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label htmlFor="contact-full-name" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Smith"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-[#0B1F3B] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label htmlFor="contact-company-name" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Company / Entity Name
                    </label>
                    <input
                      id="contact-company-name"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Ventures LLC (optional)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-[#0B1F3B] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label htmlFor="contact-email-address" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email-address"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-[#0B1F3B] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label htmlFor="contact-phone-number" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-phone-number"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. (469) 471-6580"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-[#0B1F3B] transition-all"
                    />
                  </div>
                </div>

                {/* Service selector */}
                <div className="flex flex-col gap-1.5 sm:gap-2 relative" ref={dropdownRef}>
                  <label id="contact-service-label" htmlFor="contact-service-btn" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    Service Needed
                  </label>
                  <button
                    id="contact-service-btn"
                    type="button"
                    onClick={() => setServiceDropdownOpen((prev) => !prev)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setServiceDropdownOpen(false);
                      if (e.key === "ArrowDown" && !serviceDropdownOpen) {
                        e.preventDefault();
                        setServiceDropdownOpen(true);
                      }
                    }}
                    className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 sm:py-3.5 text-sm text-left transition-all cursor-pointer shadow-xs ${
                      serviceDropdownOpen
                        ? "border-[#0B1F3B] ring-2 ring-[#0B1F3B]/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={serviceDropdownOpen}
                    aria-controls="contact-service-listbox"
                  >
                    <span className={form.service ? "text-[#0B1F3B] font-semibold truncate" : "text-slate-400 font-normal"}>
                      {form.service || "Select a service category..."}
                    </span>
                    <FiChevronDown
                      className={`text-base text-slate-500 transition-transform duration-300 shrink-0 ml-2 ${
                        serviceDropdownOpen ? "rotate-180 text-[#0B1F3B]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <input
                    type="text"
                    name="service"
                    value={form.service}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="sr-only"
                    onChange={() => {}}
                  />

                  {/* Dropdown Menu Popup */}
                  <AnimatePresence>
                    {serviceDropdownOpen && (
                      <motion.div
                        id="contact-service-listbox"
                        aria-labelledby="contact-service-label"
                        data-lenis-prevent="true"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_45px_rgba(11,31,59,0.18)] p-2 max-h-56 overflow-y-auto dropdown-scroll overscroll-contain space-y-1"
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
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#0B1F3B] text-white font-bold shadow-xs"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3B]"
                              }`}
                            >
                              <span className="truncate">{s}</span>
                              {isSelected && <FiCheck className="text-base shrink-0 ml-2 text-[#d3d663]" aria-hidden="true" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="contact-message-body" className="text-xs font-bold text-[#0B1F3B] uppercase tracking-wider font-figtree">
                    How Can We Help You? (Brief Description)
                  </label>
                  <textarea
                    id="contact-message-body"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a little about your tax situation, current deadlines, or what you'd like to discuss during our consultation..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-[#0B1F3B] transition-all resize-none"
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
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
