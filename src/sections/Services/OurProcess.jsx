"use client";

import { motion } from "framer-motion";
import { FiFileText, FiSearch, FiUploadCloud, FiUserCheck, FiHeadphones, FiArrowRight } from "react-icons/fi";

const defaultSteps = [
  {
    num: "01",
    title: "Information Collection",
    desc: "We gather your documents securely and efficiently.",
    icon: <FiFileText size={18} />,
  },
  {
    num: "02",
    title: "Review & Validation",
    desc: "We review for accuracy, deductions, and compliance.",
    icon: <FiSearch size={18} />,
  },
  {
    num: "03",
    title: "Preparation & Filing",
    desc: "We prepare and e-file your returns on-time.",
    icon: <FiUploadCloud size={18} />,
  },
  {
    num: "04",
    title: "Client Review & Approval",
    desc: "You review and approve before submission.",
    icon: <FiUserCheck size={18} />,
  },
  {
    num: "05",
    title: "Post-Filing Support",
    desc: "We're here for questions and future planning.",
    icon: <FiHeadphones size={18} />,
  },
];

export default function OurProcess({ steps }) {
  const currentSteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F5] border border-slate-200 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-4 font-figtree shadow-2xs">
            • OUR PROCESS •
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            How We Execute This Service Step-by-Step
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#66706A] font-manrope">
            A structured, transparent roadmap from initial onboarding to completed filing.
          </p>
        </div>

        {/* 5 Connected Step Card Container */}
        <div className="bg-[#FAF9F5] border border-slate-200/70 rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-start">
            {currentSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Arrow connector between steps (desktop only) */}
                {idx < currentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 text-slate-300 pointer-events-none z-10">
                    <FiArrowRight size={14} />
                  </div>
                )}

                {/* Hexagon/Circle Step Icon */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#C5A880]/60 text-[#0B1F3B] flex items-center justify-center mb-3.5 group-hover:bg-[#C5A880] transition-all duration-300 shadow-sm">
                  {step.icon || defaultSteps[idx % defaultSteps.length].icon}
                </div>

                {/* Step Number */}
                <span className="text-[11px] font-extrabold text-[#C5A880] uppercase tracking-wider font-figtree mb-1">
                  {step.num || String(idx + 1).padStart(2, "0")}
                </span>

                {/* Step Title */}
                <h3 className="text-sm sm:text-base font-bold font-figtree text-[#0B1F3B] mb-1.5 leading-snug">
                  {step.title}
                </h3>

                {/* Step Desc */}
                <p className="text-[#66706A] text-xs leading-relaxed font-manrope">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
