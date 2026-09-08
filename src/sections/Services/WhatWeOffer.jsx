"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import imgOffer1 from "@/assets/images/services/whatweoffer (1).png";
import imgOffer2 from "@/assets/images/services/whatweoffer (2).png";

export default function WhatWeOffer({ offers }) {
  if (!offers || offers.length === 0) return null;

  return (
    <section id="what-we-offer" className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-3 font-figtree">
            WHAT WE OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Specialized Solutions &amp; Scope of Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-manrope">
            Designed to deliver clarity, compliance, and dedicated support for each area of your financial operations.
          </p>
        </div>

        {/* ── Bento Mosaic Grid ── */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">

          {/* ── Card 1: Top Left (Wide with Team Photo Background) ── */}
          {offers[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-12 md:col-span-7 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 flex flex-col justify-end shadow-sm group cursor-default"
            >
              <Image
                src={imgOffer1}
                alt={offers[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 pointer-events-none" />

              <div className="relative z-10 max-w-lg">
                <h3 className="text-xl sm:text-2xl font-bold font-figtree text-white mb-2 leading-snug">
                  {offers[0].title}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm font-manrope leading-relaxed">
                  {offers[0].desc}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Card 2: Top Right (Compact Light Beige/Sand Card) ── */}
          {offers[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 md:col-span-5 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[220px] sm:min-h-[300px] p-6 sm:p-8 flex flex-col justify-center sm:justify-end bg-[#F4EFEA] border border-[#EBE3D8] shadow-xs hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold font-figtree text-[#1E293B] mb-2.5 leading-snug">
                  {offers[1].title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-manrope leading-relaxed">
                  {offers[1].desc}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Card 3: Bottom Left (Compact Warm Taupe/Camel Card) ── */}
          {offers[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="col-span-12 md:col-span-5 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[220px] sm:min-h-[300px] p-6 sm:p-8 flex flex-col justify-center sm:justify-end bg-[#C1B29D] shadow-xs hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold font-figtree text-white mb-2.5 leading-snug">
                  {offers[2].title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-manrope leading-relaxed">
                  {offers[2].desc}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Card 4: Bottom Right (Wide Olive Green Card with Professional Woman Photo) ── */}
          {offers[3] && (
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-12 md:col-span-7 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 flex flex-col justify-end shadow-sm group cursor-default"
            >
              <Image
                src={imgOffer2}
                alt={offers[3].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 pointer-events-none" />

              <div className="relative z-10 max-w-lg">
                <h3 className="text-xl sm:text-2xl font-bold font-figtree text-white mb-2 leading-snug">
                  {offers[3].title}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm font-manrope leading-relaxed">
                  {offers[3].desc}
                </p>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
