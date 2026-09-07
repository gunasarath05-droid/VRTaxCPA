"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import darkbg from "@/assets/images/darkbg.png";

export default function ContactHero() {
  const quickInfo = [
    { icon: <FiPhone size={20} />, label: "Call Directly", value: "(469) 471-6580", href: "tel:+14694716580" },
    { icon: <FiMail size={20} />, label: "Official Email", value: "info@vrtaxcpa.com", href: "mailto:info@vrtaxcpa.com" },
    { icon: <FiMapPin size={20} />, label: "Office Location", value: "3035 Ivy Hill Lane, Irving, TX 75063", href: "#office" },
  ];

  return (
    <section 
      className="relative pt-36 pb-0 flex flex-col items-center text-center overflow-hidden bg-safe-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${darkbg.src})` }}
    >
      <div className="absolute inset-0 bg-[#0B1F3B]/50 pointer-events-none" />


      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:gap-5"
        >
          <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d3d663]">Contact Us</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.1] font-figtree tracking-tight max-w-3xl">
            Let&apos;s Discuss Your <span className="text-[#d3d663]">Tax &amp; Financial Goals.</span>
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-manrope">
            Schedule an initial consultation with VR Tax CPA LLC. Whether you need Tax Planning, Tax Return Filing, Accounting, Payroll Support, or Fractional CFO guidance — we&apos;re here to serve as reliable partners in your growth.
          </p>
        </motion.div>
      </div>

      {/* Quick Contact Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-0 translate-y-6 sm:translate-y-8"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          {quickInfo.map((info, idx) => (
            <a
              key={idx}
              href={info.href}
              className="flex items-center gap-4 p-7 hover:bg-slate-50 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B1F3B]/8 text-[#0B1F3B] flex items-center justify-center group-hover:bg-[#d3d663] group-hover:text-[#0B1F3B] transition-all duration-300 flex-shrink-0">
                {info.icon}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-figtree mb-0.5">{info.label}</p>
                <p className="text-sm font-bold text-[#0B1F3B] font-figtree group-hover:text-[#0B1F3B] transition-colors">{info.value}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
