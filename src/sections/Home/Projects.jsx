"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

import bgbanner from "@/assets/images/home/hero/bgbanner.png";
import img1 from "@/assets/images/home/services/about-2-1.png";
import img2 from "@/assets/images/home/services/about-2-2.png";
import img3 from "@/assets/images/home/services/about-2-3.png";

const caseStudies = [
  {
    tag: "Real Estate Tax Strategy",
    title: "Real Estate Portfolio: Cost Segregation & Entity Restructuring",
    desc: "Structured multi-property holdings into individual series LLCs and performed accelerated cost segregation depreciation, saving over $38,000 in annual federal tax liability.",
    client: "DFW Property Holdings",
    date: "December 20, 2025",
    sector: "Real Estate",
    bgGradient: "linear-gradient(135deg, #1e3a24 0%, #2d5234 50%, #9cb05a 100%)",
    image: img1,
    href: "/services/tax-planning",
  },
  {
    tag: "Practice Optimization",
    title: "Dental Practice: S-Corp Optimization & Gusto Payroll Setup",
    desc: "Transitioned an established dental practice from sole proprietor to S-Corp status, configured Gusto payroll with compliant reasonable compensation, and organized monthly books.",
    client: "Bright Smiles Dental",
    date: "January 15, 2026",
    sector: "Dental / Healthcare",
    bgGradient: "linear-gradient(135deg, #122115 0%, #1e3a24 100%)",
    image: img2,
    href: "/services/payroll-services",
  },
  {
    tag: "Fractional CFO & Advisory",
    title: "IT & SaaS Startup: Fractional CFO & Cash Flow Projections",
    desc: "Built a 12-month dynamic financial forecast, set up multi-state contractor 1099 compliance, and provided ongoing strategic advisory to successfully secure $500K bank financing.",
    client: "CloudPulse Tech",
    date: "February 10, 2026",
    sector: "IT & Tech Services",
    bgGradient: "linear-gradient(135deg, #2d5234 0%, #9cb05a 100%)",
    image: img3,
    href: "/services/fractional-cfo",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card 1 (zIndex: 1): Base card in center. Zooms out as Card 2 glides over it.
  const card1Scale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);
  const card1Y = useTransform(scrollYProgress, [0, 0.45], ["0px", "-20px"]);

  // Card 2 (zIndex: 2): Rises from bottom (0.15 -> 0.45) over Card 1. Then zooms out (0.55 -> 0.85) as Card 3 glides over it.
  const card2Y = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], ["100vh", "0vh", "0vh", "-20px"]);
  const card2Scale = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0.96, 1, 1, 0.92]);

  // Card 3 (zIndex: 3): Rises from bottom (0.55 -> 0.85) over Card 2, settling firmly in center at full scale (0.85 -> 1.0).
  const card3Y = useTransform(scrollYProgress, [0.55, 0.85], ["100vh", "0vh"]);
  const card3Scale = useTransform(scrollYProgress, [0.55, 0.85], [0.96, 1]);

  return (
    <>
      {/* ── Mobile / Tablet View (<lg) ── */}
      <section className="py-12 sm:py-16 mx-3 sm:mx-6 lg:hidden">
        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm"
          style={{
            backgroundImage: `url(${bgbanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-4 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0E1710]/10 text-[#111815] px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-primary/20 self-start font-figtree">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E1710] inline-block"></span>
              Proven Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-figtree tracking-tight">
              Real Tax Savings & Financial Growth for Our Clients
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col gap-5 shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs font-bold text-[#111815] bg-[#0E1710]/10 border border-primary/20 px-3 py-1 rounded-lg font-figtree">
                    {study.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-figtree leading-snug">
                  <Link href={study.href}>{study.title}</Link>
                </h3>

                <p className="text-[#66706A] text-sm leading-relaxed">
                  {study.desc}
                </p>

                <div
                  className="relative w-full h-44 sm:h-56 rounded-2xl overflow-hidden flex items-center justify-center p-4"
                  style={{ background: study.bgGradient }}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 640px) 100vw, 500px"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-left">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      CLIENT
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {study.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      DATE
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {study.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      SECTOR
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {study.sector}
                    </p>
                  </div>
                </div>

                <Link
                  href={study.href}
                  className="inline-flex items-center justify-center gap-2 bg-[#0E1710] text-white text-xs sm:text-sm font-bold font-figtree py-2.5 rounded-full mt-1"
                >
                  <span>Explore Strategy</span>
                  <FiArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop View (lg+) ── */}
      <section
        id="case-study"
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: "240vh" }}
      >
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center mx-4 md:mx-10 my-4 rounded-3xl border border-slate-100 shadow-sm"
          style={{
            backgroundImage: `url(${bgbanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* ── Section Header (Sticky at top) ── */}
          <div className="absolute top-8 sm:top-12 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 z-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0E1710]/10 text-[#111815] px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-primary/20 mb-2 font-figtree">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E1710] inline-block"></span>
                Proven Results
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-figtree tracking-tight max-w-2xl">
                Real Tax Savings & Financial Growth for Our Clients
              </h2>
            </div>

            <Button
              href="/services/tax-planning"
              variant="accent"
              size="md"
              className="shrink-0"
            >
              Explore Strategies
            </Button>
          </div>

          {/* ── Center Card Arena (Card-on-Card Stacking) ── */}
          <div className="relative w-full h-full max-w-7xl px-6 flex items-center justify-center pt-24 sm:pt-28 pb-6">

            {/* Case 1: Real Estate Portfolio (Base Layer - zIndex: 1) */}
            <motion.div
              className="absolute w-[92vw] max-w-6xl h-fit lg:h-[480px] bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 shadow-[0_25px_60px_rgba(0,0,0,0.16)] border border-slate-100 overflow-hidden origin-center transform-gpu"
              style={{
                y: card1Y,
                scale: card1Scale,
                zIndex: 1,
              }}
            >
              {/* Left: Text Details */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold text-[#111815] bg-[#0E1710]/10 border border-primary/20 px-3.5 py-1.5 rounded-lg mb-3 font-figtree">
                    {caseStudies[0].tag}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-figtree mb-3 leading-tight hover:text-[#111815] transition-colors">
                    <Link href={caseStudies[0].href}>{caseStudies[0].title}</Link>
                  </h3>

                  <p className="text-[#66706A] text-sm sm:text-base leading-relaxed mb-6">
                    {caseStudies[0].desc}
                  </p>

                  <Button
                    href={caseStudies[0].href}
                    variant="dark"
                    size="md"
                    className="mb-6"
                  >
                    Explore Service Details
                  </Button>
                </div>

                {/* Meta 3-Column Footer */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-left">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      CLIENTS
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[0].client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      COMPLETE DATE
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[0].date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      SECTOR
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[0].sector}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Mockup Image */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <div
                  className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-[24px] overflow-hidden flex items-center justify-center p-6 shadow-inner"
                  style={{ background: caseStudies[0].bgGradient }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={caseStudies[0].image}
                      alt={caseStudies[0].title}
                      fill
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case 2: Dental Practice (Middle Layer - zIndex: 2) */}
            <motion.div
              className="absolute w-[92vw] max-w-6xl h-fit lg:h-[480px] bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 shadow-[0_25px_70px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden origin-center transform-gpu"
              style={{
                y: card2Y,
                scale: card2Scale,
                zIndex: 2,
              }}
            >
              {/* Left: Text Details */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold text-[#111815] bg-[#0E1710]/10 border border-primary/20 px-3.5 py-1.5 rounded-lg mb-3 font-figtree">
                    {caseStudies[1].tag}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-figtree mb-3 leading-tight hover:text-[#111815] transition-colors">
                    <Link href={caseStudies[1].href}>{caseStudies[1].title}</Link>
                  </h3>

                  <p className="text-[#66706A] text-sm sm:text-base leading-relaxed mb-6">
                    {caseStudies[1].desc}
                  </p>

                  <Button
                    href={caseStudies[1].href}
                    variant="dark"
                    size="md"
                    className="mb-6"
                  >
                    Explore Service Details
                  </Button>
                </div>

                {/* Meta 3-Column Footer */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-left">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      CLIENTS
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[1].client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      COMPLETE DATE
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[1].date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      SECTOR
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[1].sector}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Mockup Image */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <div
                  className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-[24px] overflow-hidden flex items-center justify-center p-6 shadow-inner"
                  style={{ background: caseStudies[1].bgGradient }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={caseStudies[1].image}
                      alt={caseStudies[1].title}
                      fill
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case 3: IT & SaaS Startup (Top Layer - zIndex: 3) */}
            <motion.div
              className="absolute w-[92vw] max-w-6xl h-fit lg:h-[480px] bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden origin-center transform-gpu"
              style={{
                y: card3Y,
                scale: card3Scale,
                zIndex: 3,
              }}
            >
              {/* Left: Text Details */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold text-[#111815] bg-[#0E1710]/10 border border-primary/20 px-3.5 py-1.5 rounded-lg mb-3 font-figtree">
                    {caseStudies[2].tag}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-figtree mb-3 leading-tight hover:text-[#111815] transition-colors">
                    <Link href={caseStudies[2].href}>{caseStudies[2].title}</Link>
                  </h3>

                  <p className="text-[#66706A] text-sm sm:text-base leading-relaxed mb-6">
                    {caseStudies[2].desc}
                  </p>

                  <Button
                    href={caseStudies[2].href}
                    variant="dark"
                    size="md"
                    className="mb-6"
                  >
                    Explore Service Details
                  </Button>
                </div>

                {/* Meta 3-Column Footer */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-left">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      CLIENTS
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[2].client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      COMPLETE DATE
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[2].date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-figtree mb-0.5">
                      SECTOR
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-figtree line-clamp-1">
                      {caseStudies[2].sector}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Mockup Image */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <div
                  className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-[24px] overflow-hidden flex items-center justify-center p-6 shadow-inner"
                  style={{ background: caseStudies[2].bgGradient }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={caseStudies[2].image}
                      alt={caseStudies[2].title}
                      fill
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
