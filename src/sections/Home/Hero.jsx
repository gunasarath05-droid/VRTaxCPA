"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { RiShieldCheckLine } from "react-icons/ri";

import heroBannerImg from "@/assets/images/home/hero/hero2.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative lg:min-h-[92vh] pt-20 sm:pt-32 lg:pt-38 pb-10 sm:pb-16 lg:pb-20 flex items-center bg-white text-[#111815] overflow-hidden"
    >
      {/* Subtle Soft Background Gradients */}
      <div
        className="absolute -top-24 right-0 w-[550px] h-[550px] bg-[#E8F0E8]/60 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#F7F8F6] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center min-w-0 w-full">

          {/* ── Left Column: Hero Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 w-full"
          >

            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0B1F3B] leading-[1.18] sm:leading-[1.14] tracking-tight mb-4 sm:mb-5 font-figtree w-full break-words"
            >
              You&apos;ve got a business. <br className="hidden sm:inline" />
              We have <span className="text-[#d3d663]">your back.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#334155] text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal font-manrope break-words w-full"
            >
              Strategic tax planning, proactive IRS compliance, precision accounting, payroll support, and fractional CFO guidance to minimize tax stress and fuel sustainable financial growth.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-7 sm:mb-8 w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                className="w-full sm:w-auto justify-center"
                ariaLabel="Schedule an advisory consultation with VR Tax CPA LLC"
              >
                Schedule Call
              </Button>

              <Button
                href="/services"
                variant="white"
                size="lg"
                className="w-full sm:w-auto justify-center"
                ariaLabel="Explore our tax compliance and accounting practice areas"
              >
                Explore Services
              </Button>
            </motion.div>

            {/* Quick Trust Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg"
              aria-label="Key firm credentials and guarantees"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs text-center sm:text-left min-w-0">
                <FiCheckCircle className="text-[#2D503B] text-sm shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#0B1F3B] font-figtree leading-tight">Client Focused</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs text-center sm:text-left min-w-0">
                <FiCheckCircle className="text-[#2D503B] text-sm shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#0B1F3B] font-figtree leading-tight">Secure &amp; Confidential</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs text-center sm:text-left min-w-0">
                <FiCheckCircle className="text-[#2D503B] text-sm shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#0B1F3B] font-figtree leading-tight">Year-Round Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Hero Portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0 w-full min-w-0"
          >
            {/* Clean Corporate Ambient Backdrop */}
            <div className="absolute w-[260px] sm:w-[400px] lg:w-[460px] h-[260px] sm:h-[400px] lg:h-[460px] rounded-full bg-gradient-to-tr from-[#0B1F3B]/5 via-[#F8FAFC] to-[#d3d663]/20 -z-10 blur-2xl pointer-events-none" />

            <div className="relative z-10 w-full max-h-[260px] sm:max-h-none max-w-[300px] sm:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] flex items-center justify-center overflow-hidden sm:overflow-visible">
              <Image
                src={heroBannerImg}
                alt="Vethavalli Ramakrishnan, Founder of VR Tax CPA LLC"
                width={850}
                height={900}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(11,31,59,0.12)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}