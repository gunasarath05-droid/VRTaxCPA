"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { FiArrowRight } from "react-icons/fi";

import img1 from "@/assets/images/home/services/about-2-1.png";
import img2 from "@/assets/images/home/services/about-2-2.png";
import img3 from "@/assets/images/home/services/about-2-3.png";
import img4 from "@/assets/images/home/services/about-2-4.png";
import img5 from "@/assets/images/home/services/about-2-5.png";
import serviceBg from "@/assets/images/home/services/service-bg.png";

// Icon Images
import iconTaxCompliance from "@/assets/images/home/services/icons/Tax Compliance.png";
import iconTaxPlanning from "@/assets/images/home/services/icons/Tax Planning & Advisory.png";
import iconBusinessFormation from "@/assets/images/home/services/icons/Business Entity Formation.png";
import iconPayrollSupport from "@/assets/images/home/services/icons/Payroll Support.png";
import iconAccountingServices from "@/assets/images/home/services/icons/Accounting Services.png";
import iconFractionalCFO from "@/assets/images/home/services/icons/Fractional CFO.png";
import iconIRSRepresentation from "@/assets/images/home/services/icons/IRS Representation.png";
import iconSalesTax1099 from "@/assets/images/home/services/icons/Sales Tax & 1099.png";

const serviceList = [
  {
    no: "01",
    title: "Tax Compliance",
    iconImg: iconTaxCompliance,
    desc: "Accurate and timely federal and Texas tax return preparation and filing for individuals, businesses, trusts, and exempt organizations.",
    slug: "tax-compliance",
    image: img1,
  },
  {
    no: "02",
    title: "Tax Planning & Advisory",
    iconImg: iconTaxPlanning,
    desc: "Proactive year-round tax planning and entity structuring to optimize tax obligations and prevent last-minute filing surprises.",
    slug: "tax-planning",
    image: img2,
  },
  {
    no: "03",
    title: "Business Entity Formation",
    iconImg: iconBusinessFormation,
    desc: "Advisory on entity classification (LLC, S-Corp, C-Corp), Texas state formation filings, EIN setup, and S-Corp tax elections.",
    slug: "business-formation",
    image: img3,
  },
  {
    no: "04",
    title: "Payroll Support",
    iconImg: iconPayrollSupport,
    desc: "We set up and train your team to manage payroll through partner platforms like QuickBooks, ensuring compliant withholding configuration.",
    slug: "payroll-services",
    image: img4,
  },
  {
    no: "05",
    title: "Accounting Services",
    iconImg: iconAccountingServices,
    desc: "Monthly and quarterly bookkeeping, bank reconciliations, management financials, and year-end ledger organization.",
    slug: "accounting-services",
    image: img5,
  },
  {
    no: "06",
    title: "Fractional CFO",
    iconImg: iconFractionalCFO,
    desc: "Cash flow modeling, KPI tracking dashboards, and internal management budgeting — tailored for growing businesses.",
    slug: "fractional-cfo",
    image: img1,
  },
  {
    no: "07",
    title: "IRS Representation",
    iconImg: iconIRSRepresentation,
    desc: "Notice response, IRS representation, penalty abatement review, and unfiled prior-year tax return resolution.",
    slug: "irs-representation",
    image: img2,
  },
  {
    no: "08",
    title: "Sales Tax & 1099",
    iconImg: iconSalesTax1099,
    desc: "Texas sales tax return filings, plus year-end preparation and electronic filing of 1099s for contractors, rent, interest, and dividends.",
    slug: "sales-tax-1099",
    image: img3,
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section
      id="services"
      className="py-8 md:py-16 relative overflow-hidden border-t border-[#E4E8E4] px-4 sm:px-6 bg-safe-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${serviceBg.src})` }}
    >
      {/* Subtle overlay to preserve clean corporate contrast */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />

      {/* ── Section Header (constrained to max-w-7xl) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-3 block">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight max-w-xl">
              Comprehensive Financial Solutions for Growing Businesses.
            </h2>
          </div>

          <Button
            href="/services"
            variant="accent"
            size="lg"
            className="shrink-0"
          >
            View All Services
          </Button>
        </div>
      </div>

      {/* ── Service Cards: full width, no max-w constraint ── */}
      <div className="relative z-10 w-full px-4 sm:px-6 mt-10 sm:mt-14">

        {/* ── Mobile/Tablet Grid (<lg): Clean Icon + Title Grid ── */}
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-7 sm:gap-y-9 lg:hidden">
          {serviceList.map((card, index) => (
            <Link
              key={index}
              href={`/services/${card.slug}`}
              className="group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#E4E8E4] shadow-xs hover:shadow-md hover:border-[#d3d663] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2.5 shadow-xs group-hover:scale-105 group-hover:border-[#d3d663]/50 transition-all duration-300 mb-3">
                <Image
                  src={card.iconImg}
                  alt={card.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0B1F3B] font-figtree leading-snug group-hover:text-[#2D503B] transition-colors max-w-[150px] sm:max-w-[180px]">
                {card.title}
              </h3>

              {/* Accent Underline Bar */}
              <span className="w-7 h-[3px] rounded-full bg-[#d3d663] group-hover:w-10 group-hover:bg-[#0B1F3B] transition-all duration-300 mt-2.5" />
            </Link>
          ))}
        </div>

        {/* ── Desktop Accordion Cards (lg+): full width ── */}
        <div className="hidden lg:flex flex-row gap-3 items-stretch h-[340px]">
          {serviceList.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer bg-white border ${
                  isActive
                    ? "border-[#d3d663] shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                    : "border-[#E4E8E4] shadow-2xs hover:border-[#d3d663]/60"
                }`}
                style={{
                  flex: isActive ? "4.5" : "1",
                  minWidth: isActive ? "0" : "88px",
                  transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                {/* ── COLLAPSED LAYOUT ─── */}
                <div
                  className={`absolute inset-0 transition-opacity duration-[250ms] p-3.5 ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                  }`}
                >
                  <span className="absolute top-4 right-3.5 text-xs font-bold font-mono text-[#66706A]">
                    {card.no}
                  </span>

                  <div className="absolute bottom-[98px] left-3.5 w-12 h-12 rounded-2xl bg-white/90 border border-[#d3d663]/30 flex items-center justify-center shrink-0 shadow-2xs p-2 overflow-hidden">
                    <Image
                      src={card.iconImg}
                      alt={card.title}
                      width={36}
                      height={36}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="absolute bottom-5 left-3.5 right-3.5 text-base font-bold text-[#0B1F3B] leading-snug font-figtree">
                    {card.title}
                  </h3>
                </div>

                {/* ── ACTIVE / EXPANDED LAYOUT ─── */}
                <div
                  className={`absolute inset-0 flex flex-row transition-opacity duration-[150ms] p-5 ${
                    isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Left: Illustration / Image */}
                  <div className="relative w-[44%] shrink-0 overflow-hidden flex items-center justify-center">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="300px"
                      className="object-contain p-3"
                    />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 relative flex flex-col justify-center gap-3 pl-6 pr-2 overflow-hidden">
                    <span className="absolute top-0 right-1 text-xs font-bold font-mono text-[#66706A]">
                      {card.no}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-white/90 border border-[#d3d663]/40 flex items-center justify-center shrink-0 shadow-2xs p-2 overflow-hidden">
                      <Image
                        src={card.iconImg}
                        alt={card.title}
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0B1F3B] leading-snug font-figtree">
                      {card.title}
                    </h3>

                    <p className="text-sm text-[#66706A] leading-relaxed line-clamp-3 font-manrope">
                      {card.desc}
                    </p>

                    <Link
                      href={`/services/${card.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3B] font-figtree hover:text-[#d3d663] transition-colors duration-200 pt-1"
                    >
                      <span>Learn More</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}