"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle, FiArrowRight, FiSearch } from "react-icons/fi";
import darkbg from "@/assets/images/darkbg.png";

import { servicesData } from "@/constants/servicesData";
import { homeFaqs } from "@/sections/Home/FAQHome";

export interface FAQItem {
  q: string;
  a: string;
  category: string;
  serviceTitle?: string;
}

const serviceCategories = Object.values(servicesData).map((service: any) => ({
  id: service.slug,
  name: service.title,
}));

const faqCategories = [
  {
    id: "all",
    name: "All Questions",
  },
  {
    id: "general",
    name: "General Overview",
  },
  ...serviceCategories,
];

const allFaqs: FAQItem[] = [
  ...homeFaqs.map((faq: { q: string; a: string }) => ({
    category: "general",
    q: faq.q,
    a: faq.a,
    serviceTitle: "General Overview",
  })),
  ...Object.values(servicesData).flatMap((service: any) =>
    (service.faqs || []).map((faq: { q: string; a: string }) => ({
      category: service.slug,
      q: faq.q,
      a: faq.a,
      serviceTitle: service.title,
    }))
  ),
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <>
      {/* Hero */}
      <section 
        className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 text-white overflow-hidden bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${darkbg.src})` }}
      >
        <div className="absolute inset-0 bg-[#0B1F3B]/50 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d3d663]">FAQ</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-figtree tracking-tight max-w-3xl mx-auto leading-tight text-white">
            Frequently Asked <span className="text-[#d3d663]">Questions</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-base md:text-lg font-manrope mt-4 max-w-2xl mx-auto leading-relaxed">
            Clear, authoritative answers to common questions about tax compliance, business structuring, payroll, and CPA advisory services.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search questions (e.g. S-Corp, IRS notice, payroll)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d3d663] backdrop-blur-md text-sm font-manrope shadow-lg"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedIdx(null);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-bold font-figtree transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#0B1F3B] text-white shadow-md scale-105"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="flex flex-col gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedIdx === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover-lift ${
                      isExpanded
                        ? "border-[#D4D367]/60 shadow-md ring-1 ring-[#D4D367]/20"
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors group"
                    >
                      <div className="flex flex-col items-start gap-1.5 pr-4">
                        <span className="text-sm sm:text-base font-bold text-[#111815] font-figtree group-hover:text-[#0B1F3B] transition-colors flex items-center gap-3">
                          <FiHelpCircle className="text-[#B8BA4A] flex-shrink-0 hidden sm:block" size={20} />
                          {faq.q}
                        </span>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isExpanded ? "bg-[#0B1F3B] text-white" : "bg-slate-100 text-[#111815] group-hover:bg-slate-200"
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
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-[#66706A] leading-relaxed font-manrope border-t border-slate-100 bg-slate-50/40">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
                <p className="text-[#111815] font-bold font-figtree text-base">No questions found matching your search.</p>
                <p className="text-slate-500 text-xs sm:text-sm font-manrope mt-1">Try another keyword or select a different category above.</p>
              </div>
            )}
          </div>

          {/* Still Have Questions CTA Card */}
          <div className="mt-14 sm:mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md text-center flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3B]/8 text-[#111815] px-3.5 py-1 text-xs font-bold uppercase tracking-widest font-figtree">
              Have a Specific Question?
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold font-figtree text-[#111815]">
              Talk Directly With Our Team
            </h3>
            <p className="text-[#66706A] text-sm sm:text-base font-manrope max-w-xl">
              Every tax situation is unique. Schedule a free, confidential strategy consultation to discuss your specific goals and numbers.
            </p>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3.5 bg-[#0B1F3B] text-white text-sm sm:text-base font-bold font-figtree pl-7 pr-3 py-3 rounded-full shadow-lg active:scale-95 mt-2 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="absolute inset-0 bg-[#D4D367] -translate-x-[102%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full pointer-events-none" />
              
              <span className="relative z-10 block overflow-hidden h-[20px] leading-[20px]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-full text-white">
                  Schedule Free Strategy Call
                </span>
                <span className="absolute top-0 left-0 block -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-[#111815]">
                  Schedule Free Strategy Call
                </span>
              </span>

              <span className="relative z-10 bg-white text-[#111815] w-7 h-7 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                <FiArrowRight size={14} className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] absolute" />
                <FiArrowRight size={14} className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-x-[150%] group-hover:translate-x-0 absolute text-[#111815]" />
              </span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
