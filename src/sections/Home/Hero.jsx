"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

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

const trustItems = ["Client Focused", "Secure & Confidential", "Year-Round Support"];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative lg:min-h-[92vh] pt-20 sm:pt-32 lg:pt-38 pb-10 sm:pb-16 lg:pb-20 flex items-center bg-white text-[#111815] overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-[#E8F0E8]/60 rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#F7F8F6] rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center min-w-0 w-full">

          {/* ── Left Column: Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 w-full"
          >
            {/* 1. Heading */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0B1F3B] leading-[1.18] sm:leading-[1.14] tracking-tight mb-4 sm:mb-5 font-figtree w-full break-words"
            >
              You&apos;ve got a business. <br className="hidden sm:inline" />
              We have <span className="text-[#d3d663]">your back.</span>
            </motion.h1>

            {/* 2. Mobile-only hero image (shown right after heading) */}
            <motion.div
              variants={itemVariants}
              className="lg:hidden w-full flex justify-center mb-2"
            >
              <div className="relative w-full max-w-[300px] sm:max-w-[400px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0B1F3B]/5 via-[#F8FAFC] to-[#d3d663]/20 blur-2xl -z-10 pointer-events-none" />
                <Image
                  src={heroBannerImg}
                  alt="Vethavalli Ramakrishnan, Founder of VR Tax CPA LLC"
                  width={850}
                  height={900}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(11,31,59,0.10)]"
                />
              </div>
            </motion.div>

            {/* 3. Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#334155] text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-7 max-w-xl font-normal font-manrope break-words w-full"
            >
              Strategic tax planning, proactive IRS compliance, precision accounting, payroll support, and fractional CFO guidance to minimize tax stress and fuel sustainable financial growth.
            </motion.p>

            {/* 4. Trust badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg mb-6 sm:mb-8"
              aria-label="Key firm credentials and guarantees"
            >
              {trustItems.map((label) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs text-center sm:text-left min-w-0"
                >
                  <FiCheckCircle className="text-[#2D503B] text-sm shrink-0 stroke-[2.5]" aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#0B1F3B] font-figtree leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* 5. CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                className="flex-1 sm:flex-none justify-center"
                ariaLabel="Schedule an advisory consultation with VR Tax CPA LLC"
              >
                Schedule Call
              </Button>
              <Button
                href="/services"
                variant="white"
                size="lg"
                className="flex-1 sm:flex-none justify-center"
                ariaLabel="Explore our tax compliance and accounting practice areas"
              >
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Hero Portrait (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 hidden lg:flex items-center justify-center relative w-full min-w-0"
          >
            <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#0B1F3B]/5 via-[#F8FAFC] to-[#d3d663]/20 -z-10 blur-2xl pointer-events-none" />
            <div className="relative z-10 w-full max-w-[580px] xl:max-w-[640px] flex items-center justify-center">
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