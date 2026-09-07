"use client";

import { motion } from "framer-motion";
import { FiClock, FiShield, FiUsers, FiFileText } from "react-icons/fi";

const getAdvantageIcon = (idx) => {
  switch (idx % 4) {
    case 0:
      return <FiClock size={20} />;
    case 1:
      return <FiShield size={20} />;
    case 2:
      return <FiUsers size={20} />;
    default:
      return <FiFileText size={20} />;
  }
};

export default function Benefits({ benefits }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Large Rounded Container Box as in Reference Image */}
        <div className="border border-slate-200/60 rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-sm">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-4 font-figtree">
              KEY ADVANTAGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Why Our Clients Choose This Service
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#66706A] font-manrope">
              Diligence, peace of mind, and professional guidance delivered by our dedicated team.
            </p>
          </div>

          {/* 4 Columns Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Outline Box */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#d3d663]/50 text-[#0B1F3B] flex items-center justify-center mb-4 group-hover:bg-[#d3d663] group-hover:border-[#d3d663] transition-all duration-300 shadow-sm">
                  {getAdvantageIcon(idx)}
                </div>

                <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed font-manrope">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
