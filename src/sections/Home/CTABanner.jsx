"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function CTABanner() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[#0B1F3B] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/10"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#d3d663]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#d3d663] font-figtree mb-3 block">
                Ready To Take Control?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-figtree tracking-tight text-white leading-tight mb-3">
                Secure Your Business. Plan Confidently with VR Tax CPA LLC.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-manrope leading-relaxed">
                Connect directly with our experienced advisory team to review your tax position, ensure proactive compliance, and build year-round peace of mind.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
              >
                Schedule Call
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
