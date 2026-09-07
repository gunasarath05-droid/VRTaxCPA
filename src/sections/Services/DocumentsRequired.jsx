"use client";

import { motion } from "framer-motion";
import { FiFileText, FiCheck } from "react-icons/fi";

export default function DocumentsRequired({ documents }) {
  if (!documents || documents.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3B]/8 text-[#0B1F3B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#C5A880]/30 mb-3 sm:mb-4 font-figtree">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] inline-block" />
            Checklist &amp; Prerequisites
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Documents Required for Onboarding
          </h2>
          <p className="text-[#66706A] text-sm sm:text-base mt-3 font-manrope">
            Having these ready allows us to initiate your advisory or filing process seamlessly and without delays.
          </p>
        </div>

        <div className="bg-[#FAF9F5] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
            {documents.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#C5A880]/40 hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3B]/10 text-[#0B1F3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiFileText size={16} />
                </div>
                <span className="text-[#0B1F3B] font-medium text-xs sm:text-sm leading-relaxed font-manrope">
                  {doc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
