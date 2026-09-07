"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiCalendar, FiFileText, FiCheckCircle } from "react-icons/fi";

import img1 from "@/assets/images/home/process/Process-1.png";
import img2 from "@/assets/images/home/process/Process-2.png";
import img3 from "@/assets/images/home/process/Process-3.png";
import img4 from "@/assets/images/home/process/Process-4.png";
import bgbanner from "@/assets/images/home/hero/bgbanner.png";

const steps = [
  {
    num: "01",
    icon: <FiPhone size={20} />,
    title: "Discovery & Free Strategy Call",
    desc: "A complimentary, no-obligation discovery call to understand your tax situation, business structure, and financial goals. No paperwork needed — just an honest, helpful conversation.",
    image: img1,
    accent: "text-[#2D5A27]",
    badgeBg: "bg-[#EAF3DE] text-[#2D5A27] border-[#CFE4B6]",
  },
  {
    num: "02",
    icon: <FiCalendar size={20} />,
    title: "Tailored Tax & Accounting Strategy",
    desc: "We develop a customized plan covering entity structure, tax filing strategy, bookkeeping setup, payroll needs, and year-round planning opportunities with clear, transparent pricing.",
    image: img2,
    accent: "text-[#1E3A24]",
    badgeBg: "bg-[#D4E8C2] text-[#1E3A24] border-[#B8D89E]",
  },
  {
    num: "03",
    icon: <FiFileText size={20} />,
    title: "Seamless Onboarding & Execution",
    desc: "We collect your documents through our secure portal, set up payroll or accounting software if needed, and get to work — filing returns, cleaning books, or executing your tax strategy.",
    image: img3,
    accent: "text-[#4A7A3A]",
    badgeBg: "bg-[#C8DFB0] text-[#1E3A24] border-[#A8C988]",
  },
  {
    num: "04",
    icon: <FiCheckCircle size={20} />,
    title: "Year-Round Support & Compliance",
    desc: "We stay with you year-round — sending quarterly tax reminders, monitoring law changes, responding to IRS notices, and conducting mid-year reviews to keep your strategy on track.",
    image: img4,
    accent: "text-[#9CB05A]",
    badgeBg: "bg-[#EAF3DE] text-[#2D5A27] border-[#9CB05A]/40",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = sectionHeight - viewportHeight;

      if (scrolled <= 0) {
        setActiveStep(0);
        return;
      }
      if (scrolled >= scrollable) {
        setActiveStep(steps.length - 1);
        return;
      }

      const progress = scrolled / scrollable;
      const step = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progress line height based on active step (0 -> 0%, 3 -> 100%)
  const lineProgress = activeStep / (steps.length - 1);

  return (
    <>
      {/* ── Mobile / Tablet View (<lg) ── */}
      <section className="py-16 bg-[#FAF7F2] lg:hidden border-t border-[#E6DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EFE7D8] text-[#1E3A24] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest border border-[#D9C8AA] mb-3 font-figtree shadow-xs">
              How We Do It
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#122115] leading-tight font-figtree tracking-tight">
              Simple, Transparent Process
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm border border-[#E6DDCC]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A24] text-[#FAF7F0] flex items-center justify-center font-bold text-sm font-figtree shadow-sm border border-[#9CB05A]/30">
                    {step.num}
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${step.badgeBg}`}>
                    {step.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-figtree text-[#122115] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#455246] text-sm leading-relaxed font-manrope">
                    {step.desc}
                  </p>
                </div>

                <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E6DDCC] mt-2">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 600px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop View (lg+) ── */}
      <section
        ref={sectionRef}
        style={{ height: `${steps.length * 90}vh` }}
        className="relative hidden lg:block border-t border-[#E6DDCC]"
      >
        {/* Sticky inner panel with clear navbar spacing */}
        <div className="sticky top-0 h-screen bg-white flex flex-col justify-center overflow-hidden pt-20 pb-6">
          <div className="max-w-7xl mx-auto px-6 w-full">

            {/* ── Section Header ── */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EFE7D8] text-[#1E3A24] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest border border-[#D9C8AA] mb-3 font-figtree shadow-xs">
                How We Do It
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#122115] leading-tight font-figtree tracking-tight">
                Simple, Transparent Process
              </h2>
            </div>

            {/* ── 3-Column Layout ── */}
            <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left: Step Cards */}
              <div className="col-span-5 flex flex-col gap-3.5">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl transition-all duration-300 ${isActive
                          ? "bg-white border border-gray-200 shadow-lg shadow-[#1E3A24]/10"
                          : "bg-[#F5EFEB] border border-[#E6DDCC]"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h3
                          className={`text-lg font-bold font-figtree transition-colors duration-300 ${isActive ? "text-[#1E3A24]" : "text-[#122115]"
                            }`}
                        >
                          {step.title}
                        </h3>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs ${step.badgeBg}`}>
                          {step.icon}
                        </span>
                      </div>
                      <p className="text-[#455246] text-[13.5px] leading-relaxed font-manrope">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Center: Vertical Timeline Numbers */}
              <div
                className="col-span-2 flex flex-col items-center justify-between relative py-4"
                style={{ height: "480px" }}
              >
                {/* Background track line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-[3px] bg-[#E0D5C3] rounded-full" />

                {/* Animated fill line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-7 w-[3px] bg-[#1E3A24] transition-all duration-500 origin-top rounded-full"
                  style={{ height: `calc(${lineProgress * 100}% - 48px)` }}
                />

                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx;
                  return (
                    <div
                      key={idx}
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm font-figtree transition-all duration-300 ${isActive
                          ? "bg-[#1E3A24] text-[#9CB05A] scale-110 ring-4 ring-[#9CB05A]/40 shadow-xl shadow-[#1E3A24]/30 border border-[#9CB05A]"
                          : isPast
                            ? "bg-[#2D5A27] text-white shadow-sm"
                            : "bg-[#EAE2D2] text-[#786E5F]"
                        }`}
                    >
                      {step.num}
                    </div>
                  );
                })}
              </div>

              {/* Right: Full Height Vertical Image Container */}
              <div className="col-span-5 flex items-center justify-center">
                <div
                  className="relative w-full max-w-[460px] h-[480px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center border border-[#E6DDCC] bg-[#FAF7F2] mx-auto"
                  style={{
                    backgroundImage: `url(${bgbanner.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -15 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={steps[activeStep].image}
                          alt={steps[activeStep].title}
                          fill
                          className="object-cover object-center"
                          priority
                          sizes="(max-width: 1024px) 100vw, 460px"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
