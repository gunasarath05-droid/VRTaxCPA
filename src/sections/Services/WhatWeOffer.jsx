"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const offerImages = [
  "/images/offers/offer-tax.jpg",
  "/images/offers/offer-business.jpg",
  "/images/offers/offer-compliance.jpg",
  "/images/offers/offer-strategy.jpg",
];

const getOfferImage = (title = "", idx = 0) => {
  const lower = title.toLowerCase();
  if (lower.includes("tax") || lower.includes("individual") || lower.includes("1040") || lower.includes("filing")) {
    return "/images/offers/offer-tax.jpg";
  }
  if (lower.includes("business") || lower.includes("s-corp") || lower.includes("c-corp") || lower.includes("llc") || lower.includes("entity")) {
    return "/images/offers/offer-business.jpg";
  }
  if (lower.includes("compliance") || lower.includes("irs") || lower.includes("trust") || lower.includes("estate") || lower.includes("protect")) {
    return "/images/offers/offer-compliance.jpg";
  }
  if (lower.includes("strategy") || lower.includes("advisory") || lower.includes("planning") || lower.includes("cfo") || lower.includes("non-profit")) {
    return "/images/offers/offer-strategy.jpg";
  }
  return offerImages[idx % offerImages.length];
};

export default function WhatWeOffer({ offers }) {
  if (!offers || offers.length === 0) return null;

  return (
    <section id="what-we-offer" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-4 font-figtree">
            WHAT WE OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Specialized Solutions &amp; Scope of Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-manrope">
            Designed to deliver clarity, compliance, and dedicated support for each area of your financial operations.
          </p>
        </div>

        {/* 2x2 Accessible Executive Card Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6"
            >
              {/* Image / Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={getOfferImage(offer.title, idx)}
                  alt={offer.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="text-[#2D503B] flex-shrink-0" size={16} />
                    <h3 className="text-lg font-extrabold font-figtree text-[#0B1F3B] tracking-tight leading-snug group-hover:text-[#0B1F3B]">
                      {offer.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-manrope">
                    {offer.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
