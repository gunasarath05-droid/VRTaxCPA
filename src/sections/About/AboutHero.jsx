"use client";

import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import heroImg from "@/assets/images/about/hero.png";

export default function AboutHero() {
  return (
    <section
      className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 overflow-hidden bg-safe-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImg.src})`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0B1F3B]/70 pointer-events-none" />

      {/* Subtle gold glow bottom-left */}
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#d3d663]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Pill Tag */}
            <span className="inline-flex items-center text-[#d3d663] text-[11px] sm:text-xs font-extrabold uppercase tracking-widest font-figtree mb-6">
              ABOUT VR TAX CPA LLC
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.1] font-figtree tracking-tight">
              Reliable Partners in{" "}
              <span className="text-[#d3d663]">Your Growth.</span>
            </h1>

            {/* Accent Bar */}
            <div className="w-12 h-1 bg-[#d3d663] rounded-full mt-4 mb-5" />

            {/* Subtitle */}
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl font-manrope">
              We empower business owners and individuals to make confident
              financial decisions, navigate tax obligations with clarity, and
              achieve lasting peace of mind.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
