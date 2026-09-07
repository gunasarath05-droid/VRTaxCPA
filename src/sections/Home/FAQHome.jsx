"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle, FiArrowRight } from "react-icons/fi";
import faqImg from "@/assets/images/FAQ.png";

const faqs = [
  {
    q: "What types of businesses do you work with?",
    a: "We work with small to medium-sized businesses, startups, solo entrepreneurs, S-Corps, LLCs, and professionals across healthcare & dental practices, IT & tech services, real estate, construction contractors, restaurants, and manufacturing.",
  },
  {
    q: "How does VR Tax CPA LLC support small businesses throughout the year?",
    a: "We proactively review and implement strategies throughout the year, analyzing allowable deductions, optimizing entity classifications, calculating quarterly estimates, and maintaining accurate management financials so your annual filing is a meticulously planned process.",
  },
  {
    q: "Is my financial information secure?",
    a: "Absolutely. We utilize bank-grade 256-bit encrypted digital client portals via TaxDome, secure document vaults, and adhere to strict professional standards for client confidentiality.",
  },
  {
    q: "Do you offer year-round support?",
    a: "Yes. We believe client service is an ongoing strategic partnership. Our team provides year-round advisory check-ins, timely deadline tracking, and responsive support whenever questions arise.",
  },
  {
    q: "Can you assist with IRS notices and representation?",
    a: "Yes. We assist clients with formal IRS and Texas tax notice responses, transcript reviews, penalty abatement requests where eligible under IRS criteria, and unfiled prior-year tax returns.",
  },
];

export default function FAQHome() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Heading & Image */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-3 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-4">
              How Can We Help You?
            </h2>
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed mb-6 font-manrope">
              Have specific questions about your business or personal tax situation? Review our common questions or schedule an introductory call.
            </p>

            {/* FAQ Illustration Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full overflow-hidden"
            >
              <Image
                src={faqImg}
                alt="Frequently Asked Questions - VR Tax CPA LLC"
                width={600}
                height={400}
                className="w-full h-auto object-cover hidden md:block"
              />
            </motion.div>
          </div>

          {/* Right Column: Accordion with ADA ARIA Attributes */}
          <div className="lg:col-span-7 flex flex-col gap-3" role="region" aria-label="Frequently Asked Questions Accordion">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#d3d663] bg-white shadow-md"
                      : "border-[#E2E8F0] bg-[#F8FAFC] shadow-xs hover:border-[#d3d663]/60"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B1F3B]"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B1F3B] font-figtree">
                      {item.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#d3d663] text-[#0B1F3B] rotate-180"
                          : "bg-white text-[#334155] border border-[#E2E8F0]"
                      }`}
                      aria-hidden="true"
                    >
                      <FiChevronDown size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#334155] leading-relaxed font-manrope border-t border-[#E2E8F0]/60">
                          {item.a}
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
