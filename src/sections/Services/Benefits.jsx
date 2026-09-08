"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import whyChooseImg from "@/assets/images/home/whychoose.png";
import arrowImg from "@/assets/images/services/arrow.webp";

export default function Benefits({ benefits }) {
  if (!benefits || benefits.length === 0) return null;

  const half = Math.ceil(benefits.length / 2);
  const leftBenefits = benefits.slice(0, half);
  const rightBenefits = benefits.slice(half);

  return (
    <section id="benefits" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-3 font-figtree">
            KEY ADVANTAGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Why Our Clients Choose This Service
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#66706A] font-manrope">
            Diligence, peace of mind, and professional guidance delivered by our dedicated CPA team.
          </p>
        </div>

        {/* 3-Column Layout: Left Benefits | Big Center Image + Highlight Arrows | Right Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 items-center max-w-7xl mx-auto relative">
          
          {/* Left Column Items */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-8 sm:gap-12 text-center lg:text-right order-2 lg:order-1 relative">
            
            {/* Floating Highlight Arrow for Left Side */}
            <motion.div
              className="absolute top-28 -right-42 w-28 lg:w-32 xl:w-52 h-auto pointer-events-none hidden md:block"
            >
              <Image
                src={arrowImg}
                alt="Highlight arrow"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {leftBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group bg-white border border-gray-100/90 p-5 rounded-2xl shadow-sm hover-lift relative z-10"
              >
                <h3 className="text-lg sm:text-xl font-bold font-figtree text-[#0B1F3B] mb-2.5 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[#66706A] text-xs sm:text-sm font-manrope leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Big Prominent Person Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex justify-center items-end relative order-1 lg:order-2 hidden md:block"
          >
            {/* Subtle soft backdrop glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[#0B1F3B]/5 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px] mx-auto image-anime">
              <Image
                src={whyChooseImg}
                alt="Why choose VR Tax CPA LLC"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </motion.div>

          {/* Right Column Items */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-8 sm:gap-12 text-center lg:text-left order-3 relative">

            {rightBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group bg-white border border-gray-100/90 p-5 rounded-2xl shadow-sm hover-lift relative z-10"
              >
                <h3 className="text-lg sm:text-xl font-bold font-figtree text-[#0B1F3B] mb-2.5 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[#66706A] text-xs sm:text-sm font-manrope leading-relaxed">
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
