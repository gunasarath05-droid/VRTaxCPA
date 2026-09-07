"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import darkbg from "@/assets/images/darkbg.png";

export default function BlogHeader() {
  return (
    <section 
      className="relative pt-36 pb-20 flex flex-col items-center justify-center text-center overflow-hidden bg-safe-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${darkbg.src})` }}
    >
      <div className="absolute inset-0 bg-[#0B1F3B]/50 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:gap-5"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "#d3d663" }}>Tax & Accounting Blog</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.1] font-figtree tracking-tight">
            Strategic Tax & Financial <span style={{ color: "#d3d663" }}>Insights</span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            Practical guides on minimizing tax liability, Texas compliance rules, small business bookkeeping, vendor-neutral payroll support, and long-term financial growth.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
