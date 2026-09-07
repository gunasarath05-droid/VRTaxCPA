"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Button from "@/components/Button";
import { FaArrowUp, FaStar, FaHeart } from "react-icons/fa";

// Count Up component with smooth requestAnimationFrame & unified trigger
function CountUp({ value, duration = 1.6, isTriggered = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // smooth ease-out curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * end;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isTriggered, value, duration]);

  const isFloat = value.toString().includes(".");
  const displayCount = isFloat ? count.toFixed(1) : Math.round(count);
  return <span className="inline-block tabular-nums">{displayCount}</span>;
}

export default function About() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.1 });

  const stats = [
    {
      value: "13",
      suffix: " Yrs",
      label: "Accounting Experience",
      icon: <FaArrowUp className="inline ml-1 text-[#d3d663] text-xs rotate-45" />,
    },
    {
      value: "10",
      suffix: " Yrs",
      label: "Tax Specialization",
      icon: <FaStar className="inline ml-1 text-[#d3d663] text-xs" />,
    },
    {
      value: "100",
      suffix: "%",
      label: "CPA-Led Oversight",
      icon: <FaHeart className="inline ml-1 text-[#d3d663] text-xs" />,
    },
    {
      value: "365",
      suffix: " Days",
      label: "Year-Round Partnership",
    },
  ];

  const pillars = [
    "Personalized, genuine client care",
    "Proactive year-round tax advisory — no last-minute scramble",
    "Modern cloud accounting and payroll setup",
    "Dedicated support for business owners and individuals",
  ];

  return (
    <section id="about" className="py-8 md:py-16 bg-white relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* About Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree">
              About VR Tax CPA LLC
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-[1.15] font-figtree tracking-tight">
              A Practice Built on Trust, Accuracy &amp; Genuine Care.
            </h2>

            {/* Pillar list */}
            <ul className="flex flex-col gap-3 mt-2 w-full">
              {pillars.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0B1F3B] text-sm sm:text-base font-medium">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0B1F3B]/5 text-[#0B1F3B] border border-[#d3d663]/50">
                    <FiCheck size={12} className="stroke-[3] text-[#2D503B]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8 lg:pl-6">
            <p className="text-[#0B1F3B] text-base sm:text-lg leading-relaxed font-manrope font-medium">
              We are not an average accounting firm filing taxes once a year and forgetting about you. We are your strategic partners who advise and support you throughout the year.
            </p>
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-manrope">
              Whether you are an established enterprise, healthcare practice, contractor, or emerging entrepreneur, our team proactively reviews and implements strategies so your annual filings are never a surprise, but a meticulously devised plan.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <Button
                href="/about"
                variant="accent"
                size="lg"
                className="shrink-0"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-[#E2E8F0]"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-3.5 sm:p-5 md:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center text-center shadow-xs hover:border-[#d3d663]/40 transition-colors"
            >
              <p className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] font-figtree tracking-tight flex items-center justify-center flex-wrap gap-0.5">
                <CountUp value={stat.value} isTriggered={isStatsInView} />
                <span>{stat.suffix}</span>
                {stat.icon}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#334155] mt-1.5 font-manrope leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}