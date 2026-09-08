"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { FiArrowRight, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";

export default function ServiceCTA({ title = "tax compliance" }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-[#0B1F3B] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl"
        >
          
          {/* Subtle decorative background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left: Icon & Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 text-[#C5A880] flex items-center justify-center flex-shrink-0 shadow-sm">
                <LuCalendarCheck size={32} />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-figtree tracking-tight">
                  Stay Compliant. Stay Confident.
                </h3>
                <p className="text-white/70 text-sm sm:text-base font-manrope mt-2 max-w-xl leading-relaxed">
                  Let our experts handle your {title.toLowerCase()} so you can focus on what matters most.
                </p>
              </div>
            </div>

            {/* Right: Kinetic CTA Button */}
            <div className="flex-shrink-0">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
              >
                Schedule a Consultation
              </Button>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
