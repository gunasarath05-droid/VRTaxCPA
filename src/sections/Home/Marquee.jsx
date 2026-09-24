"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const marqueeItems = [
    "Tax Compliance",
    "Business Entity Formation",
    "Tax Planning & Advisory",
    "Payroll Support",
    "Fractional CFO Services",
    "IRS Representation",
    "Sales Tax & 1099 Filing",
    "Accounting Services",
  ];

  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Firm specializations"
      className="py-3.5 overflow-hidden relative z-20 bg-[#0B1F3B] border-y border-white/10"
    >
      <span className="sr-only">
        Core specialties: {marqueeItems.join(", ")}
      </span>
      <div
        className="marquee-container flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3d663]"
        tabIndex={0}
        aria-hidden="true"
        title="Focus or hover to pause ticker"
      >
        <div className="marquee-content flex gap-8 sm:gap-10 items-center">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-6 sm:gap-8">
              <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#d3d663]" />
              <span className="text-sm sm:text-base font-bold font-figtree uppercase tracking-wider text-white/90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
