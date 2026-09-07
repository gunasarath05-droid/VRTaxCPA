"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import faqImg from "@/assets/images/FAQ.png";

export default function FAQSection({ faqs, serviceTitle = "Tax Compliance" }) {
  const [expandedIdx, setExpandedIdx] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Header & 3D Illustration ── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-3 font-figtree">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-4">
              Common Questions on {serviceTitle}
            </h2>
            <p className="text-[#66706A] text-sm sm:text-base leading-relaxed mb-6 font-manrope">
              Find quick, clear answers to common inquiries about {serviceTitle}, compliance guidelines, filings, and our advisory engagement.
            </p>

            {/* 3D FAQ Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[360px] mx-auto lg:mx-0"
            >
              <Image
                src={faqImg}
                alt={`Frequently Asked Questions on ${serviceTitle} - VR Tax CPA LLC`}
                width={500}
                height={420}
                className="w-full h-auto object-contain drop-shadow-md"
                priority={false}
              />
            </motion.div>
          </div>

          {/* ── Right Column: FAQ Accordion List ── */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedIdx === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? "border-[#d3d663] bg-white shadow-md ring-1 ring-[#d3d663]/30"
                      : "border-slate-200/80 bg-[#F8FAFC] shadow-2xs hover:border-[#d3d663]/60 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer transition-colors group"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B1F3B] font-figtree leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isExpanded
                          ? "bg-[#0B1F3B] text-[#d3d663]"
                          : "bg-white text-[#0B1F3B] border border-slate-200 group-hover:border-[#0B1F3B]/30"
                      }`}
                    >
                      {isExpanded ? <FiMinus size={14} /> : <FiPlus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed font-manrope border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
