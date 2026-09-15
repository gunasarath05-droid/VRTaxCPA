"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart, FiCheckCircle } from "react-icons/fi";

import missionImg from "@/assets/images/about/mission-v2.jpg";
import visionImg from "@/assets/images/about/vision-v2.jpg";
import valuesImg from "@/assets/images/about/values-v2.jpg";

export default function MissionVision() {
  const pillars = [
    {
      number: "01",
      tag: "Purpose & Promise",
      title: "Our Mission",
      icon: <FiTarget size={22} />,
      bgImage: missionImg,
      headline: " is to serve with unwavering dedication",
      desc: "Our mission is to serve with unwavering dedication, guided by the IECS Framework. Inspired by the Bhagavad Gita’s teaching of selfless service and duty performed with sincerity, we approach every client relationship with devotion, integrity, and clarity. Our purpose is to lift financial stress, bring confidence to every decision, and stand beside our clients year-round as a trusted partner in their growth and peace of mind.",
    },
    {
      number: "02",
      tag: "Guiding Philosophy",
      title: "Our Vision",
      icon: <FiEye size={22} />,
      bgImage: visionImg,
      headline: "Empowering our clients' growth as a reliable partner",
      desc: "Our vision is to become the reliable partner businesses and individuals turn to for clarity, confidence, and long-term success. We strive to create a future where every client feels supported and empowered to grow, knowing they have a steadfast advisor who stands with them through every stage of their financial journey.",
    },
    {
      number: "03",
      tag: "The I E C S Framework",
      title: "Our Core Values",
      icon: <FiHeart size={22} />,
      bgImage: valuesImg,
      headline: "Inspire • Empower • Care • Serve",
      desc: "Our daily practice is anchored in four foundational commitments that govern every engagement, calculation, and consultation:",
      bullets: [
        "Inspire — Confidence through honest, transparent, and accurate guidance",
        "Empower — Businesses and individuals to make informed, stress-free decisions",
        "Care — Genuinely for every client's success and financial well-being",
        "Serve — With integrity and dedication, placing client needs at the heart",
      ],
    },
  ];

  return (
    <section id="mission" className="py-8 md:py-16 bg-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none bg-[radial-gradient(circle,#d3d66325,transparent_70%)] filter blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#0B1F3B18,transparent_70%)] filter blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-3 font-figtree">
              PURPOSE &amp; PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Reliable Partners in Your Growth
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-manrope leading-relaxed">
              Our firm is built on personal dedication, deep financial expertise, and a genuine commitment to lifting the weight of tax and financial complexity off your shoulders.
            </p>
          </motion.div>
        </div>

        {/* ── Pillar Cards Grid: 2 Top + 1 Full-Width Bottom ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Our Mission */}
          {pillars[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[340px] sm:min-h-[400px] p-6 sm:p-8 flex flex-col justify-end shadow-sm hover-lift group cursor-default"
            >
              <Image
                src={pillars[0].bgImage}
                alt={pillars[0].title}
                fill
                className="object-cover object-right group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061220]/95 via-[#061220]/65 to-black/15 pointer-events-none" />

              <div className="relative z-10 max-w-lg">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#d3d663] font-figtree mb-2">
                  {pillars[0].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-figtree text-white mb-2 leading-snug">
                  {pillars[0].title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-white/95 font-figtree mb-2">
                  {pillars[0].headline}
                </p>
                <p className="text-white/85 text-xs sm:text-sm font-manrope leading-relaxed">
                  {pillars[0].desc}
                </p>
              </div>
            </motion.div>
          )}

          {/* Card 2: Our Vision */}
          {pillars[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[340px] sm:min-h-[400px] p-6 sm:p-8 flex flex-col justify-end shadow-sm hover-lift group cursor-default"
            >
              <Image
                src={pillars[1].bgImage}
                alt={pillars[1].title}
                fill
                className="object-cover object-right group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061220]/95 via-[#061220]/65 to-black/15 pointer-events-none" />

              <div className="relative z-10 max-w-lg">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#d3d663] font-figtree mb-2">
                  {pillars[1].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-figtree text-white mb-2 leading-snug">
                  {pillars[1].title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-white/95 font-figtree mb-2">
                  {pillars[1].headline}
                </p>
                <p className="text-white/85 text-xs sm:text-sm font-manrope leading-relaxed">
                  {pillars[1].desc}
                </p>
              </div>
            </motion.div>
          )}

          {/* Card 3: Our Core Values (Full Width) */}
          {pillars[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="md:col-span-2 relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[360px] p-6 sm:p-8 md:p-10 flex flex-col justify-end shadow-sm hover-lift group cursor-default"
            >
              <Image
                src={pillars[2].bgImage}
                alt={pillars[2].title}
                fill
                className="object-cover object-right sm:object-[center_right] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061220]/95 via-[#061220]/75 to-black/20 lg:bg-gradient-to-r lg:from-[#061220]/95 lg:via-[#061220]/80 lg:to-black/30 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {pillars[2].bullets?.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 hover:border-[#d3d663]/40 transition-all duration-300"
                    >
                      <FiCheckCircle className="text-[#d3d663] mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-xs sm:text-sm text-white/90 font-medium font-manrope leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-6">
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#d3d663] font-figtree mb-2">
                    {pillars[2].tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-figtree text-white mb-2 leading-snug">
                    {pillars[2].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-white/95 font-figtree mb-2">
                    {pillars[2].headline}
                  </p>
                  <p className="text-white/85 text-xs sm:text-sm font-manrope leading-relaxed">
                    {pillars[2].desc}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}

